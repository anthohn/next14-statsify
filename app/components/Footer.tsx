import Link from "next/link";

export default function Footer() {
  return (
    <>
        <footer className="bg-white rounded-lg shadow-2xl m-8">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center">© 2023 
            {/* <a href="https://flowbite.com/" className="hover:underline">Statsify</a> */}
            <Link className="hover:underline" href="/"> Statsify</Link>
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500sm:mt-0">
                <li>
                    <p>We are not affiliated with Spotify AB or any of its partners in any capacity.</p>
                </li>
            </ul>
            </div>
        </footer>
    </>
  );
}