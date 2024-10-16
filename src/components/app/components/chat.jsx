import { MdArrowBackIos, MdOutlineAddCircle, MdSend } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import Message from "./chat/message";

export default function Chat({ user, active, setUserProfile }) {

    const navigate = useNavigate();

    const [chats, setChats] = useState({});
    const [currentChatId, setCurrentChatId] = useState(null);

    const [content, setContent] = useState('');

    const handleInput = (e) => {
        const text = e.target.innerText.trim();
        setContent(text);
    };

    const handleSendMessage = () => {
        if (content.length === 0) {
            return;
        }

        const newMessage = {
            chatId: currentChatId,
            message: content.trim(),
            time: new Date(),
            user: {
                id: user.id,
                username: user.username
            }
        };
        setChats((prevChats) => {
            const updatedChat = {
                ...prevChats[currentChatId],
                messages: [...prevChats[currentChatId].messages, newMessage],
            };

            return {
                ...prevChats,
                [currentChatId]: updatedChat,
            };
        });

        fetch(`/api/chats/message/sendmessage`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                message: content,
                chatId: currentChatId
            }),
        });

        setContent('');
        document.getElementById('chat-input').innerText = '';
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };


    const loadChat = async () => {
        const chatId = window.location.pathname.split('/').pop();
    
        try {
            const res = await fetch(`/api/chats/getchat/${chatId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!res.ok) {
                console.error('Failed to load chat:', res.statusText);
                navigate("/app/@me");
            }
    
            const data = await res.json();
    
            if (data && Object.keys(data).length > 0) {
                setChats(prevChats => ({
                    ...prevChats,
                    [chatId]: data
                }));
            } else {
                console.error('Empty or invalid data:', data);
            }
    
        } catch (error) {
            console.error('Failed to load chat:', error);
            navigate("/app/@me");
        }
    
    };


    useEffect(() => {
        if (window.location.pathname.startsWith('/app/@me/')) {

            setCurrentChatId(window.location.pathname.split('/').pop());
            loadChat();

        }
        const elem = document.querySelector('.chat-messages');
        elem.scrollTop = elem.scrollHeight;
    }, [active]);

    return (
        <>  
            <div className={`transition-all duration-500 h-screen w-full max-lg:bg-base-100 absolute lg:p-4 ${active ? "translate-y-0" : "max-lg:translate-x-full lg:translate-y-full pointer-events-none"}`}>
                <div className="w-full h-full relative flex flex-col">
                    {/* Header */}
                    <div className="w-full bg-base-200 lg:rounded-box p-3 flex items-center justify-between shadow-md">
                        <MdArrowBackIos className="w-7 h-7 lg:hidden" onClick={() => navigate("/app/@me")} />
                        <h2 className="text-sm font-medium cursor-pointer" onClick={() => setUserProfile({username: "TestUser"})}>TestUser</h2>
                    </div>

                    {/* Message container */}
                    <div className="flex-grow overflow-y-auto p-2 chat-messages">
                        {chats[currentChatId]?.messages
                        .sort((a, b) => new Date(a.time) - new Date(b.time)) // Сравнение дат
                        .map((message, index) => (
                            <div key={`${message._id}-${index}`}>
                                {index > 0 && new Date(chats[currentChatId].messages[index].time).getDate() !== new Date(chats[currentChatId].messages[index - 1].time).getDate() && (
                                    <div className="divider text-center text-sm text-base-content/30">
                                        {new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(chats[currentChatId].messages[index].time)).replace('г.', 'г.')}
                                    </div>
                                )}
                                <Message key={message._id} setUserProfile={setUserProfile} message={message} compact={index > 0 && new Date(chats[currentChatId].messages[index].time) - new Date(chats[currentChatId].messages[index - 1].time) < 120000} />
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
                            disabled={content.length === 0}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}