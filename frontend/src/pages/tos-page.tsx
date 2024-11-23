import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <Card className='bg-black text-white'>
      <CardHeader>
        <CardTitle>Terms of Service</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-6 text-sm text-gray-300'>
          <section>
            <h2 className='text-lg font-semibold mb-2'>
              1. Message Security & Privacy
            </h2>
            <ul className='list-disc pl-4 space-y-2'>
              <li>
                Messages are end-to-end encrypted and can only be viewed once
              </li>
              <li>
                We cannot access, recover, or reset messages or encryption keys
              </li>
              <li>Messages are automatically deleted after being viewed</li>
              <li>Do not share encryption keys through insecure channels</li>
            </ul>
          </section>

          <section>
            <h2 className='text-lg font-semibold mb-2'>2. Acceptable Use</h2>
            <ul className='list-disc pl-4 space-y-2'>
              <li>You must not use this service for illegal activities</li>
              <li>Do not send malicious content or spam</li>
              <li>We are not responsible for lost or undelivered messages</li>
              <li>Service is provided "as is" without warranties</li>
            </ul>
          </section>

          <section>
            <h2 className='text-lg font-semibold mb-2'>3. Data Practices</h2>
            <ul className='list-disc pl-4 space-y-2'>
              <li>We do not store message contents after viewing</li>
              <li>No personal data is collected or stored</li>
              <li>Server logs are minimal and routinely deleted</li>
              <li>No tracking or analytics are used</li>
            </ul>
          </section>

          <section>
            <h2 className='text-lg font-semibold mb-2'>4. Disclaimer</h2>
            <ul className='list-disc pl-4 space-y-2'>
              <li>Service may be interrupted or terminated at any time</li>
              <li>No guarantee of service availability or reliability</li>
              <li>
                Users are responsible for their own encryption key security
              </li>
              <li>We are not liable for any damages or losses</li>
            </ul>
          </section>

          <section>
            <h2 className='text-lg font-semibold mb-2'>5. Changes to Terms</h2>
            <p className='pl-4'>
              We reserve the right to modify these terms at any time. Continued
              use of the service constitutes acceptance of the current terms.
            </p>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
