import React, { useState, useEffect } from 'react';
import AgoraRTM from 'agora-rtm-sdk';


const VideoChatComponent = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);

  useEffect(() => {
    let client;
    let channel;
    let peerConnection;

    const APP_ID = "d21340ac17f64a90a95f267118ff6014";
    const servers = {
      iceServers:[
          {
              urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
          }
      ]
    };

    const constraints = {
      video:{
          width:{min:640, ideal:1920, max:1920},
          height:{min:480, ideal:1080, max:1080},
      },
      audio:true
    };

    const init = async () => {
      try {
        client = await AgoraRTM.createInstance(APP_ID);
        await client.login({ uid: String(Math.floor(Math.random() * 10000)) });

        channel = client.createChannel("roomId");
        await channel.join();

        channel.on('MemberJoined', handleUserJoined);
        channel.on('MemberLeft', handleUserLeft);
        client.on('MessageFromPeer', handleMessageFromPeer);

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setLocalStream(stream);
      } catch (error) {
        console.error('Initialization Error:', error);
      }
    };

    init();

    const handleUserJoined = async (MemberId) => {
      console.log('A new user joined the channel:', MemberId);
      createOffer(MemberId);
    };

    const handleUserLeft = (MemberId) => {
      setRemoteStream(null);
    };

    const handleMessageFromPeer = async (message, MemberId) => {
      message = JSON.parse(message.text);

      if(message.type === 'offer'){
          createAnswer(MemberId, message.offer);
      }

      if(message.type === 'answer'){
          addAnswer(message.answer);
      }

      if(message.type === 'candidate'){
          if(peerConnection){
              peerConnection.addIceCandidate(message.candidate);
          }
      }
    };

    const createPeerConnection = async (MemberId) => {
      peerConnection = new RTCPeerConnection(servers);

      setRemoteStream(new MediaStream());
      
      if(!localStream){
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setLocalStream(stream);
      }

      localStream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, localStream);
      });

      peerConnection.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
              remoteStream.addTrack(track);
          });
      };

      peerConnection.onicecandidate = async (event) => {
          if(event.candidate){
              client.sendMessageToPeer({text:JSON.stringify({'type':'candidate', 'candidate':event.candidate})}, MemberId);
          }
      };
    };

    const createOffer = async (MemberId) => {
      await createPeerConnection(MemberId);

      let offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      client.sendMessageToPeer({text:JSON.stringify({'type':'offer', 'offer':offer})}, MemberId);
    };

    const createAnswer = async (MemberId, offer) => {
      await createPeerConnection(MemberId);

      await peerConnection.setRemoteDescription(offer);

      let answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      client.sendMessageToPeer({text:JSON.stringify({'type':'answer', 'answer':answer})}, MemberId);
    };

    const addAnswer = async (answer) => {
      if(!peerConnection.currentRemoteDescription){
          peerConnection.setRemoteDescription(answer);
      }
    };

    const toggleCamera = async () => {
      let videoTrack = localStream.getTracks().find(track => track.kind === 'video');

      if(videoTrack.enabled){
          videoTrack.enabled = false;
          setCameraEnabled(false);
      } else {
          videoTrack.enabled = true;
          setCameraEnabled(true);
      }
    };

    const toggleMic = async () => {
      let audioTrack = localStream.getTracks().find(track => track.kind === 'audio');

      if(audioTrack.enabled){
          audioTrack.enabled = false;
          setMicEnabled(false);
      } else {
          audioTrack.enabled = true;
          setMicEnabled(true);
      }
    };

    return () => {
      if (channel) {
        channel.leave();
      }
      if (client) {
        client.logout();
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <script src="agora-rtm-2.1.9.min.js"></script>

      <div id="videos">
        <video className="video-player" id="user-1" autoPlay playsInline></video>
        <video className="video-player" id="user-2" autoPlay playsInline></video>
      </div>
      <div id="controls">
        <div className="control-container" id="camera-btn" >
          <img src="icons/camera.png" alt="Camera" />
        </div>
        <div className="control-container" id="mic-btn" >
          <img src="icons/mic.png" alt="Microphone" />
        </div>
        <a href="lobby.html">
          <div className="control-container" id="leave-btn">
            <img src="icons/phone.png" alt="Leave" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default VideoChatComponent;
