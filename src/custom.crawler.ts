import {CheerioCrawler, Dataset} from 'crawlee';
import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from "url";

/**
 * This is a custom crawler that crawls any custom website.
 */

// Interfaces

// ScrapedData is a key-value pair of scraped data
interface ScrapedData {
    [key: string]: string;
}
// CrawlingPattern is a key-value pair of a name and a selector
interface CrawlingPattern {
    name: string;
    selector: string;
}
// ScraperConfig is a configuration object for the crawler
interface ScraperConfig {
    startUrls: string[];
    maxRequestsPerCrawl?: number;
    crawlingPatterns: CrawlingPattern[];
    // Other configurations...
}

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
    startUrls: ['https://www.sachsen-anhalt.de/startseite'],
    maxRequestsPerCrawl: 50,
    crawlingPatterns: [
        {name: 'title', selector: 'title'},
        {name: 'topNews', selector: '.TopNews .news-textfield h3'},
        // Add more patterns as needed
    ],
    // Other configurations...
};

/**
 * Logs errors to a file with a timestamp.
 * @param {string} url - The URL where the error occurred.
 * @param {string} message - The error message.
 */
const logErrorToFile = (url: string = 'No URL found!', message: string = 'Something very weird occurred!') => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - URL: ${url} - Error: ${message}\n`;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    fs.appendFile(path.join(__dirname, 'error.log'), logMessage, (err) => {
        if (err) console.error(`Failed to write to log file: ${err}`);
    });
};
/**
 * The Cheerio crawler instance, configured to scrape data based on defined patterns.
 */
const crawler = new CheerioCrawler({
    requestHandler: async ({request, $, enqueueLinks, log}) => {
        const scrapedData: ScrapedData = {};

        try {
            for (const pattern of scraperConfig.crawlingPatterns) {
                const data = $(pattern.selector).map((_, el) => $(el).text()).get();
                if (data.length === 0) {
                    throw new Error(`No data found for selector: ${pattern.selector}`);
                }
                scrapedData[pattern.name] = data.join(', ');
                log.info(`${pattern.name} of ${request.loadedUrl}: ${scrapedData[pattern.name]}`);
            }

            await Dataset.pushData({url: request.loadedUrl, ...scrapedData});
            await enqueueLinks();
        } catch (error: any) {
            log.error(`Error in processing ${request.loadedUrl}: ${error.message}`);
            logErrorToFile(request.loadedUrl, error.message);
        }
    },
    maxRequestsPerCrawl: scraperConfig.maxRequestsPerCrawl,
    // Additional configurations...
});

crawler.run(scraperConfig.startUrls).catch(error => {
    console.error(`Crawler failed: ${error.message}`);
    logErrorToFile('Crawler Execution', error.message);
});
