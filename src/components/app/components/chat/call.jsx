import { useEffect, useState, useRef } from 'react';
import { createLocalAudioTrack, Room, RoomEvent } from 'livekit-client';
import { AudioTrack } from '@livekit/components-react';

export default function Call({ currentChatId, onCallEnd }) {
    const [room, setRoom] = useState(null);
    const [connected, setConnected] = useState(false);
    const [participants, setParticipants] = useState([]);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const removeAudioTrack = useRef(null);

    useEffect(() => {
        const startCall = async () => {
            try {

                const response = await fetch(`/api/chats/startcall/${currentChatId}`);
                const token = await response.text();

                const room = new Room({
                    adaptiveStream: true,
                    dynacast: true,
                });

                setRoom(room);

                room.on(RoomEvent.ParticipantConnected, (participant) => {
                    console.log(`${participant.identity} подключился`);
                    setParticipants((prev) => [...prev, participant]);
                });

                room.on(RoomEvent.ParticipantDisconnected, (participant) => {
                    console.log(`${participant.identity} отключился`);
                    setParticipants((prev) => prev.filter((p) => p !== participant));
                });

                room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
                    if (track.kind === 'video' && remoteVideoRef.current) {
                        track.attach(remoteVideoRef.current);
                    }
                });

                const audioTrack = await createLocalAudioTrack({
                    echoCancellation: true,
                    noiseSuppression: true,
                });

                await room.connect('wss://levelup-y8qpp7fi.livekit.cloud', token);

                const audioPublication = await room.localParticipant.publishTrack(audioTrack);

                room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
                    if (track.kind === 'video' && remoteVideoRef.current) {
                        track.attach(remoteVideoRef.current);
                    } else if (track.kind === 'audio') {
                        track.attach(removeAudioTrack.current);
                    }
                });
                
                setConnected(true);

            } catch (error) {
                console.error('Ошибка при подключении к звонку:', error);
                onCallEnd();
            }
        };

        startCall();

        return () => {
            if (room) {
                room.disconnect();
                setConnected(false);
            }
        };
    }, [currentChatId]);

    const handleEndCall = () => {
        if (room) {
            room.disconnect();
            onCallEnd();
        }
    };

    return (
        <div className="call-container">
            {connected ? (
                <>
                    <video ref={localVideoRef} autoPlay muted />
                    <video ref={remoteVideoRef} autoPlay />
                    <audio ref={removeAudioTrack} autoPlay/>
                    <button onClick={handleEndCall} className="btn btn-danger">Завершить звонок</button>
                </>
            ) : (
                <p>Подключение...</p>
            )}
        </div>
    );
}
