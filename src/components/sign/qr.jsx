export default function Qr() {
    return (
        <div className="mt-6 max-lg:hidden flex justify-between gap-3 w-max">
            <div className="relative">
                <span className="loading loading-infinity loading-lg text-secondary absolute z-10 top-7 left-8"></span>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" loading="lazy" alt="qr code" className="w-24 h-24 rounded-btn blur-sm " />
            </div>
            <div className="my-auto">
                <h2 className="text-xl w-max font-bold">Авторизация по QR коду</h2>
                <p>Отсканируйте QR код для<br/> быстрого входа в систему.</p>
            </div>
        </div>
    )
}