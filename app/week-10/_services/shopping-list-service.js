import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export async function getItems(userId){
    try {
        const allItems = collection(db, "users", userId, "items");
        const allItemsQuery = query(allItems);
        const allItemsSnapshot = await getDocs(allItemsQuery);

        let itemList = [];

        allItemsSnapshot.forEach((doc) => {
            let thisItem = {
                id: doc.id,
                ...doc.data()
            };
            itemList.push(thisItem);
        });

        return itemList;
    } catch (error) {
        console.error(error);
    }
}

export async function addItem(userId, item) {
    try {
        const newItemReference = collection(db, "users", userId, "items");
        await addDoc(newItemReference, item);
    } catch (error){
        console.error(error);
    }
}
