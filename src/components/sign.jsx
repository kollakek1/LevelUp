import { useState, useEffect } from "react";

export default function Sign(){

    const [authType, setAuthType] = useState(0);

    useEffect(() => {
        console.log(authType);
    }, [authType]);

    return (
            <>
                <div className={`rounded-box p-5 lg:shadow-xl lg:bg-base-300 duration-700 ${authType === 0 ? "" : "scale-0 translate-x-full absolute"}`}>
                    <h1 className="text-3xl font-bold mb-4">Левел<span className="text-primary">Ап</span> - авторизация</h1>
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">Никнейм или Email</span>
                        </div>
                        <input type="text" placeholder="Логин" className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full mb-5">
                        <div className="label">
                            <span className="label-text">Пароль</span>
                        </div>
                        <input type="password" placeholder="Пароль" className="input input-bordered w-full" />
                        <div className="label justify-end">
                            <span className="label-text-alt hover:link" onClick={() => setAuthType(2)}>Забыли пароль?</span>
                        </div>
                    </label>
                    
                    <button className="btn btn-primary w-full" >Вход</button>
                    <p className="mt-4 lg:mt-1 lg:text-start max-lg:text-xl">Нужна учетная запись? <span className="hover:link text-primary" onClick={() => setAuthType(1)}>Зарегестрируйтесь!</span></p>
                    <div className="mt-6 max-lg:hidden flex justify-between gap-3 w-min">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" loading="lazy" alt="qr code" className="w-24 h-24 rounded-btn" />
                        <div className="m-auto">
                            <h2 className="text-xl w-max font-bold">Авторизация по QR коду</h2>
                            <p>Отсканируйте QR код для быстрого входа в систему.</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-box p-5 lg:shadow-xl lg:bg-base-300 duration-700 ${authType === 1 ? "" : "scale-0 -translate-x-full absolute"}`}>
                    <h1 className="text-3xl font-bold mb-4">Левел<span className="text-primary">Ап</span> - регистрация</h1>
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input type="text" placeholder="Почта" className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full mb-5">
                        <div className="label">
                            <span className="label-text">Пароль</span>
                        </div>
                        <input type="password" placeholder="Пароль" className="input input-bordered w-full" />
                    </label>
                    
                    <button className="btn btn-primary w-full" >Регистрация</button>
                    <p className="mt-4 lg:mt-1 lg:text-start max-lg:text-xl">Уже есть учетная запись? <span className="hover:link text-primary" onClick={() => setAuthType(0)}>Войти!</span></p>
                    <div className="mt-6 max-lg:hidden flex justify-between gap-3 w-min">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" loading="lazy" alt="qr code" className="w-24 h-24 rounded-btn" />
                        <div className="m-auto">
                            <h2 className="text-xl w-max font-bold">Авторизация по QR коду</h2>
                            <p>Отсканируйте QR код для быстрого входа в систему.</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-box p-5 lg:shadow-xl lg:bg-base-300 duration-700 ${authType === 2 ? "" : "scale-0 -translate-y-full absolute"}`}>
                    <h1 className="text-3xl font-bold mb-4">Левел<span className="text-primary">Ап</span> - востоновление</h1>
                    <label className="form-control w-full mb-5">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input type="text" placeholder="Почта" className="input input-bordered w-full" />
                    </label>
                    <button className="btn btn-primary w-full" >Сбросить пароль</button>
                    <p className="mt-4 lg:mt-1 lg:text-start max-lg:text-xl">Уже есть учетная запись? <span className="hover:link text-primary" onClick={() => setAuthType(0)}>Войти!</span></p>
                    <div className="mt-6 max-lg:hidden flex justify-between gap-3 w-min">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" loading="lazy" alt="qr code" className="w-24 h-24 rounded-btn" />
                        <div className="my-auto">
                            <h2 className="text-xl w-max font-bold">Авторизация по QR коду</h2>
                            <p>Отсканируйте QR код для быстрого входа в систему.</p>
                        </div>
                    </div>
                </div>
            </>
        )
}