import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('weather')
export class Weather {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ name: 'session_key' })
  sessionKey!: number;

  @Column()
  humidity!: number;

  @Column()
  rainfall!: number;

  @Column({ name: 'track_temperature', type: 'numeric' })
  trackTemperature!: number;

  @Column({ name: 'wind_speed', type: 'numeric' })
  windSpeed!: number;
}
