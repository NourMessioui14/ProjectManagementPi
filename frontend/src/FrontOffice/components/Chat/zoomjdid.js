import React, { Component } from 'react';

class Zoomjdid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCamera: true,
            localStream: null,
            remoteStream: null,
        };
        this.peerConnection = new RTCPeerConnection();
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
        if (this.peerConnection) {
            this.peerConnection.close();
        }
    }

    init = async () => {
        const { firstCamera } = this.state;
        let localStream = await navigator.mediaDevices.getUserMedia({ video: firstCamera, audio: true });
        let remoteStream = new MediaStream();
        document.getElementById('user-1').srcObject = localStream;
        document.getElementById('user-2').srcObject = remoteStream;

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

    toggleCamera = async () => {
        const { firstCamera } = this.state;
        this.setState({ firstCamera: !firstCamera }, async () => {
            const { firstCamera } = this.state;
            let localStream = await navigator.mediaDevices.getUserMedia({ video: firstCamera, audio: true });
            this.setState({ localStream }, () => {
                const senders = this.peerConnection.getSenders();
                senders.forEach(sender => {
                    this.peerConnection.removeTrack(sender);
                });
                this.state.localStream.getTracks().forEach((track) => {
                    this.peerConnection.addTrack(track, this.state.localStream);
                });
            });
        });
    };

    createOffer = async () => {
        const { peerConnection } = this;
        peerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                document.getElementById('offer-sdp').value = JSON.stringify(peerConnection.localDescription);
            }
        };

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
    };

    createAnswer = async () => {
        const { peerConnection } = this;
        let offer = JSON.parse(document.getElementById('offer-sdp').value);

        peerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                console.log('Adding answer candidate...:', event.candidate);
                document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription);
            }
        };

        await peerConnection.setRemoteDescription(offer);

        let answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
    };

    addAnswer = async () => {
        console.log('Add answer triggered');
        let answer = JSON.parse(document.getElementById('answer-sdp').value);
        if (!this.peerConnection.currentRemoteDescription) {
            this.peerConnection.setRemoteDescription(answer);
        }
    };

    render() {
        const { localStream, remoteStream, firstCamera } = this.state;
        return (
            <div style={styles.container}>
                <div style={styles.videoContainer}>
                    <video id="user-1" style={styles.video} autoPlay playsInline muted srcObject={localStream}></video>
                    <video id="user-2" style={styles.video} autoPlay playsInline srcObject={remoteStream}></video>
                </div>
                <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={this.toggleCamera}>
                        {firstCamera ? 'Disable CAM' : 'Enable CAM'}
                    </button>
                    <button id="create-offer" style={styles.button} onClick={this.createOffer}>
                        Create Offer
                    </button>
                    <button id="create-answer" style={styles.button} onClick={this.createAnswer}>
                        Create Answer
                    </button>
                    <button id="add-answer" style={styles.button} onClick={this.addAnswer}>
                        Add Answer
                    </button>
                </div>
                <div style={styles.textareaContainer}>
                    <textarea id="offer-sdp" style={styles.textarea} rows="4" cols="50"></textarea>
                    <textarea id="answer-sdp" style={styles.textarea} rows="4" cols="50"></textarea>
                </div>
            </div>
        );
    }
}

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
    },
    textarea: {
        width: 'calc(50% - 15px)',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
};

export default Zoomjdid;
