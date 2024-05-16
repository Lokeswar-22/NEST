import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Employees{
    @PrimaryColumn()
    id: number;

    @Column()
    Name: string
    @Column()
    DOB: Date;
    @Column()
    City: string;
    @Column()
    Address: string; 


}