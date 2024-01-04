import {getCrawler, logErrorToFile, runCrawler} from "./base";

const newsScraperConfig = {
    startUrls: ['https://www.bbc.com/news'],
    maxRequestsPerCrawl: 10,
    crawlingPatterns: [
        { name: 'headline', selector: '.nw-c-top-stories__secondary-item h3' },
        { name: 'summary', selector: '.nw-c-top-stories__secondary-item p' },
    ],
    // Other configurations...
};
const webScraperConfig = {
    startUrls: ['https://webscraper.io/'],
    maxRequestsPerCrawl: 10,
    crawlingPatterns: [
        { name: 'articleTitle', selector: '.featurette .featurette-heading' },
        { name: 'articleDescription', selector: '.featurette .featurette-heading p.lead' },
    ],
    // Other configurations...
};
const scraperConfigs = [newsScraperConfig, webScraperConfig];
const runAllCrawlers = async () => {
    try {
        await Promise.all(scraperConfigs.map(config => runCrawler(getCrawler(config), config)));
        console.log('All crawlers completed');
    } catch (error) {
        console.error('An error occurred', error);
    }
};

runAllCrawlers().catch((error: any) => {
    console.error(`Crawler failed: ${error.message}`);
    logErrorToFile('Crawler Execution', error.message);
});