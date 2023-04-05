import { DateTime } from 'luxon'

// eslint-disable-next-line @typescript-eslint/naming-convention
export default interface IAccommodationInterface {
  checkin: DateTime
  checkout: DateTime
}
