
/* eslint-disable import/prefer-default-export */
import type { Like, User, UserSignIn, UserSignUp, likeId, userId } from '../features/auth/types';
import { ItemId, type Item, ItemWithOutId } from "../features/item/types";

export const fetchLoadItems = async (): Promise<Item[]> => {
  const res = await fetch('/api/items');
  const data: { items: Item[] } = (await res.json()) as { items: Item[] };
  return data.items;
}

export const fetchAddItem = async (item: ItemWithOutId): Promise<Item> => {
  const res = await fetch('/api/items', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  const data: { item: Item } = (await res.json()) as { item: Item };
  return data.item;
};

export const fetchRemoveItem = async (id: ItemId): Promise<ItemId> => {
  const res = await fetch(`/api/items/${id}`, {
    method: 'DELETE',
  });
  const data: { message: string; itemId: ItemId } = (await res.json()) as {
    message: string;
    itemId: ItemId;
  };
  if (data.message !== 'success') {
    throw new Error(data.message);
  }
  return data.itemId;
};
export const fetchCheckUser = async (): Promise<User> => {
  const res = await fetch('/api/auth/check');
  const data: { user: User } = (await res.json()) as { user: User };
  return data.user;
};

export const fetchSignIn = async (user: UserSignIn): Promise<User> => {
  const res = await fetch('/api/auth/sign-in', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data: { message: string; user: User } = (await res.json()) as {
    message: string;
    user: User;
  };
  return data.user;
};

export const fetchSignUp = async (user: UserSignUp): Promise<User> => {
  const res = await fetch('/api/auth/sign-up', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (res.status >= 400) {
    const data: { message: string } = (await res.json()) as { message: string };
    throw new Error(data.message);
  }
  const data: { message: string; user: User } = (await res.json()) as {
    message: string;
    user: User;
  };
  return data.user;
};

export const fetchLogOut = async (): Promise<void> => {
  const res = await fetch('/api/auth/logout');
  const data: { message: string } = (await res.json()) as { message: string };
  if (data.message !== 'success') {
    throw new Error(data.message);
  }
};

export const fetchLike = async ({userId, itemId}:{userId: userId, itemId:ItemId}): Promise<Like> => {
  const res = await fetch('/api/likes', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({userId,itemId}),
  });
  const data: { like: Like } = (await res.json()) as { like: Like };
  return data.like as Like
};



export const fetchDisLike = async ({likeId, userId}:{likeId:likeId, userId:userId}): Promise<likeId> => {
  const res = await fetch(`/api/likes/${likeId}/${userId}`, {
    method: 'DELETE',
  });
  const data: { message: string; likeId: likeId } = (await res.json()) as {
    message: string;
    likeId: likeId;
  };
  if (data.message !== 'success') {
    throw new Error(data.message);
  }
  return data.likeId;
};