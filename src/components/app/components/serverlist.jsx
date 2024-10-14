import { useNavigate } from "react-router-dom";
import { MdPerson } from "react-icons/md";

export default function Routing() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-20 bg-base-300 p-2">
            <button className="btn btn-ghost btn-circle" onClick={() => navigate("/app/@me")}>
                <MdPerson className="w-7 h-7"/>
            </button>
        </div>
    );
}
