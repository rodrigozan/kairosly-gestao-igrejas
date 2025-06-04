import { IsEmail, IsString, MinLength, IsOptional, IsDateString, IsUrl, IsMongoId, IsEnum, ValidateNested, IsArray, ArrayMinSize, ArrayMaxSize, IsNotEmpty } from 'class-validator'; // Added IsNotEmpty
import { Type } from 'class-transformer';
import { UserRole } from '../models/User'; // Assuming UserRole enum is exported from User model

// DTO for updating user profile
export class UpdateProfileDto {
    @IsOptional()
    @IsString({ message: 'O nome deve ser um texto.' })
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Formato de e-mail inválido.' })
    email?: string;

    @IsOptional()
    @MinLength(6, { message: 'A nova senha deve ter no mínimo 6 caracteres.' })
    password?: string;

    @IsOptional()
    @IsString()
    confirmPassword?: string; // Validation logic (password === confirmPassword) should be in the controller/service

    @IsOptional()
    @IsDateString({}, { message: 'Formato de data de nascimento inválido.' })
    birthDate?: string;

    @IsOptional()
    @IsUrl({}, { message: 'URL da foto inválida.' })
    photoUrl?: string;
}

// DTO for adding a family member
export class AddFamilyMemberDto {
    @IsNotEmpty({ message: 'O ID do membro da família é obrigatório.' })
    @IsMongoId({ message: 'ID do membro da família inválido.' })
    memberUserId!: string;

    @IsNotEmpty({ message: 'O relacionamento é obrigatório.' })
    @IsString()
    relationship!: string;
}

// DTO for assigning role/church by Admin/Master
export class AssignUserDto {
    @IsOptional()
    @IsEnum(UserRole, { message: 'Papel inválido.' })
    role?: UserRole;

    @IsOptional() // Allow null to remove from church (only for Master)
    @IsMongoId({ message: 'ID da igreja inválido.' })
    churchId?: string | null;
}

