// spotify-config.js
//
// Configuratie voor de "Muziek toevoegen"-pagina (muziek.html).
// Hiermee kunnen de boys inloggen met hun eigen Spotify-account en
// direct nummers aan de gedeelde playlist toevoegen.
//
// Volg SPOTIFY-STAPPENPLAN.md om je eigen Client ID te krijgen —
// dat duurt ongeveer 10 minuten. Vul 'm hieronder in.

export const SPOTIFY_CONFIG = {
  // Client ID uit je Spotify Developer Dashboard (Fase 1 van het stappenplan)
  CLIENT_ID: "VUL-HIER-JE-SPOTIFY-CLIENT-ID-IN",

  // Moet EXACT overeenkomen met de Redirect URI die je bij Spotify hebt ingesteld.
  // Wordt automatisch goed gezet zolang muziek.html op je eigen domein staat.
  REDIRECT_URI: window.location.origin + window.location.pathname.replace(/[^/]*$/, "muziek.html"),

  // De playlist die de boys mogen aanvullen
  PLAYLIST_ID: "3nBugj023xWJTNueWNqjfd",

  // Rechten die we aan Spotify vragen: alleen nummers toevoegen aan playlists
  SCOPES: "playlist-modify-public playlist-modify-private",
};
