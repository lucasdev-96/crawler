import { inject } from '@adonisjs/core/build/standalone'
import { DateTime } from 'luxon'
import { Page } from 'puppeteer'

import CrawlerService from './Crawler'

@inject()
export default class AccommodationCrawler {
  constructor(private crawler: CrawlerService) {}
  public async start(checkout: DateTime, checkin: DateTime): Promise<string | any> {
    const page = await this.crawler.start(this.getUrl(checkout, checkin))
    console.log(await this.getRooms(page))
    // await page.close()
  }

  private getUrl(checkout: DateTime, checkin: DateTime) {
    const formatCheckin = DateTime.fromISO(checkin.toString()).toObject()
    const formatCheckout = DateTime.fromISO(checkout.toString()).toObject()
    return `https://pratagy.letsbook.com.br/D/Reserva?checkin=${formatCheckin.day}%2F${formatCheckin.month}%2F${formatCheckin.year}&checkout=${formatCheckout.day}%2F${formatCheckout.month}%2F${formatCheckout.year}&cidade=&hotel=12&adultos=2&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=`
  }

  private async getRooms(page: Page): Promise<string | any> {
    const hotelAvaible = await this.verifyAvaibleHotel(page)
    if (!hotelAvaible) {
      await page.waitForSelector('div > div.left-col > ul > div.slick-list.draggable')
      return page.$$eval('.row-quarto', (e) => {
        return e.map((x) => {
          return {
            name: x.querySelector('.quartoNome').textContent,
            description: x.querySelector('.quartoDescricao > p').textContent,
            price: x.querySelector(
              'td.precoQuarto > div.relative > div.flex-price > span.valorFinal.valorFinalDiscounted'
            ).textContent,
            image: x.querySelector('div > div.left-col > ul > div.slick-list.draggable > div')
              .firstElementChild.firstElementChild.dataset.src,
          }
        })
      })
    }
    return hotelAvaible
  }
  private async verifyAvaibleHotel(page: Page): Promise<string | boolean> {
    await page.waitForSelector('#descHotel')
    const fatherNoHotel = await page.$('#hotel-selecionado-indisponivel')
    if (fatherNoHotel) {
      return await page.$eval(
        '#hotel-selecionado-indisponivel > div:nth-child(2)',
        (e) => e.textContent
      )
    }
    return false
  }

  private async getData(page: Page) {
    return await this.getRooms(page)
  }
}