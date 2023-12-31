import { ArrayNotEmpty, IsArray, IsOptional, IsString, IsUUID, Matches, MaxLength } from "class-validator";

export class GetPersonResponseDto {
  @IsUUID()
  id?: string;

  @IsString()
  @MaxLength(32)
  apelido: string;

  @IsString()
  @MaxLength(100)
  nome: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  nascimento: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MaxLength(32, { each: true })
  stack?: string[];
}
