---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: code
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: { checks-pass: 1 }
---

# Plan: mathe-grosse-zahlen, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-22. Explore, Plan, Code, Commit.*

## Goal

<!-- 1–2 sentences: what learners do, what they learn. -->

Lernende der Stufen 5–6 verstehen, wie das Zehnersystem große Zahlen ordnet, und rechnen mit natürlichen Zahlen sicher, geschickt und kontrolliert (Stellenwerttafel, Zahlenstrahl, schriftliche Verfahren, Rechengesetze, Überschlag). Auftrag: lernapps/apps#385.


## Key decisions

<!-- One line each: decision and reason. Archetype first. Your own choice without the creator: mark "(guess)". -->

- Archetyp `explainer`: Seiten mit Erklärung, Bild und Übungen; keine Zeitspiele nötig (Auftrag nennt Seiten mit Tafel/Strahl).
- Strang `mathematik/arithmetik`, Format 2, aus Issue #385 (vorgegeben).
- Sprache: nur Deutsch (guess: Issue nennt nur Deutsch; Regeln: nie nur Englisch).
- Darstellungen: Stellenwerttafel + Zahlenstrahl (aus Issue); Namen „Stellenwerttafel“, „Zahlenstrahl“ (Karte: Zahlenstrahl, Regeln nennen „Zahlengerade“ – Fund für Orchestrator).
- Wiederkehrende Frage „Kann das stimmen?“ (Issue).
- Kein `scope`: kein `open-task`, kein eigenes Material des Erstellers (Referenz structure.md).

## Notes

<!-- Strand or subject, competencies by chapter (ids), didactic approach, scope, sources and licences, open questions. -->

- Quelle des Auftrags: `/tmp/epic/docs/mathe-epic/issues/385.md` + `regeln.md` (Orchestrator-Epic #402). Der Ersteller bringt die Inhalte (Issue); die Karte bestätigt sie.
- Karte (mathematik.json, Band 5-6): natuerliche-zahlen (Schritt 1, öffnet 100) · zahlen-vergleichen-ordnen (2, öffnet 22) · runden (2, öffnet 1) · schriftliche-verfahren (2, öffnet 64) · grundrechenarten-rechengesetze (3, öffnet 57) · ueberschlagen (4, requires runden + grundrechenarten-rechengesetze). Alle 6 ohne `practisedBy` (Lücken). Alle Voraussetzungen liegen im Explainer; kein Recap von außerhalb nötig außer ggf. kurzer Sammel-Wiederholung Grundschul-Rechnen (Einmaleins) – (guess, im Plan klären).
- Kapitel 1 „Große Zahlen in der Stellenwerttafel“: natuerliche-zahlen, zahlen-vergleichen-ordnen, runden. Kapitel 2 „Schriftlich rechnen, geschickt rechnen, überschlagen“: schriftliche-verfahren, grundrechenarten-rechengesetze, ueberschlagen.
- Üben (Muster Mathematik): berechnen/umwandeln → `generated` mit typischen Fehlern (Stellenwert vertauscht, Übertrag vergessen, Punkt-vor-Strich); ordnen → `ordering`; ablesen → Bild (SVG Tafel/Strahl) + `number`; Komponente (Tafel zum Bündeln, Zahlenstrahl mit Lupe) nur wo kein Block reicht, mit statischer Form zuerst.
- Misconceptions: Nullen zählen statt Stellenwert; längere Zahl = größere (Dezimal-Fehlvorstellung nicht hier); Runden bei 5 abwärts; Übertrag in falsche Spalte; Punkt-vor-Strich ignoriert; Überschlag wird nach dem Rechnen vergessen.
- Seiten (Datei · Baustein · nicht geübte Voraussetzung): Kapitel 1 `stellenwerte/`: `bündeln-und-lesen` (natuerliche-zahlen), `zahlen-bis-milliarden` (natuerliche-zahlen, zweite Seite: große Zahlen, Stufen), `zahlenstrahl-ordnen` (zahlen-vergleichen-ordnen), `runden` (runden). Kapitel 2 `rechnen/`: `addieren-subtrahieren`, `multiplizieren-dividieren` (beide schriftliche-verfahren), `klammern-vorrang` (grundrechenarten-rechengesetze), `rechengesetze` (ebenso, vorteilhaftes Rechnen), `ueberschlag` (ueberschlagen). Kapitel 1 braucht Sammel-Wiederholung nur für Grundschulwissen (kleines Einmaleins, Zahlen bis 1000): (guess) kein Recap, da keine Karten-Baustein-Voraussetzung außerhalb; im Plan bestätigen. Entscheidung für den Plan: ob `recap` nötig ist.
- Pro Baustein ≥ 3 Aufgaben (Regeln 3.1); ein Fehlertyp je Aufgabe.
- Umfang drin: natürliche Zahlen bis Milliarden, Runden, vier schriftliche Verfahren, Klammern/Vorrang, Kommutativ-/Assoziativ-/Distributivgesetz, Überschlag. Raus: Teiler/Potenzen (#386), Brüche/Dezimalzahlen/negative Zahlen (#389), Größen/Einheiten (#398).
- Sprache: nur Deutsch (guess). Datenbereich: natürliche Zahlen bis 12 Stellen (Milliarden, Billionen nur als Ausblick) – nicht still bei 1000 enden.
- Quellen geöffnet: Karte mathematik.json; Regeln/Anweisung/Issue (öffentlich). Lehrplan: nicht nötig (Strang mit Karte). Zweitquellen (serlo.org u. ä.): nicht geprüft.


## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [x] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
- [x] Load skill `lernapps-explainer-design`. An explainer has the look of the runtime: write "fixed by the
      archetype" under the topic "Look and feel" of "Answers".
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" which competency goes on which page and which pages form a chapter, as "Map the content" of
      skill `lernapps-explainer-design` says. Per page, name the prerequisites the app does not practise.
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [x] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.
      Creator: Orchestrator (Vertretung): Recherche freigegeben; 2 Kapitel, ca. 9 Seiten, kein recap, nur Deutsch; Zahlenstrahl bis zur ersten Zahl links der Null, danach Zahlengerade; Musterseite = erste Seite; Darstellungs-Konventionen in Content-Guide aufnehmen.

### Answers

<!-- The interview: per topic the creator's answer, in their words. Keep the topics. -->

- Goal / Learners / Content / Amount / Languages: aus Issue #385 (Auftrag des Erstellers via Orchestrator): Stufen 5-6, 2 Kapitel · 6 Bausteine, deutsch, Inhalte von mir aus Karte und Issue, alle Bausteine geübt.
- Look and feel: fixed by the archetype.
- Model and focus, Hurdles, Terms, Finding the app: nicht beantwortet → Annahmen (guess): Fokus Visualisierung (Tafel/Strahl) + Übungen; Hürden siehe Notes; Begriffe: Stellenwerttafel, Zahlenstrahl, Überschlag, Bündeln; Suchbegriffe: große Zahlen, Stellenwert, schriftlich rechnen, Runden, Überschlag Klasse 5.


- Goal: what learners do in the app, what they learn.
- Learners: subject, school year, prior knowledge.
- Model and focus: an app of the catalog (https://lernapps.net/apps/llms.txt) as model; what matters most (exercises,
  visualisations, game feel).
- Hurdles: misconceptions and mistakes of the learners; the creator's examples and experiments.
- Content: who writes it (creator, you, from sources); own material (worksheets, tests).
- Amount: how much content in the first version; what comes later.
- Languages: German only, or German and English. Never English only.
- Look and feel: calm like a worksheet, or like a game (colours, praise, effects); dark mode.
- Terms: the creator's words for the main things in the app, used everywhere.
- Finding the app: what teachers and parents would search for.

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [x] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [x] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [x] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [x] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [x] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [x] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [x] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.
      Creator: Orchestrator (Vertretung): Plan bestätigt, ja; Push von work erlaubt; Selbsteinschätzung nach Skill; 12 Stellen, Tastatur, Textalternative nennen.

### Content method

<!-- One line each: the patterns and where; the figures and how they are made; the data files; each component, what it
checks and what it cannot; how a later agent adds a chapter. It becomes the content guide in Code. -->
<!-- An explainer: per figure, model and component its learning action in two to four sentences
(`explainer-representation-explained`); per page its prerequisites the app does not practise, and which get a recap
page, which a link. -->

**Zuschnitt.** Strang-App `mathematik/arithmetik`, 2 Kapitel, 9 Seiten, kein recap (alle Voraussetzungen im Explainer). Nur Deutsch (guess). Seiten-IDs gleich: `einstieg`, `darstellung`, `beispiel`, `uebung`.

| Seite | Baustein | Muster / Übungen (Art) | Engagement: Einstieg · Wechsel · Belohnung · Geschichte |
|---|---|---|---|
| stellenwerte/buendeln-und-lesen (Muster) | natuerliche-zahlen | Tafel-Komponente „Bündeln“; `generated` Zahl→Tafel ablesen (Fehler: Nullen/Spalten vertauscht), `number`, `ordering` | 27 Plättchen legen · sehen, tun, lesen · „Ich lese 3 405 021“ · Schulklasse sammelt Zahlen aus Zeitung |
| stellenwerte/zahlen-bis-milliarden | natuerliche-zahlen | Tafel erweitert (Tausender-, Million-, Milliardenblock); `generated` schreiben/lesen in Worten | Einwohnerzahl in Tafel · Dreierblöcke ablesen · Zahl in Worten sagen |
| stellenwerte/zahlenstrahl-ordnen | zahlen-vergleichen-ordnen | Zahlenstrahl-Komponente mit Lupe; `ordering`, `generated` ablesen/einordnen (Fehler: Skala falsch gelesen) | Ort schätzen · Lupe zoomt · Vergleich mit <, > |
| stellenwerte/runden | runden | Zahlenstrahl-Bild (Mitte, Nachbarn); `generated` runden auf Stelle (Fehler: bei 5 abgerundet, falsche Stelle) | „Wie genau muss es sein?“ Entfernung · Strahl · Entscheidung nach Zweck |
| rechnen/addieren-subtrahieren | schriftliche-verfahren | Tafel neben Verfahren (Bild-Reihe SVG); `generated` mit Fehlern (Übertrag vergessen/falsche Spalte) | Plättchen addieren, Bündel wandert · Verfahren Schritt für Schritt · Rechenprobe |
| rechnen/multiplizieren-dividieren | schriftliche-verfahren | Rechteckmodell (SVG), Verfahren; `generated` (Fehler: Nullen, Rest) | Rechteck mit Maßen · zerlegen · Probe durch Umkehr |
| rechnen/klammern-vorrang | grundrechenarten-rechengesetze | Terme zeilenweise; `generated` (Fehler: Punkt vor Strich ignoriert), `single-choice` | Zwei Rechenwege, zwei Ergebnisse · Klammer setzen · Regel selbst formulieren |
| rechnen/rechengesetze | grundrechenarten-rechengesetze | Plättchenbilder (SVG) für Tauschen/Zusammenfassen/Verteilen; `generated` vorteilhaft rechnen | Umlegen zeigt gleiche Summe · Bild↔Term · geschickt rechnen |
| rechnen/ueberschlag | ueberschlagen | Zahlenstrahl-Ort + Runden; `generated` Überschlag, „Kann das stimmen?“ (Fehler: Nullen/Faktor 10) | Aufgabe zuerst schätzen · Strahl · Vergleich mit Ergebnis; Kapitelrückblick |

**Pro Baustein ≥ 3 Aufgaben** steigend; die erste ohne Vorwissen. Rückmeldung inhaltlich mit Fehlertyp (`mistakes`); nach 2 Fehlversuchen Weg (Regel 3.3), neue Zahlen per Seed.

**Darstellungen und Komponenten.**
- *Stellenwerttafel* (Komponente `Stellenwerttafel`, statische Form: SVG-Tabelle + Text): Spalten rechts Einer, nach links Zehner, Hunderter, Tausender … in Dreierblöcken (T, M, Md); Plättchen je Spalte; zehn Plättchen werden zu einem in die nächste Spalte gebündelt. Lernaktion: Lernende legen/bündeln und lesen die Zahl ab. Textalternative: Zahl und Ziffernliste. Prüft: Zahl stimmt mit Plättchenverteilung überein; kann nicht: Dezimalstellen.
- *Zahlenstrahl* (Komponente `Zahlenstrahl`, statische Form: SVG): Skala mit beschrifteten Strichen, Lupe zoomt um Faktor 10. Lernaktion: Ort setzen/ablesen. Prüft Toleranz = halber Strich.
- *Rechteckmodell*, *Plättchenbilder*: SVG (`image`) mit Textalternative.
- Warum Komponenten: kein Block kann Bündeln oder Zoomen (`prefer-built-in-block`); zuerst statische Form, Logikmodul + Test.

**Barrierefreiheit (Regeln 3.7):** Tafel- und Zahlenstrahl-Komponente per Tastatur bedienbar (Pfeiltasten/Enter für Plättchen setzen, bündeln, Lupe) und mit Textalternative; Zahlen bis zur Milliarde, bis 12 Stellen.
**Selbsteinschätzung:** folgt Skill `lernapps-explainer-self-assessment` (je Kapitel `selfAssessment`).
**Datenbereich:** Zahlen bis 12 Stellen; Datei `src/data/zahlen.yaml` (Einwohner, Entfernungen, frei erfundene Orte, Werte als Größenordnung, ohne Marken).
**Spätere Kapitel:** Seite = Datei in Kapitelordner, Baustein auf Karte, ≥3 Aufgaben, gleiche Abschnitts-IDs; Tafel/Strahl-Konventionen aus diesem Guide.


## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [x] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [x] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [x] Load skill `lernapps-explainer`.
- [x] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [x] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [ ] Musterseite stellenwerte/buendeln-und-lesen komplett: Einstieg, Komponente Stellenwerttafel mit statischer Form, Beispiel, ≥3 Aufgaben mit Rückmeldung, Textalternative, Tastaturbedienung; Darstellungs-Konventionen im Content-Guide
<!-- tasks: pattern (1 added): the one page or screen that is the pattern for the others -->
- [ ] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
- [ ] Seite zahlen-bis-milliarden: Tafel bis Milliarden, Lesen und Schreiben in Worten, ≥3 Aufgaben
- [ ] Seite zahlenstrahl-ordnen: Komponente Zahlenstrahl mit Lupe, Vergleichen und Ordnen, ≥3 Aufgaben
- [ ] Seite runden: Runden auf Stellen am Zahlenstrahl, ≥3 Aufgaben mit Fehlertypen
- [ ] Seite addieren-subtrahieren: schriftliche Verfahren neben der Tafel, ≥3 Aufgaben
- [ ] Seite multiplizieren-dividieren: Rechteckmodell und Verfahren, ≥3 Aufgaben
- [ ] Seite klammern-vorrang: Vorrangregeln, ≥3 Aufgaben
- [ ] Seite rechengesetze: Plättchenbilder, vorteilhaftes Rechnen, ≥3 Aufgaben
- [ ] Seite ueberschlag: Überschlag und Kapitelrückblick, ≥3 Aufgaben
- [ ] Start- und Kapitelseiten, Karte/Baustein-Zuordnung, lernapps check ohne Fehler
<!-- tasks: pages (9 added): the other pages or screens, after the pattern -->
- [ ] Update the content guide so that it describes the app as built (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [ ] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [ ] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
      decisions" why the app has none. Commit.
- [ ] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [ ] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, messages or answers, and your choice. "None" if none. -->
