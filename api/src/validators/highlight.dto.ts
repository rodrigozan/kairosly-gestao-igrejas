import { IsString, IsNotEmpty, IsOptional, IsUrl, IsMongoId } from 'class-validator';

export class CreateHighlightDto {
    @IsNotEmpty({ message: 'O título do destaque é obrigatório.' })
    @IsString()
    title!: string;

    @IsNotEmpty({ message: 'A URL da imagem é obrigatória.' })
    @IsUrl({}, { message: 'URL da imagem inválida.' })
    imageUrl!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl({}, { message: 'URL do link inválida.' })
    link?: string;

    // churchId will be inferred from the user's token or route param
}

export class UpdateHighlightDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsUrl({}, { message: 'URL da imagem inválida.' })
    imageUrl?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl({}, { message: 'URL do link inválida.' })
    link?: string;
}

