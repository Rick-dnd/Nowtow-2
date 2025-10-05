import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Target, Heart, Users, Rocket, MapPin, Star } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const values = [
  {
    icon: Target,
    title: 'Local First',
    description: 'Wir fördern lokale Erlebnisse und stärken die Community in München.',
  },
  {
    icon: Heart,
    title: 'Nachhaltigkeit',
    description: 'Umweltfreundliche Events und verantwortungsvoller Umgang mit Ressourcen.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Menschen zusammenbringen und echte Verbindungen schaffen.',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'Modernste Technologie für die beste Nutzererfahrung.',
  },
];

const team = [
  { name: 'Max Mustermann', role: 'CEO & Gründer', initials: 'MM' },
  { name: 'Anna Schmidt', role: 'CTO', initials: 'AS' },
  { name: 'Tom Weber', role: 'Head of Design', initials: 'TW' },
  { name: 'Lisa Müller', role: 'Community Manager', initials: 'LM' },
];

const stats = [
  { value: '10,000+', label: 'Events' },
  { value: '5,000+', label: 'Spaces' },
  { value: '50,000+', label: 'Users' },
  { value: '4.8', label: 'Rating', icon: Star },
];

export default function AboutPage(): React.ReactElement {
  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-16">
        {/* Hero */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Über Nowtown
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Wir bringen München zusammen – Ein Event, ein Space, ein Service nach dem anderen
          </p>
        </div>

        {/* Mission */}
        <Card>
          <CardContent className="pt-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-center">Unsere Mission</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Nowtown wurde 2024 in München gegründet mit dem Ziel, lokale Erlebnisse für
                  jeden zugänglich zu machen. Wir glauben an spontane Begegnungen, kreative
                  Zusammenarbeit und die Kraft der Community.
                </p>
                <p>
                  Unsere Plattform verbindet Menschen mit einzigartigen Events, inspirierenden
                  Räumen und professionellen Services – alles an einem Ort. Wir machen es einfach,
                  neue Erfahrungen zu entdecken, Gleichgesinnte zu treffen und München in all
                  seinen Facetten zu erleben.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">Unsere Werte</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-8 space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="py-12">
            <div className="grid gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    {stat.icon && <stat.icon className="h-8 w-8 inline mr-2 text-primary" />}
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">Unser Team</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="pt-8 space-y-4">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-primary to-accent text-white">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Location */}
        <Card>
          <CardContent className="py-12">
            <div className="flex items-center justify-center space-x-4 text-lg">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="font-medium">Aktiv in München, Deutschland</span>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="py-12 text-center space-y-6">
            <h3 className="text-2xl font-bold">Fragen?</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Wir freuen uns, von dir zu hören! Kontaktiere uns für weitere Informationen.
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-accent">
              <a href="/contact">Kontaktiere uns</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer />
    </>
  );
}
