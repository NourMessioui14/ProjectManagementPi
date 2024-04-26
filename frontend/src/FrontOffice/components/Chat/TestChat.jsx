import React, { useState, useEffect } from 'react';

const WebRTCComponent = () => {
    let peerConnection = new RTCPeerConnection()
let localStream;
let remoteStream;

const [firstCamera , setFirstCamera] = useState(true)
    useEffect(() => {
        const init = async () => {
            localStream = await navigator.mediaDevices.getUserMedia({video:firstCamera, audio:false})
            remoteStream = new MediaStream()
            document.getElementById('user-1').srcObject = localStream
            document.getElementById('user-2').srcObject = remoteStream
        
            localStream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, localStream);
            });
        
            peerConnection.ontrack = (event) => {
                event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
                });
            };
        };

        init();

        // Clean up function
        return () => {
            if (peerConnection) {
                peerConnection.close();
            }
        };
    }, [firstCamera]);

    let createOffer = async () => {


        peerConnection.onicecandidate = async (event) => {
            //Event that fires off when a new offer ICE candidate is created
            if(event.candidate){
                document.getElementById('offer-sdp').value = JSON.stringify(peerConnection.localDescription)
            }
        };
    
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
    }
    
    let createAnswer = async () => {
    
        let offer = JSON.parse(document.getElementById('offer-sdp').value)
    
        peerConnection.onicecandidate = async (event) => {
            //Event that fires off when a new answer ICE candidate is created
            if(event.candidate){
                console.log('Adding answer candidate...:', event.candidate)
                document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription)
            }
        };
    
        await peerConnection.setRemoteDescription(offer);
    
        let answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer); 
    }
    
    let addAnswer = async () => {
        console.log('Add answer triggerd')
        let answer = JSON.parse(document.getElementById('answer-sdp').value)
        console.log('answer:', answer)
        if (!peerConnection.currentRemoteDescription){
            peerConnection.setRemoteDescription(answer);
        }
    }
    return (
        <div style={styles.container}>
            <div style={styles.videoContainer}>
                <video id="user-1" style={styles.video} autoPlay playsInline muted srcObject={localStream}></video>
                <video id="user-2" style={styles.video} autoPlay playsInline srcObject={remoteStream}></video>

            </div>
            <div style={styles.buttonContainer}>
            <button   style={styles.button} onClick={()=>setFirstCamera(prev=>!prev)}>Enable CAM</button>

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
    },
    textarea: {
        width: 'calc(50% - 15px)',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
};

export default WebRTCComponent;
