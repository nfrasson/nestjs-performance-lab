import { IsString, MinLength } from "class-validator";

export class GetPersonsInputDto {
  @IsString()
  @MinLength(1)
  t: string;
}
