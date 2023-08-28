import { IsNotEmpty, IsString } from "class-validator";
import { MessagesHelper } from "src/helpers/messages.helper";

export class CreateRestaurantDto {
    @IsNotEmpty({ message: MessagesHelper.NAME_REQUIRED })
    @IsString()
    name: string;
}
