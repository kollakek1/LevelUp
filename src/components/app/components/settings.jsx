import { useNavigate } from "react-router-dom";

import { MdExitToApp } from "react-icons/md";

export default function Settings({ user, active }) {

    const navigate = useNavigate();

    return (
        <div className={`transition-all duration-500 h-screen w-full max-lg:bg-base-200 max-lg:absolute p-8 ${active ? "translate-y-0" : "-translate-y-full pointer-events-none"}`}>
            <div className="w-full h-full lg:bg-base-200 rounded-box shadow-md lg:p-4 flex">
                <div className="w-full lg:w-64 h-full flex flex-col justify-between">
                    <button className="btn btn-ghost w-full" onClick={() => navigate(-1)}>
                        Назад
                    </button>
                    <button className="btn w-full btn-outline btn-error" onClick={() => {fetch("/api/sign/logout", {method: "POST"}).then(() => window.location.reload());}}>
                        <MdExitToApp className="w-7 h-7"/> Выйти
                    </button>
                </div>
            </div>
        </div>
    );
}