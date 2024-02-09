import { Item } from "../features/item/types";

export const fetchLoadItems = async (): Promise<Item[]> => {
    const res = await fetch('/api/items');
    const data: { items: Item[] } = (await res.json()) as { items: Item[] };
    return data.items;
}