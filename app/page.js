import Link from "next/link";


export default function Home() {

  let linkStyles = "hover:underline hover:text-amber-700";

  return (
    <main className="flex flex-col gap-10 p-20">
      <h1 className="text-4xl font-bold">CPRG 306: Web Development 2 - Assignments</h1>
      <div>
        <ul>
          <li>
            <Link href="/week-2" className={linkStyles}>Week 2 Assignment</Link>
          </li>
          <li>
            <Link href="/week-3" className={linkStyles}>Week 3 Assignment</Link>
          </li>
          <li>
            <Link href="/week-4" className={linkStyles}>Week 4 Assignment</Link>
          </li>
          <li>
            <Link href="/week-5" className={linkStyles}>Week 5 Assignment</Link>
          </li>
          <li>
            <Link href="/week-6" className={linkStyles}>Week 6 Assignment</Link>
          </li>
          <li>
            <Link href="/week-7" className={linkStyles}>Week 7 Assignment</Link>
          </li>
          <li>
            <Link href="/week-8" className={linkStyles}>Week 8 Assignment</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
