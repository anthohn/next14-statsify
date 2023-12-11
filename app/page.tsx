import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();

  return (
    <>
 
    </>
  );
}
