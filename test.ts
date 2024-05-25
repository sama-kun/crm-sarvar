// import { ScrapflyClient, ScrapeConfig, ScrapeResult, log } from 'scrapfly-sdk';

// const url: string = "https://www.neimanmarcus.com/en-kz/p/il-bisonte-esperia-reversible-leather-belt-prod271160279?childItemId=NMD4XF2_&msid=4794510&navpath=cat000000_cat4870731_cat51730760_cat4300731&page=1&position=1";


// async function main() {
//   try {
//     log.setLevel("DEBUG");
//     const scrapfly = new ScrapflyClient({ key: "scp-live-2bc7a1daf5ec49c0a74cc7ea380d1b2a" })
//     const result: ScrapeResult = await scrapfly.scrape(new ScrapeConfig({
//       url,
//       asp: true,
//       country: "US",
//       render_js: true,
//       // Add any other configuration options as needed
//     }))
    
//     console.log(result.result.content);
  
//   } catch (error) {
//     console.log(error)
//   }
// }

// main();
