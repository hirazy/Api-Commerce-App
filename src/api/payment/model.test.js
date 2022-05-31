import { Payment } from '.'

let payment

beforeEach(async () => {
  payment = await Payment.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = payment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(payment.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = payment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(payment.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
