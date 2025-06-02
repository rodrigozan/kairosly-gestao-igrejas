import { IsString, IsNotEmpty, IsOptional, IsUrl, IsDateString, IsMongoId } from 'class-validator';

export class CreateEventDto {
    @IsNotEmpty({ message: 'O título do evento é obrigatório.' })
    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty({ message: 'A data do evento é obrigatória.' })
    @IsDateString({}, { message: 'Formato de data inválido.' })
    date!: string; // Receber como string ISO 8601 ou similar

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsUrl({}, { message: 'URL da imagem inválida.' })
    imageUrl?: string;

    // churchId will be inferred from the user's token
}

export class UpdateEventDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Formato de data inválido.' })
    date?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsUrl({}, { message: 'URL da imagem inválida.' })
    imageUrl?: string;
}

