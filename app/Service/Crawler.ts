import puppeteer, { Page } from 'puppeteer'

export default class CrawlerService {
  public async start(url: string): Promise<Page> {
    const browser = await puppeteer.launch({ headless: false })
    const [page] = await browser.pages()
    await page.setViewport({ width: 1200, height: 800 })
    await page.goto(url)
    return page
  }

  public async setInput(page: Page, element: string, value: string): Promise<void> {
    await page.type(element, value)
  }

  public async buttonClick(page: Page, element: any): Promise<void> {
    await page.click(element)
  }
}
