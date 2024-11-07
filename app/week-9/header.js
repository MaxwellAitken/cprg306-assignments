"use client"

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

let headerStyle = "sticky z-50 top-0 flex justify-between items-center py-4 px-8 bg-gray-900 bg-opacity-95";
let buttonStyle = "rounded-lg bg-gray-800 drop-shadow-2xl hover:cursor-pointer hover:bg-gray-500";

export default function Header(){

    const {user, gitHubSignIn, firebaseSignOut} = useUserAuth();

    async function handleSignIn() {
        try {
            await gitHubSignIn();
            window.location.href = "/week-9/shopping-list";
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSignOut() {
        try {
            await firebaseSignOut();
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className={headerStyle}>
            <h1 className="text-4xl font-bold">Shopping List</h1>
            {user ?
            (
                <div className="flex gap-4 items-center">
                    <Link href="/week-9/profile-page" className="flex gap-4 items-center">
                        <img className="max-h-8" src={user.photoURL} alt={user.displayName} />
                        <div className="flex flex-col justify-between py-2">
                            <p>{user.displayName}</p>
                        </div>
                    </Link>
                    <button className={buttonStyle + " px-3 py-2 "} onClick={handleSignOut}>Sign Out</button>
                </div>
            ) :
            (
                <div>
                    <button className={buttonStyle + " px-6 py-4 "} onClick={handleSignIn}>Sign In with GitHub</button>
                </div>
            )}
        </div>
    );
}