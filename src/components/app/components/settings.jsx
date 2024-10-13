import { useNavigate } from "react-router-dom";

export default function Settings({ user, active }) {

    const navigate = useNavigate();

    return (
        <div className={`transition-all duration-500 h-screen w-full max-lg:absolute p-8 ${active ? "translate-y-0" : "-translate-y-full pointer-events-none"}`}>
            <div className="w-full h-full bg-base-200 rounded-box shadow-md p-4 flex">
                <div className="w-full lg:w-64 h-full">
                    <button className="btn btn-ghost w-full" onClick={() => navigate(-1)}>
                        Назад
                    </button>
                </div>
            </div>
        </div>
    );
}