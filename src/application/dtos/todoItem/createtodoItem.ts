import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class CreateTodoItemDTO {
  @IsString()
  title: string;


  @IsOptional()
  @IsString()
  image?: string;


  @IsString()
  createdBy: string;
}
