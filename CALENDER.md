# Der Kalender – Rahmen & Zielbild für Grünkalender

## Ziel des Kalenders
Der Kalender ist eine der zentralen Kernfunktionen von Grünkalender.

Er soll Nutzern auf einen Blick zeigen:

- wann für welche Pflanze etwas relevant ist
- welche Phasen im Gartenjahr anstehen
- wie sich verschiedene Pflanzen über das Jahr verteilen
- welche Arbeiten typischerweise in bestimmten Zeiträumen stattfinden

Der Kalender ist nicht nur eine schöne Übersicht, sondern ein praktisches Planungswerkzeug.

---

## Rolle im Gesamtprodukt
Grünkalender besteht aus zwei starken Säulen:

1. **Informationsseiten / SEO**
   - Nutzer kommen über Suchanfragen wie:
     - wann tomaten pflanzen
     - gurken düngen
     - feldsalat säen
   - die Pflanzen-Info-Seiten liefern Wissen und Einstieg

2. **Kalender + Mein Garten**
   - Nutzer bleiben wegen Planung, Übersicht und persönlichem Garten
   - der Kalender macht die Pflanzeninformationen zeitlich nutzbar

Der Kalender ist damit die Brücke zwischen Pflanzenwissen und praktischer Anwendung.

---

## Fachliches Grundprinzip
Der Kalender arbeitet auf Basis der **zentralen Pflanzendaten**.

Diese Pflanzendaten enthalten:
- Stammdaten
- Inhaltsdaten für Info-Seiten
- Zeitfenster / Timeline-Daten
- optionale weitere Eigenschaften

Wichtig:
Es gibt **nur eine zentrale Datenquelle** für Pflanzen.

Der Kalender greift auf diese Daten zu und stellt nur die zeitlichen Informationen in einer übersichtlichen Form dar.

---

## Grundstruktur der Kalenderansicht

### Horizontale Zeitachse
Die X-Achse bildet das Gartenjahr ab.

Geplant ist eine Darstellung mit:
- Jahr
- Monaten von Januar bis Dezember
- daraus abgeleiteter horizontaler Timeline

Später kann diese Logik bei Bedarf feiner erweitert werden.

---

### Vertikale Pflanzenachse
Die Y-Achse besteht aus den Pflanzen.

Jede Zeile steht für eine Pflanze, zum Beispiel:
- Tomaten
- Gurken
- Kürbis
- Feldsalat
- Radieschen
- Möhren

---

### Zeitfenster pro Pflanze
Jede Pflanze kann mehrere Zeitfenster haben.

Beispiele:
- Vorzucht
- Direktsaat
- Auspflanzen
- Düngen
- Ernten

Wichtig:
- nicht jede Pflanze braucht alle Zeitfenster
- es wird nur angezeigt, was in den Pflanzendaten tatsächlich vorhanden ist
- mehrere Einträge desselben Typs müssen möglich sein

Beispiel:
- Düngen im Frühjahr
- Düngen nochmals später vor der Fruchtbildung

---

## Ziel der Darstellung
Die Kalenderansicht soll nicht wie ein klassischer Terminplaner wirken, sondern eher wie eine ruhige, fachlich klare Garten-Timeline.

Der Nutzer soll schnell erkennen:
- welche Pflanze wann relevant ist
- welche Phasen sich überschneiden
- wann Vorzucht, Pflanzung, Düngung und Ernte stattfinden

---

## Haupttypen in der Timeline
Für die erste klare Struktur werden diese Haupttypen priorisiert:

- Vorzucht
- Direktsaat
- Auspflanzen
- Düngen
- Ernten

Weitere Typen sind später möglich, zum Beispiel:
- Schneiden
- Umtopfen
- Ausgeizen
- Überwintern

Diese sollen die Grundstruktur aber nicht unnötig kompliziert machen.

---

## Farbkonzept
Jeder Haupttyp bekommt eine feste Farbe.

Ziel:
- ruhig
- klar unterscheidbar
- hochwertig
- konsistent

Beispielhafte Zuordnung:
- Vorzucht → helles Grün
- Direktsaat / Auspflanzen → mittleres Grün
- Düngen → Braun
- Ernten → Rot

Die Farblogik muss im gesamten Kalender konsistent bleiben.

---

## Beziehung zu den Pflanzenseiten
Der Kalender nutzt dieselben Pflanzendaten wie die Pflanzen-Info-Seiten.

Das ist wichtig, weil:
- Inhalte nicht doppelt gepflegt werden sollen
- Zeitangaben nur an einer Stelle gepflegt werden sollen
- Pflanzenwissen und Kalender logisch zusammengehören

Eine Pflanze ist also nicht „für die Info-Seite“ und „für den Kalender“ getrennt gespeichert, sondern zentral definiert.

---

## Beziehung zu „Mein Garten“
Langfristig gibt es zwei Ebenen des Kalenders:

### 1. Allgemeiner Pflanzenkalender
- basiert auf den zentralen Pflanzendaten
- zeigt typische Zeitfenster und empfohlene Phasen

### 2. Persönlicher Gartenkalender
- basiert auf den tatsächlichen Einträgen des Nutzers
- zeigt reale Start- und Enddaten
- ergänzt durch eigene Einträge, Ernten, Düngungen und Notizen

Die erste Umsetzung von `/der-kalender` bezieht sich zunächst auf den **allgemeinen Pflanzenkalender**.

---

## Technische Leitidee
Die Kalenderseite soll von Anfang an sauber strukturiert aufgebaut werden.

Nicht als schnelle Einzelseite, sondern mit wiederverwendbaren Komponenten, zum Beispiel:
- Kalenderkopf
- Monatsleiste
- Pflanzenzeile
- Balken / Zeitfenster
- Legende

Die Logik zur Aufbereitung der Pflanzendaten für die Timeline soll ebenfalls sauber getrennt sein.

---

## Anforderungen an die erste Umsetzung
Die erste Version des Kalenders soll:

- die bestehende Platzhalterseite ersetzen
- bereits echte Pflanzendaten verwenden
- eine erste visuelle Timeline zeigen
- professionell und ruhig aussehen
- technisch erweiterbar sein

Noch nicht nötig in der ersten Version:
- komplexe Interaktivität
- Nutzerfilter
- persönliche Gartenlogik
- Drag-and-Drop
- finale Feinheiten der Zeitauflösung

---

## Zielbild
Der Kalender soll sich langfristig zu einer der stärksten Funktionen von Grünkalender entwickeln.

Er soll:
- Pflanzenwissen sichtbar machen
- Planung erleichtern
- Nutzer regelmäßig zurückbringen
- die Grundlage für Vergleiche, Erinnerungen und persönliche Gartenverläufe schaffen

Kurz gesagt:

**Die Pflanzen-Seiten bringen den Nutzer auf die Plattform.  
Der Kalender sorgt dafür, dass er wiederkommt.**