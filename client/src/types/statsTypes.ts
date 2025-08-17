interface JobStatusProp {
  pending: string;
  interview: string;
  declined: string;
}

interface JobDateProp {
  date: string;
  count: string;
}

interface JobStatResProp {
  defaultStats: JobStatusProp;
  monthlyApplications: JobDateProp[];
}

export type { JobStatResProp };
