import ItemList from "./item-list";


export default function Page() {
    return (
        <main className="p-6 flex justify-center">
            <div className="flex flex-col items-center gap-8 p-6 px-16 rounded-lg bg-gray-800">
                <h1 className="text-4xl font-bold">Shopping List</h1>
                <ItemList />
            </div>
        </main>
    );
}