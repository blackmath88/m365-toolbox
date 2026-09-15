# m365-toolbox

Kleine Browser-Werkzeuge aus der M365-Schulungsreihe der Universität Basel.
Jedes beantwortet genau eine Frage, läuft ohne Anmeldung und ohne Server.

| | Werkzeug | Frage |
|---|---|---|
| 1 | `team-channel-chat/` | Team, Channel oder Chat — welche Struktur passt? |
| 2 | `sharepoint-onedrive/` | SharePoint oder OneDrive — wo gehört die Datei hin? |
| 3 | `team-personas/` | Welches Standard-Setup passt zu diesem Team-Typ? |

## Technik

Statisches HTML, Vanilla JavaScript, kein Build-Schritt, keine externen Abhängigkeiten.
Jede Datei läuft auch offline per Doppelklick.
Gemeinsame Farben und Basiskomponenten liegen in `assets/tokens.css`.

## Deployment (Cloudflare Pages)

1. Repository verbinden
2. Framework preset: **None**
3. Build command: leer lassen
4. Build output directory: `/`

Jeder Branch bekommt eine eigene Preview-URL — praktisch, um ein halbfertiges
Werkzeug in einer Schulung zu zeigen, ohne es zu veröffentlichen.

## Anpassen für die eigene Hochschule

Inhalte und Logik stehen jeweils oben im `<script>`-Block:

- `team-channel-chat/` — der Entscheidungsbaum liegt in den Objekten `N` (Knoten) und `E` (Kanten).
  Beide speisen gleichzeitig den Fragen-Assistenten und die SVG-Übersicht.
  Koordinaten sind von Hand gesetzt; wer Knoten verschiebt, prüft die Übersicht anschliessend.
- `sharepoint-onedrive/` — die acht Situationen stehen im Array `SZENEN`.
- `team-personas/` — die sechs Personas stehen im Array `P`.

Farben in `assets/tokens.css` austauschen, fertig.

## Inhaltlicher Vorbehalt

Die Setups, Namenskonventionen und Datenschutzhinweise bilden die Praxis an der
Universität Basel ab. Vor der Verwendung an einer anderen Institution inhaltlich prüfen.

## Lizenz

CC BY 4.0 — verwenden, anpassen, weitergeben mit Quellenangabe.
