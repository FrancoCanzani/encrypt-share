import { useParams } from 'react-router-dom';
import DecryptionEffect from '@/components/decryption-effect';
import { useEffect } from 'react';

export default function DecryptPage() {
  const params = useParams();
  const key = window.location.hash.slice(1);

  useEffect(() => {
    async function fetchEncryptedText() {
      const res = await fetch(`http://localhost:8080/decrypt`, {
        body: JSON.stringify({
          id: params.id,
          key: key,
        }),
      });

      const text = await res.json();
      console.log(text);
    }

    fetchEncryptedText();
  }, [key, params.id]);

  return (
    <div>
      <DecryptionEffect text='Hello world' />
    </div>
  );
}
