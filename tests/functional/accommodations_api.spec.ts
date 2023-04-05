import { test } from '@japa/runner'
import {
  checkoutMustBeThreeDaysMoreThenCheckin,
  emptyFields,
  verifyDateOfCheckIn,
  verifyDateOfCheckInIsLessThenCheckOut,
} from 'App/Enum/Errors'

test.group('Accommodations api', () => {
  test('should fail empty fields with status 422', async ({ client }) => {
    const response = await client.post('/search').form('')
    response.assertBodyContains(emptyFields)
    response.assertStatus(422)
  })
  test('must fail check-in date less than current date', async ({ client }) => {
    const response = await client.post('/search').form({
      checkin: '2023-02-11',
      checkout: '2023-04-13',
    })
    response.assertBodyContains(verifyDateOfCheckIn)
    response.assertStatus(422)
  })
  test('must fail as the check-in date has to be less than the check-out date', async ({
    client,
  }) => {
    const response = await client.post('/search').form({
      checkin: '2023-04-22',
      checkout: '2023-04-04',
    })
    response.assertBodyContains(verifyDateOfCheckInIsLessThenCheckOut)
    response.assertStatus(422)
  })
  test('must fail as check-out must be done three days after check-in', async ({ client }) => {
    const response = await client.post('/search').form({
      checkin: '2023-04-11',
      checkout: '2023-04-13',
    })
    response.assertBodyContains(checkoutMustBeThreeDaysMoreThenCheckin)
    response.assertStatus(422)
  })
})
