import { Exclude, Expose } from "class-transformer";

@Exclude()
export class TodoItemResponseDTO {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  completed: boolean;

  @Expose()
  image?: string;

  @Expose()
  dateOfCompletion?: Date;

  @Expose()
  createdBy: string;
}
