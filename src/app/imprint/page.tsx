import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Building2 } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export default function ImprintPage(): React.ReactElement {
  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Impressum</h1>
          <p className="text-muted-foreground">
            Angaben gemäß § 5 TMG
          </p>
        </div>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5" />
              Betreiber
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Nowtown GmbH</h3>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Müllerstraße 12, 80469 München, Deutschland
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Vertreten durch:</h4>
              <p className="text-muted-foreground">Geschäftsführer: [Name]</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Kontakt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              <a href="tel:+498912345678" className="hover:text-primary">
                +49 89 1234567
              </a>
            </p>
            <p className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <a href="mailto:info@nowtown.co" className="hover:text-primary">
                info@nowtown.co
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Registration */}
        <Card>
          <CardHeader>
            <CardTitle>Registereintrag</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><span className="font-medium">Eintragung:</span> Handelsregister</p>
            <p><span className="font-medium">Registergericht:</span> Amtsgericht München</p>
            <p><span className="font-medium">Registernummer:</span> HRB XXXXX</p>
          </CardContent>
        </Card>

        {/* Tax ID */}
        <Card>
          <CardHeader>
            <CardTitle>Umsatzsteuer-ID</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
              <span className="font-mono font-medium text-foreground">DE XXXXXXXXX</span>
            </p>
          </CardContent>
        </Card>

        {/* Responsible for Content */}
        <Card>
          <CardHeader>
            <CardTitle>Verantwortlich für den Inhalt</CardTitle>
            <CardDescription>nach § 55 Abs. 2 RStV</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              [Name]<br />
              Müllerstraße 12<br />
              80469 München
            </p>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card>
          <CardHeader>
            <CardTitle>Haftungsausschluss</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Haftung für Inhalte</h4>
              <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Haftung für Links</h4>
              <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir
                keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                Gewähr übernehmen.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Urheberrecht</h4>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* EU Dispute Resolution */}
        <Card>
          <CardHeader>
            <CardTitle>EU-Streitschlichtung</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p className="mt-2">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </CardContent>
        </Card>

        {/* Consumer Dispute Resolution */}
        <Card>
          <CardHeader>
            <CardTitle>Verbraucherstreitbeilegung</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer />
    </>
  );
}
