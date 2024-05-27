import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { EmployeeService } from 'src/services/employee/employee.service';
import { Employees } from 'src/models/employees.model';
import { CreateEmployeeDto } from 'src/dto/employee/employee-create.dto';
import { UpdateEmployeeDto } from 'src/dto/employee/employee-update.dto';
import { EmployeeImage } from 'src/models/employee-image.model';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

@Controller('employees')
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employees> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  async findAll(): Promise<Employees[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    const employee = await this.employeeService.findOne(id);
    const department = await this.employeeService.findDepartmentByEmployee(id);
    const employeeImage = await this.employeeService.findEmployeeImage(id); 
    return { ...employee, department: department, image: employeeImage?.imagePath }; 
  }

  @Get(':id/employee-image')
  async findEmployeeImage(@Param('id') id: string): Promise<EmployeeImage> {
    return this.employeeService.findEmployeeImage(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<Employees> {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.employeeService.remove(+id);
  }
}
