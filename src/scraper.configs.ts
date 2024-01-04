import {ScraperConfig} from "./interfaces";

export const newsScraperConfig = {
    startUrls: ['https://www.bbc.com/news'],
    maxRequestsPerCrawl: 10,
    crawlingPatterns: [
        {name: 'headline', selector: '.nw-c-top-stories__secondary-item h3'},
        {name: 'summary', selector: '.nw-c-top-stories__secondary-item p'},
    ],
    // Other configurations...
};
export const webScraperConfig = {
    startUrls: ['https://www.bbc.com/culture'],
    maxRequestsPerCrawl: 10,
    crawlingPatterns: [
        {name: 'articleTitle', selector: '.rectangle-story-item .rectangle-story-item__title > h2'},
        {name: 'articleAuthor', selector: '.rectangle-story-item .rectangle-story-item__author'},
    ],
    // Other configurations...
};
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
export const scraperConfig: ScraperConfig = {
    startUrls: ['https://www.sachsen-anhalt.de/startseite'],
    maxRequestsPerCrawl: 50,
    crawlingPatterns: [
        {name: 'title', selector: 'title'},
        {name: 'topNews', selector: '.TopNews .news-textfield h3'},
        // Add more patterns as needed
    ],
    // Other configurations...
};