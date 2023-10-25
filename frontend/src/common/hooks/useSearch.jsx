import { useEffect, useState } from "react";

export default function useSearch(items, queryString, key) {
    const [filteredItems, setFilteredItems] = useState([]);
    useEffect(() => {
        if (queryString === "") {
            setFilteredItems([]);
            return;
        }
        let newList = items.filter(
            (item) =>
                item[key].substring(0, queryString.length).toLowerCase() ==
                queryString.toLowerCase()
        );
        console.log("Now we update to -> ", newList);
        setFilteredItems(newList);
    }, [queryString]);

    return { filteredItems };
}
