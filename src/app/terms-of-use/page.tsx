'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FileText, Download, Printer } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfUsePage(): React.ReactElement {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <h1 className="text-4xl font-bold">Terms of Use</h1>
                </div>
                <p className="text-lg text-muted-foreground">
                  Last updated: October 5, 2025
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.print()}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">
              Diese Seite ist auch auf{' '}
              <Link href="/terms" className="text-primary hover:underline">
                Deutsch
              </Link>{' '}
              verfügbar.
            </p>
          </div>

          <Card>
            <CardContent className="p-8 prose prose-slate max-w-none">
              {/* 1. Acceptance of Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Nowtown (&quot;the Platform&quot;), you accept and agree to be bound by
                  the terms and provision of this agreement. If you do not agree to these Terms of Use,
                  please do not use this Platform.
                </p>
              </section>

              <Separator className="my-6" />

              {/* 2. Use License */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Permission is granted to temporarily access the materials (information or software) on
                  Nowtown for personal, non-commercial transitory viewing only. This is the grant of a
                  license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Modify or copy the materials;</li>
                  <li>Use the materials for any commercial purpose or for any public display;</li>
                  <li>Attempt to reverse engineer any software contained on Nowtown;</li>
                  <li>Remove any copyright or other proprietary notations from the materials;</li>
                  <li>
                    Transfer the materials to another person or &quot;mirror&quot; the materials on any other
                    server.
                  </li>
                </ul>
              </section>

              <Separator className="my-6" />

              {/* 3. User Conduct */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. User Conduct</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree to use the Platform only for lawful purposes and in a way that does not
                  infringe the rights of, restrict or inhibit anyone else&apos;s use and enjoyment of the
                  Platform. Prohibited behavior includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Harassing or causing distress or inconvenience to any person;</li>
                  <li>Transmitting obscene or offensive content;</li>
                  <li>Disrupting the normal flow of dialogue within the Platform;</li>
                  <li>Posting spam or unsolicited advertising;</li>
                  <li>Using the Platform for fraudulent or unlawful purposes.</li>
                </ul>
              </section>

              <Separator className="my-6" />

              {/* 4. Content */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. User-Generated Content</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Users may post content such as reviews, comments, photos, and other materials. By
                  posting content on Nowtown, you grant us a non-exclusive, royalty-free, perpetual,
                  irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish,
                  translate, create derivative works from, distribute, and display such content throughout
                  the world in any media.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You represent and warrant that: (i) you own the content posted by you or otherwise have
                  the right to grant the license set forth in this section, and (ii) the posting of your
                  content does not violate the privacy rights, publicity rights, copyrights, contract
                  rights or any other rights of any person.
                </p>
              </section>

              <Separator className="my-6" />

              {/* 5. Privacy */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your use of Nowtown is also governed by our Privacy Policy. Please review our Privacy
                  Policy, which also governs the Platform and informs users of our data collection
                  practices.
                </p>
              </section>

              <Separator className="my-6" />

              {/* 6. Disclaimer */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The materials on Nowtown are provided on an &apos;as is&apos; basis. Nowtown makes no
                  warranties, expressed or implied, and hereby disclaims and negates all other warranties
                  including, without limitation, implied warranties or conditions of merchantability,
                  fitness for a particular purpose, or non-infringement of intellectual property or other
                  violation of rights.
                </p>
              </section>

              <Separator className="my-6" />

              {/* 7. Limitations */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Limitations of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall Nowtown or its suppliers be liable for any damages (including, without
                  limitation, damages for loss of data or profit, or due to business interruption) arising
                  out of the use or inability to use the materials on Nowtown, even if Nowtown or a
                  Nowtown authorized representative has been notified orally or in writing of the
                  possibility of such damage.
                </p>
              </section>

              <Separator className="my-6" />

              {/* 8. Revisions */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Revisions and Errata</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The materials appearing on Nowtown could include technical, typographical, or
                  photographic errors. Nowtown does not warrant that any of the materials on its website
                  are accurate, complete or current. Nowtown may make changes to the materials contained
                  on its website at any time without notice.
                </p>
              </section>

              <Separator className="my-6" />

              {/* 9. Links */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nowtown has not reviewed all of the sites linked to its website and is not responsible
                  for the contents of any such linked site. The inclusion of any link does not imply
                  endorsement by Nowtown of the site. Use of any such linked website is at the user&apos;s own
                  risk.
                </p>
              </section>

              <Separator className="my-6" />

              {/* 10. Modifications */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Modifications</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nowtown may revise these Terms of Use at any time without notice. By using this
                  Platform, you are agreeing to be bound by the then current version of these Terms of
                  Use.
                </p>
              </section>

              <Separator className="my-6" />

              {/* 11. Governing Law */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of
                  Germany and you irrevocably submit to the exclusive jurisdiction of the courts in that
                  location.
                </p>
              </section>

              <Separator className="my-6" />

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Use, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold">Nowtown Support</p>
                  <p className="text-muted-foreground">Email: legal@nowtown.de</p>
                  <p className="text-muted-foreground">Address: München, Germany</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
