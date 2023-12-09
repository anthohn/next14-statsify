import { Buffer } from "buffer";
import { Mutex } from "async-mutex";

let cachedToken: Promise<string> | null = null;

const tokenMutex = new Mutex();

export async function getToken() {
    return tokenMutex.runExclusive(async () => {
      if (!cachedToken) {
        console.log("Fetching Spotify token");
        const creds = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
        const encodedCreds = Buffer.from(creds).toString("base64");
  
        cachedToken = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            Authorization: `Basic ${encodedCreds}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials",
        })
          .then((res) => res.json())
          .then((res) => res.access_token);
           // Afficher le token
           console.log("Spotify Token:", cachedToken);
      }
      return cachedToken;
    });
}
