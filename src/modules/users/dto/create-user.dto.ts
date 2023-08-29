import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';

export class CreateUserDto {

  @IsNotEmpty({ message: MessagesHelper.NAME_REQUIRED })
  @IsString()
  name: string;

  @IsNotEmpty({ message: MessagesHelper.EMAIL_REQUIRED })
  @IsEmail({}, { message: MessagesHelper.EMAIL_VALID })
  email: string;

  @IsNotEmpty({ message: MessagesHelper.PASSWORD_REQUIRED })
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @IsNotEmpty({ message: MessagesHelper.BIRTHDATE_REQUIRED })
  birthDate: Date;

  @IsNotEmpty({ message: MessagesHelper.GENDER_REQUIRED })
  gender: string;

  @IsNotEmpty({ message: MessagesHelper.ROLE_REQUIRED })
  role: string;

  @IsNotEmpty({ message: MessagesHelper.RESTAURANTID_REQUIRED })
  restaurantId: string;
}

export class PostUserDto {

  @IsNotEmpty({ message: MessagesHelper.NAME_REQUIRED })
  @IsString()
  name: string;

  @IsNotEmpty({ message: MessagesHelper.EMAIL_REQUIRED })
  @IsEmail({}, { message: MessagesHelper.EMAIL_VALID })
  email: string;

  @IsNotEmpty({ message: MessagesHelper.PASSWORD_REQUIRED })
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @IsNotEmpty({ message: MessagesHelper.BIRTHDATE_REQUIRED })
  birthDate: Date;

  @IsNotEmpty({ message: MessagesHelper.GENDER_REQUIRED })
  gender: string;

  @IsNotEmpty({ message: MessagesHelper.RESTAURANTID_REQUIRED })
  restaurantCode: string;
}
