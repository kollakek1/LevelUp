import { useEffect, useState } from "react";

export default function Preload() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => setLoading(false);
        window.addEventListener("load", handleLoad);

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    return (
        <div
            className={`w-screen h-screen flex items-center justify-center bg-base-100 fixed transition-opacity duration-500 ${
                !loading ? "opacity-0 pointer-events-none -z-50" : "z-50"
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
