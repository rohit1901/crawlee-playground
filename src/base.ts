import {ScrapedData, ScraperConfig} from "./interfaces";
import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";
import {CheerioCrawler, Dataset} from "crawlee";

export const runCrawler = async (crawler: CheerioCrawler, scraperConfig: ScraperConfig) => {
    return crawler.run(scraperConfig.startUrls).catch((error: any) => {
        console.error(`Crawler failed: ${error.message}`);
        logErrorToFile('Crawler Execution', error.message);
    });
}
/**
 * Logs errors to a file with a timestamp.
 * @param {string} url - The URL where the error occurred.
 * @param {string} message - The error message.
 */
export const logErrorToFile = (url: string = 'No URL found!', message: string = 'Something very weird occurred!') => {
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
export const getCrawler = (scraperConfig: ScraperConfig) =>
    new CheerioCrawler({
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
