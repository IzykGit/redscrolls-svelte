export interface IUser {
    id?: string;
    username: string,
    password: string,
    passwordConfirm: string,
    email: string,
    emailVisibility: boolean
}