export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  rpassword: string;
  img: string;
};

export type AuthState = {
  auth: User | undefined;
  error: string | undefined;
};

export type UserSignIn = Omit<User, 'id' | 'img' | 'name' | 'rpassword'>;

export type UserSignUp = Omit<User, 'id'> & { rpassword: string };

export type UserWithOutId = Omit<User, 'id'>;
