import { MdPeopleAlt, MdOutlineSettingsSuggest, MdOutlineNewspaper, MdOutlineSentimentVerySatisfied, MdSearch } from "react-icons/md";
import { BsMicMuteFill, BsMicFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function UserList({ user, setUserProfile, userProfile, setUserSearchActive }) {
    const navigate = useNavigate();

    const [chats, setChats] = useState([]);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        fetch("/api/chats/getchats")
            .then(res => res.json())
            .then(data => setChats(data))

    }, []);

    useEffect(() => {
        localStorage.setItem("isMuted", isMuted.toString());
    }, [isMuted]);

    return (
        <>
            <div className="relative w-full lg:w-72">
                <div className="h-screen w-full bg-base-200 p-2">
                    <div className="w-full flex flex-col gap-1">
                        {/* <button className="btn btn-ghost w-full" onClick={() => navigate("/app/@me")}>
                            <MdPeopleAlt className="w-7 h-7"/>
                            Друзья
                        </button> */}
                        <button className="btn btn-ghost w-full">
                            <MdOutlineNewspaper className="w-7 h-7"/>
                            Обновления
                        </button>
                    </div>
                    <div className="flex items-center w-full justify-between mt-3">
                        <p className="text-sm font-medium opacity-70">ЛИЧНЫЕ СООБЩЕНИЯ</p>
                        <MdSearch className="w-4 h-4 duration-100 opacity-70 hover:opacity-100 cursor-pointer" onClick={() => setUserSearchActive(true)}/>
                    </div>

                    <div className="mt-2 w-full flex flex-col gap-1">
                        {chats.map(chat => (
                            <div key={chat._id} className="w-full h-11 rounded-btn p-2 transition-colors duration-300 flex items-center max-lg:bg-base-100 lg:hover:bg-base-100 cursor-pointer" onClick={() => navigate("/app/@me/" + chat._id)}>
                                <div>
                                    <p className="text-sm font-medium">{chat.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 bg-base-300 w-full h-14 p-2 flex justify-between max-lg:hidden">
                    <div>
                        <p className="text-md font-medium">{user.username}</p>
                    </div>
                    <div className="my-auto flex gap-1">
                        <button className="btn btn-ghost btn-sm btn-square tooltip" data-tip="вкл/выкл микрофон" onClick={() => {
                            setIsMuted(!isMuted);
                        }}>
                            {
                                isMuted
                                ? 
                                <BsMicMuteFill className="w-5 h-5 ml-1"/>
                                :
                                <BsMicFill className="w-5 h-5 ml-1"/>
                            }
                        </button>
                        <button className="btn btn-ghost btn-sm btn-square tooltip" data-tip="Настройки" onClick={() => navigate("/app/settings")}>
                            <MdOutlineSettingsSuggest className="w-7 h-7"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 w-full p-2 lg:hidden">
                <div className="bg-base-100 p-3 rounded-box shadow-lg border border-primary/30 flex justify-between items-center">
                    <div onClick={() => setUserProfile(user)}>
                        <MdOutlineSentimentVerySatisfied className={`w-8 h-8 m-auto duration-300 ${userProfile ? 'scale-90' : ''}`}/>
                        <p className="text-[0.6rem] text-base-content/70">Профиль</p>
                    </div>
                    <div onClick={() => navigate("/app/settings")}>
                        <MdOutlineSettingsSuggest className={`w-8 h-8 m-auto duration-300 ${location.pathname.startsWith('/app/settings') ? 'scale-90' : ''}`}/>
                        <p className="text-[0.6rem] text-base-content/70">Настройки</p>
                    </div>

                </div>
            </div>
        </>

    );
}
