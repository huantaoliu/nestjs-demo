import { ApiProperty } from '@nestjs/swagger';

export class CommentDTO {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
