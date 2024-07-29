'use client';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Message } from '@/components/ui/message';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import socket from '@/lib/socket';

export function Chat() {
  useEffect(() => {
    socket.emit('message', 'Hello');
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
