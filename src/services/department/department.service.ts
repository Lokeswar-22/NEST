
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from 'src/models/department.model';
import { CreateDepartmentDto } from 'src/dto/department/department-create.dto';
import { UpdateDepartmentDto } from 'src/dto/department/department-update.dto';
import { Employees } from 'src/models/employees.model';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const newDepartment = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(newDepartment);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({ where: { id } });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    await this.departmentRepository.update(id, updateDepartmentDto);
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
