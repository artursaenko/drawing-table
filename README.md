# Drawing Table · Whiteboard für den Online-Unterricht

**Live-Demo:** https://artursaenko.github.io/drawing-table/?room=demo

Meine Masterarbeit (M.Sc. Software- und Anwendungsentwicklung, 2024): ein Whiteboard für den Online-Unterricht. Lehrende zeichnen und schreiben auf einer gemeinsamen Fläche, Studierende sehen jede Änderung in Echtzeit.

*English below.*

## So testen Sie die Demo

1. Öffnen Sie die Demo und klicken Sie auf **„Als Lehrende testen“**.
2. Öffnen Sie über **„Zweites Fenster als Studierende öffnen“** dieselbe Seite noch einmal. Dort bleiben Sie Studierende.
3. Fügen Sie im ersten Fenster Text, Formen oder ein Bild hinzu. Im zweiten Fenster erscheint es sofort.

Die Oberfläche gibt es auf Deutsch, Englisch und Ukrainisch.

## Funktionen

- Text, Quadrat, Dreieck, Kreis und eigene Bilder auf die Fläche setzen, per Drag-and-drop platzieren
- Synchronisation in Echtzeit über Firebase Realtime Database
- Rollen: Lehrende (nach Anmeldung) dürfen zeichnen, Studierende sehen zu
- Mehrere Räume über die URL, zum Beispiel `?room=2`
- Fläche als PNG herunterladen

## Technik

Vue 3 (Composition API), Vuex, Vue Router, Firebase (Authentication, Realtime Database), Canvas API, SCSS.

**Sicherheit:** Lesen ist für alle erlaubt, Schreiben nur für angemeldete Lehrende. Ausnahme ist der öffentliche Demo-Raum. Die Datenbankregeln prüfen außerdem Aufbau und Größe der gespeicherten Daten. Selbstregistrierung ist deaktiviert.

## Lokal starten

```bash
npm install
npm run serve
```

Build für GitHub Pages (Ausgabe im Ordner `docs/`). Mit Node.js 17 oder neuer:

```bash
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

## Was ich heute anders machen würde

- Vite statt Vue CLI als Build-Werkzeug
- Formen als Objekte speichern statt die ganze Fläche als Bild: weniger Datenvolumen und einzelne Elemente bleiben bearbeitbar
- Responsive Fläche für Tablets und Smartphones
- Automatische Tests für die Synchronisation

---

# Drawing Table · whiteboard for online teaching

**Live demo:** https://artursaenko.github.io/drawing-table/?room=demo

My master's thesis project (M.Sc. Software and Application Development, 2024): a whiteboard for online lessons. Teachers draw and write on a shared canvas, students see every change in real time.

**Try it:** open the demo, click **"Try as teacher"**, then use **"Open second window as student"** to open the same room as a student. Anything you add in the first window appears in the second one instantly. The interface is available in German, English and Ukrainian.

**Stack:** Vue 3, Vuex, Vue Router, Firebase Authentication and Realtime Database, Canvas API, SCSS.

**What I would do differently today:** use Vite, store shapes as objects instead of a full canvas image, make the canvas responsive and add automated tests for syncing.
