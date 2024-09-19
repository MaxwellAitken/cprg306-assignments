import ItemList from "./item-list";


export default function Page() {
    return (
        <main className="p-6 bg-green-900 bg-opacity-15">
            <h1 className="text-4xl font-bold mb-10">Shopping List</h1>
            <ItemList />
        </main>
    );
}