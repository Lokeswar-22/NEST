import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DepartmentService } from 'src/services/department/department.service';
import { Department } from 'src/models/department.model';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    const department = await this.departmentService.findOne(id);
    const employees = await this.departmentService.findEmployeesByDepartment(id);
    return { ...department, employees }; 
  }


  @Post()
  create(@Body() department: Partial<Department>): Promise<Department> {
    return this.departmentService.create(department);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() department: Partial<Department>
  ): Promise<void> {
    await this.departmentService.update(id, department);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.departmentService.remove(id);
  }
}