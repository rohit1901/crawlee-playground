import {ScraperConfig} from "./interfaces";
import {getCrawler, logErrorToFile} from "./base";

/**
 * Configuration for the Web Crawler
 *
 * This object defines the crawler's configuration settings:
 * 1. startUrls: An array of URLs where the crawler will begin its operation.
 * 2. maxRequestsPerCrawl: The maximum number of requests that the crawler
 *    will make during its operation. This limit helps in controlling
 *    the crawl scope and managing resource usage.
 * 3. crawlingPatterns: An array of patterns that dictate how the crawler
 *    extracts data from the pages it visits.
 *
 * Each crawling pattern includes:
 * - name: A unique identifier for the pattern. This name is used as a key
 *   in the 'scrapedData' object to store the extracted data.
 * - selector: A CSS selector string used to pinpoint and extract specific
 *   data from a web page. The crawler utilizes this selector to find and
 *   retrieve relevant information from each visited page.
 */
const scraperConfig: ScraperConfig = {
    startUrls: ['some website here'],
    maxRequestsPerCrawl: 50,
    crawlingPatterns: [
        {name: 'title', selector: 'title'},
        {name: 'topNews', selector: '.TopNews .news-textfield h3'},
        // Add more patterns as needed
    ],
    // Other configurations...
};

getCrawler(scraperConfig).run(scraperConfig.startUrls).catch((error: any) => {
    console.error(`Crawler failed: ${error.message}`);
    logErrorToFile('Crawler Execution', error.message);
});
