import { MdPeopleAlt, MdOutlineSettingsSuggest } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Routing({ user }) {
    const navigate = useNavigate();

    return (
        <div className="relative w-full lg:w-72">
            <div className="h-screen w-full bg-base-200 p-2">
                <button className="btn btn-ghost w-full" onClick={() => navigate("/app/friends")}>
                    <MdPeopleAlt className="w-7 h-7"/>
                    Друзья
                </button>
                <p className="mt-3 text-sm font-medium text-center opacity-70">ЛИЧНЫЕ СООБЩЕНИЯ</p>
            </div>
            <div className="absolute bottom-0 bg-base-300 w-full h-14 p-2 flex justify-between">
                <div>
                    <p className="text-md font-medium">{user.username}</p>
                </div>
                <div className="my-auto">
                    <button className="btn btn-ghost btn-sm tooltip" data-tip="Настройки" onClick={() => navigate("/app/settings")}>
                        <MdOutlineSettingsSuggest className="w-7 h-7"/>
                    </button>
                </div>
            </div>
        </div>
    );
}
