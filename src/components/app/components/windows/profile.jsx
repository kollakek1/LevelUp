import { MdArrowBackIosNew } from "react-icons/md";

import { useEffect, useState } from "react";

export default function Profile({ user, setUserProfile }) {

    const [prevUser, setPrevUser] = useState(null);

    useEffect(() => {
        if (user !== null) {
            setPrevUser(user);
        }
    }, [user]);

    return (
        <>
            <div className={`fixed h-full flex items-center justify-center w-full bg-base-200/70 duration-500 ${user === null ? "lg:opacity-0 max-lg:translate-x-full pointer-events-none" : ""}`}
                onClick={() => setUserProfile(null)}>
                <div className={`max-lg:w-full max-lg:h-full p-3 bg-base-300 rounded-box duration-75 ${user === null ? "lg:scale-0" : ""}`} onClick={(e) => e.stopPropagation()}>
                    <div className="flex w-full relative lg:hidden max-lg:mb-2">
                        <MdArrowBackIosNew className="w-7 h-7 my-auto absolute top-1" onClick={() => setUserProfile(null)} />
                        {/* Используем prevUser для отображения данных */}
                        <h2 className="text-3xl font-bold w-full text-center">@{prevUser?.username}</h2>
                    </div>
                </div>
            </div>
        </>
    );
}
