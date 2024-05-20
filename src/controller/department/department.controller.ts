import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DepartmentService } from 'src/services/department/department.service';
import { Department } from 'src/models/department.model';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Department> {
    return this.departmentService.findOne(id);
  }

  @Post()
  async create(@Body() department: Partial<Department>): Promise<Department> {
    return this.departmentService.create(department);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() department: Partial<Department>
  ): Promise<Department> {
    return this.departmentService.update(id, department);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.departmentService.remove(id);
  }
}
