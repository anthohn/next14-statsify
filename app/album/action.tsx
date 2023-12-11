"use server";

import React from "react";
import { getAlbumInfo } from "../spotify";
import Album from "./Album";

export default async function TopGenres() {
  const albumInfo = await getAlbumInfo();

  const data = albumInfo?.albums?.items.map((item) => ({
    url: item.external_urls?.spotify,
    image: item.images?.[0],
    name: item.name,
    release_date: item.release_date,
    artist: item.artists?.[0]?.name,
  }));

  return (
    <div>
      {data
        .filter((album) => album?.image?.url)
        .map((album) => (
          <div key={`${album.artist}-${album.name}`}>
            <Album {...album} allowAdd={true} />
          </div>
        ))}
    </div>
  );
}
