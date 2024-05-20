import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employees } from './employees.model';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  manager: string; // Add the manager column

  @OneToMany(() => Employees, employee => employee.department)
  employees: Employees[];
}
