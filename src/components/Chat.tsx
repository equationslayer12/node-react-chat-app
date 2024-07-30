'use client';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Message } from '@/components/ui/message';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

type ChatProps = {
  username: string;
};

export function Chat({ username }: ChatProps) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    console.log('token is', token);
    if (token == null) return router.push('/login');

    const socket = io('ws://localhost:5000/', {
      auth: { token: token },
    });
    console.log('socket opened');
    socket.emit('message', 'Hello');

    return () => {
      socket.off();
      console.log('socket closed');
    };
  }, []);

  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([
    <Message key={0} data='hello world' username='pablo'></Message>,
  ]);

  return (
    <Card className='flex rounded-none flex-col items-center justify-between w-full max-w-screen-lg h-screen p-lg bg-slate-600 md:rounded-lg'>
      <ScrollArea className='w-full'></ScrollArea>
      <Input className='mb-2'></Input>
    </Card>
  );
}
