import { useEffect, useState } from "react";

export default function useSearch(items, queryString, key) {
    const [filteredItems, setFilteredItems] = useState([]);
    useEffect(() => {
        if (queryString === "") {
            setFilteredItems([]);
            return;
        }
        let newList = items.filter((item) => {
            return item[key].toLowerCase().includes(queryString.toLowerCase());
        });
        setFilteredItems(newList);
    }, [queryString]);

    return { filteredItems };
}
