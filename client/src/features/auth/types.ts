export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  img: string;
  isMaster: boolean;
  Likes: Like[];
  isAdmin: boolean;
};

export type Like = {
  id: number;
  user_id: number;
  item_id: number;
};

export type AuthState = {
  auth: User | undefined;
  error: string | undefined;
  name: string;
  password: string;
  rpassword: string;
  email: string;
  nameError: string | undefined;
  passwordError: string | undefined;
  emailError: string | undefined;
};

export type UserSignIn = Omit<
  User,
  'id' | 'img' | 'name' | 'Likes' | 'rpassword' | 'isMaster' | 'isAdmin'
>;


export type UserSignUp = Omit<User, 'id'|'Likes'| 'isAdmin'> & { rpassword: string };

export type UserId = User['id']

export type LikeId = Like['id']


export type UserWithOutId = Omit<User, 'id'>;
