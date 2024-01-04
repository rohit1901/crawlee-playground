import {getCrawler, runCrawler} from "./base";
import {newsScraperConfig, webScraperConfig} from "./scraper.configs";

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
});