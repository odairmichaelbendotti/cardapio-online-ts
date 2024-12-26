export type CreateUserProps = {
    id: string;
    nomeCompleto: string;
    email: string;
    senha: string;
    whatsApp: string;
    nascimento: Date;
    cep: string;
    cidade: string;
    bairro: string;
    numero: string;
    referencia: string;
    role: boolean;
    authToken: string | null;
    authTokenExpiry: Date | null
    createdAt: Date;
};

export interface PrismaErrorProps {
    code: string;
    meta?: {
        target?: string[];
    };
}