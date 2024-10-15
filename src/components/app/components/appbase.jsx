import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import UserList from './userlist';
import ServerList from './serverlist';
import Settings from './settings';
import Chat from './chat';

import Profile from "./windows/profile";

export default function AppBase({ user }) {
    const location = useLocation();

    const [userProfile, setUserProfile] = useState(null);

    return (
        <>
            <div className='flex'>
                <ServerList/>
                <UserList user={user} userProfile={userProfile} setUserProfile={setUserProfile}/>
                <div className='w-full lg:relative fixed'>
                    <Chat user={user} setUserProfile={setUserProfile} active={location.pathname.startsWith('/app/@me/')}/>
                    <Settings user={user} active={location.pathname.startsWith('/app/settings')}/>
                </div>
                <Profile user={userProfile} setUserProfile={setUserProfile}/>
            </div>
        </>
    );
}
