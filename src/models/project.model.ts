import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Employees } from './employees.model';
import { Department } from './department.model';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @ManyToMany(() => Department, department => department.projects)
  @JoinTable({ name: 'project_department' }) 
  departments: Department[];
  

  @ManyToMany(() => Employees, employee => employee.projects)
  @JoinTable({
    name: 'employee_project',
    joinColumn: { name: 'projectId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'employeeId', referencedColumnName: 'id' }
  })
  employees: Employees[];
  
}
