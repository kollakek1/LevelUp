import { MdArrowBackIos, MdOutlineAddCircle, MdSend } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from 'react';
import Message from "./chat/message";
import Call from "./chat/call";

export default function Chat({ user, active, setUserProfile }) {
    const navigate = useNavigate();
    const [chats, setChats] = useState({});
    const [currentChatId, setCurrentChatId] = useState(null);
    const [inCall, setInCall] = useState(false);
    const [callChatId, setCallChatId] = useState(null);
    const [content, setContent] = useState('');
    const chatMessagesRef = useRef(null);
    const firstUpdate = useRef(true);

    const handleInput = (e) => setContent(e.target.innerText.trim());

    const handleSendMessage = useCallback(() => {
        if (!content.length) return;

        const newMessage = {
            chatId: currentChatId,
            message: content.trim(),
            time: new Date(),
            user: { id: user.id, username: user.username }
        };

        setChats((prevChats) => {
            const updatedChat = {
                ...prevChats[currentChatId],
                messages: [...prevChats[currentChatId]?.messages, newMessage],
            };
            return { ...prevChats, [currentChatId]: updatedChat };
        });

        fetch(`/api/chats/message/sendmessage`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ message: content, chatId: currentChatId })
        });

        setContent('');
        document.getElementById('chat-input').innerText = '';
    }, [content, currentChatId, user]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const loadChat = useCallback(async (chatId) => {
        if (chats[chatId]?.messages?.length) {
            setCurrentChatId(chatId);
            return;
        }

        try {
            const res = await fetch(`/api/chats/getchat/${chatId}`, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) {
                console.error('Failed to load chat:', res.statusText);
                navigate("/app/@me");
            }

            const data = await res.json();
            if (data && Object.keys(data).length > 0) {
                setChats(prevChats => ({ ...prevChats, [chatId]: data }));
                setCurrentChatId(chatId);
            } else {
                console.error('Empty or invalid data:', data);
            }
        } catch (error) {
            console.error('Failed to load chat:', error);
            navigate("/app/@me");
        }
    }, [chats, navigate]);

    useEffect(() => {
        const chatId = window.location.pathname.split('/').pop();
        if (active) {
            loadChat(chatId);
        }
    }, [active, loadChat]);

    useEffect(() => {
        if (currentChatId && firstUpdate.current) {
            const chatMessages = chatMessagesRef.current;
            chatMessages.scrollTop = chatMessages.scrollHeight;
            firstUpdate.current = false;
        }
    }, [currentChatId]);

    useEffect(() => {
        if (currentChatId && active) {
            setTimeout(() => {
                document.getElementById('chat-input').focus();
            }, 500);
        }
    }, [currentChatId]);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [chats[currentChatId]?.messages?.length]);

    const handleStartCall = () => {
        if (!inCall) {
            setInCall(true);
            setCallChatId(currentChatId);
        }
    };

    const handleEndCall = () => {
        setInCall(false);
        setCallChatId(null);
    };

    useEffect(() => {
        const newChatId = window.location.pathname.split('/').pop();
        if (newChatId !== callChatId) {
            if (inCall) {
                console.log("Звонок уже идёт в другом чате, завершите звонок перед сменой чата.");
            } else {
                setCurrentChatId(newChatId);
            }
        }
    }, [callChatId, currentChatId, inCall]);

    

    return (
        <>
            <div className={`transition-all duration-500 h-screen w-full max-lg:bg-base-100 absolute lg:p-4 ${active ? "translate-y-0" : "max-lg:translate-x-full lg:translate-y-full pointer-events-none"}`}>
                <div className={`w-full h-full flex ${inCall ? "gap-4" : ""}`}>
                    <div className="w-full h-full relative flex flex-col">
                        {/* Header */}
                        <div className="w-full bg-base-200 lg:rounded-box p-3 flex items-center justify-between shadow-md">
                            <MdArrowBackIos className="w-7 h-7 lg:hidden" onClick={() => navigate("/app/@me")} />
                            <h2 
                                className="text-sm font-medium cursor-pointer" 
                                onClick={() => {
                                    const otherMemberId = chats[currentChatId]?.members?.find(memberId => memberId !== user.id);
                                    setUserProfile({ username: chats[currentChatId]?.name, id: otherMemberId });
                                }}
                            >
                                {chats[currentChatId]?.name}
                            </h2>
                            <FaPhone className={`w-5 h-5 cursor-pointer duration-500 ${inCall ? "opacity-0 pointer-events-none" : ""}`} onClick={handleStartCall}/>
                        </div>

                        {/* Message container */}
                        <div ref={chatMessagesRef} className="flex-grow overflow-y-auto p-2 chat-messages">
                            {chats[currentChatId]?.messages?.sort((a, b) => new Date(a.time) - new Date(b.time)).map((message, index) => (
                                <div key={message._id}>
                                    {index > 0 && new Date(chats[currentChatId].messages[index].time).getDate() !== new Date(chats[currentChatId].messages[index - 1].time).getDate() && (
                                        <div className="divider text-center text-sm text-base-content/30">
                                            {new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(chats[currentChatId].messages[index].time))}
                                        </div>
                                    )}
                                    <Message 
                                        message={message} 
                                        setUserProfile={setUserProfile} 
                                        compact={index > 0 && 
                                            new Date(chats[currentChatId].messages[index].time) - new Date(chats[currentChatId].messages[index - 1].time) < 120000 &&
                                            chats[currentChatId].messages[index].user.id === chats[currentChatId].messages[index - 1].user.id}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Input field */}
                        <div className="sticky bottom-0 bg-base-200 w-full p-2 flex gap-2 rounded-btn justify-between items-center text-lg">
                            <MdOutlineAddCircle className="w-7 h-7 duration-150 hover:text-primary cursor-pointer" />
                            <div
                                id="chat-input"
                                contentEditable="plaintext-only"
                                className="w-full min-h-7 max-h-32 lg:max-h-96 bg-base-300 rounded-btn overflow-y-auto outline-none box-border break-words p-2"
                                placeholder="Введите сообщение..."
                                onInput={handleInput}
                                onKeyDown={handleKeyDown}
                            ></div>
                            <MdSend
                                className={`w-7 h-7 duration-150 hover:text-primary cursor-pointer ${content.length === 0 ? "w-0 h-0" : ""}`}
                                onClick={handleSendMessage}
                            />
                        </div>
                    </div>
                    <Call currentChatId={callChatId} onCallEnd={handleEndCall} active={inCall} />
                </div>
            </div>
        </>
    );
}
