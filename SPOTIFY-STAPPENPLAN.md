# Stappenplan: liedjes toevoegen via de site (Spotify-koppeling)

Totale tijd: ongeveer 10-15 minuten. Eenmalig te doen.

## Wat er gebeurt

Elke jongen logt op `muziek.html` in met zijn **eigen** Spotify-account,
zoekt een nummer op en klikt op "+". Het nummer wordt direct aan de
gedeelde playlist toegevoegd — geen appjes heen en weer meer.

Hiervoor heb je een gratis "Developer App" bij Spotify nodig. Dat is
puur een technisch ticket dat toegang geeft — er komt niks openbaars
van, en je hoeft niks te betalen.

---

## Fase 1: Spotify Developer App aanmaken (5 minuten)

1. Ga naar https://developer.spotify.com/dashboard
2. Log in met **jouw eigen Spotify-account** (dezelfde als de playlist-eigenaar)
3. Klik op **"Create app"**
4. Vul in:
   - **App name**: bijvoorbeeld `Weekendje Weg Muziek`
   - **App description**: `Liedjes toevoegen aan de weekend-playlist`
   - **Redirect URI**: `https://weekendjeweg.fun/muziek.html`
     (moet EXACT dit zijn, inclusief `https://` en zonder spatie)
   - **Which API/SDKs are you planning to use?**: vink **Web API** aan
5. Vink de akkoordvakjes aan en klik **Save**

## Fase 2: Client ID kopiëren (1 minuut)

1. Je komt nu in het dashboard van je nieuwe app
2. Klik op **"Settings"** (rechtsboven)
3. Kopieer de **Client ID** (een lange reeks letters/cijfers)
4. Je hebt **geen** Client Secret nodig voor deze koppeling — die kun je negeren

## Fase 3: Vrienden toevoegen als gebruiker (2 minuten)

Zolang je app in "Development Mode" staat (de standaardinstelling, en
prima voor dit doel) mogen alleen vooraf toegevoegde Spotify-accounts
inloggen. Dat is precies wat je wilt — alleen de boys, niemand anders.

1. Ga in het dashboard van je app naar **"User Management"**
2. Klik op **"Add new user"**
3. Vul voor elke vriend zijn **naam** en het **e-mailadres van zijn Spotify-account** in
   (het e-mailadres waarmee hij bij Spotify is geregistreerd — vraag dit even na)
4. Herhaal dit voor iedereen die moet kunnen toevoegen (max. 25 personen mogelijk)

> Iemand vergeten? Je kunt dit later altijd nog aanvullen.

## Fase 4: Playlist op "collaborative" zetten (1 minuut)

Dit is nodig zodat anderen dan jijzelf nummers mogen toevoegen.

1. Open de Spotify-app of website
2. Ga naar de playlist (`3nBugj023xWJTNueWNqjfd`)
3. Klik op de drie puntjes **"..."** naast de playlist
4. Kies **"Maak samenwerkingsplaylist"** / **"Make collaborative"**

## Fase 5: Client ID invullen in de site (2 minuten)

1. Open in deze map het bestand `spotify-config.js`
2. Vervang:
   ```javascript
   CLIENT_ID: "VUL-HIER-JE-SPOTIFY-CLIENT-ID-IN",
   ```
   door je eigen Client ID uit Fase 2:
   ```javascript
   CLIENT_ID: "abc123jouweigenclientid",
   ```
3. **Opslaan**
4. Upload `spotify-config.js` (samen met de rest) naar je GitHub-repository,
   zoals je dat ook met `config.js` bij de WK-poule deed

## Fase 6: Testen

1. Ga naar `https://weekendjeweg.fun/muziek.html`
2. Klik op **"Inloggen met Spotify"**
3. Log in met een account dat je in Fase 3 hebt toegevoegd
4. Zoek een nummer en klik op **+**
5. Check of het nummer in de playlist staat

Werkt het? Stuur de link naar de groep, dan kan iedereen zelf nummers toevoegen.

---

## Veelgestelde vragen

**"Geen toestemming"-foutmelding bij het toevoegen?**
De playlist staat waarschijnlijk nog niet op "collaborative" — zie Fase 4.

**Iemand kan niet inloggen ("app niet gevonden voor deze gebruiker")?**
Zijn Spotify-account (met het juiste e-mailadres) staat nog niet in
User Management — zie Fase 3.

**Kan ik meer dan 25 mensen toevoegen?**
Development Mode staat max. 25 gebruikers toe. Voor een vriendengroep
is dat ruim voldoende. Mocht je ooit meer nodig hebben, kun je bij
Spotify een "Extended Quota"-aanvraag indienen — voor dit project niet nodig.

**Is dit veilig?**
Ja. Er wordt geen wachtwoord of geheime sleutel opgeslagen op de site.
Iedereen logt in met zijn eigen Spotify-account en geeft alleen
toestemming om nummers aan playlists toe te voegen (niets anders).
