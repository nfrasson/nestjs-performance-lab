import { IsUUID } from "class-validator";

export class GetPersonInputDto {
  @IsUUID()
  id: string;
}
