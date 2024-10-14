import { MdArrowBackIos, MdOutlineAddCircle } from "react-icons/md";

import { useNavigate } from "react-router-dom";

export default function Chat({ user, active }) {

    const navigate = useNavigate();

    return (
        <div className={`transition-all duration-500 h-screen w-full max-lg:bg-base-100 absolute lg:p-4 ${active ? "translate-y-0" : "max-lg:translate-x-full lg:translate-y-full pointer-events-none"}`}>
            <div className="w-full h-full relative">
                <div className="w-full bg-base-200 lg:rounded-box relative p-3 flex items-center justify-between">
                    <MdArrowBackIos className="w-7 h-7 lg:hidden" onClick={() => navigate("/app/@me")}/>
                    <h2 className="text-sm font-medium">Nigger</h2>
                </div>

                <div className="input max-lg:!outline-none max-lg:border-0 items-center gap-2 absolute bottom-0 bg-base-200 w-full p-2 flex justify-between max-lg:rounded-none h-16 text-lg">
                    <MdOutlineAddCircle className="w-7 h-7"/>
                    <div className="grow max-lg:bg-base-300 rounded-btn p-1 w-full">
                        <input type="text" className="w-full" placeholder="Написать @nigger" />
                    </div>
                </div>
            </div>
        </div>
    );
}