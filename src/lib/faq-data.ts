export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqCategories = [
  'Getting Started',
  'For Hosts',
  'Bookings',
  'Payments',
  'Safety',
  'Account',
  'Technical',
] as const;

export const faqData: FAQItem[] = [
  // GETTING STARTED (10)
  {
    id: 'gs-1',
    category: 'Getting Started',
    question: 'Was ist Nowtown?',
    answer: 'Nowtown ist dein lokales Erlebnis-Netzwerk für München. Entdecke Events, miete Räume und buche Services von lokalen Anbietern. Wir verbinden Menschen mit einzigartigen Erlebnissen in deiner Stadt.',
  },
  {
    id: 'gs-2',
    category: 'Getting Started',
    question: 'Ist Nowtown kostenlos nutzbar?',
    answer: 'Ja! Das Erstellen eines Accounts und das Durchstöbern von Events, Räumen und Services ist komplett kostenlos. Nur wenn du etwas buchst, fallen die jeweiligen Preise der Anbieter an.',
  },
  {
    id: 'gs-3',
    category: 'Getting Started',
    question: 'Wie erstelle ich einen Account?',
    answer: 'Klicke auf "Registrieren" oben rechts. Du kannst dich mit deiner E-Mail-Adresse oder über Google/Facebook anmelden. Nach der Verifizierung deiner E-Mail ist dein Account aktiv.',
  },
  {
    id: 'gs-4',
    category: 'Getting Started',
    question: 'Muss ich verifiziert sein, um zu buchen?',
    answer: 'Für die meisten Buchungen ist eine E-Mail-Verifizierung ausreichend. Bei höherwertigen Buchungen kann eine erweiterte Verifizierung (z.B. Ausweis) erforderlich sein.',
  },
  {
    id: 'gs-5',
    category: 'Getting Started',
    question: 'Wie funktioniert die Suche?',
    answer: 'Nutze die Suchleiste auf der Startseite. Du kannst nach Events, Räumen oder Services filtern, Kategorien wählen, Preisbereiche festlegen und nach Datum sortieren.',
  },
  {
    id: 'gs-6',
    category: 'Getting Started',
    question: 'Kann ich Listen mit Favoriten erstellen?',
    answer: 'Ja! Klicke auf das Herz-Symbol bei jedem Event/Raum/Service. Deine gespeicherten Favoriten findest du unter "Saved" in deinem Profil. Du kannst auch eigene Listen erstellen.',
  },
  {
    id: 'gs-7',
    category: 'Getting Started',
    question: 'Gibt es eine mobile App?',
    answer: 'Aktuell ist Nowtown als responsive Web-App verfügbar und funktioniert auf allen Geräten. Native Apps für iOS und Android sind in Planung.',
  },
  {
    id: 'gs-8',
    category: 'Getting Started',
    question: 'In welchen Städten ist Nowtown verfügbar?',
    answer: 'Nowtown ist derzeit auf München fokussiert. Wir planen die Expansion in weitere deutsche Städte basierend auf der Community-Nachfrage.',
  },
  {
    id: 'gs-9',
    category: 'Getting Started',
    question: 'Wie kontaktiere ich den Support?',
    answer: 'Du erreichst uns über das Kontaktformular, per E-Mail an support@nowtown.de oder über den Live-Chat (unten rechts). Unser Support-Team antwortet innerhalb von 24 Stunden.',
  },
  {
    id: 'gs-10',
    category: 'Getting Started',
    question: 'Gibt es ein Community-Forum?',
    answer: 'Ja! Unter "Community" findest du unseren Feed, wo du dich mit anderen Nutzern austauschen, Fragen stellen und lokale Tipps teilen kannst.',
  },

  // FOR HOSTS (12)
  {
    id: 'fh-1',
    category: 'For Hosts',
    question: 'Wie werde ich Host auf Nowtown?',
    answer: 'Klicke auf "Host werden" im Menü. Erstelle ein Host-Profil, verifiziere deine Identität und füge dein erstes Event, Raum oder Service hinzu. Der Prozess dauert etwa 10-15 Minuten.',
  },
  {
    id: 'fh-2',
    category: 'For Hosts',
    question: 'Kostet es etwas, Host zu werden?',
    answer: 'Nein, das Erstellen eines Host-Profils und das Einstellen von Angeboten ist kostenlos. Wir erheben nur eine kleine Service-Gebühr (10%) pro erfolgreicher Buchung.',
  },
  {
    id: 'fh-3',
    category: 'For Hosts',
    question: 'Welche Arten von Events kann ich hosten?',
    answer: 'Fast alles! Workshops, Konzerte, Sport-Events, Food-Tastings, Networking-Events, Partys und mehr. Solange es legal und sicher ist, kannst du es anbieten.',
  },
  {
    id: 'fh-4',
    category: 'For Hosts',
    question: 'Wie setze ich meine Preise fest?',
    answer: 'Du hast volle Kontrolle über deine Preise. Schau dir ähnliche Angebote an, kalkuliere deine Kosten ein und berücksichtige den Wert, den du bietest. Du kannst Preise jederzeit anpassen.',
  },
  {
    id: 'fh-5',
    category: 'For Hosts',
    question: 'Wie funktioniert die Auszahlung?',
    answer: 'Nach erfolgreichem Event/Buchung wird der Betrag innerhalb von 2-3 Werktagen auf dein Bankkonto überwiesen. Du kannst deine Auszahlungen im Dashboard unter "Einnahmen" verfolgen.',
  },
  {
    id: 'fh-6',
    category: 'For Hosts',
    question: 'Kann ich Buchungsanfragen ablehnen?',
    answer: 'Ja, du hast volle Kontrolle. Du kannst Anfragen annehmen oder ablehnen. Allerdings kann eine hohe Ablehnungsquote deine Sichtbarkeit beeinträchtigen.',
  },
  {
    id: 'fh-7',
    category: 'For Hosts',
    question: 'Was ist die Instant-Buchung?',
    answer: 'Mit Instant-Buchung können Gäste direkt buchen, ohne auf deine Bestätigung zu warten. Dies erhöht deine Buchungsrate um durchschnittlich 40%.',
  },
  {
    id: 'fh-8',
    category: 'For Hosts',
    question: 'Wie verbessere ich meine Sichtbarkeit?',
    answer: 'Hochwertige Fotos, detaillierte Beschreibungen, faire Preise, positive Reviews und schnelle Antworten auf Anfragen helfen. Nutze auch unsere Premium-Funktionen für mehr Reichweite.',
  },
  {
    id: 'fh-9',
    category: 'For Hosts',
    question: 'Was passiert bei einem Notfall/Stornierung?',
    answer: 'Kontaktiere sofort alle betroffenen Gäste und unseren Support. Bei berechtigten Notfällen (Krankheit, höhere Gewalt) unterstützen wir dich bei der Umbuchung oder Rückerstattung.',
  },
  {
    id: 'fh-10',
    category: 'For Hosts',
    question: 'Brauche ich eine Versicherung?',
    answer: 'Für Events empfehlen wir eine Veranstalterhaftpflichtversicherung. Bei Raumvermietung sollte eine Mietausfallversicherung vorhanden sein. Wir bieten Partnerversicherungen an.',
  },
  {
    id: 'fh-11',
    category: 'For Hosts',
    question: 'Wie funktionieren Reviews?',
    answer: 'Nach jedem Event können Gäste dich bewerten (1-5 Sterne) und einen Kommentar hinterlassen. Du kannst auf Reviews antworten. Reviews sind öffentlich und verbessern dein Ranking.',
  },
  {
    id: 'fh-12',
    category: 'For Hosts',
    question: 'Kann ich mehrere Events gleichzeitig verwalten?',
    answer: 'Ja! Es gibt keine Begrenzung. Im Dashboard hast du eine Übersicht über alle deine aktiven Events, Buchungen und Anfragen.',
  },

  // BOOKINGS (15)
  {
    id: 'b-1',
    category: 'Bookings',
    question: 'Wie buche ich ein Event?',
    answer: 'Wähle dein Event, klicke auf "Jetzt buchen", wähle Datum und Anzahl der Gäste, prüfe den Preis und schließe die Zahlung ab. Du erhältst sofort eine Bestätigungs-E-Mail.',
  },
  {
    id: 'b-2',
    category: 'Bookings',
    question: 'Was ist, wenn ich einen Fehler gemacht habe?',
    answer: 'Du kannst Buchungen innerhalb von 1 Stunde kostenlos stornieren. Danach gelten die Stornierungsbedingungen des Hosts (meist 24-48 Stunden vor dem Event).',
  },
  {
    id: 'b-3',
    category: 'Bookings',
    question: 'Kann ich eine Buchung ändern?',
    answer: 'Ja, kontaktiere den Host über die Messaging-Funktion. Viele Hosts erlauben Änderungen des Datums oder der Personenanzahl bis zu 48 Stunden vor dem Event.',
  },
  {
    id: 'b-4',
    category: 'Bookings',
    question: 'Was ist eine Buchungsanfrage?',
    answer: 'Bei manchen Angeboten musst du erst eine Anfrage senden. Der Host hat 24 Stunden Zeit zu antworten. Deine Zahlung wird erst fällig, wenn der Host bestätigt.',
  },
  {
    id: 'b-5',
    category: 'Bookings',
    question: 'Wie erhalte ich mein Ticket?',
    answer: 'Nach erfolgreicher Buchung erhältst du ein digitales Ticket per E-Mail und in deinem Dashboard. Zeige es beim Event vor (QR-Code).',
  },
  {
    id: 'b-6',
    category: 'Bookings',
    question: 'Kann ich für andere Personen buchen?',
    answer: 'Ja, aber du bist für die Buchung verantwortlich. Gib alle Teilnehmer-Namen an, falls vom Host verlangt.',
  },
  {
    id: 'b-7',
    category: 'Bookings',
    question: 'Was ist die Warteliste?',
    answer: 'Wenn ein Event ausgebucht ist, kannst du dich auf die Warteliste setzen. Bei Stornierungen werden Wartelisten-Plätze automatisch angeboten.',
  },
  {
    id: 'b-8',
    category: 'Bookings',
    question: 'Wie funktionieren Gruppenrabatte?',
    answer: 'Viele Hosts bieten Rabatte ab einer bestimmten Gruppengröße (z.B. ab 5 Personen). Diese werden automatisch beim Checkout angezeigt.',
  },
  {
    id: 'b-9',
    category: 'Bookings',
    question: 'Was passiert bei schlechtem Wetter?',
    answer: 'Bei Outdoor-Events entscheidet der Host. Viele bieten Ersatztermine oder Rückerstattung an. Prüfe die Event-Beschreibung für Details.',
  },
  {
    id: 'b-10',
    category: 'Bookings',
    question: 'Kann ich jemanden mitbringen?',
    answer: 'Nur, wenn du für diese Person ebenfalls gebucht hast. Spontanes Mitbringen ist meist nicht möglich wegen Kapazitätsgrenzen.',
  },
  {
    id: 'b-11',
    category: 'Bookings',
    question: 'Was ist, wenn ich zu spät komme?',
    answer: 'Kontaktiere den Host so früh wie möglich. Bei Events mit Zeitplan kann verspäteter Einlass begrenzt sein.',
  },
  {
    id: 'b-12',
    category: 'Bookings',
    question: 'Wie finde ich Buchungen wieder?',
    answer: 'Alle deine Buchungen (vergangene und zukünftige) findest du unter "Meine Buchungen" im Dashboard.',
  },
  {
    id: 'b-13',
    category: 'Bookings',
    question: 'Was ist die 24h-Stornierungsgarantie?',
    answer: 'Bei Events mit diesem Label kannst du bis 24 Stunden vorher kostenlos stornieren und erhältst eine volle Rückerstattung.',
  },
  {
    id: 'b-14',
    category: 'Bookings',
    question: 'Kann ich ein Geschenkgutschein kaufen?',
    answer: 'Ja! Wähle "Als Geschenk buchen" beim Checkout. Der Beschenkte erhält einen Gutschein-Code per E-Mail.',
  },
  {
    id: 'b-15',
    category: 'Bookings',
    question: 'Was ist, wenn das Event abgesagt wird?',
    answer: 'Du erhältst automatisch eine volle Rückerstattung innerhalb von 3-5 Werktagen. Wir empfehlen dir außerdem ähnliche alternative Events.',
  },

  // PAYMENTS (8)
  {
    id: 'p-1',
    category: 'Payments',
    question: 'Welche Zahlungsmethoden werden akzeptiert?',
    answer: 'Wir akzeptieren Kreditkarten (Visa, Mastercard, Amex), PayPal, SEPA-Lastschrift und Apple/Google Pay.',
  },
  {
    id: 'p-2',
    category: 'Payments',
    question: 'Wann wird meine Zahlung abgebucht?',
    answer: 'Bei Instant-Buchungen sofort. Bei Anfragen erst nach Bestätigung durch den Host.',
  },
  {
    id: 'p-3',
    category: 'Payments',
    question: 'Ist die Zahlung sicher?',
    answer: 'Ja! Wir nutzen Stripe für sichere Zahlungsabwicklung. Deine Kartendaten werden verschlüsselt übertragen und nicht bei uns gespeichert.',
  },
  {
    id: 'p-4',
    category: 'Payments',
    question: 'Was ist die Service-Gebühr?',
    answer: 'Die Service-Gebühr (ca. 10%) deckt Plattformkosten, Zahlungsabwicklung, Kundensupport und Versicherungen. Sie wird beim Checkout transparent angezeigt.',
  },
  {
    id: 'p-5',
    category: 'Payments',
    question: 'Kann ich eine Rechnung erhalten?',
    answer: 'Ja, alle Buchungen werden automatisch mit einer Rechnung versehen. Du findest sie unter "Buchungen" → "Rechnungen herunterladen".',
  },
  {
    id: 'p-6',
    category: 'Payments',
    question: 'Wie funktionieren Rückerstattungen?',
    answer: 'Rückerstattungen werden auf die ursprüngliche Zahlungsmethode zurücküberwiesen. Dies dauert 3-10 Werktage je nach Bank.',
  },
  {
    id: 'p-7',
    category: 'Payments',
    question: 'Kann ich in Raten zahlen?',
    answer: 'Bei Buchungen über 200€ bieten wir Ratenzahlung über Klarna an. Wähle dies beim Checkout aus.',
  },
  {
    id: 'p-8',
    category: 'Payments',
    question: 'Was passiert bei Zahlungsfehlern?',
    answer: 'Du wirst sofort benachrichtigt. Prüfe deine Kartendaten und versuche es erneut. Bei weiteren Problemen kontaktiere unseren Support.',
  },

  // SAFETY (5)
  {
    id: 's-1',
    category: 'Safety',
    question: 'Wie überprüft Nowtown Hosts?',
    answer: 'Alle Hosts müssen ihre Identität verifizieren (Ausweis). Wir prüfen Reviews, haben ein Rating-System und können verdächtige Accounts sperren.',
  },
  {
    id: 's-2',
    category: 'Safety',
    question: 'Was mache ich bei einem Sicherheitsproblem?',
    answer: 'Nutze den "Problem melden" Button oder kontaktiere unseren 24/7 Safety-Support unter safety@nowtown.de. Bei Notfällen rufe sofort die Polizei (110).',
  },
  {
    id: 's-3',
    category: 'Safety',
    question: 'Sind meine Daten sicher?',
    answer: 'Ja. Wir nutzen SSL-Verschlüsselung, DSGVO-konforme Datenspeicherung und teilen deine Daten niemals mit Dritten ohne deine Zustimmung.',
  },
  {
    id: 's-4',
    category: 'Safety',
    question: 'Wie melde ich unangemessenes Verhalten?',
    answer: 'Klicke auf "Melden" beim jeweiligen Profil/Event/Kommentar. Unser Moderations-Team prüft alle Meldungen innerhalb von 24 Stunden.',
  },
  {
    id: 's-5',
    category: 'Safety',
    question: 'Was sind Nowtown Safety Guidelines?',
    answer: 'Unsere Community-Richtlinien verbieten Diskriminierung, Belästigung, Betrug und illegale Aktivitäten. Lies die vollständigen Guidelines unter /safety.',
  },

  // ACCOUNT (6)
  {
    id: 'a-1',
    category: 'Account',
    question: 'Wie ändere ich mein Passwort?',
    answer: 'Gehe zu Einstellungen → Sicherheit → Passwort ändern. Du musst dein aktuelles Passwort eingeben.',
  },
  {
    id: 'a-2',
    category: 'Account',
    question: 'Kann ich meine E-Mail-Adresse ändern?',
    answer: 'Ja, unter Einstellungen → Account → E-Mail ändern. Du musst die neue Adresse verifizieren.',
  },
  {
    id: 'a-3',
    category: 'Account',
    question: 'Wie lösche ich meinen Account?',
    answer: 'Einstellungen → Account → Account löschen. ACHTUNG: Dies ist permanent und kann nicht rückgängig gemacht werden. Alle Daten werden nach 30 Tagen endgültig gelöscht.',
  },
  {
    id: 'a-4',
    category: 'Account',
    question: 'Kann ich mehrere Accounts haben?',
    answer: 'Nein, pro Person ist nur ein Account erlaubt. Du kannst aber sowohl als Gast als auch als Host agieren.',
  },
  {
    id: 'a-5',
    category: 'Account',
    question: 'Wie aktiviere ich Zwei-Faktor-Authentifizierung?',
    answer: 'Einstellungen → Sicherheit → 2FA aktivieren. Wir empfehlen dies für zusätzliche Sicherheit, besonders für Hosts.',
  },
  {
    id: 'a-6',
    category: 'Account',
    question: 'Was sind Achievements und Badges?',
    answer: 'Du erhältst Badges für Meilensteine (z.B. "5 Events besucht", "Top Host"). Sie werden in deinem Profil angezeigt und erhöhen deine Glaubwürdigkeit.',
  },

  // TECHNICAL (6)
  {
    id: 't-1',
    category: 'Technical',
    question: 'Welche Browser werden unterstützt?',
    answer: 'Nowtown funktioniert am besten mit Chrome, Firefox, Safari und Edge (neueste Versionen). Internet Explorer wird nicht unterstützt.',
  },
  {
    id: 't-2',
    category: 'Technical',
    question: 'Warum erhalte ich keine E-Mails?',
    answer: 'Prüfe deinen Spam-Ordner. Füge noreply@nowtown.de zu deinen Kontakten hinzu. Falls weiterhin Probleme bestehen, kontaktiere den Support.',
  },
  {
    id: 't-3',
    category: 'Technical',
    question: 'Die Seite lädt langsam - was tun?',
    answer: 'Lösche deinen Browser-Cache, deaktiviere Browser-Erweiterungen oder probiere einen anderen Browser. Bei anhaltenden Problemen melde dich beim Support.',
  },
  {
    id: 't-4',
    category: 'Technical',
    question: 'Wie aktiviere ich Benachrichtigungen?',
    answer: 'Einstellungen → Benachrichtigungen. Du kannst E-Mail-, Push- und In-App-Benachrichtigungen individuell einstellen.',
  },
  {
    id: 't-5',
    category: 'Technical',
    question: 'Funktioniert Nowtown auf dem Smartphone?',
    answer: 'Ja! Nowtown ist vollständig responsive. Öffne einfach nowtown.de in deinem mobilen Browser.',
  },
  {
    id: 't-6',
    category: 'Technical',
    question: 'Wo finde ich die API-Dokumentation?',
    answer: 'Pro-Hosts haben Zugriff auf unsere API. Dokumentation findest du unter developers.nowtown.de. Kontaktiere api@nowtown.de für API-Keys.',
  },
];

export function getFAQsByCategory(category: string): FAQItem[] {
  return faqData.filter((faq) => faq.category === category);
}

export function searchFAQs(query: string): FAQItem[] {
  const lowerQuery = query.toLowerCase();
  return faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery)
  );
}
