import { Chat } from "@/components/Chat";

export default function Home() {
  return (
    <main className='flex relative h-screen flex-col items-center justify-between md:p-xl'>
      <Chat></Chat>
    </main>
  );
}
