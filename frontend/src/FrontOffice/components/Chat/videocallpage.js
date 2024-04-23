import React, { useRef, useEffect, useState } from 'react';

const WebSocketServerUrl = 'ws://localhost:5001/'; // Replace this with your actual WebSocket server URL

const WebcamComponent = () => {
  const videoRef = useRef(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [localStream, setLocalStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [websocket, setWebsocket] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket(WebSocketServerUrl);
    setWebsocket(ws);

    return () => {
      // Close WebSocket connection when component unmounts
      if (ws) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        // Get access to the webcam
        const stream = await navigator.mediaDevices.getUserMedia({ video: cameraEnabled });
        // Display the webcam stream in the video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setLocalStream(stream);
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    startWebcam();

    return () => {
      // Clean up by stopping the video stream when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(track => {
          track.stop();
        });
      }
    };
  }, [cameraEnabled]);

  useEffect(() => {
    if (localStream && websocket) {
      const configuration = {};
      const pc = new RTCPeerConnection(configuration);
      pc.addStream(localStream);

      pc.onicecandidate = event => {
        if (event.candidate) {
          // Send ICE candidate to signaling server
          sendIceCandidate(event.candidate);
        }
      };

      pc.ontrack = event => {
        // Add remote stream to the video element
        if (videoRef.current) {
          if (!videoRef.current.srcObject) {
            videoRef.current.srcObject = new MediaStream();
          }
          videoRef.current.srcObject.addTrack(event.track);
        }
      };

      pc.ondatachannel = event => {
        // Receive offer from signaling server
        event.channel.onmessage = msg => {
          console.log('Received offer:', msg.data);
          // Handle the offer here
          handleOffer(JSON.parse(msg.data));
        };
      };

      setPeerConnection(pc);
    }
  }, [localStream, websocket]);

  const sendIceCandidate = candidate => {
    // Send ICE candidate to signaling server
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      const iceCandidateMessage = { type: 'iceCandidate', data: candidate };
      websocket.send(JSON.stringify(iceCandidateMessage));
    }
  };

  const handleOffer = offer => {
    // Handle the received offer here
    //console.log('Received offer:', offer);
    // You can use this offer to create an answer and set it as local description
    // For example:
     //peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
     //const answer = await peerConnection.createAnswer();
     //await peerConnection.setLocalDescription(answer);
     //Send the answer to the signaling server
     //const answerMessage = { type: 'answer', data: answer };
     //websocket.send(JSON.stringify(answerMessage));
  };

  const toggleCamera = () => {
    setCameraEnabled(prev => !prev);
  };

  return (
    <div className="webcam-component">
      <div className="video-preview">
        <video ref={videoRef} autoPlay playsInline muted />
      </div>
      <div className="controls">
        <button
          className="control-button"
          onClick={toggleCamera}
          style={{ backgroundColor: cameraEnabled ? '#007bff' : '#ccc' }}
        >
          {cameraEnabled ? 'Disable Camera' : 'Enable Camera'}
        </button>
      </div>
      <style>{`
        .webcam-component {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .video-preview {
          width: 320px;
          height: 240px;
          border: 1px solid #ccc;
          margin-bottom: 20px;
        }

        .video-preview video {
          width: 100%;
          height: 100%;
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .control-button {
          padding: 10px 20px;
          font-size: 16px;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .control-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default WebcamComponent;
