import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class AbstractEntity{
    @PrimaryGeneratedColumn()
    id: number;

}