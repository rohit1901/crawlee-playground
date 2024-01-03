import { CheerioCrawler, Dataset } from 'crawlee';

// CheerioCrawler crawls the web using HTTP requests
// and parses HTML using the Cheerio library.
const crawler = new CheerioCrawler({
    // Use the requestHandler to process each of the crawled pages.
    async requestHandler({ request, $, enqueueLinks, log }) {
        const title = $('title').text();
        log.info(`Title of ${request.loadedUrl} is '${title}'`);

        const news = $('.TopNews .news-textfield h3').map((index, el) => $(el).text());
        log.info(`Top news on ${request.loadedUrl}: ${news.get().join(', ')}`);
        // Save results as JSON to ./storage/datasets/default
        await Dataset.pushData({ title, url: request.loadedUrl, news: news.get().toString() });

        // Extract links from the current page
        // and add them to the crawling queue.
        await enqueueLinks();
    },

    // Let's limit our crawls to make our tests shorter and safer.
    maxRequestsPerCrawl: 50,
});

// Add first URL to the queue and start the crawl.
await crawler.run(['some website here']);