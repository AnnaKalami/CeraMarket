export type Item = {
    id: number;
    description: string;
    price:number;
    user_id: number;
    ItemGallery: ItemGallery
  };
  
export type ItemGallery = {
    id: number;
    item_id: number;
    ItemImages: ItemImage[]
  };
export type ItemImage = {
    id: number;
    path: string;
    itemGallery_id: number;
  };
  
  export type ItemId = Item['id'];
  
  export type ItemWithOutId = Omit<Item, 'id'>;
  
  export type ItemsState = {
    items: Item[];
    error: string | undefined;
    loading: boolean;
  };
  
