import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {default: null})
  key: string;

  @Column()
  email: string;

  @Column()
  password: string;
}