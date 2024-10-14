import { useNavigate } from "react-router-dom";

export default function Chat({ user, active }) {

    const navigate = useNavigate();

    return (
        <div className={`transition-all duration-500 h-screen w-full max-lg:bg-base-100 absolute p-4 ${active ? "translate-y-0" : "translate-y-full pointer-events-none"}`}>
            <div className="w-full h-full relative">
                <div className="w-full bg-base-200 rounded-box h-14">

                </div>

                <div className="absolute bottom-0 bg-base-200 w-full h-14 p-2 flex justify-between rounded-btn">
                </div>
            </div>
        </div>
    );
}