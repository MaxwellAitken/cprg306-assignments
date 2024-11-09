"use client"

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context"
import Link from "next/link";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { getItems, addItem } from "../_services/shopping-list-service";


export default function Page() {

    const {user} = useUserAuth();

    const [items, setItems] = useState([]);

    const [selectedItemName, setSelectedItemName] = useState("");

    const handleAddItem = (event) => {
        addItem(user.uid, event);
        const newList = items.concat(event);
        setItems(newList);
    }

    function handleItemSelect (name){
        let newName = name.replace(
            /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,''
        )
        .trim()
        .split(',')[0];
        setSelectedItemName(newName);
    }
    
    async function loadItems(){
        try {
            const items = await getItems(user.uid);
            setItems(items);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (user) {
            loadItems();
        }
    }, [user]);


    return (
        <main>
            {user ?
            (
                <div className="flex gap-16 px-12 py-8">
                    <div className="flex-1 flex flex-col gap-8">
                        <NewItem onAddItem={handleAddItem} />
                        {items ?
                        (
                            <ItemList onItemSelect={handleItemSelect} items={items} />
                        ) :
                        (
                            <div>No items yet</div>
                        )}
                    </div>
                    <div className="flex-1 mt-4">
                        <MealIdeas ingredient={selectedItemName} />
                    </div>
                </div>
            ) :
            (
                <div className="flex flex-col items-start gap-6 mx-12 my-10">
                    <p>You are not signed in</p>
                    <Link className="px-6 py-4 rounded-lg bg-gray-800 drop-shadow-2xl hover:cursor-pointer hover:bg-gray-500" href="/week-10">Return to sign in</Link>
                </div>
            )}
        </main>
    );
}