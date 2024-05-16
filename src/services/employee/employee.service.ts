import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from 'src/models/employees.model';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employees)
        private employeesRepository: Repository<Employees>,
    ) {}

    async create(employee: Partial<Employees>): Promise<Employees> {
        const newEmployee = this.employeesRepository.create(employee);
        return this.employeesRepository.save(newEmployee);
    }

    async findAll(): Promise<Employees[]> {
        return await this.employeesRepository.find();
    }

    async findOne(id: number): Promise<Employees> {
        return this.employeesRepository.findOne({ where: { id } });
    }

    async update(id: number, employee: Partial<Employees>): Promise<Employees> {
        await this.employeesRepository.update(id, employee);
        return this.employeesRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.employeesRepository.delete(id);
        
    }
}
