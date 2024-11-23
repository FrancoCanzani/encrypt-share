import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import CopyResult from '@/components/copy-result';

export default function EncryptPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState({ id: '', key: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setError('Please enter some text to encrypt');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setResult({ id: '', key: '' });

      const req = await fetch(`${import.meta.env.VITE_API_URL}/encrypt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
      });

      const data = await req.json();

      if (!req.ok) {
        throw new Error(data.error || 'Failed to encrypt message');
      }

      setResult(data);
      setText('');
    } catch (error) {
      console.error('Error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to encrypt message. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='w-full'>
      <div className='space-y-4 mb-12'>
        <p className='text-lg font-medium'>
          End-to-End Encrypted Message Sharing
        </p>
        <ul className='space-y-2 text-sm text-gray-300'>
          <li>1. Enter your message in the text box</li>
          <li>2. Click encrypt to generate a secure link</li>
          <li>3. Share the link - it can only be viewed once</li>
          <li>4. Message is automatically deleted after viewing</li>
        </ul>
      </div>

      {error && (
        <Alert variant='destructive' className='mb-6'>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <Textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError('');
          }}
          placeholder='Enter your text here...'
          className='w-full h-48 p-4 text-lg bg-black border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-400 focus:border-transparent'
          disabled={isLoading}
        />
        <Button
          type='submit'
          className='w-full py-3 px-6 text-lg text-white bg-black rounded-none border border-gray-300 hover:bg-black hover:ring-2 hover:ring-gray-400 hover:border-transparent transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              Encrypting...
            </>
          ) : (
            'Encrypt'
          )}
        </Button>
      </form>

      {result.id && result.key && (
        <CopyResult resultId={result.id} resultKey={result.key} />
      )}
    </main>
  );
}
