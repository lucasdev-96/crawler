import { DateTime } from 'luxon'
import CrawlerService from './Crawler'
import { inject } from '@adonisjs/core/build/standalone'

@inject()
export default class AccommodationCrawler {
  constructor(private crawler: CrawlerService) {}
  public async start(checkout: DateTime, checkin: DateTime) {
    const page = await this.crawler.start(this.getUrl(checkout, checkin))
  }

  private getUrl(checkout: DateTime, checkin: DateTime) {
    const formatCheckin = DateTime.fromISO(checkin.toString()).toObject()
    const formatCheckout = DateTime.fromISO(checkout.toString()).toObject()
    return `https://pratagy.letsbook.com.br/D/Reserva?checkin=${formatCheckin.day}%2F${formatCheckin.month}%2F${formatCheckin.year}&checkout=${formatCheckout.day}%2F${formatCheckout.month}%2F${formatCheckout.year}&cidade=&hotel=12&adultos=2&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=`
  }
}
