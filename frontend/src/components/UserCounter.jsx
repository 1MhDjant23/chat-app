import { useEffect, useState } from 'react';
import  {socket}    from    '../socket/socket.js';


export  const   UserCounter = () => {
    const   [total, setTotal] = useState(0);

    const   handleTotal = (t) => {
        setTotal(t);
        console.log('Online Users:', t);
    }

    useEffect(() => {
        socket.on('total-user', handleTotal);

        return () => {
            socket.off('total-user', handleTotal);
        }

    }
    , []);

    return (
        <div>Online Users: {total}</div>
    );
}