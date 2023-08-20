import { z } from 'zod';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

enum Roles {
    ADMIN = "ADMIN",
    WAITER = "WAITER",
    KITCHEN = "KITCHEN",
    MANAGER = "MANAGER"
}

export const CreateUserDto = z.object({
    name: z.string().nonempty({ message: MessagesHelper.NAME_REQUIRED }),
    email: z.string().nonempty({ message: MessagesHelper.EMAIL_REQUIRED }).email({ message: MessagesHelper.EMAIL_VALID }),
    password: z.string().nonempty({ message: MessagesHelper.PASSWORD_REQUIRED }).min(8).refine(password => RegExHelper.password.test(password), { message: MessagesHelper.PASSWORD_VALID, path: ['password'], }),
    birthDate: z.string().datetime({ message: MessagesHelper.BIRTHDATE_REQUIRED }),
    gender: z.string({ required_error: MessagesHelper.GENDER_REQUIRED }),
    role: z.enum([Roles.ADMIN, Roles.WAITER, Roles.KITCHEN, Roles.MANAGER]).refine(role => Object.values(Roles).includes(role), { message: MessagesHelper.ROLE_INVALID, path: ['role'] })
});

export type CreateUserDtoType = z.infer<typeof CreateUserDto>;