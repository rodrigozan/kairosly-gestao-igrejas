import { IsString, IsNotEmpty, IsOptional, IsUrl, IsArray, ValidateNested, IsMongoId, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

// DTO for SocialLink subdocument
class SocialLinkDto {
    @IsNotEmpty({ message: 'A plataforma do link social é obrigatória.' })
    @IsString()
    platform!: string;

    @IsNotEmpty({ message: 'A URL do link social é obrigatória.' })
    @IsUrl({}, { message: 'URL do link social inválida.' })
    url!: string;
}

// DTO for ServiceTime subdocument
class ServiceTimeDto {
    @IsNotEmpty({ message: 'O dia da semana do serviço é obrigatório.' })
    @IsString()
    dayOfWeek!: string;

    @IsNotEmpty({ message: 'O horário do serviço é obrigatório.' })
    @IsString()
    time!: string;

    @IsOptional()
    @IsString()
    description?: string;
}

// DTO for Address subdocument
class AddressDto {
    @IsOptional()
    @IsString()
    street?: string;

    @IsOptional()
    @IsString()
    number?: string;

    @IsOptional()
    @IsString()
    complement?: string;

    @IsOptional()
    @IsString()
    neighborhood?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    state?: string;

    @IsOptional()
    @IsString()
    zipCode?: string;
}

// DTO for registering a new church (Master only)
export class RegisterChurchDto {
    @IsNotEmpty({ message: 'O nome da igreja é obrigatório.' })
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    history?: string;

    @IsOptional()
    @IsString()
    mission?: string;

    @IsOptional()
    @IsString()
    vision?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    values?: string[];

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => AddressDto)
    address?: AddressDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ServiceTimeDto)
    serviceTimes?: ServiceTimeDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SocialLinkDto)
    socialLinks?: SocialLinkDto[];

    @IsOptional()
    @IsUrl({}, { message: 'URL da imagem inválida.' })
    imageUrl?: string;

    @IsOptional()
    @IsString()
    youtubeChannelId?: string;
}

// DTO for updating church info (Admin/Master)
// Similar to RegisterChurchDto but all fields are optional
// and name/registeredBy cannot be updated here.
export class UpdateChurchInfoDto {
    @IsOptional()
    @IsString()
    history?: string;

    @IsOptional()
    @IsString()
    mission?: string;

    @IsOptional()
    @IsString()
    vision?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    values?: string[];

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => AddressDto)
    address?: AddressDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ServiceTimeDto)
    serviceTimes?: ServiceTimeDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SocialLinkDto)
    socialLinks?: SocialLinkDto[];

    @IsOptional()
    @IsUrl({}, { message: 'URL da imagem inválida.' })
    imageUrl?: string;

    @IsOptional()
    @IsString()
    youtubeChannelId?: string;
}

