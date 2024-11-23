import { CopyButton } from './copy-to-clipboard-button';

export default function CopyResult({
  resultKey,
  resultId,
}: {
  resultKey: string;
  resultId: string;
}) {
  return (
    <div className='min-h-6 p-2 mt-8 space-x-4 flex items-center justify-start border border-white'>
      <span className='truncate group relative font-medium text-sm'>
        http://localhost:5173/{resultId}#{resultKey}
      </span>
      <CopyButton
        className='text-white bg-black border rounded-none border-gray-300 hover:bg-black hover:ring-2 hover:ring-gray-400 hover:border-transparent transition duration-300 ease-in-out'
        textToCopy={`http://localhost:5173/${resultId}#${resultKey}`}
      />
    </div>
  );
}
