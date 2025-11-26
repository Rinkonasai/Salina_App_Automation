🌟 Salina Automation Testing Project
📝 Overview

This project is an automation testing suite for Salina AI, built using Playwright with TypeScript and the Page Object Model (POM) design pattern.

The suite automates key workflows such as:

Document upload

Video/audio transcription

Chat interactions

UI element verification

The goal is to streamline repetitive testing, improve efficiency, and provide reliable feedback on application features.

✨ Features

✅ Automates document and video/audio uploads

✅ Verifies PDF/DOC viewer panels

✅ Performs chat interactions with Salina AI and verifies responses

✅ Uses POM structure for maintainable and scalable test code

✅ Dynamic UI element handling using Playwright locators

✅ Generates detailed HTML test reports for easy analysis

⚙️ Setup Instructions
1. Clone the Repository
git clone <repository_url>
cd salina-automation

2. Install Dependencies
npm install

3. Run Tests
npx playwright test

4. Generate HTML Report
npx playwright show-report

💡 Notes

Make sure you have a valid Salina account before running tests.

Test files (documents, videos, audio) must be available locally for upload tests.

The POM design pattern makes it easy to add or update test cases in the future.