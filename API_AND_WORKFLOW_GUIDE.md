# DemoQA API Testing - Playwright

## 📋 Project Overview

Comprehensive API testing for the DemoQA Book Store application using Playwright. Includes 14 tests covering 6 comprehensive scenarios with serial execution and proper state management.

## 🏗️ Project Structure

```
ui-testing-practice/
├── src/
│   ├── utils/
│   │   ├── userCreator.js             # User creation with static methods
│   │   └── index.js                   # Utils exports
│   └── helper/
│       ├── Attachment.js              # Screenshot/video attachment
│       ├── DataStorage.js             # Data storage helper
│       └── index.js                   # Helper exports
├── tests/
│   └── api/
│       ├── authentication.spec.js     # Scenarios 1, 2, 4 (6 tests)
│       └── bookstore.spec.js          # Scenarios 1-6 (8 tests)
├── playwright.config.js               # Playwright configuration
├── babel.config.js                    # Babel configuration
├── package.json                       # Dependencies and scripts
└── README.md                          # Project README
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
cd ui-testing-practice
npm install
```

## 📝 Running Tests

### Playwright API Tests (14 tests)

```bash
# Run all API tests (14 tests total)
npm run test:api

# View API test report
npx playwright show-report
```

---
