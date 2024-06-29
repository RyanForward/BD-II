import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Driver } from './drivers';

@Entity('intervals')
export class Interval {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ name: 'driver_key' })
  driverKey!: number;

  @Column({ type: 'timestamp', name: 'gap_to_leader' })
  gapToLeader!: Date;

  @Column()
  interval!: number;

  @Column({ name: 'session_key' })
  sessionKey!: number;

  @ManyToOne(() => Driver, (driver) => driver.intervals)
  driver!: Driver;
}
