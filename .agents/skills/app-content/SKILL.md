---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer „Große Zahlen und Rechnen“ (lernapps/apps#385), Stufen 5–6, Strang `mathematik/arithmetik`, nur Deutsch.

## Curriculum

Land Hessen (Annahme), Gymnasium, Jahrgang 5–6. Orientierung ist die Lernlandkarte Mathematik (lernapps.net/apps/map/mathematik/), Band 5-6. Kein Lehrplan zitiert; die Karte gibt die Reihenfolge. Zahlen bis zu den Milliarden (12 Stellen).

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

Zwei Kapitel, neun Seiten, in `src/app.yaml` (`chapters`) und `chapter.yaml` (`pages`) in dieser Reihenfolge:
- `stellenwerte/`: `buendeln-und-lesen` (Komponente `Stellenwerttafel`), `zahlen-bis-milliarden` (Bild `tafel-milliarden.svg`), `zahlenstrahl-ordnen` (Komponente `Zahlenstrahl`), `runden` (Bild `runden-strahl.svg`).
- `rechnen/`: `addieren-subtrahieren` (`addition-schriftlich.svg`), `multiplizieren-dividieren` (`rechteck-23-mal-14.svg`), `klammern-vorrang`, `rechengesetze` (`plaettchen-tauschen.svg`, `plaettchen-verteilen.svg`), `ueberschlag` (`ueberschlag-strahl.svg`).
Jede Seite: Abschnitte `einstieg` (Ziel in Lernerworten + erste leichte Aufgabe), `darstellung` bzw. `regel`, `beispiel`, `uebung` (mindestens drei Aufgaben, steigend). Höchstens 350 Wörter Text. Kein Recap. Der `einstieg` jeder Seite beginnt mit einer `number`-Aufgabe, die ohne Vorwissen aus dem Kapitel lösbar ist. Überschriften (Titel von `example`) enthalten keine Zahlen mit Gruppierung (der End-zu-Ende-Test des Laufzeit-Pakets vergleicht Überschriften ohne schmales Leerzeichen).

## Terminology

Stellenwerttafel, Zahlenstrahl (bis zur ersten Zahl links der Null; danach Zahlengerade), Bündeln, Überschlag, Rechenprobe. Anrede „du“. Schreibweisen nach `regeln.md` Abschnitt 2: Dreiergruppen mit schmalem geschütztem Leerzeichen (`12 345`), vierstellig ohne Lücke; `−`, `·`, `:`; kein Punkt als Tausendertrennung. Eingabefelder nehmen Leerzeichen und Punkt als Gruppierung an.

## Exercise patterns

Alle Aufgaben haben Rechenprobe über `generated` (der Build prüft 200 Seeds) oder feste Werte; `mistakes` benennen den Fehlertyp.
- *Tafel lesen* (`generated`, `buendeln-und-lesen`: `tafel-lesen`, `tafel-mit-null`; Fehler: Reihenfolge umgedreht, Plättchen gezählt, Null ausgelassen).
- *Schreiben nach Blöcken* (`zahlen-bis-milliarden`: `zahl-schreiben`; Fehler: Blöcke ohne Nullen hintereinander), `matching` Zahlwort ↔ Ziffern, `ordering` großer Zahlen.
- *Strahl* (`zahlenstrahl-ordnen`: `strahl-mitte-hunderter`, `strahl-mitte-tausender`), `single-choice` Zeichen < >, `ordering`.
- *Runden* (`runden`: `runden-auf`, `runden-ab`; Fehler: falsche Richtung bei Einerziffer), `number` für die 5, `single-choice` Genauigkeit.
- *Schriftlich* (`addieren-subtrahieren`: `add-schriftlich`, `sub-schriftlich`; Fehler: Übertrag vergessen, Ziffern vertauscht; `multiplizieren-dividieren`: `mal-schriftlich`, `geteilt-schriftlich`; Fehler: nur Einer malgenommen, multipliziert statt geteilt). Probe durch Umkehraufgabe (`true-false`).
- *Vorrang* (`klammern-vorrang`: `punkt-vor-strich`, `klammer-zuerst`, `minus-links-nach-rechts`).
- *Rechengesetze* (`rechengesetze`: `geschickt-vertauschen`, `geschickt-verteilen`, `matching` Gesetz ↔ Beispiel).
- *Überschlag* (`ueberschlag`: `ueberschlag-summe`, `kann-das-stimmen`, `ueberschlag-mal`, `ueberschlag-rueckblick`).
Weiterlesen-Link jeder Aufgabe: die Kartenseite des Bausteins (siehe Regeln unten). Daten: keine Datendatei (alle Werte in `given`).

## Figures

Darstellungs-Konventionen (für Folge-Explainer #386, #389):
- Stellenwerttafel: Spalten von rechts E, Z, H, T (Seite 1: vier Spalten; ab Seite 2 weitere in Dreierblöcken: Tausender, Million, Milliarde), Blockkopf beschriftet; Spaltenköpfe als Text (nicht nur Farbe).
- Plättchen: runde Marke je Einheit der Spalte; zehn Plättchen einer Spalte werden „gebündelt“ zu einem Plättchen der nächsten Spalte (Komponente `Stellenwerttafel`: je Spalte Schaltflächen „+“/„−“, „Bündeln“, „Zurücksetzen“; Tastatur: Tab, Enter/Leertaste). Unterscheidung nicht nur durch Farbe: Ziffer im Plättchen.
- Zahlenstrahl (Komponente `Zahlenstrahl`): Skala mit zehn gleich langen Abschnitten, beschriftete Striche, Lupe: Abschnittsknopf zeigt den Abschnitt zehnmal feiner, „Wieder von 0 bis 1000“ setzt zurück.
- Alle Bilder: Textalternative, Kontrast WCAG AA, bedienbar mit Tastatur.
Eigene SVGs (`src/images/`, Quelle „eigene Zeichnung“, CC0-1.0) und die Komponenten `Stellenwerttafel` und `Zahlenstrahl` (je `.vue`, `.ts`, `.test.ts`, mit `nojs`-Text). Keine fremden Bilder.

## Sources

Lernlandkarte Mathematik, Issue #385, gemeinsame Regeln des Epics #402. Keine Schulbuchtexte. Zahlenbeispiele selbst erfunden.

## Adding a chapter or round

1. Baustein auf der Karte wählen, Seite anlegen (`src/<kapitel>/<seite>.yaml`), in `chapter.yaml` und `app.yaml` eintragen. 2. Abschnitte wie oben, ≥ 3 Aufgaben je Baustein aus den Mustern. 3. Rechenprobe der Musterlösungen. 1 bis 3 ihrer Übungen in `selfAssessment` (`chapter.yaml`) aufnehmen, wie Skill `lernapps-explainer-self-assessment` sagt. 4. `npx --no -- lernapps check`, committen.

## Rules learned from mistakes

- Keine Wikipedia- oder anderen Fremdlinks (regeln.md Abschnitt 4): „Weiterlesen“-Link jeder Aufgabe zeigt auf die Kartenseite des Bausteins `https://lernapps.net/apps/map/mathematik/c/<baustein-id>/` (Fehler der Musterseite).

- Seite `stellenwerte/buendeln-und-lesen` ist die Musterseite: Einstieg mit Ziel, Bild und leichter Aufgabe, `darstellung` mit Komponente, `beispiel`, `uebung` mit `generated` (Fehlertypen), `number`, `true-false`, `ordering`.
