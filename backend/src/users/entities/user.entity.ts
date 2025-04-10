export enum UserType {
    User,
    Admin,
}

export class User {
    email: string;
    name: string;
    password: string;
    created: Date;
    active: boolean;
    type: UserType;
}
