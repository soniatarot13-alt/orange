# OrangeHRM – Senior QA Automation Assignment

## 📋 Project Overview

This project demonstrates a *senior-level QA automation framework* built using Playwright. It automates a complete employee lifecycle in OrangeHRM, combining UI automation with API validation to ensure comprehensive test coverage.

The framework follows industry best practices including Page Object Model (POM), environment-based configuration, reusable utilities, and CI/CD integration.

## 🚀 Tech Stack

- *Playwright* - Modern end-to-end testing framework
- *TypeScript* - Type-safe test automation
- *UI + API Automation* - Combined testing approach
- *GitHub Actions CI* - Continuous Integration pipeline
- *HTML Reports* - Comprehensive test reporting

## ✨ Automated Scenarios

### Core Functionality
- ✅ *Authentication* - Admin login with validation
- ✅ *Role-based Access Validation* - Admin vs restricted user access
- ✅ *Employee Creation* - Create new employees with data validation
- ✅ *Employee Update* - Update employee job details and information
- ✅ *Employee Deletion* - Delete employees with API verification
- ✅ *Backend API Verification* - Validate operations via REST API

### Test Coverage
- End-to-end employee lifecycle (Create → Update → Delete)
- API-level verification for data consistency
- Role-based access control testing
- UI and API integration testing

## 🏗️ Framework Design

### Architecture Patterns
- *Page Object Model (POM)* - Encapsulated page interactions
- *Reusable Utilities* - Common helper functions and API clients
- *Clean Folder Structure* - Organized and scalable codebase
- *Environment-based Configuration* - Flexible test environment setup

### Project Structure

PlayWrightAutomation/
├── src/
│   ├── pages/              # Page Object Models
│   │   ├── LoginPage.ts
│   │   ├── EmployeePage.ts
│   │   └── RoleValidationPage.ts
│   ├── tests/
│   │   └── e2e/           # End-to-end tests
│   │       └── employee.lifecycle.spec.ts
│   └── utils/             # Reusable utilities
│       └── apiClient.ts
├── .github/
│   └── workflows/         # CI/CD pipelines
│       └── ci.yml
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts


## 🛠️ Prerequisites

- *Node.js* (v18.x or higher)
- *npm* or *yarn*
- *Git*

## 📦 Installation

1. *Clone the repository*
   bash
   git clone <repository-url>
   cd PlayWrightAutomation
   

2. *Install dependencies*
   bash
   npm install
   

3. *Install Playwright browsers*
   bash
   npx playwright install
   

## 🎯 How to Run Tests

### Run All Tests
bash
npm test


### Run Tests with UI Mode (Interactive)
bash
npm run test:ui


### Run Tests in Headed Mode (See Browser)
bash
npm run test:headed


### Run Tests in Debug Mode
bash
npm run test:debug


### Run Tests by Tags

The framework supports test tagging for selective execution:

bash
# Run only smoke tests
npm run test:smoke

# Run only regression tests
npm run test:regression

# Run only admin tests
npm run test:admin

# Run only employee-related tests
npm run test:employee

# Run tests with multiple tags
npm run test:admin-smoke


### Run Specific Test File
bash
npx playwright test src/tests/e2e/employee.lifecycle.spec.ts


### Run Tests with Specific Tag
bash
npx playwright test --grep @admin
npx playwright test --grep "@admin|@smoke"


## 📊 Test Reports

After test execution, reports are generated in:
- *HTML Report*: playwright-reports/index.html
- *Test Results*: test-results/ directory

To view the HTML report:
bash
npx playwright show-report


## 🔧 Configuration

### Environment Variables

Create a .env file in the root directory (optional):
env
BASE_URL=https://opensource-demo.orangehrmlive.com
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123
HEADLESS=true
TIMEOUT=60000


### Playwright Configuration

Key settings in playwright.config.ts:
- *Base URL*: Configured for OrangeHRM demo site
- *Retries*: 2 retries on CI, 0 locally
- *Workers*: Parallel execution enabled
- *Screenshots*: Captured on failure
- *Videos*: Retained on failure
- *Traces*: Collected on retry

## 🏷️ Test Tagging Strategy

Tests are tagged for easy filtering and execution:

- @admin - Admin user tests
- @employee - Employee management tests
- @smoke - Critical smoke tests
- @regression - Full regression suite

Example:
typescript
test('Employee lifecycle E2E test @admin @smoke @employee', async ({ page, request }) => {
  // Test implementation
});


## 🔄 CI/CD Pipeline

### GitHub Actions

The project includes a CI/CD pipeline (.github/workflows/ci.yml) that:
- ✅ Runs on push/PR to main/develop branches
- ✅ Installs dependencies
- ✅ Executes tests in parallel (sharding)
- ✅ Generates HTML reports
- ✅ Publishes test artifacts
- ✅ Detects flaky tests

### Pipeline Features
- *Parallel Execution*: Tests run in multiple shards for faster execution
- *Artifact Upload*: Test results and reports are saved as artifacts
- *Flaky Test Detection*: Identifies and reports flaky tests
- *Environment-based*: Supports staging and production environments

## 📝 Key Design Decisions

### 1. Page Object Model (POM)
- *Why*: Encapsulates page interactions, improves maintainability
- *Implementation*: Each page has its own class with locators and methods
- *Benefits*: Reusable, maintainable, and easy to update

### 2. Reusable Common Methods
- *Why*: Reduces code duplication and improves consistency
- *Implementation*: Private helper methods in page classes
- *Benefits*: DRY principle, single source of truth for common actions

### 3. Combined UI + API Testing
- *Why*: Validates both frontend and backend consistency
- *Implementation*: UI actions followed by API verification
- *Benefits*: Comprehensive coverage, catches integration issues

### 4. Environment-based Configuration
- *Why*: Supports multiple environments (dev, staging, prod)
- *Implementation*: Environment variables and config files
- *Benefits*: Flexible, maintainable, CI/CD ready

### 5. Smart Waiting Mechanisms
- *Why*: Reduces flaky tests due to timing issues
- *Implementation*: waitForLoadState, waitFor with timeouts
- *Benefits*: More reliable tests, better error messages

## 🐛 Flaky Test Mitigation

The framework includes several strategies to handle flaky tests:

1. *Retry Logic*: Automatic retries on failure (configurable)
2. *Smart Waits*: Network idle and element visibility checks
3. *Screenshot on Failure*: Captures state when tests fail
4. *Video Recording*: Records test execution for debugging
5. *Trace Collection*: Detailed traces on retry for analysis

## 📈 Reporting & Observability

### Available Reports
- *HTML Reports*: Interactive test results with screenshots
- *JSON Reports*: Machine-readable test results
- *JUnit Reports*: CI/CD integration compatible
- *Screenshots*: Captured on test failures
- *Videos*: Recorded for failed tests

### Viewing Reports
bash
# Open HTML report
npx playwright show-report

# View in browser
open playwright-reports/index.html


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

*Manjeet Singh*
- Senior QA Automation Engineer
- Playwright & TypeScript Specialist

## 🙏 Acknowledgments

- OrangeHRM for providing the demo environment
- Playwright team for the excellent testing framework
- Open source community for best practices and tools

---

## 📞 Support

For questions or issues, please open an issue in the repository.
