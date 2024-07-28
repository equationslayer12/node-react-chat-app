import { Card } from './card';

type MessageProps = {
  data: string;
  username: string;
};

export function Message({ data: data, username }: MessageProps) {
  return (
    <Card className='mb-md'>
      {username}
      <hr />
      {data}
    </Card>
  );
}
