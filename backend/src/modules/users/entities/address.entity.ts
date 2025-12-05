import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid', unique: true })
  userId: string;

  @OneToOne(() => User, (user) => user.address, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 255 })
  street: string;

  @Column({ length: 50 })
  number: string;

  @Column({ length: 255, nullable: true })
  complement?: string | null;

  @Column({ length: 255 })
  district: string;

  @Column({ length: 255 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column({ name: 'zip_code', length: 20 })
  zipCode: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
