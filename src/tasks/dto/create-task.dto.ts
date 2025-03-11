import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty({
    required: false,
  })
  description: string;

  @ApiProperty({
    enum: ['OPEN', 'IN_PROGRESS', 'DONE'],
    default: 'OPEN',
  })
  status: 'OPEN' | 'IN_PROGRESS' | 'DONE';
}
