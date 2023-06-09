// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext, inject } from '@adonisjs/core/build/standalone'
import AccommodationCrawler from 'App/Service/AccommodationCrawler'
import AccommodationValidator from 'App/Validators/AccommodationValidator'
import IAccommodationInterface from 'App/interfaces/AccommodationInterface'

@inject()
export default class AccommodationsController {
  constructor(private crawler: AccommodationCrawler) {}
  public async handle({ request, response }: HttpContext) {
    const { checkin, checkout }: IAccommodationInterface = await request.validate(
      AccommodationValidator
    )
    const res = await this.crawler.start(checkout, checkin)

    response.json({ response: res })
  }
}
