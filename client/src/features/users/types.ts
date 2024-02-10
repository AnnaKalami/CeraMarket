import { User } from "../auth/types";

export type UsersState = {
    users: User[];
    error: string | undefined;
    // loading: boolean;
  };