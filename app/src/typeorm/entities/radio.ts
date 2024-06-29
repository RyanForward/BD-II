import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Driver } from './drivers'; // Importa a classe Driver se necessário

@Entity('radio')
export class Radio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ name: 'driver_key' })
  driverKey!: number;

  @Column({ name: 'recording_url', type: 'text' })
  recordingUrl!: string;

  @Column({ name: 'session_key' })
  sessionKey!: number;

  @ManyToOne(() => Driver, { eager: true })
  @JoinColumn({ name: 'driver_key', referencedColumnName: 'driverKey' })
  driver!: Driver;
}
