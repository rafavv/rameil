# SMTP-Anbindung Kontaktformular

Das Kontaktformular im Footer ist im statischen Prototyp bereits fuer einen spaeteren Versand-Endpunkt vorbereitet:

- Formular: `form.footer-form`
- Methode: `POST`
- Action: `/api/contact`
- Honeypot-Feld gegen einfache Bots: `website`
- Pflichtfelder: `name`, `email`, `message`

## Spaetere Environment Variables

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
SMTP_TO=
```

## Erwartetes Endpoint-Verhalten

Der Endpoint `/api/contact` sollte:

1. Honeypot `website` pruefen und bei Inhalt still abbrechen.
2. Pflichtfelder validieren.
3. E-Mail-Adresse syntaktisch pruefen.
4. Nachricht per SMTP an `SMTP_TO` senden.
5. Keine SMTP-Zugangsdaten im Frontend ausliefern.
6. Eine JSON-Antwort liefern, z.B. `{ "ok": true }`.

## Hinweis

Der aktuelle lokale Prototyp laeuft als statische HTML-Seite. SMTP-Versand braucht serverseitigen Code, z.B. spaeter in Next.js, Astro server routes, PHP oder einem kleinen Node-Endpunkt.
