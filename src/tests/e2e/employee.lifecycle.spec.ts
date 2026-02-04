import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeePage } from '../../pages/EmployeePage';
import { getEmployeeById } from '../../utils/apiClient';

test('Employee lifecycle E2E test @admin ', async ({ page, request }) => {
  test.setTimeout(60 * 100000);
  const loginPage = new LoginPage(page);
  const employeePage = new EmployeePage(page);

  await loginPage.login('Admin', 'admin123');

  const empId = await employeePage.createEmployee('Manjeet', 'Singh');
  expect(empId).toBeTruthy();
  

  const url = await page.url();
  const response = await page.request.get(url);
  expect(response.ok()).toBe(true);

  await employeePage.updateEmployeeJobTitle(empId, 'QA Engineer');

 

  await employeePage.deleteEmployee(url, empId);
  const response3= await getEmployeeById(request, empId);
  const log = response3.status();
  expect(response3.status()).toBe(404);
  
});