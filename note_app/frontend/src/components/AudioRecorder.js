// frontend/src/components/AudioRecorder.js
import React, { useState } from 'react';

const AudioRecorder = ({ onSave }) => {
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    let mediaRecorder;
    let audioChunks = [];

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        setRecording(true);

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
            onSave(audioBlob);
        };
    };

    const stopRecording = () => {
        mediaRecorder.stop();
        setRecording(false);
    };

    return (
        <div>
            {recording ? (
                <button onClick={stopRecording}>Stop Recording</button>
            ) : (
                <button onClick={startRecording}>Start Recording</button>
            )}
            {audioUrl && <audio src={audioUrl} controls />}
        </div>
    );
};

export default AudioRecorder;

