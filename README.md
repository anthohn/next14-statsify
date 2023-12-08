# Spotify Stats

This project was created to apply my Next.js and NextAuth.js knowledge by creating a Spotify statistics tracking web app.

## Overview

Spotify Stats is a personalized statistics tracking web application that allows users to connect their Spotify account and visualize their music listening habits. With this application, users can view their top artists, top tracks, favorite genres, and recently played songs.

## Planned Features

- **Spotify Authentication**: Users can log in with their Spotify accounts using the Spotify API.
- **Top Artists and Tracks**: Display the user's most listened-to artists and tracks.
- **Favorite Genres**: Analyze and showcase the user's top genres based on listening history.
- **Recently Played**: Provide a list of recently played songs for quick reference.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-rendered React applications.
- [NextAuth.js](https://next-auth.js.org/) - Authentication library for Next.js.
- [Spotify API](https://developer.spotify.com/documentation/web-api/) - Access Spotify user data.

## Development Environment

1. Clone the repository:

    ```bash
    git clone https://github.com/anthohn/spotify-stats.git
    ```

2. Install dependencies:

    ```bash
    cd spotify-stats
    npm install
    ```

3. Set up environment variables:

    Create a `.env.local` file in the root directory and add your Spotify API credentials:

    ```env
    SPOTIFY_CLIENT_ID=your-client-id
    SPOTIFY_CLIENT_SECRET=your-client-secret
    NEXTAUTH_URL=http://localhost:3000
    ```

    Replace `your-client-id` and `your-client-secret` with your Spotify application credentials.

4. Run the application:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.
