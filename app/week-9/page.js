"use client"

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";
import Header from "./header";

let buttonStyle = "rounded-lg bg-gray-800 drop-shadow-2xl hover:cursor-pointer hover:bg-gray-500";

export default function SignInPage() {

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
        <div>
            <Header />
            <main className="m-5">
                {
                    user ? 
                    (
                        <div className="flex flex-col items-start gap-24 px-10 py-6">
                            <div className="flex flex-col gap-4 items-start">
                                <p className="text-3xl">Welcome,</p>
                                <div className="flex gap-4 px-7 py-5 text-lg rounded-lg bg-gray-900">
                                    <img className="max-w-24" src={user.photoURL} alt={user.displayName} />
                                    <div className="flex flex-col justify-between py-2">
                                        <p>{user.displayName}</p>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                                <button className={buttonStyle + " px-6 py-4 "} onClick={handleSignOut}>Sign Out</button>
                            </div>
                            <Link className={buttonStyle + " px-6 py-4 text-xl "} href="/week-9/shopping-list">Shopping List</Link>
                        </div>
                    ) : 
                    (
                        <div>
                            <button className={buttonStyle + " px-6 py-4 "} onClick={handleSignIn}>Sign In with GitHub</button>
                        </div>
                    )
                }
            </main>
        </div>
    );
}