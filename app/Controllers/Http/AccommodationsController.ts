// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from '@adonisjs/core/build/standalone'
import AccommodationValidator from 'App/Validators/AccommodationValidator'
import IAccommodationInterface from 'App/interfaces/AccommodationInterface'

export default class AccommodationsController {
  public async handle({ request, response }: HttpContext) {
    const payload: IAccommodationInterface = await request.validate(AccommodationValidator)
    response.json(payload)
  }
}
