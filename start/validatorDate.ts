/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'

validator.rule('verifyCheckout', (checkout, checkin: any, options) => {
  const minimunDays = 3
  const daysInAccommodation = DateTime.fromISO(checkout).diff(DateTime.fromISO(checkin), [
    'days',
  ]).days
  if (daysInAccommodation < minimunDays) {
    options.errorReporter.report(
      options.pointer,
      'You must stay at least 3 nights at the hotel',
      options.arrayExpressionPointer
    )
  }
})
