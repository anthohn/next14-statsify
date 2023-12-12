import { getServerSession } from "next-auth";
import { getToken } from "./spotify";
import HomeSection from "@/app/components/HomeSection";

export default async function Page() {
    return (
      <>
      <main className="flex flex-col mx-auto max-w-6xl">
          <HomeSection />
        </main>
      </>
    )
  }
  