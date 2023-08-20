import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  restaurantId: string;
}
