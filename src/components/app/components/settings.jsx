import { useNavigate } from "react-router-dom";

import { MdExitToApp, MdArrowBackIosNew, MdWindow, MdEmojiEmotions, MdOutlineBugReport } from "react-icons/md";

import User from "./settings/user";
import Ui from "./settings/ui";
import Debug from "./settings/debug";
export default function Settings({ user, active }) {

    const navigate = useNavigate();

    return (
        <div className={`transition-all duration-500 h-screen w-full max-lg:bg-base-200 absolute p-8 ${active ? "translate-y-0" : "-translate-y-full pointer-events-none"}`}>
            <div className="w-full h-full lg:bg-base-200 rounded-box lg:shadow-md lg:p-4 flex gap-4">
                <div className="w-full lg:w-64 h-full flex flex-col gap-4">
                    <div className="flex w-full relative lg:hidden">
                        <MdArrowBackIosNew className="w-7 h-7 my-auto absolute top-1" onClick={() => navigate("/app")}/>
                        <h2 className="text-3xl font-bold w-full text-center">Настройки</h2>
                    </div>
                    <button className={`btn w-full ${location.pathname === '/app/settings/user' ? 'btn-primary btn-active' : 'btn-outline'}`} onClick={() => navigate('/app/settings/user')}>
                        <MdEmojiEmotions className="w-7 h-7"/>Пользователь
                    </button>
                    <button className={`btn w-full ${location.pathname === '/app/settings/ui' ? 'btn-primary btn-active' : 'btn-outline'}`} onClick={() => navigate('/app/settings/ui')}>
                        <MdWindow className="w-7 h-7"/> Интерфейс
                    </button>
                    <button className={`btn w-full ${location.pathname === '/app/settings/debug' ? 'btn-primary btn-active' : 'btn-outline'}`} onClick={() => navigate('/app/settings/debug')}>
                        <MdOutlineBugReport className="w-7 h-7"/> Дебаг
                    </button>
                    <button className="btn w-full btn-outline btn-error" onClick={() => {fetch("/api/sign/logout", {method: "POST"}).then(() => window.location.reload());}}>
                        <MdExitToApp className="w-7 h-7"/> Выйти
                    </button>
                </div>
                <div className={`absolute top-0 left-0 lg:relative w-full h-full ${location.pathname === '/app/settings' || location.pathname === '/app/settings/' ? "pointer-events-none" : ""}`}>
                    <User user={user} active={location.pathname.startsWith('/app/settings/user')}/>
                    <Ui active={location.pathname.startsWith('/app/settings/ui')}/>
                    <Debug active={location.pathname.startsWith('/app/settings/debug')}/>
                </div>
            </div>
        </div>
    );
}