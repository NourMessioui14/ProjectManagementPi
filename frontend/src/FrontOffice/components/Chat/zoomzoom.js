import React, { useRef, useEffect, useState } from 'react';
import AgoraRTM from 'agora-rtm-sdk'; // Import Agora RTM SDK

const Zoomjdid = () => {
  const videoRef = useRef(null);
  const otherContainerRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  let peerConnection;

  // Agora RTM configuration
  const APP_ID = 'd21340ac17f64a90a95f267118ff6014';
  const TOKEN = null; // Replace null with your token if authentication is required

  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const servers = {
    iceServers:[
      {
        urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
      }
    ]
  };

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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
      if (localStream) {
        localStream.getTracks().forEach(track => {
          track.stop();
        });
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => {
          track.stop();
        });
      }
      if (peerConnection) {
        peerConnection.close();
      }
      if (channel) {
        channel.leave();
      }
      if (client) {
        client.logout();
        client.destroy();
      }
    };
  }, []);

  const createOffer = async () => {
    try {
      peerConnection = new RTCPeerConnection(servers);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      peerConnection.addStream(stream);
      setLocalStream(stream);

      peerConnection.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (otherContainerRef.current) {
          otherContainerRef.current.srcObject = event.streams[0];
        }
      };

      // Log ICE candidates
      peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
          console.log('ICE candidate:', event.candidate);
        }
      };

      const offer = await peerConnection.createOffer();
      console.log('Offer created:', offer); // Console log lors de la création de l'offre
      await peerConnection.setLocalDescription(offer);

      // Initialize Agora RTM client instance
      const agoraClient = await AgoraRTM.createInstance(APP_ID);
      setClient(agoraClient);

      // Login to Agora RTM
      await agoraClient.login({ uid: getRandomUUID(), token: TOKEN });
      console.log('done login')

      // Create and join the channel
      const agoraChannel = agoraClient.createChannel('main');
      await agoraChannel.join();
      console.log('done join chanel')
      setChannel(agoraChannel);

      // Listen for member joined event
      agoraChannel.on('memberJoined', (memberId) => {
        console.log(`User ${memberId} joined the channel.`);
      });
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  // Appel de la fonction createOffer dès l'ouverture du composant
  useEffect(() => {
    createOffer();
  }, []);

  // Generate a random UUID
  const getRandomUUID = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  return (

    <div className="webcam-container">
      <div className="video-preview">
        <video ref={videoRef} autoPlay playsInline muted />
      </div>
      <div className="other-container">
        <video ref={otherContainerRef} autoPlay playsInline muted />
      </div>
      {/* Retiré le bouton, la création de l'offre est désormais appelée automatiquement */}
      <style>{`
        .webcam-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .video-preview, .other-container {
          width: 320px;
          height: 240px;
          border: 1px solid black;
          margin-bottom: 20px;
        }

        .video-preview video, .other-container video {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Zoomjdid;
