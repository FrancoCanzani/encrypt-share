import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function HowItWorksPage() {
  return (
    <div className='text-start space-y-8 text-white'>
      <div className='mb-12'>
        <h1 className='text-4xl font-bold mb-4'>
          Technical Architecture & Security Model
        </h1>
        <p className='text-lg'>End-to-End Encrypted Message Sharing Platform</p>
      </div>

      <section className='space-y-6'>
        <Card className='bg-black text-white'>
          <CardHeader>
            <CardTitle>Core Security Principles</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='font-semibold mb-2'>1. Client-Side Encryption</h3>
              <p className=''>
                Messages are encrypted in the browser before transmission,
                ensuring the server never has access to plaintext content. We
                utilize URL fragments (#) for key transmission, preventing the
                decryption key from being sent to the server.
              </p>
            </div>

            <div>
              <h3 className='font-semibold mb-2'>
                2. Zero Knowledge Architecture
              </h3>
              <p className=''>
                The server only stores encrypted data and has no ability to
                decrypt messages. Decryption keys are only shared via URL
                fragments, which browsers don't send in HTTP requests.
              </p>
            </div>

            <div>
              <h3 className='font-semibold mb-2'>3. One-Time Access</h3>
              <p className=''>
                Messages are automatically deleted after being viewed,
                implementing perfect forward secrecy. The sessions counter in
                the database ensures each message can only be accessed once.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-black text-white'>
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div>
              <h3 className='font-semibold mb-2'>Backend Stack (Go)</h3>
              <ul className='list-disc pl-6 space-y-2 '>
                <li>Gin web framework for RESTful API endpoints</li>
                <li>
                  SQLite database with prepared statements for SQL injection
                  prevention
                </li>
                <li>
                  UUID v4 for cryptographically secure message identifiers
                </li>
                <li>
                  Atomic database transactions for secure message deletion
                </li>
              </ul>
            </div>

            <Separator className='my-4' />

            <div>
              <h3 className='font-semibold mb-2'>Frontend Stack (React)</h3>
              <ul className='list-disc pl-6 space-y-2 '>
                <li>
                  React Router for client-side routing and URL fragment handling
                </li>
                <li>TypeScript for type safety and better error handling</li>
                <li>URL fragment parsing for secure key transmission</li>
                <li>
                  Error boundary implementation for graceful failure handling
                </li>
              </ul>
            </div>

            <Separator className='my-4' />

            <div>
              <h3 className='font-semibold mb-2'>Cryptographic Details</h3>
              <ul className='list-disc pl-6 space-y-2 '>
                <li>AES-256-GCM for symmetric encryption</li>
                <li>
                  Cryptographically secure random number generator for key
                  generation
                </li>
                <li>
                  Base64URL encoding for key transmission in URL fragments
                </li>
                <li>
                  Authenticated encryption providing confidentiality and
                  integrity
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-black text-white'>
          <CardHeader>
            <CardTitle>Message Lifecycle</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <ol className='list-decimal pl-6 space-y-3 '>
              <li>
                <span className='font-semibold'>Message Creation:</span>
                <ul className='list-disc pl-6 mt-2 space-y-1'>
                  <li>Generate random 32-byte encryption key</li>
                  <li>Encrypt message with AES-256-GCM</li>
                  <li>Generate UUID for message identifier</li>
                  <li>Store encrypted message with sessions counter</li>
                </ul>
              </li>

              <li>
                <span className='font-semibold'>URL Generation:</span>
                <ul className='list-disc pl-6 mt-2 space-y-1'>
                  <li>Base64URL encode the encryption key</li>
                  <li>Construct URL with message ID in path</li>
                  <li>Append key as URL fragment</li>
                </ul>
              </li>

              <li>
                <span className='font-semibold'>Message Retrieval:</span>
                <ul className='list-disc pl-6 mt-2 space-y-1'>
                  <li>Extract message ID from URL path</li>
                  <li>Extract key from URL fragment</li>
                  <li>Retrieve encrypted message from database</li>
                  <li>Decrypt using provided key</li>
                  <li>Decrement sessions counter and delete if zero</li>
                </ul>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className='bg-black text-white'>
          <CardHeader>
            <CardTitle>Security Considerations</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className=''>
              <p className='mb-4'>
                <span className='font-semibold'>Transport Security:</span> All
                API communications should occur over TLS to prevent MITM
                attacks. While message contents are encrypted, metadata
                protection relies on HTTPS.
              </p>

              <p className='mb-4'>
                <span className='font-semibold'>Key Transmission:</span> Using
                URL fragments prevents keys from being logged in server access
                logs or transmitted in HTTP requests, but they may be visible in
                browser history.
              </p>

              <p className='mb-4'>
                <span className='font-semibold'>Forward Secrecy:</span> One-time
                access and immediate deletion ensures messages cannot be
                decrypted even if the database is compromised after viewing.
              </p>

              <p>
                <span className='font-semibold'>Client Security:</span> The
                security model assumes the client browser is trusted and free of
                malware. No protection is provided against compromised client
                devices.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className='text-gray-300 mt-12'>
        <p>
          This documentation represents the current technical implementation and
          security model.
        </p>
        <p>
          Always review the actual code for the most up-to-date security
          details.
        </p>
      </footer>
    </div>
  );
}
