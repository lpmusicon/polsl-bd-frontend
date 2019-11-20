import { UserDTO } from './UserDto';

export interface AuthDTO extends UserDTO
{
    password: string;
    token: string;
}