declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    verifyCheckout(checkin: string): Rule
  }
}
