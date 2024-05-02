import React, { Component } from "react";
import micimage from "./mic.png";
import cameraimage from "./camera.png";
import phoneimage from "./phone.png";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("ws://localhost:5001/");

class Zoomjdid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCamera: true,
      localStream: null,
      remoteStream: null,
      cameraBtnActive: true,
      micBtnActive: true,
      createAnswer: null,
      createOffer: null,
      getAnswer: null,
      getOffer: null,
    };
    this.peerConnection = new RTCPeerConnection();
  }

  componentDidMount() {
    this.init();
    // Initial background color for buttons
    document.getElementById("camera-btn").style.backgroundColor =
      "rgb(179, 102, 249, .9)";
    document.getElementById("mic-btn").style.backgroundColor =
      "rgb(179, 102, 249, .9)";

    socket.on("connect", () => {
      console.log("conncected");
    });

    socket.on("offer", async (offer) => {
      const { createOffer ,createAnswer } = this.state;

      if (offer != createOffer) {
      const answer =  await  this.createAnswer(JSON.parse(offer));
        setTimeout(() => {
          socket.emit('answer' , answer)

        }, 2000);
      }
    });

    socket.on("answer", (answer) => {
      const {  createAnswer } = this.state;
      if (answer != createAnswer) {
        console.log("answer", answer)

        setTimeout(() => {
          console.log(typeof answer)
          this.addAnswer(answer);
 
        }, 2000);
      }
    });
  }

  componentWillUnmount() {
    if (this.peerConnection) {
      this.peerConnection.close();
    }
  }

  init = async () => {
    const { firstCamera } = this.state;
    let localStream = await navigator.mediaDevices.getUserMedia({
      video: firstCamera,
      audio: true,
    });
    let remoteStream = new MediaStream();
    document.getElementById("user-1").srcObject = localStream;
    document.getElementById("user-2").srcObject = remoteStream;

    localStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, localStream);
    });

    this.peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    this.setState({ localStream, remoteStream });
  };
  ////
  toggleCamera = async () => {
    const { localStream, cameraBtnActive } = this.state;
    let videoTrack = localStream
      .getTracks()
      .find((track) => track.kind === "video");

    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      document.getElementById("camera-btn").style.backgroundColor =
        "rgb(255, 80, 80)";
    } else {
      videoTrack.enabled = true;
      document.getElementById("camera-btn").style.backgroundColor =
        "rgb(179, 102, 249, .9)";
    }
    this.setState({ cameraBtnActive: !cameraBtnActive });
  };

  toggleMic = async () => {
    const { localStream, micBtnActive } = this.state;
    let audioTrack = localStream
      .getTracks()
      .find((track) => track.kind === "audio");

    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      document.getElementById("mic-btn").style.backgroundColor =
        "rgb(255, 80, 80)";
    } else {
      audioTrack.enabled = true;
      document.getElementById("mic-btn").style.backgroundColor =
        "rgb(179, 102, 249, .9)";
    }
    this.setState({ micBtnActive: !micBtnActive });
  };

  //////

  createOffer = async () => {
    const { peerConnection } = this;

    const offer = await peerConnection.createOffer();

    this.setState({ createOffer: JSON.stringify(offer) });
    socket.emit("offer", JSON.stringify(offer));

    await peerConnection.setLocalDescription(offer);

  };

  createAnswer = async (offer) => {
    const { peerConnection } = this;


    await peerConnection.setRemoteDescription(offer);

    let answer = await peerConnection.createAnswer();

    this.setState({ createAnswer: JSON.stringify(answer) });
    await peerConnection.setLocalDescription(answer);

    return JSON.stringify(answer)
  };

  addAnswer = async (theAnswer) => {
     let answer = JSON.parse(theAnswer);
    if (!this.peerConnection.currentRemoteDescription) {
       this.peerConnection.setRemoteDescription(answer);
    }
  };

  render() {
    const { localStream, remoteStream } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.videoContainer}>
          <video
            id="user-1"
            style={{ ...styles.video, border: "2px solid #000" }}
            autoPlay
            playsInline
            muted
            srcObject={localStream}
          ></video>
          <video
            id="user-2"
            style={{ ...styles.video, border: "2px solid #000" }}
            autoPlay
            playsInline
            srcObject={remoteStream}
          ></video>
        </div>
        <div id="controls" style={styles.buttonContainer}>
          <div
            className="control-container"
            id="camera-btn"
            onClick={this.toggleCamera}
            style={styles.button}
          >
            <img src={cameraimage} alt="Camera" style={styles.buttonIcon} />
          </div>
          <div
            className="control-container"
            id="mic-btn"
            onClick={this.toggleMic}
            style={styles.button}
          >
            <img src={micimage} alt="Microphone" style={styles.buttonIcon} />
          </div>
          <Link to="/myvideocalls" style={styles.linkButton}>
            <img src={phoneimage} alt="Phone" style={styles.buttonIcon} />
          </Link>
        </div>

        <div>
          <button
            id="create-offer"
            style={styles.button}
            onClick={this.createOffer}
          >
            Join
          </button>
          

          
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  videoContainer: {
    display: "flex",
    marginBottom: "20px",
  },
  video: {
    width: "400px",
    height: "300px",
    margin: "0 10px",
  },
  buttonContainer: {
    display: "flex",
    gap: "1em",
    marginBottom: "20px",
  },
  button: {
    padding: "10px",
    backgroundColor: "rgb(179, 102, 249, .9)",
    borderRadius: "50%",
    cursor: "pointer",
    outline: "none",
  },
  buttonIcon: {
    width: "24px",
    height: "24px",
  },
  linkButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    textDecoration: "none",
  },
};

export default Zoomjdid;
