import React, { useRef, useEffect, useState } from 'react';

const WebcamComponent2 = () => {
  const videoRef = useRef(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [localStream, setLocalStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: cameraEnabled });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setLocalStream(stream); // Update localStream state
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    startWebcam();

    return () => {
      if (localStream) {
        const tracks = localStream.getTracks();
        tracks.forEach(track => {
          track.stop();
        });
      }
    };
  }, [cameraEnabled]);

  useEffect(() => {
    const createPeerConnection = async () => {
      const configuration = {};
      const pc = new RTCPeerConnection(configuration);
      if (localStream) {
        pc.addStream(localStream); // Pass localStream to addStream
      }

      pc.onicecandidate = event => {
        if (event.candidate) {
          console.log('Local ICE candidate:', event.candidate);
        }
      };

      setPeerConnection(pc);
    };

    createPeerConnection();

    return () => {
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, [localStream]);

  const toggleCamera = () => {
    setCameraEnabled(prev => !prev);
  };

  const createOffer = async () => {
    try {
      const offer = await peerConnection.createOffer();
      console.log('Local offer SDP:', offer);
      await peerConnection.setLocalDescription(offer);
    } catch (error) {
      console.error('Error creating offer:', error);
    }
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
        <button className="control-button" onClick={createOffer}>
          Create Offer
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

export default WebcamComponent2;
