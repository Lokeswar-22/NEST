import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employees } from 'src/models/employees.model';

@Entity()
export class EmployeeImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imagePath: string;

  @ManyToOne(() => Employees, employee => employee.images)
  @JoinColumn({ name: 'employeeId' })
  employee: Employees;
}
