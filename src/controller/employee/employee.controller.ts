import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EmployeeService } from 'src/services/employee/employee.service';
import { Employees } from 'src/models/employees.model';
import { Department } from 'src/models/department.model';
import { Project } from 'src/models/project.model';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  findAll(): Promise<Employees[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Employees> {
    return this.employeeService.findOne(id);
  }

  @Post()
  create(@Body() employee: Partial<Employees>): Promise<Employees> {
    return this.employeeService.create(employee);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() employee: Partial<Employees>
  ): Promise<void> {
    await this.employeeService.update(id, employee);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.employeeService.remove(id);
  }

  @Get('department/:id')
  findEmployeesByDepartment(@Param('id') id: number): Promise<Employees[]> {
    return this.employeeService.findEmployeesByDepartment(id);
  }

  @Get(':id/department')
  findDepartmentByEmployee(@Param('id') id: number): Promise<Department> {
    return this.employeeService.findDepartmentByEmployee(id);
  }

  @Get(':id/projects')
  findProjectsByEmployee(@Param('id') id: number): Promise<Project[]> {
    return this.employeeService.findProjectsByEmployee(id);
  }
}
