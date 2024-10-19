import { useState, useEffect } from "react";

import { MdArrowBackIosNew } from "react-icons/md";

export default function Profile({ user, setUserProfile }) {
    const [prevUser, setPrevUser] = useState(null);
    const [userProfile, setUserProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user !== null) {
            setPrevUser(user);

            const fetchUserProfile = async () => {
                setLoading(true);
                try {
                    const res = await fetch(`/api/user/getuser/${user.id}`);
                    const data = await res.json();
                    setUserProfileData(data);
                } catch (error) {
                    console.error("Ошибка при получении профиля:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserProfile();
        }
    }, [user]);

    return (
        <>
            <div className={`fixed h-full flex items-center justify-center w-full bg-base-200/70 duration-500 ${user === null ? "lg:opacity-0 max-lg:translate-x-full pointer-events-none" : ""}`}
                onClick={() => setUserProfile(null)}>
                <div className={`max-lg:w-full max-lg:h-full p-3 bg-base-200 lg:bg-base-300 rounded-box duration-500 ${user === null ? "lg:scale-0" : ""}`} onClick={(e) => e.stopPropagation()}>
                    <div className="flex w-full relative lg:hidden max-lg:mb-2">
                        <MdArrowBackIosNew className="w-7 h-7 my-auto absolute top-1" onClick={() => setUserProfile(null)} />
                        <h2 className="text-3xl font-bold w-full text-center">
                            {prevUser?.username}
                        </h2>
                    </div>
                    {!loading && userProfile && (
                        <div className="text-center mt-4">
                            <p>Имя: {userProfile.username}</p>
                            {/* <p>Email: {userProfile.email}</p> */}
                        </div>
                    )}
                    {
                        loading && (
                            <div className="w-full h-full flex justify-center items-center">
                                <span className="loading loading-infinity w-16"></span>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}

