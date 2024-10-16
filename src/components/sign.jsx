import { useState, useEffect } from "react";
import Qr from "./sign/qr";

export default function Sign(){

    const [authType, setAuthType] = useState(0);
    const [qrLoad, setQrLoad] = useState(true);
    const [regProcess, setRegProcess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const credentialsAction = async (formData) => {
        setRegProcess(true);

        const response = await fetch("/api/sign/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: formData.get("login"),
            password: formData.get("password"),
          }),
        });
    
        const result = await response.json();
    
        if (result.error) {
            setErrorMessage(result.error);
            setRegProcess(false);
        } else {
            window.location.href = "/app";
        }
    }

    const registerAction = async (formData) => {
        setRegProcess(true);

        const response = await fetch("/api/sign/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.get("username"),
            login: formData.get("login"),
            email: formData.get("email"),
            password: formData.get("password"),
          }),
        });
    
        const result = await response.json();
    
        if (result.error) {
            setErrorMessage(result.error);
            setRegProcess(false);
        } else {
            window.location.href = "/app";
        }
      };

    return (
            <>
                <form className={`rounded-box p-5 lg:shadow-xl lg:bg-base-300 duration-700 ${authType === 0 ? "" : "scale-0 translate-x-full absolute"}`} onSubmit={(e) => {e.preventDefault(); credentialsAction(new FormData(e.target))}}>
                    <h1 className="text-3xl font-bold mb-4">Левел<span className="text-primary">Ап</span> - авторизация</h1>
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">Логин или Email</span>
                        </div>
                        <input type="text" placeholder="Логин" name="login" className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full mb-5">
                        <div className="label">
                            <span className="label-text">Пароль</span>
                        </div>
                        <input type="password" placeholder="Пароль" name="password" className="input input-bordered w-full" />
                        <div className="label justify-end">
                            <span className="label-text-alt hover:link" onClick={() => setAuthType(2)}>Забыли пароль?</span>
                        </div>
                        {errorMessage && <p className="text-error text-start">{errorMessage}</p>}
                    </label>
                    
                    <button className="btn btn-primary w-full" type="submit" disabled={regProcess}>{regProcess ? <span className="loading loading-infinity"></span> : "Вход"}</button>
                    <p className="mt-4 lg:mt-1 lg:text-start max-lg:text-xl">Нужна учетная запись? <span className="hover:link text-primary" onClick={() => setAuthType(1)}>Зарегестрируйтесь!</span></p>
                    <Qr/>
                </form>

                <form className={`rounded-box p-5 lg:shadow-xl lg:bg-base-300 duration-700 ${authType === 1 ? "" : "scale-0 -translate-x-full absolute"}`} onSubmit={(e) => {e.preventDefault(); registerAction(new FormData(e.target))}}>
                    <h1 className="text-3xl font-bold mb-4">Левел<span className="text-primary">Ап</span> - регистрация</h1>
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">Никнейм</span>
                        </div>
                        <input type="text" name="username" placeholder="Никнейм" className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">Логин</span>
                        </div>
                        <input type="text" name="login" placeholder="Например superman114" className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input type="text" name="email" placeholder="Почта" className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full mb-5">
                        <div className="label">
                            <span className="label-text">Пароль</span>
                        </div>
                        <input type="password" name="password" placeholder="Пароль" className="input input-bordered w-full" />
                        {errorMessage && <p className="text-error text-start mt-1">{errorMessage}</p>}
                    </label>
                    
                    <button className="btn btn-primary w-full" type="submit" disabled={regProcess}>{regProcess ? <span className="loading loading-infinity"></span> : "Регистрация"}</button>
                    <p className="mt-4 lg:mt-1 lg:text-start max-lg:text-xl">Уже есть учетная запись? <span className="hover:link text-primary" onClick={() => setAuthType(0)}>Войти!</span></p>
                    <Qr/>
                </form>

                <form className={`rounded-box p-5 lg:shadow-xl lg:bg-base-300 duration-700 ${authType === 2 ? "" : "scale-0 -translate-y-full absolute"}`}>
                    <h1 className="text-3xl font-bold mb-4">Левел<span className="text-primary">Ап</span> - востоновление</h1>
                    <label className="form-control w-full mb-5">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input type="text" placeholder="Почта" className="input input-bordered w-full" />
                    </label>
                    <button className="btn btn-primary w-full" type="submit">Сбросить пароль</button>
                    <p className="mt-4 lg:mt-1 lg:text-start max-lg:text-xl">Уже есть учетная запись? <span className="hover:link text-primary" onClick={() => setAuthType(0)}>Войти!</span></p>
                    <Qr/>
                </form>
            </>
        )
}