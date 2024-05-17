import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employees } from './employees.model';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Employees, employee => employee.projects, { nullable: true })
  employee: Employees; // Make sure it's referencing the correct entity property

  @Column({ nullable: true }) // Add this line to allow null values for the employeeId column
  employeeId: number; // Add this property to store the employeeId
}
