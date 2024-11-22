import DecryptionEffect from '@/components/decryption-effect';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function RootLayout() {
  return (
    <main className='min-h-screen bg-[#f4f1ec] flex flex-col justify-start items-center p-4'>
      <header className='w-full max-w-2xl flex items-center justify-between text-center mb-12'>
        <Link to={'/'} className='text-3xl font-semibold text-gray-800'>
          <DecryptionEffect text='Encrypt Share' />
        </Link>
      </header>
      <Outlet />
    </main>
  );
}
