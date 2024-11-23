import { useParams } from 'react-router';
import DecryptionEffect from '@/components/decryption-effect';
import { useEffect, useState } from 'react';

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
          `http://localhost:8080/decrypt?id=${params.id}&key=${key}`
        );

        const result: DecryptResponse = await res.json();
        console.log('API Response:', result);

        if (result.error) {
          setError(result.error);
          setDecryptedText('');
          return;
        }

        if (result.text) {
          setDecryptedText(result.text);
          setError('');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to decrypt message');
        setDecryptedText('');
      }
    }

    if (params.id && key) {
      fetchEncryptedText();
    }
  }, [key, params.id]);

  if (error) {
    return <div className='text-red-600 p-4'>Error: {error}</div>;
  }

  return (
    <div>
      {decryptedText ? (
        <DecryptionEffect text={decryptedText} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
