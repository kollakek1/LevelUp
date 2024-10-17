import { MdArrowBackIosNew, MdSearch } from "react-icons/md";

import { useState, useEffect } from "react";
import { navigate } from "astro/virtual-modules/transitions-router.js";

export default function UserSearch({ active, setUserSearchActive }) {

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchValue === "") {
            setSearchResults([]);
        } else {
            const fetchUsers = async () => {
                try {
                    const res = await fetch(`/api/user/searchuser?query=${encodeURIComponent(searchValue)}`);
                    
                    if (res.ok) {
                        const users = await res.json();
                        setSearchResults(users);
                    } else {
                        console.error("Ошибка при запросе пользователей:", res.status);
                    }
                } catch (err) {
                    console.error("Ошибка сети:", err);
                }
            };

            setUserSearchActive(true);
            fetchUsers();
        }
    }, [searchValue]);

    const handleCreateChat = async (user) => {
        try {
            const res = await fetch("/api/chats/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "private",
                    members: [user._id],
                    chatName: `Chat with ${user.username}`,
                }),
            });

            if (res.ok) {
                const chat = await res.json();
                setUserSearchActive(false);
                navigate(`/app/@me/${chat.id}`);
            } else {
                console.error("Ошибка при создании чата:", res.status);
            }
        } catch (err) {
            console.error("Ошибка сети:", err);
        }
    };

    return (
        <div className={`fixed h-full flex items-center justify-center w-full bg-base-200/70 duration-500 ${active === false ? "lg:opacity-0 max-lg:translate-x-full pointer-events-none" : ""}`}
            onClick={() => setUserSearchActive(false)}>
            <div className={`max-lg:w-full max-lg:h-full p-3 bg-base-200 lg:bg-base-300 rounded-box duration-500 ${active === false ? "lg:scale-0" : ""}`} onClick={(e) => e.stopPropagation()}>
                <div className="flex w-full relative lg:hidden max-lg:mb-2">
                    <MdArrowBackIosNew className="w-7 h-7 my-auto absolute top-1" onClick={() => setUserSearchActive(false)}/>
                    <h2 className="text-3xl font-bold w-full text-center">Поиск</h2>
                </div>
                <label className="input input-bordered flex items-center gap-2 max-lg:mt-4">
                    <input type="text" className="grow" placeholder="Начните поиск по тегу..." onInput={(e) => setSearchValue(e.target.value)}/>
                    <MdSearch className="w-5 h-5"/>
                </label>
                <div className="w-full flex flex-col">
                    {searchResults.map((user) => (
                        <div key={user._id} className="mt-2 w-full h-11 rounded-btn p-2 transition-colors duration-300 flex items-center max-lg:bg-base-100 lg:hover:bg-base-100 cursor-pointer" onClick={() => handleCreateChat(user)}>
                            <div>
                                <p className="text-sm font-medium">{user.username}</p>
                                <p className="text-xs">@{user.login}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}