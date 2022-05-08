import { CreditCard } from '.'

let creditCard

beforeEach(async () => {
  creditCard = await CreditCard.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = creditCard.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(creditCard.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = creditCard.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(creditCard.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
