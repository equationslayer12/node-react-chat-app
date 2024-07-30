'use client';

import { Chat } from '@/components/Chat';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const usernameCookie = Cookies.get('username');
    if (usernameCookie != null) setUsername(usernameCookie);
    else setUsername('');
  }, []);

  return (
    <main className='flex relative h-screen flex-col items-center justify-between md:p-xl'>
      {username && <h1>Hello, {username}</h1>}
      <Chat username={username}></Chat>
    </main>
  );
}
