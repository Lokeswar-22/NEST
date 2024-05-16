// src/models/employee.model.ts
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from './department.model';
import { Project } from './project.model';

@Entity()
export class Employees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column()
  city: string;

  @Column()
  address: string;

  @ManyToOne(() => Department, department => department.employees)
  department: Department;

  @OneToMany(() => Project, project => project.employee)
  projects: Project[];
}
