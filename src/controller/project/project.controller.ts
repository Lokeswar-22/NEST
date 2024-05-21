
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProjectService } from 'src/services/project/project.service';
import { Project } from 'src/models/project.model';
import { CreateProjectDto } from 'src/dto/project/project-create.dto';
import { UpdateProjectDto } from 'src/dto/project/project-update.dto';
import { ProjectResponseDto } from 'src/dto/project/project-response.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<Project> {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.projectService.remove(+id);
  }

  @Get('details/:name')
  async getProjectDetailsByName(@Param('name') name: string): Promise<ProjectResponseDto> {
    return this.projectService.getProjectDetailsByName(name);
  }
}


