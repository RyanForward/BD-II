import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Driver } from './drivers'; // Importa a classe Driver se necessário

@Entity('position')
export class Position {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ name: 'driver_key' })
  driverKey!: number;

  @Column()
  position!: number;

  @Column({ name: 'session_key' })
  sessionKey!: number;

  @ManyToOne(() => Driver, { eager: true })
  @JoinColumn({ name: 'driver_key', referencedColumnName: 'driverKey' })
  driver!: Driver;
}
