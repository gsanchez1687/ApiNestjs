export class CreateUserDto{
    readonly name: string;
    readonly second_name: string;
    readonly surname: string;
    readonly second_surname: string;
    readonly email: string;
    readonly email_verified_at: Date;
    readonly username: string;
    readonly password: string;
    readonly phone: string;
    readonly address: string;
    readonly remember_token: string;
    readonly deleted_at: Date;
    readonly created_at: Date;
    readonly updated_at: Date;
}