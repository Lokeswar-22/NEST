// src/services/project/project.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/models/project.model';

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
    return this.projectRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({ where: { id }, relations: ['employee'] });
  }

  async update(id: number, project: Partial<Project>): Promise<Project> {
    await this.projectRepository.update(id, project);
    return this.projectRepository.findOne({ where: { id }, relations: ['employee'] });
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}