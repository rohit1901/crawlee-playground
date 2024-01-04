import {getCrawler} from "./base";
import {scraperConfig} from "./scraper.configs";

getCrawler(scraperConfig).run(scraperConfig.startUrls).catch((error: any) => {
    console.error(`Crawler failed: ${error.message}`);
});
