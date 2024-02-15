export type Item = {
    id: number;
    name:string
    description: string;
    price:number;
    user_id: number;
    ItemGallery: ItemGallery
  };
  
export type ItemGallery = {
    id: number;
    item_id: number;
    ItemImages: ItemImage[]|[]
  };
export type ItemImage = {
    id: number;
    path: string;
    itemGallery_id: number;
  };
  
  export type ItemId = Item['id'];
  
  export type ItemWithOutId = Omit<Item, 'id'|'ItemGallery'| 'user_id'>;
  export type ItemWithOutIncludes = Omit<Item, 'ItemGallery'>;
  
  export type ItemsState = {
    items: Item[];
    error: string | undefined;
    loading: boolean;
  };
  
