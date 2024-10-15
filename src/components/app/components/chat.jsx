import { MdArrowBackIos, MdOutlineAddCircle, MdSend } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import Message from "./chat/message";

export default function Chat({ user, active }) {

    const navigate = useNavigate();

    const [messages, setMessages] = useState([
        { id: 1, user: { username: "User1" }, text: "Привет!", time: new Date(Date.now() - 1000 * 60 * 40 * 48) },
        { id: 2, user: { username: "User1" }, text: "Как дела?", time: new Date() },
        { id: 3, user: { username: "User2" }, text: "Все отлично!", time: new Date() },
        { id: 1, user: { username: "User1" }, text: "Привет!", time: new Date(Date.now() - 1000 * 60 * 60 * 48) },
        { id: 1, user: { username: "User1" }, text: "Привет!", time: new Date(Date.now() - 1000 * 60 * 40 * 100) },
        { id: 2, user: { username: "User1" }, text: "Как дела?", time: new Date() },
        { id: 3, user: { username: "User2" }, text: "Все отлично!", time: new Date() },
        { id: 1, user: { username: "User1" }, text: "Привет!", time: new Date(Date.now() - 1000 * 60 * 60 * 240) },
        { id: 1, user: { username: "User1" }, text: "Привет!", time: new Date(Date.now() - 1000 * 60 * 40 * 24) },
        { id: 2, user: { username: "User1" }, text: "Как дела?", time: new Date() },
        { id: 3, user: { username: "User2" }, text: "Все отлично!", time: new Date() },
        { id: 1, user: { username: "User1" }, text: "Привет!", time: new Date(Date.now() - 1000 * 60 * 60 * 24) },
        { id: 1, user: { username: "User1" }, text: "Привет!", time: new Date(Date.now() - 1000 * 60 * 40 * 24) },
        { id: 2, user: { username: "User1" }, text: "Как дела?", time: new Date() },
        { id: 3, user: { username: "User2" }, text: "Все отлично!", time: new Date() },
        { id: 1, user: { username: "User1" }, text: "Привет!", time: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    ]);

    const [content, setContent] = useState('');

    const handleInput = (e) => {
        const text = e.target.innerText.trim();
        setContent(text);
    };

    return (
        <div className={`transition-all duration-500 h-screen w-full max-lg:bg-base-100 absolute lg:p-4 ${active ? "translate-y-0" : "max-lg:translate-x-full lg:translate-y-full pointer-events-none"}`}>
            <div className="w-full h-full relative flex flex-col">
                {/* Header */}
                <div className="w-full bg-base-200 lg:rounded-box p-3 flex items-center justify-between shadow-md">
                    <MdArrowBackIos className="w-7 h-7 lg:hidden" onClick={() => navigate("/app/@me")} />
                    <h2 className="text-sm font-medium">Your Title</h2>
                </div>

                {/* Message container */}
                <div className="flex-grow overflow-y-auto p-2 space-y-2">
                    {messages
                        .sort((a, b) => a.time - b.time)
                        .map((message, index) => (
                            <>
                                {index > 0 && messages[index].time.getDate() !== messages[index - 1].time.getDate() && (
                                    <div className="divider text-center text-sm text-base-content/30">
                                        {new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' }).format(messages[index].time).replace('г.', 'г.')}
                                    </div>
                                )}
                                <Message key={message.id} message={message} compact={index > 0 && messages[index].time - messages[index - 1].time < 120000} />
                            </>
                        ))}
                </div>

                {/* Input field */}
                <div className="sticky bottom-0 bg-base-200 w-full p-2 flex gap-2 rounded-btn justify-between items-center text-lg">
                    <MdOutlineAddCircle className="w-7 h-7 duration-150 hover:text-primary cursor-pointer" />
                    <div
                        contentEditable="plaintext-only"
                        className="w-full min-h-7 max-h-32 lg:max-h-96 bg-base-300 rounded-btn overflow-y-auto outline-none box-border break-words p-2"
                        onInput={handleInput}
                    ></div>
                    <MdSend
                        className={`w-7 h-7 duration-150 hover:text-primary cursor-pointer ${content.length === 0 ? "w-0 h-0" : ""}`}
                    />
                </div>
            </div>
        </div>
    );
}