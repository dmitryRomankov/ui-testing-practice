# UI Testing Practice - Automated Testing Project

![Playwright Tests](https://github.com/ryasrdp/2025-LR-S7-AutoTesting-JS/workflows/Playwright%20Tests/badge.svg)

## 📋 Project Overview

This is a comprehensive automated testing project for [DemoQA](https://demoqa.com/) web application using **Playwright** framework with JavaScript. The project implements the Page Object Model (POM) design pattern and includes 5 complete test scenarios with both positive and negative test cases.

## 🎯 Test Scenarios

The project covers the following test scenarios:

1. **Alerts Page** (`@alerts`) - https://demoqa.com/alerts

   - Simple alert handling
   - Timer-based alerts
   - Confirmation dialogs (accept/dismiss)
   - Prompt dialogs with text input

2. **Practice Form** (`@formPage`) - https://demoqa.com/automation-practice-form

   - Complete form filling with randomly generated data
   - Field validation (email, mobile number)
   - Empty field validation
   - Parameterized tests with multiple data sets

3. **Text Box** (`@textBox`) - https://demoqa.com/text-box

   - Form submission with random data
   - Email format validation
   - Empty field validation

4. **Tool Tips** (`@toolTips`) - https://demoqa.com/tool-tips

   - Tooltip verification on button hover
   - Tooltip verification on text field hover
   - Tooltip verification on link hover
   - Sequential tooltip testing

5. **Select Menu** (`@selectMenu`) - https://demoqa.com/select-menu
   - Select Value dropdown
   - Select One dropdown
   - Old Style Select Menu
   - Multiselect dropdown

## 🏗️ Project Structure

```
ui-testing-practice/
├── .github/
│   └── workflows/
│       └── tests.yml              # CI/CD pipeline configuration
├── config/
│   └── Constants.js               # Configuration constants
├── src/
│   ├── helper/
│   │   ├── Attachment.js
│   │   ├── DataStorage.js
│   │   ├── userCreator.js        # Test data generator
│   │   └── index.js
│   ├── pageObjects/
│   │   ├── BasePage.js           # Base page with common methods
│   │   ├── MainPage.js           # Main page navigation
│   │   ├── AlertsPage.js         # Alerts page elements
│   │   ├── FormPage.js           # Practice form page elements
│   │   ├── TextBoxPage.js        # Text box page elements
│   │   ├── ToolTipsPage.js       # Tool tips page elements
│   │   ├── SelectMenuPage.js     # Select menu page elements
│   │   └── index.js
│   └── utils/
│       ├── AdBlock.js            # Ad blocker utility
│       ├── Randomizer.js         # Random value generator
│       └── index.js
├── tests/
│   ├── fixtures/
│   │   ├── alertsFixtures.js     # Alerts test fixtures
│   │   ├── formFixtures.js       # Form test fixtures
│   │   ├── fillFormFixtures.js   # Text box test fixtures
│   │   ├── toolTipsFixtures.js   # Tool tips test fixtures
│   │   └── selectMenuFixtures.js # Select menu test fixtures
│   ├── alertPage.spec.js         # Alerts tests
│   ├── formPage.spec.js          # Practice form tests
│   ├── textBox.spec.js           # Text box tests
│   ├── toolTips.spec.js          # Tool tips tests
│   └── selectMenu.spec.js        # Select menu tests
├── playwright.config.js          # Playwright configuration
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ryasrdp/2025-LR-S7-AutoTesting-JS.git
cd ui-testing-practice
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in Chrome only
npm run test:chrome

# Run tests in Firefox only
npm run test:firefox

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Run Tests by Resolution

```bash
# Run with 1920x1080 resolution
npm run test:1920

# Run with 1366x768 resolution
npm run test:1366

# Custom resolution using environment variables
VIEWPORT_WIDTH=1280 VIEWPORT_HEIGHT=720 npm test
```

### Run Tests with Custom Workers (Parallel Execution)

```bash
# Run with 4 parallel workers
npm run test:parallel

# Run with custom number of workers
WORKERS=2 npm test
```

### Run Specific Test Scenarios by Keyword

```bash
# Run only alerts tests
npm run test:alerts

# Run only form page tests
npm run test:formPage

# Run only tool tips tests
npm run test:toolTips

# Run only select menu tests
npm run test:selectMenu

# Run only positive tests
npm run test:positive

# Run only negative tests
npm run test:negative

# Custom keyword filtering
RUN_THIS=parameterized npm test
```

### Combined Flags

You can combine multiple flags:

```bash
# Run alerts tests on Firefox with 1366x768 resolution and 2 workers
VIEWPORT_WIDTH=1366 VIEWPORT_HEIGHT=768 WORKERS=2 RUN_THIS=alerts npx playwright test --project=firefox
```

## Test Reports

### View HTML Report

```bash
npm run report
```

### Report Locations

- HTML Report: `playwright-report/`
- JSON Results: `test-results/results.json`
- JUnit XML: `test-results/junit.xml`
- Screenshots: `test-results/**/*.png`
- Videos: `test-results/**/*.webm`

## CI/CD Integration

The project uses GitHub Actions for continuous integration. Tests run automatically:

- **On Push**: When code is pushed to main/master branch
- **On Pull Request**: When a PR is created or updated
- **Daily Schedule**: Every day at 9:00 AM UTC
- **Manual Trigger**: Via workflow_dispatch

### CI/CD Matrix

Tests run across:

- **Browsers**: Chrome, Firefox
- **Resolutions**: 1920x1080, 1366x768

### Artifacts

After each CI/CD run, the following artifacts are available:

- Test results (JSON, JUnit)
- Playwright HTML reports
- Screenshots (on failure)
- Videos (on failure)

Artifacts are retained for 30 days.

## Features

### Page Object Model (POM)

- Organized page objects with clear separation of concerns
- Reusable page methods and selectors
- Base page with common functionality

### Test Data Generation

- Automatic generation of random test data using Fakerator
- Consistent data structure across tests
- Support for complex form data (dates, selections, etc.)

### Error Handling

- Automatic screenshot capture on test failure
- Video recording on test failure
- Detailed error reporting with stack traces

### Locator Strategies

The project uses various locator strategies:

- CSS Selectors (`#id`, `.class`)
- XPath expressions
- Text content matching
- Role-based selectors
- Data attributes

### Cross-Browser Testing

- Tests run on Chrome and Firefox
- Consistent behavior across browsers
- Browser-specific configurations

### Parallel Execution

- Configurable number of parallel workers
- Faster test execution
- Resource optimization

## Test Data

All test data is automatically generated using the `UserCreator` class:

```javascript
// Generate user data for text box
const user = UserCreator.createUser();

// Generate complete form data
const formData = UserCreator.createFormData();
```

## Configuration

### Playwright Configuration

Key configuration options in `playwright.config.js`:

- **Test Directory**: `./tests`
- **Timeout**: 60 seconds per test
- **Retries**: 2 retries on CI
- **Workers**: Configurable via `WORKERS` env variable
- **Screenshots**: Captured on failure
- **Videos**: Recorded on failure
- **Trace**: Retained on failure

### Environment Variables

- `VIEWPORT_WIDTH`: Browser viewport width (default: 1920)
- `VIEWPORT_HEIGHT`: Browser viewport height (default: 1080)
- `WORKERS`: Number of parallel workers (default: 4 locally, 2 on CI)
- `RUN_THIS`: Keyword to filter tests (grep pattern)
- `CI`: Automatically set by CI/CD (enables CI-specific behavior)
