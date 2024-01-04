# Crawlee Playground

Welcome to the Crawlee Playground Repository! This repository demonstrates the capabilities of Crawlee, a powerful web crawling tool, showcasing its functionalities, parameter management, and rule handling for efficient web scraping.

## Overview

Crawlee, built with Node.js, is a robust framework designed for efficient and respectful web scraping. It offers flexible configurations and is capable of handling various web scraping challenges.

### Features Highlight

- **Multiple Crawler Configurations:** Set up different crawler instances for diverse websites, allowing for customized scraping strategies.
- **Parallel Execution:** Run multiple crawlers simultaneously for efficient data collection from various sources.
- **Advanced Data Extraction:** Utilize complex selectors for precise data scraping, enhancing the quality of the extracted information.
- **Consent Pop-up Handling:** Navigate through modern web complexities like consent pop-ups, ensuring compliance with website policies.
- **Parameter Management and Rule-Based Crawling:** Retain the capability to configure depth, frequency, scope, and specific rules for targeted data extraction.
- **Ethical Crawling Practices:** Comply with robots.txt directives and implement politeness policies in scraping activities.

## Getting Started

### Prerequisites

Ensure you have the following installed for the Crawlee test-run:

- Node.js (v16 or higher recommended)
- npm (Node Package Manager)

### Installation

To set up and run the Crawlee playground:

1. Clone the repository:

   ```bash
   git clone https://github.com/rohit1901/crawlee-playground.git
   ```

2. Navigate to the directory and install dependencies:

   ```bash
   cd crawlee-playground
   npm install
   ```

3. Run the application using the following commands:

   ```bash
   npm start
   npm start:dev
   npm start:prod
   npm start:custom
   npm start:parallel
   ```
1. **start**: This is a default script that's commonly used to run the project. In your case, it is set to trigger the `start:dev` script. This means running `npm start` will execute the `start:dev` script.

2. **start:prod**: This script is for starting the application in a production environment. It runs `node dist/main.js`, which suggests that your code is transpiled into JavaScript and placed in the `dist` directory, likely using TypeScript.

3. **start:dev**: This script is for development purposes. It uses `tsx` to run the TypeScript file `src/basic.crawler.ts`. `tsx` is likely a tool or script that allows running TypeScript files directly, possibly with additional development features like hot-reloading.

4. **start:custom**: This script also uses `tsx` to run a different TypeScript file: `src/custom.crawler.ts`. This suggests an alternative or customizable crawler setup for development purposes.

5. **start:parallel**: Similar to the above, this script runs `src/parallel.crawlers.ts` with `tsx`, indicating that this script is used for testing or running multiple crawlers in parallel.

6. **build**: This script runs `tsc`, the TypeScript compiler, which compiles your TypeScript code into JavaScript. The output is typically stored in the `dist` directory, as referenced in the `start:prod` script.

7. **test**: Currently, this script is a placeholder, echoing a message that no tests are set up yet. Typically, this script would run unit tests or other test procedures for your application.

### Usage

This playground allows you to configure and initiate Crawlee for diverse web scraping tasks. The application can be accessed via the provided URL upon starting.

### Configuration

- **Multiple Crawler Configurations:** Configure separate crawlers for different websites with unique parameters.
- **Parallel Execution Setup:** Leverage the capability to run crawlers in parallel for efficient data collection.
- **Advanced Data Extraction Configuration:** Define complex selectors for precise and relevant data scraping.
- **Handling Consent Pop-ups:** Learn to manage modern web challenges like consent pop-ups in scraping activities.

## Repository Structure

The repository structure includes separate modules for each crawler configuration, shared utilities, and documentation on handling advanced scenarios.

## Contributing

Your contributions to enhance the Crawlee test-run or expand its functionalities are highly appreciated! Feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
