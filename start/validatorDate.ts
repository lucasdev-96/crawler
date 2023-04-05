/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { ValidationRuntimeOptions, validator } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'

validator.rule(
  'verifyCheckout',
  (checkout: any, checkin: string, options: ValidationRuntimeOptions) => {
    const minimunDays: number = 3
    const daysInAccommodation: number = DateTime.fromISO(checkout).diff(DateTime.fromISO(checkin), [
      'days',
    ]).days
    if (daysInAccommodation < minimunDays) {
      options.errorReporter.report(
        options.pointer,
        daysInAccommodation > 0
          ? 'You must stay at least 3 nights at the hotel'
          : 'check-in date must be less than check-out date',
        options.arrayExpressionPointer
      )
    }
  }
)
