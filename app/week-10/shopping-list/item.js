


export default function Item({name, quantity, category, onSelect}) {

    return(
        <li onClick={() => onSelect(name)} className="px-3 py-2 rounded-lg bg-gray-800 drop-shadow-2xl hover:cursor-pointer hover:bg-gray-500">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="ml-2 text-sm">
                - Buy {quantity} in 
                <span className="italic"> {category}</span>
            </p>
        </li>
    )
}
