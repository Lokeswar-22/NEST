import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from 'src/models/department.model';
import { Employees } from 'src/models/employees.model';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(department: Partial<Department>): Promise<Department> {
    const newDepartment = this.departmentRepository.create(department);
    return this.departmentRepository.save(newDepartment);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  async findOne(id: number): Promise<Department> {
    return this.departmentRepository.findOne({ where: { id } });
  }

  async update(id: number, department: Partial<Department>): Promise<Department> {
    await this.departmentRepository.update(id, department);
    return this.departmentRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.departmentRepository.delete(id);
  }
  
  async findEmployeesByDepartment(departmentId: number): Promise<Employees[]> {
    const department = await this.departmentRepository.findOne(
      { where: { id: departmentId }, relations: ['employees'] }
    );
    if (!department) {
      throw new NotFoundException(`Department with ID ${departmentId} not found`);
    }
    return department.employees;
  }
}