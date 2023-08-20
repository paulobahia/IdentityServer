import { Prisma } from '@prisma/client'

export class User implements Prisma.UserCreateInput {
    id?: string | undefined;
    name: string;
    email: string;
    password: string;
    birthDate: string | Date;
    gender: string;
    role: string;
}
