// project-response.dto.ts
import { Department } from 'src/models/department.model';
import { Employees } from 'src/models/employees.model';

export class ProjectResponseDto {
  name: string;
  id: number;
  departments: Department[];
  employees: Employees[];
}
