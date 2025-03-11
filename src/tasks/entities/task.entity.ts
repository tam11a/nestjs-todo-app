import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 500,
    nullable: false,
  })
  title: string;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @Column({
    enum: ['OPEN', 'IN_PROGRESS', 'DONE'],
    default: 'OPEN',
    nullable: false,
  })
  status: string;
}
