import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Department } from './department.model';
import { Project } from './project.model';

@Entity()
export class Employees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dob: Date;

  @Column()
  city: string;

  @Column()
  address: string;

  @ManyToOne(() => Department, department => department.employees)
  department: Department;

  @ManyToMany(() => Project, project => project.employees)
  @JoinTable()
  projects: Project[];
}
