import { CopyButton } from './copy-to-clipboard-button';

export default function CopyResult({
  resultKey,
  resultId,
}: {
  resultKey: string;
  resultId: string;
}) {
  return (
    <div className='min-h-6 p-2 bg-white rounded-lg mt-6 space-x-4 flex items-center justify-start'>
      <span className='truncate group relative font-semibold blur-[2.5px] hover:blur-0 transition-all duration-300'>
        http://localhost:5173/{resultId}#{resultKey}
      </span>
      <CopyButton
        className='text-white bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out'
        textToCopy={`http://localhost:5173/${resultId}#${resultKey}`}
      />
    </div>
  );
}
