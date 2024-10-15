import { MdArrowBackIosNew } from "react-icons/md";

import { useNavigate } from "react-router-dom";

export default function Debug({ active }) {
    const navigate = useNavigate();

    const themes = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset"
    ]

    return (
        <div className={`flex flex-col w-full h-full absolute transition-all duration-500 ${active ? "" : "lg:scale-0 lg:opacity-0 max-lg:translate-x-full pointer-events-none"}`}>
            <div className="bg-base-300 rounded-box h-full w-full p-6">
                <div className="flex w-full relative lg:hidden max-lg:mb-2">
                    <MdArrowBackIosNew className="w-7 h-7 my-auto absolute top-1" onClick={() => navigate("/app/settings")}/>
                    <h2 className="text-3xl font-bold w-full text-center">Дебаг</h2>
                </div>
                <p className="font-medium text-base-content/60">Theming</p>
                <div className="flex flex-wrap gap-2">
                    {themes.map(theme => (
                        <input
                            key={theme}
                            type="radio"
                            name="theme-buttons"
                            className="btn theme-controller join-item"
                            aria-label={theme}
                            value={theme} />
                    ))}
                </div>
            </div>
        </div>
    );
}