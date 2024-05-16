import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProjectService } from 'src/services/project/project.service';
import { Project } from 'src/models/project.model';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Post()
  create(@Body() project: Partial<Project>): Promise<Project> {
    return this.projectService.create(project);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() project: Partial<Project>
  ): Promise<void> {
    await this.projectService.update(id, project);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.projectService.remove(id);
  }
}
