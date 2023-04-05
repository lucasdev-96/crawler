import puppeteer, { Page } from 'puppeteer'

export default class CrawlerService {
  public async start(url: string): Promise<Page> {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 800 })
    await page.goto(url)
    return page
  }
}
