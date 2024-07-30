'use client';

import { Login } from '@/components/Login';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const [errResponse, setErrResponse] = useState('');

  async function onSubmit(username: string) {
    await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username,
      }),
    }).then(async (res) => {
      const success = (await res.json()).success;
      if (success) {
        Cookies.set('username', username);
        return router.push('/');
      } else return setErrResponse('Username taken. Choose another one.');
    });
  }

  return (
    <div className='w-screen flex justify-center p-lg'>
      <p>{errResponse}</p>
        <button onClick={() => {
            console.log("token", Cookies.get());
        }}>hi</button>
      <Login onSubmit={onSubmit}></Login>
    </div>
  );
}
