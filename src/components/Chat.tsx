'use client';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Message } from '@/components/ui/message';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

export function Chat() {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([
    <Message key={0} data='hello world' username='pablo'></Message>,
  ]);

  return (
    <Card className='flex flex-col items-center justify-between w-full max-w-screen-lg h-screen  rounded-lg p-lg bg-slate-600'>
      <ScrollArea className='w-full'></ScrollArea>
      <Input className='mb-2'></Input>
    </Card>
  );
}
