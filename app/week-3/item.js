


export default function Item({name, quantity, category}) {


    return(
        <li className="pr-40 pl-2 py-2 bg-green-200 bg-opacity-10">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="ml-4 mt-0.5">
                - Buy  <span className="underline underline-offset-2">{quantity}</span> in <span className="italic">{category}</span>
            </p>
        </li>
    )
}
