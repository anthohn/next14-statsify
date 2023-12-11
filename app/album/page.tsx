import AlbumsProvider from "./AlbumProvider";
import TopGenres from "./action";

// export const runtime = "edge";

export default function Page() {
  return (
    <AlbumsProvider>
        <TopGenres />
    </AlbumsProvider>
  );
}
