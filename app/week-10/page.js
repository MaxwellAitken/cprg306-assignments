"use client"

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

let buttonStyle = "rounded-lg bg-gray-800 drop-shadow-2xl hover:cursor-pointer hover:bg-gray-500 px-4 py-3 text-xl";

export default function SignInPage() {

    const {user, gitHubSignIn, firebaseSignOut} = useUserAuth();

    async function handleSignIn() {
        try {
            await gitHubSignIn();
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
        <main className="m-5">
            {
                user ? 
                (
                    <div className="flex flex-col items-start gap-24 px-10 py-6">
                        <div className="flex flex-col gap-4 items-start">
                            <p className="text-3xl">Welcome,</p>
                            <div className="w-full flex gap-4 px-7 py-5 text-lg rounded-lg bg-gray-900">
                                <img className="max-w-24" src={user.photoURL} alt={user.displayName} />
                                <div className="flex flex-col justify-between py-2">
                                    <p>{user.displayName}</p>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-center">
                                <Link className={buttonStyle} href="/week-10/shopping-list">Shopping List</Link>
                                <Link href="/week-10/profile-page" className={buttonStyle}>My Profile</Link>
                                <button className={buttonStyle} onClick={handleSignOut}>Sign Out</button>
                            </div>
                        </div>
                    </div>
                ) : 
                (
                    <div className="py-8 px-6">
                        <div className="text-lg mb-2">Please Sign In:</div>
                        <button className={buttonStyle + " px-6 py-4 "} onClick={handleSignIn}>Sign In with GitHub</button>
                    </div>
                )
            }
        </main>
    );
}