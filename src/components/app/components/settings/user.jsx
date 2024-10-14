import { MdArrowBackIosNew } from "react-icons/md";

import { useNavigate } from "react-router-dom";

export default function User({ user, active }) {
    const navigate = useNavigate();

    return (
        <div className={`flex flex-col w-full h-full absolute transition-all duration-500 ${active ? "" : "lg:scale-0 lg:opacity-0 max-lg:translate-x-full pointer-events-none"}`}>
            <div className="bg-base-300 rounded-box h-full w-full p-8">
                <div className="flex w-full relative lg:hidden">
                    <MdArrowBackIosNew className="w-7 h-7 my-auto absolute top-1" onClick={() => navigate("/app/settings")}/>
                    <h2 className="text-3xl font-bold w-full text-center">Пользователь</h2>
                </div>
            </div>
        </div>
    );
}