import { useEffect, useState } from "react";

export default function Preload() {
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const handleLoad = () => setLoad(false);
        
        if (document.readyState === "complete") {
            setLoad(false);
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => setLoad(false), 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            className={`w-screen h-screen flex items-center justify-center bg-base-100 fixed transition-opacity duration-500 z-50 ${
                !load ? "opacity-0 pointer-events-none" : ""
            }`}
        >
            <div className="text-center">
                <h1 className="text-7xl font-bold">
                    Левел<span className="text-primary">Ап</span>
                </h1>
                <span className="loading loading-infinity w-24 mt-5"></span>
            </div>
        </div>
    );
}
