import { getServerSession } from "next-auth"
import { getToken } from "./spotify";

export default async function Page() {
  const session = await getServerSession();
  const spotifyToken = await getToken();

    return (
      <>
        {
        session?.user? (
            <div>
              {session?.user?.email} <br/>
              {session?.user?.name}
              {spotifyToken}
            </div>
          ) : 
          (
            <div>Not logged in</div>
          )
        }
      </>
    )
  }
  