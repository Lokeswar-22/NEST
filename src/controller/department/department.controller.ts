import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DepartmentService } from 'src/services/department/department.service';
import { Department } from 'src/models/department.model';
import { CreateDepartmentDto } from 'src/dto/department/department-create.dto';
import { UpdateDepartmentDto } from 'src/dto/department/department-update.dto';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  async findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Department> {
    return this.departmentService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.departmentService.remove(+id);
  }
}
