import { useEffect, useState, useRef } from 'react';
import { createLocalAudioTrack, Room, RoomEvent } from 'livekit-client';
import { IoCall } from "react-icons/io5";

export default function Call({ currentChatId, onCallEnd, active }) {
    const [room, setRoom] = useState(null);
    const [connected, setConnected] = useState(false);
    const [participants, setParticipants] = useState([]);
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

        if (active) {
            startCall();
        }

        return () => {
            if (room) {
                room.disconnect();
                setConnected(false);
            }
        };
    }, [currentChatId, active]);

    const handleEndCall = () => {
        if (room) {
            room.localParticipant.setMicrophoneEnabled(false);
            room.disconnect();
            onCallEnd();
        }
    };

    return (
        <div className={`duration-500 h-full bg-base-200 rounded-btn ${active ? '' : 'translate-x-full pointer-events-none w-0'}`}>
            {
                active && (
                    <div className='w-72 h-full p-4 flex items-center justify-center'>
                        <div className='flex flex-col items-center'>
                            {
                                connected ?
                                (
                                    <p>Подключено!</p>
                                )
                                : 
                                (
                                    <>
                                        <p className='font-medium text-xl'>Подключение...</p>
                                        <span className="loading loading-infinity w-24"></span>
                                    </>
                                )
                            }
                            <button className="btn btn-circle btn-error" onClick={handleEndCall}><IoCall className='w-7 h-7 rotate-90'/></button>
                            <audio ref={removeAudioTrack} />
                        </div>
                    </div>
                )
            }
        </div>
    );
}
