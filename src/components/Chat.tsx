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

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ [key: string]: string }[]>([]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token == null) return router.push('/login');

    socket.current = io('ws://localhost:5000/', {
      auth: { token: token },
    });
    console.log('socket opened');

    socket.current.on('message', (message) => {
      console.log('received message:', message);
      setMessages([...messages, message]);
    });

    socket.current.on('connect_error', (err) => {
      Cookies.remove('token');
      Cookies.remove('username');

      return router.push('/login');
    });

    return () => {
      socket.current?.off();
      console.log('socket closed');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  function onSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (socket.current == null) return;

    setMessages([...messages, { message: message, username: username }]);

    socket.current.emit('message', message);

    setMessage('');
  }

  const messagesList = messages.map((message, index) => {
    return (
      <Message
        key={index}
        username={message.username}
        data={message.message}
      ></Message>
    );
  });
  return (
    <Card className='flex rounded-none flex-col items-center justify-between w-full max-w-screen-lg h-screen p-lg bg-slate-600 md:rounded-lg'>
      <ScrollArea className='w-full'>{messagesList}</ScrollArea>
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
