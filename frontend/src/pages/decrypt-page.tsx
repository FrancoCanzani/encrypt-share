import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DecryptResponse {
  text?: string;
  error?: string;
}

export default function DecryptPage() {
  const params = useParams();
  const key = window.location.hash.slice(1);
  const [decryptedText, setDecryptedText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchEncryptedText() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/decrypt?id=${params.id}&key=${key}`
        );

        const result: DecryptResponse = await res.json();

        if (result.error) {
          setError('This message has been deleted or is no longer available');
          setDecryptedText('');
          return;
        }

        if (result.text) {
          setDecryptedText(result.text);
          setError('');
        }
      } catch {
        setError('This message has been deleted or is no longer available');
        setDecryptedText('');
      }
    }

    if (params.id && key) {
      fetchEncryptedText();
    }
  }, [key, params.id]);

  if (error) {
    return (
      <div className='space-y-4'>
        <Alert variant='destructive'>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <p className='text-sm text-gray-300'>
          Messages are automatically deleted after being viewed for security. If
          you need to view this message again, please request a new encrypted
          message from the sender.
        </p>
      </div>
    );
  }

  return (
    <div>
      {decryptedText ? (
        <>
          <Card className='bg-black text-white'>
            <CardHeader>
              <CardTitle>Message:</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{decryptedText}</p>
            </CardContent>
          </Card>
          <p className='mt-6 text-sm text-gray-300'>
            This message has been decrypted and will be automatically deleted.
            Make sure to save it if needed - you won't be able to view it again.
          </p>
        </>
      ) : (
        <div className='text-center text-gray-300'>Decrypting message...</div>
      )}
    </div>
  );
}
