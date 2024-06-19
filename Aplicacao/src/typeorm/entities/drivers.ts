import { Entity, Column } from "typeorm";
import { AbstractEntity } from "./abstract";

@Entity()
export class Drivers{
    @Column()
    texto: string
}