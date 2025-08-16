type ErrorResponse = {
  success: false;
  errors?: string[];
  message?: string;
};

type SuccessResponse<P, T extends string> = {
  success: true;
} & { [prop in T]: P };
export type { ErrorResponse, SuccessResponse };
