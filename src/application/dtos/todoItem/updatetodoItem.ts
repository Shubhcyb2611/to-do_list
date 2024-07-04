import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class UpdateTodoItemDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsDate()
  dateOfCompletion?: Date;

  @IsOptional()
  @IsString()
  createdBy?: string;
}
