// ScrapedData is a key-value pair of scraped data
export interface ScrapedData {
    [key: string]: string;
}

// CrawlingPattern is a key-value pair of a name and a selector
export interface CrawlingPattern {
    name: string;
    selector: string;
}

// ScraperConfig is a configuration object for the crawler
export interface ScraperConfig {
    startUrls: string[];
    maxRequestsPerCrawl?: number;
    crawlingPatterns: CrawlingPattern[];
    // Other configurations...
}