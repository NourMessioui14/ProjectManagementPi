import React, { useRef, useEffect, useState } from 'react';

const Zoomjdid = () => {
  const videoRef = useRef(null);
  const otherContainerRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  let peerConnection;

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
    };
  }, []);

  const createPeerConnection = () => {
    peerConnection = new RTCPeerConnection();
    peerConnection.ontrack = handleTrackEvent;
  };

  const handleTrackEvent = (event) => {
    setRemoteStream(event.streams[0]);
  };

  const createOffer = async () => {
    createPeerConnection();

    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      document.getElementById('offer-sdp').value = JSON.stringify(peerConnection.localDescription);
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const createAnswer = async () => {
    createPeerConnection();

    try {
      const offer = JSON.parse(document.getElementById('offer-sdp').value);
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription);
    } catch (error) {
      console.error('Error creating answer:', error);
    }
  };

  const addAnswer = async () => {
    let answer = JSON.parse(document.getElementById('answer-sdp').value)
    console.log('answer:', answer)
    if (!peerConnection.currentRemoteDescription){
        peerConnection.setRemoteDescription(answer);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.videoContainer}>
        <video id="user-1" ref={videoRef} style={styles.video} autoPlay playsInline muted srcObject={localStream}></video>
        <video id="user-2" ref={otherContainerRef} style={styles.video} autoPlay playsInline srcObject={remoteStream}></video>
      </div>
      <div style={styles.buttonContainer}>
        <button id="create-offer" style={styles.button} onClick={createOffer}>Create Offer</button>
        <button id="create-answer" style={styles.button} onClick={createAnswer}>Create Answer</button>
        <button id="add-answer" style={styles.button} onClick={addAnswer}>Add Answer</button>
      </div>
      <div style={styles.textareaContainer}>
        <textarea id="offer-sdp" style={styles.textarea} rows="4" cols="50"></textarea>
        <textarea id="answer-sdp" style={styles.textarea} rows="4" cols="50"></textarea>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  videoContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  video: {
    width: '300px',
    height: '200px',
    margin: '0 10px',
  },
  buttonContainer: {
    marginBottom: '20px',
  },
  button: {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
  },
  textareaContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  textarea: {
    width: 'calc(50% - 15px)',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
};

export default Zoomjdid;
