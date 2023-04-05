export const emptyFields = {
  errors: [
    {
      rule: 'required',
      field: 'checkin',
      message: 'checkin is required',
    },
    {
      rule: 'required',
      field: 'checkout',
      message: 'checkout is required',
    },
  ],
}

export const verifyDateOfCheckIn = {
  errors: [
    {
      rule: 'afterOrEqual',
      field: 'checkin',
      message: 'Past date must be greater than or equal to today',
    },
  ],
}

export const verifyDateOfCheckInIsLessThenCheckOut = {
  errors: [
    {
      rule: 'check-in date must be less than check-out date',
      field: 'checkout',
    },
  ],
}

export const checkoutMustBeThreeDaysMoreThenCheckin = {
  errors: [
    {
      rule: 'You must stay at least 3 nights at the hotel',
      field: 'checkout',
    },
  ],
}
