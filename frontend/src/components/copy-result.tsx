import { CopyButton } from './copy-to-clipboard-button';
import {
  TelegramShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramIcon,
} from 'react-share';

export default function CopyResult({
  resultKey,
  resultId,
}: {
  resultKey: string;
  resultId: string;
}) {
  const baseUrl =
    import.meta.env.VITE_VERCEL_ENV == 'development'
      ? 'encrypt-share-rose.vercel.app'
      : 'http://localhost:5173';

  const url = `${baseUrl}/${resultId}#${resultKey}`;

  return (
    <div className='min-h-6 p-2 mt-8 space-x-4 flex items-center justify-start border border-white'>
      <span className='truncate group relative font-medium text-sm'>{url}</span>
      <div className='flex items-center jus space-x-5'>
        <CopyButton
          className='text-white bg-black border rounded-none border-gray-300 hover:bg-black hover:ring-2 hover:ring-gray-400 hover:border-transparent transition duration-300 ease-in-out'
          textToCopy={url}
        />
        <TelegramShareButton
          url={url}
          title={'Check this encrypted message.'}
          className='Demo__some-network__share-button'
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <WhatsappShareButton
          url={url}
          title={'Check this encrypted message.'}
          separator=':: '
          className='Demo__some-network__share-button'
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
}
