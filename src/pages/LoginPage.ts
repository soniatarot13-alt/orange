import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.page.goto('https://opensource-demo.orangehrmlive.com');
    await this.page.fill('[name="username"]', username);
    await this.page.fill('[name="password"]', password);
    await this.page.click('button[type="submit"]');
    // Wait for navigation to dashboard after login
    await this.page.waitForURL('**/dashboard**', { timeout: 10000 });
  }
}