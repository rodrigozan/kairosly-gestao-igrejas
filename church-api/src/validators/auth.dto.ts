import { IsEmail, IsString, MinLength, MaxLength, Matches, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    @IsString()
    name!: string;

    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    @IsEmail({}, { message: 'Formato de e-mail inválido.' })
    email!: string;

    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    password!: string;

    @IsNotEmpty({ message: 'A confirmação de senha é obrigatória.' })
    confirmPassword!: string;

    // churchId é opcional no registro inicial, pode ser adicionado depois
    // @IsOptional()
    // @IsMongoId({ message: 'ID da igreja inválido.' })
    // churchId?: string;
}

export class LoginDto {
    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    @IsEmail({}, { message: 'Formato de e-mail inválido.' })
    email!: string;

    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @IsString()
    password!: string;
}

