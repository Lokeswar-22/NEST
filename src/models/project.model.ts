import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Employees } from './employees.model';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Employees, employee => employee.projects)
  employees: Employees[];
}
