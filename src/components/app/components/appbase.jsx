import { useLocation } from 'react-router-dom';

import UserList from './userlist';
import ServerList from './serverlist';
import Settings from './settings';

export default function AppBase({ user }) {
    const location = useLocation();

    return (
        <div className='flex'>
            <ServerList/>
            <UserList user={user}/>
            <Settings user={user} active={location.pathname === '/app/settings'}/>
        </div>
    );
}
