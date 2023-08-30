import { UserType } from './user.types';

export interface UserResponseInterface {
  userInterface: UserType & { token: string };
}
