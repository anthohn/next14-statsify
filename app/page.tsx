import { getServerSession } from "next-auth"

export default async function Page() {
  const session = await getServerSession();

    return (
      <>
        {
        session?.user? (
            <div>
              {session?.user?.email} <br/>
              {session?.user?.name}
            </div>
          ) : 
          (
            <div>Not logged in</div>
          )
        }
      </>
    )
  }
  