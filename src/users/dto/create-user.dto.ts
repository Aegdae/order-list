export enum UserType {
    USER = 'USER',
    ADMIN = 'ADMIN'
}


export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    address: string;
    userType: UserType.USER;
}
