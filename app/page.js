import Link from "next/link";


export default function Home() {
  return (
    <main className="flex flex-col gap-10 p-20">
      <h1 className="text-4xl font-bold">CPRG 306: Web Development 2 - Assignments</h1>
      <div>
        <ul>
          <li>
            <Link href="/week-2" className="hover:underline hover:text-amber-700">Week 2 Assignment</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
