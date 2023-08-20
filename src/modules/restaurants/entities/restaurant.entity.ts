import { Prisma } from "@prisma/client";

export class Restaurant implements Prisma.RestaurantUncheckedCreateInput {
    name: string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutRestaurantInput | undefined;
}