import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/models/project.model';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(project: Partial<Project>): Promise<Project> {
    const newProject = this.projectRepository.create(project);
    return this.projectRepository.save(newProject);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({ relations: ['employees'] });
  }
  
  async findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({ where: { id }, relations: ['employees'] });
  }

  async update(id: number, project: Partial<Project>): Promise<Project> {
    await this.projectRepository.update(id, project);
    return this.projectRepository.findOne({ where: { id }, relations: ['employees'] });
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
