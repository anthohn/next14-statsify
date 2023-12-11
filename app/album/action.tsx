"use server";

import React from "react";
import { getAlbumInfo } from "../spotify";
import Album from "./Album";

export default async function TopGenres() {

      const data = await Promise.all([
        getAlbumInfo().then((info) => ({
          url: info?.albums?.items[0]?.external_urls?.spotify,
          image: info?.albums?.items[0]?.images?.[0],
          name: info?.albums?.items[0]?.name,
          release_date: info?.albums?.items[0]?.release_date,
          artist: info?.albums?.items[0]?.artists?.[0]?.name,
        }))
      ]);
      return (
        
      // <pre>{JSON.stringify(data)}</pre>
      
        <div className="grid grid-cols-2">
          {data
            .filter((album) => album?.image?.url)
            .map((album) => (
              <div key={`${album.artist}-${album.name}`} className="p-1">
                <Album {...album} allowAdd={true} />
              </div>
            ))}
        </div>
      );
}
