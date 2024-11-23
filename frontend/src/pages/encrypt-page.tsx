import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import CopyResult from '@/components/copy-result';

export default function EncryptPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState({ id: '', key: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const req = await fetch('http://localhost:8080/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
      });

      if (!req.ok) {
        throw new Error('Network response was not ok');
      }

      const res = await req.json();
      setResult(res);
      console.log(res);
      setText('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <main className='w-full max-w-2xl'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter your text here...'
            className='w-full h-48 p-4 text-lg bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent'
          />
          <Button
            type='submit'
            className='w-full py-3 px-6 text-lg font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out'
          >
            Encrypt
          </Button>
        </form>
        {result.id && result.key && (
          <CopyResult resultId={result.id} resultKey={result.key} />
        )}
      </main>
      <footer className='mt-16 text-center text-gray-500'>
        <p>
          &copy; {new Date().getFullYear()} Encrypt Share. All rights reserved.
        </p>
      </footer>
    </>
  );
}
