import { inject } from '@adonisjs/core/build/standalone'
import { DateTime } from 'luxon'
import { Page } from 'puppeteer'

import CrawlerService from './Crawler'
import IAccommodationCrawlerInterface from 'App/interfaces/AccommodationCrawlerInterface'

@inject()
export default class AccommodationCrawler {
  constructor(private crawler: CrawlerService) {}
  public async start(
    checkout: DateTime,
    checkin: DateTime
  ): Promise<string | Array<IAccommodationCrawlerInterface>> {
    const page = await this.crawler.start(this.getUrl(checkout, checkin))
    const result = await this.getRooms(page)
    page.close()
    return result
  }

  private getUrl(checkout: DateTime, checkin: DateTime): string {
    const formatCheckin = DateTime.fromISO(checkin.toString()).toObject()
    const formatCheckout = DateTime.fromISO(checkout.toString()).toObject()
    return `https://pratagy.letsbook.com.br/D/Reserva?checkin=${formatCheckin.day}%2F${formatCheckin.month}%2F${formatCheckin.year}&checkout=${formatCheckout.day}%2F${formatCheckout.month}%2F${formatCheckout.year}&cidade=&hotel=12&adultos=2&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=`
  }

  private async getRooms(page: Page): Promise<string | Array<IAccommodationCrawlerInterface>> {
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
  private async verifyAvaibleHotel(page: Page): Promise<string | undefined> {
    await page.waitForSelector('#hotelSelecionadoContent')
    const fatherNoHotel = await page.$('#hotel-selecionado-indisponivel')
    if (fatherNoHotel) {
      return page.$eval('#hotel-selecionado-indisponivel > div:nth-child(2)', (e) => e.textContent)
    }
  }
}
