"use client"

import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";

let buttonStyle = "rounded-lg bg-gray-800 drop-shadow-2xl hover:cursor-pointer hover:bg-gray-500";

export default function ProfilePage(){

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

    return(
        <main className="m-5">
            {
                user ? 
                (
                    <div className="flex flex-col items-start gap-24 px-10 py-6">
                        <div className="flex flex-col gap-4 items-start">
                            <p className="text-4xl mb-8 ">Your GitHub Profile</p>
                            <div className="flex gap-4 items-center">
                                <p className="text-xl">Profile Picture:</p>
                                <img className="max-h-12" src={user.photoURL} alt={user.displayName} />
                            </div>
                            <div className="flex gap-4">
                                <p className="text-xl">Display name:</p>
                                <p className="text-xl">{user.displayName}</p>
                            </div>
                            <div className="flex gap-4">
                                <p className="text-xl">Email:</p>
                                <p className="text-xl">{user.email}</p>
                            </div>
                            <div className="flex gap-4">
                                <p className="text-xl">Last sign in:</p>
                                <p className="text-xl">{user.metadata.lastSignInTime}</p>
                            </div>
                            <Link className={buttonStyle + " px-6 py-4 text-xl mt-8"} href="/week-10/shopping-list">My Shopping List</Link>
                            <button className={buttonStyle + " px-6 py-4 mt-10 "} onClick={handleSignOut}>Sign Out</button>
                        </div>
                    </div>
                ) : 
                (
                    <div className="py-8 px-6">
                        <div className="text-lg mb-2">Sign in to view your profile.</div>
                        <button className={buttonStyle + " px-6 py-4 "} onClick={handleSignIn}>Sign In with GitHub</button>
                    </div>
                )
            }
        </main>
    )
}