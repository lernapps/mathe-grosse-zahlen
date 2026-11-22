---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer „Große Zahlen und Rechnen“ (lernapps/apps#385), Stufen 5–6, Strang `mathematik/arithmetik`, nur Deutsch.

## Curriculum

Land Hessen (Annahme), Gymnasium, Jahrgang 5–6. Orientierung ist die Lernlandkarte Mathematik (lernapps.net/apps/map/mathematik/), Band 5-6. Kein Lehrplan zitiert; die Karte gibt die Reihenfolge. Zahlen bis zur Milliarde (12 Stellen).

## Competencies

Kapitel `stellenwerte` (Große Zahlen in der Stellenwerttafel):
- natuerliche-zahlen: „Ich kann natürliche Zahlen im Stellenwertsystem lesen, schreiben und darstellen.“ – Seiten `buendeln-und-lesen`, `zahlen-bis-milliarden`.
- zahlen-vergleichen-ordnen: „… vergleichen, am Zahlenstrahl ablesen und der Größe nach ordnen.“ – `zahlenstrahl-ordnen`.
- runden: „… sinnvoll runden …“ – `runden`.

Kapitel `rechnen` (Schriftlich rechnen, geschickt rechnen, überschlagen):
- schriftliche-verfahren – `addieren-subtrahieren`, `multiplizieren-dividieren`.
- grundrechenarten-rechengesetze – `klammern-vorrang`, `rechengesetze`.
- ueberschlagen – `ueberschlag`.

Aufgaben-IDs: `<seite>-<nr>` (z. B. `buendeln-und-lesen-1`).

## Content structure

Jede Seite: Abschnitte `einstieg` (Ziel in Lernerworten + erste leichte Aufgabe), `darstellung` (Bild/Komponente mit Erklärung), `beispiel`, `uebung` (≥ 3 Aufgaben, steigend). Höchstens 350 Wörter Text. Kapitel beginnt ohne Recap.
Kapitelfrage „Kann das stimmen?“ kehrt wieder.

## Terminology

Stellenwerttafel, Zahlenstrahl (bis zur ersten Zahl links der Null; danach Zahlengerade), Bündeln, Überschlag, Rechenprobe. Anrede „du“. Schreibweisen nach `regeln.md` Abschnitt 2: Dreiergruppen mit schmalem geschütztem Leerzeichen (`12 345`), vierstellig ohne Lücke; `−`, `·`, `:`; kein Punkt als Tausendertrennung. Eingabefelder nehmen Leerzeichen und Punkt als Gruppierung an.

## Exercise patterns

- *Tafel ablesen* (`generated`, Seiten 1–2): Plättchenverteilung → Zahl; Fehler: Spalten vertauscht, Null ausgelassen.
- *Ordnen* (`ordering`), *Strahl ablesen* (`generated`/Komponente), *Runden* (`generated`; Fehler: bei 5 abgerundet, falsche Stelle).
- *Schriftlich rechnen* (`generated`; Fehler: Übertrag vergessen/falsche Spalte, Nullen beim Multiplizieren).
- *Vorrang* (`generated`; Fehler: Punkt vor Strich ignoriert).
- *Überschlag* (`generated`/`true-false`: „Kann das stimmen?“).
Daten: `src/data/zahlen.yaml` (erfundene Orte, Größenordnungen, keine Marken).

## Figures

Darstellungs-Konventionen (für Folge-Explainer #386, #389):
- Stellenwerttafel: Spalten von rechts E, Z, H, T (Seite 1: vier Spalten; ab Seite 2 weitere in Dreierblöcken: Tausender, Million, Milliarde), Blockkopf beschriftet; Spaltenköpfe als Text (nicht nur Farbe).
- Plättchen: runde Marke je Einheit der Spalte; zehn Plättchen einer Spalte werden „gebündelt“ zu einem Plättchen der nächsten Spalte (Komponente `Stellenwerttafel`: je Spalte Schaltflächen „+“/„−“, „Bündeln“, „Zurücksetzen“; Tastatur: Tab, Enter/Leertaste). Unterscheidung nicht nur durch Farbe: Ziffer im Plättchen.
- Zahlenstrahl: Skala mit gleich langen Abschnitten, beschriftete Hauptstriche, Lupe vergrößert einen Abschnitt um Faktor 10.
- Alle Bilder: Textalternative, Kontrast WCAG AA, bedienbar mit Tastatur.
Eigene SVGs/Komponenten, keine fremden Bilder.

## Sources

Lernlandkarte Mathematik, Issue #385, gemeinsame Regeln des Epics #402. Keine Schulbuchtexte. Zahlenbeispiele selbst erfunden.

## Adding a chapter or round

1. Baustein auf der Karte wählen, Seite anlegen (`src/<kapitel>/<seite>.yaml`), in `chapter.yaml` und `app.yaml` eintragen. 2. Abschnitte wie oben, ≥ 3 Aufgaben je Baustein aus den Mustern. 3. Rechenprobe der Musterlösungen. 4. `npx --no -- lernapps check`, committen.

## Rules learned from mistakes

- Keine Wikipedia- oder anderen Fremdlinks (regeln.md Abschnitt 4): „Weiterlesen“-Link jeder Aufgabe zeigt auf die Kartenseite des Bausteins `https://lernapps.net/apps/map/mathematik/c/<baustein-id>/` (Fehler der Musterseite).

- Seite `stellenwerte/buendeln-und-lesen` ist die Musterseite: Einstieg mit Ziel, Bild und leichter Aufgabe, `darstellung` mit Komponente, `beispiel`, `uebung` mit `generated` (Fehlertypen), `number`, `true-false`, `ordering`.
