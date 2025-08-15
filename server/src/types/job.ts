type JobPosition = "frontend" | "backend" | "fullstack";
export interface CreateJobBody {
  company: string;
  position: JobPosition;
}

export interface JobProp extends CreateJobBody {
  readonly id: string;
}
