export interface CreateUserProps {
    name: string
    email: string
    password: string
    whatsApp: string
    aniversario: string
    cep: string
    cidade: string
    bairro: string
    numero: string
    referencia: string
}

export interface PrismaErrorProps {
    code: string;
    meta?: {
        target?: string[];
    };
}