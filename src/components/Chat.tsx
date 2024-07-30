'use client';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Message } from '@/components/ui/message';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { io, Socket } from 'socket.io-client';

type ChatProps = {
  username: string;
};

export function Chat({ username }: ChatProps) {
  const router = useRouter();

  let socket = useRef<Socket | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token == null) return router.push('/login');

    socket.current = io('ws://localhost:5000/', {
      auth: { token: token },
    });

    socket.current.on('connect_error', (err) => {
      Cookies.remove('token');
      Cookies.remove('username');

      return router.push('/login');
    });

    console.log('socket opened');

    return () => {
      socket.current?.off();
      console.log('socket closed');
    };
  }, [router]);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    <Message key={0} data='hello world' username='pablo'></Message>,
  ]);

  function onSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (socket.current == null) return;

    console.log(message);
    socket.current.emit('message', message);

    setMessage('');
  }

  return (
    <Card className='flex rounded-none flex-col items-center justify-between w-full max-w-screen-lg h-screen p-lg bg-slate-600 md:rounded-lg'>
      <ScrollArea className='w-full'></ScrollArea>
      <form onSubmit={onSubmit}>
        <Input
          className='mb-2'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></Input>
      </form>
    </Card>
  );
}
