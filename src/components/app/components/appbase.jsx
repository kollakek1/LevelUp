import { useLocation } from 'react-router-dom';

import UserList from './userlist';
import ServerList from './serverlist';
import Settings from './settings';
import Chat from './chat';

export default function AppBase({ user }) {
    const location = useLocation();

    return (
        <div className='flex'>
            <ServerList/>
            <UserList user={user}/>
            <div className='w-full lg:relative fixed'>
                <Chat user={user} active={location.pathname.startsWith('/app/@me/')}/>
                <Settings user={user} active={location.pathname.startsWith('/app/settings')}/>
            </div>

        </div>
    );
}
