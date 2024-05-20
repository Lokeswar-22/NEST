import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from 'src/models/employees.model';
import { Department } from 'src/models/department.model';
import { Project } from 'src/models/project.model';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employees)
    private employeesRepository: Repository<Employees>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(employee: Partial<Employees>): Promise<Employees> {
    const newEmployee = this.employeesRepository.create(employee);
    return this.employeesRepository.save(newEmployee);
  }

  async findAll(): Promise<Employees[]> {
    return await this.employeesRepository.find();
  }

  async findOne(id: number): Promise<Employees> {
    return this.employeesRepository.findOne({ where: { id }, relations: ['department', 'projects'] });
  }

  async update(id: number, employee: Partial<Employees>): Promise<Employees> {
    await this.employeesRepository.update(id, employee);
    return this.employeesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.employeesRepository.delete(id);
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

  async findDepartmentByEmployee(employeeId: number): Promise<Department> {
    const employee = await this.employeesRepository.findOne(
      { where: { id: employeeId }, relations: ['department'] }
    );
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }
    return employee.department;
  }

  async findProjectsByEmployee(employeeId: number): Promise<Project[]> {
    const employee = await this.employeesRepository.findOne(
      { where: { id: employeeId }, relations: ['projects'] }
    );
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }
    return employee.projects;
  }

}
