import { Request, Response, NextFunction } from 'express';
import { validate as classValidate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

// Função para formatar os erros de validação
const formatValidationErrors = (errors: ValidationError[]): string[] => {
    let messages: string[] = [];
    errors.forEach((err) => {
        if (err.constraints) {
            messages = messages.concat(Object.values(err.constraints));
        }
        // Recursivamente formata erros aninhados (se houver)
        if (err.children && err.children.length > 0) {
            messages = messages.concat(formatValidationErrors(err.children));
        }
    });
    return messages;
};

// Middleware de validação
export const validate = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Converte o corpo da requisição (plain object) para uma instância da classe DTO
        const dtoInstance = plainToInstance(dtoClass, req.body);

        // Valida a instância do DTO
        const errors = await classValidate(dtoInstance, {
            whitelist: true, // Remove propriedades não definidas no DTO
            forbidNonWhitelisted: true, // Lança erro se propriedades não definidas forem enviadas
            skipMissingProperties: false, // Não pula propriedades ausentes
        });

        // Se houver erros, retorna uma resposta 400 com as mensagens de erro
        if (errors.length > 0) {
            const errorMessages = formatValidationErrors(errors);
            return res.status(400).json({ 
                status: 'error',
                message: 'Erro de validação.',
                errors: errorMessages 
            });
        }

        // Se a validação passar, anexa o DTO validado à requisição (opcional, mas útil)
        req.body = dtoInstance;
        next(); // Passa para o próximo middleware ou controlador
    };
};

