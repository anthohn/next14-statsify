export interface Artist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
  images: Array<{ url: string }>;
}

export interface TopTrack {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
  album: {
    images: Array<{ url: string }>;
  };
  artists: Artist[];
  played_at: string;
}

export interface RecentlyPlayedTrack {
  track: {
    id: string;
    name: string;
    external_urls: {
      spotify: string;
    };
    album: {
      images: Array<{ url: string }>;
    };
    artists: Artist[];
  };
  played_at: string;
}