import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export function CopyButton({ textToCopy, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      // Reset copy status after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      onClick={copyToClipboard}
      variant={'outline'}
      size='sm'
      className={`relative transition-all duration-200 hover:text-white ${className}`}
    >
      <span className='flex items-center gap-2'>
        {copied ? (
          <>
            <Check className='h-4 w-4' />
            Copied!
          </>
        ) : (
          <>
            <Copy className='h-4 w-4' />
            Copy
          </>
        )}
      </span>
    </Button>
  );
}
