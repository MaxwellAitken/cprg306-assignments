"use client"

import { useUserAuth } from "../_utils/auth-context";
import Header from "../header";
import Link from "next/link";

let buttonStyle = "rounded-lg bg-gray-800 drop-shadow-2xl hover:cursor-pointer hover:bg-gray-500";

export default function ProfilePage(){

    const {user, gitHubSignIn, firebaseSignOut} = useUserAuth();

    console.dir(user);

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

    console.dir(user);

    return(
        <div>
            <Header />
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
                                <Link className={buttonStyle + " px-6 py-4 text-xl mt-8"} href="/week-9/shopping-list">My Shopping List</Link>
                                <button className={buttonStyle + " px-6 py-4 mt-10 "} onClick={handleSignOut}>Sign Out</button>
                            </div>
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
    )
}