import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('sessions')
export class Session {
  @PrimaryColumn({ name: 'session_key' })
  sessionKey!: number;

  @Column({ name: 'session_name' })
  sessionName!: string;

  @Column({ name: 'session_type' })
  sessionType!: string;

  @Column({ name: 'circuit_short_name' })
  circuitShortName!: string;

  @Column({ name: 'country_key' })
  countryKey!: number;

  @Column({ name: 'country_name' })
  countryName!: string;

  @Column({ name: 'date_end', type: 'time', nullable: true })
  dateEnd?: Date;

  @Column({ name: 'date_start', type: 'time' })
  dateStart!: Date;

  @Column({ name: 'gmt_offset' })
  gmtOffset!: Date;

  @Column()
  location!: string;

  @Column()
  year!: number;
}
