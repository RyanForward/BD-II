import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Interval } from './intervals';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn({ name: 'driver_key' })
  driverKey!: number;

  @Column({ type: 'varchar', length: 3, name: 'country_code' })
  countryCode!: string;

  @Column({ type: 'integer', name: 'driver_number' })
  driverNumber!: number;

  @Column({ type: 'varchar', length: 50, name: 'full_name' })
  fullName!: string;

  @Column({ type: 'varchar', length: 3, name: 'name_acronym' })
  nameAcronym!: string;

  @Column({ type: 'integer', name: 'session_key' })
  sessionKey!: number;

  @Column({ type: 'varchar', name: 'team_colour' })
  teamColour!: string;

  @Column({ type: 'varchar', name: 'team_name' })
  teamName!: string;

  @OneToMany(() => Interval, (interval) => interval.driver)
  intervals!: Interval[]; 

}
