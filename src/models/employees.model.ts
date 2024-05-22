import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Department } from './department.model';
import { Project } from './project.model';
import { EmployeeImage } from './employee-image.model';

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

  @Column()
  email: string;

  @Column()
  designation: string;
  
  @OneToMany(() => EmployeeImage, image => image.employee)
  images: EmployeeImage[];

  @ManyToOne(() => Department, department => department.employees, { nullable: true })
  department: Department;

  @ManyToMany(() => Project, project => project.employees)
  @JoinTable({
    name: 'employee_project',
    joinColumn: { name: 'employeeId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'projectId', referencedColumnName: 'id' }
  })
  projects: Project[];

}
