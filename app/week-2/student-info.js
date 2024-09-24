import Link from "next/link";



export default function StudentInfo(){
    return(
        <main>
            <h3>Maxwell Aitken</h3>
            <Link href="https://github.com/MaxwellAitken/cprg306-assignments" className="hover:underline hover:text-amber-700">My GitHub</Link>
        </main>
    );
}