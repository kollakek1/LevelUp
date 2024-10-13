import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AppBase from './components/appbase';
import Preload from '../preload';


function AppRoutes({ user }) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/app' || location.pathname === '/app/') {
            navigate('/app/@me');
        }
    }, [location.pathname, navigate]);

    return (
        <>
            <Routes>
                <Route path="*" element={<AppBase user={user}/>} />
            </Routes>
        </>
    );
}

export default function Routing({ user }) {
    return (
        <BrowserRouter>
            <Preload/>
            <AppRoutes user={user}/>
        </BrowserRouter>
    );
}
