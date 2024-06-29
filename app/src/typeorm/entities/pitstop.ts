import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Driver } from './drivers'; // Importa a classe Driver se necessário

@Entity('pit_stop')
export class PitStop {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ name: 'driver_key' })
  driverKey!: number;

  @Column({ name: 'lap_number' })
  lapNumber!: number;

  @Column({ name: 'pit_duration' })
  pitDuration!: number;

  @Column({ name: 'session_key' })
  sessionKey!: number;

  @ManyToOne(() => Driver, { eager: true })
  @JoinColumn({ name: 'driver_key', referencedColumnName: 'driverKey' })
  driver!: Driver;
}
