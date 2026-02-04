import { APIRequestContext } from '@playwright/test';

export async function getEmployeeById(
  request: APIRequestContext,
  employeeId: string
) {
  return await request.get(`/api/v2/pim/employees/${employeeId}`);
}
