

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  rpassword: string;
  img: string;
  isMaster: boolean;
  Likes: Like[]|[]
  isAdmin:boolean
};

export type Like = {
  id:number
  user_id:number
  item_id:number
}


export type AuthState = {
  auth: User | undefined;
  error: string | undefined;
};

export type UserSignIn = Omit<User, 'id' | 'img' | 'name' |'Likes' |'rpassword' | 'isMaster'| 'isAdmin'>;

export type UserSignUp = Omit<User, 'id'|'Likes'> & { rpassword: string };

export type userId = User['id']

export type likeId = Like['id']

export type UserWithOutId = Omit<User, 'id'>;
