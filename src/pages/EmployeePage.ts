import { expect, Page } from '@playwright/test';

export class EmployeePage {
  // ========== LOCATORS ==========
  private readonly locators = {
    pimMenu: 'text=PIM',
    addButton: 'text=Add',
    employeeList: 'text=Employee List',
    searchInput: "(//input[contains(@class,'oxd-input oxd-input')])[2]",
    submitButton: 'button[type="submit"]',
    editButton: "(//i[@class='oxd-icon bi-pencil-fill'])[1]",
    deleteButton: 'i.bi-trash',
    confirmDelete: 'text=Yes, Delete',
    employeeIdInput: "(//input[contains(@class,'oxd-input oxd-input')])[5]",
    firstNameInput: '[name="firstName"]',
    lastNameInput: '[name="lastName"]',
    jobTab: 'text=Job',
    jobTitleDropdown: '//div[contains(@class, "oxd-select")]'
  };

  constructor(private page: Page) {}

  // ========== COMMON/REUSABLE METHODS ==========
  
  // Navigate to PIM module
  private async navigateToPIM() {
    await this.page.click(this.locators.pimMenu);
    await this.page.waitForLoadState('networkidle');
  }

  // Navigate to Employee List
  private async navigateToEmployeeList() {
    await this.page.getByText('Employee List').click();
    await this.page.waitForLoadState('networkidle');
  }

  // Search for employee by ID
  private async searchEmployee(empId: string) {
    const searchInput = this.page.locator(this.locators.searchInput);
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill(empId);
    await this.page.click(this.locators.submitButton);
    await this.page.waitForLoadState('networkidle');
  }

  // Click edit button for the first employee in search results
  private async clickEditButton() {
    const editBtn = this.page.locator(this.locators.editButton);
    await editBtn.waitFor({ state: 'visible', timeout: 10000 });
    await editBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Click submit button
  private async submitForm() {
    await this.page.click(this.locators.submitButton);
    await this.page.waitForLoadState('networkidle');
  }

  // ========== LOGIC METHODS ==========

  // Create Employee
  async createEmployee(firstName: string, lastName: string): Promise<string> {
    await this.navigateToPIM();
    await this.page.click(this.locators.addButton);
    await this.page.waitForLoadState('networkidle');

    await this.page.fill(this.locators.firstNameInput, firstName);
    await this.page.fill(this.locators.lastNameInput, lastName);
    await this.submitForm();

    // Wait for employee ID to be available
    const empIdLocator = this.page.locator(this.locators.employeeIdInput);
    await empIdLocator.waitFor({ state: 'visible', timeout: 15000 });
    const empId = await empIdLocator.inputValue();
    
    if (!empId || empId.trim() === '') {
      throw new Error('Employee ID was not found after creating employee');
    }
    
    return empId;
  }

  // Update Employee Job Title
  async updateEmployeeJobTitle(empId: string, jobTitle: string) {
    await this.navigateToEmployeeList();
    await this.searchEmployee(empId);
    await this.clickEditButton();
    await this.page.click(this.locators.jobTab);
    await this.page.waitForLoadState('networkidle');
    
    // Click dropdown and select option
    const dropdown = this.page.locator(this.locators.jobTitleDropdown).first();
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    await dropdown.click();
    await this.page.waitForTimeout(500); // Wait for dropdown to open
    await this.page.locator(`text=${jobTitle}`).click();
    
    await this.submitForm();
    await expect(this.page.locator(`text=${jobTitle}`)).toBeVisible({ timeout: 10000 });
  }

  // Update any text input field by field label
  async updateEmployeeField(empId: string, fieldLabel: string, newValue: string) {
    await this.navigateToEmployeeList();
    await this.searchEmployee(empId);
    await this.clickEditButton();
    
    // Find and fill the field by its label text
    await this.page.locator(`//label[contains(text(), "${fieldLabel}")]/following::input[1]`).fill(newValue);
    
    await this.submitForm();
  }

  // Delete Employee
  async deleteEmployee(employeeId: string, empId: string) {
    await this.navigateToEmployeeList();
    await this.searchEmployee(empId);
    
    // Wait for delete button and click
    const deleteBtn = this.page.locator(this.locators.deleteButton).first();
    await deleteBtn.waitFor({ state: 'visible', timeout: 10000 });
    await deleteBtn.click();
    
    // Confirm deletion
    const confirmBtn = this.page.locator(this.locators.confirmDelete).first();
    await confirmBtn.waitFor({ state: 'visible', timeout: 10000 });
    await confirmBtn.click();
    await this.page.waitForLoadState('networkidle');
  }
}