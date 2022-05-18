import { Shipping } from '.'

let shipping

beforeEach(async () => {
  shipping = await Shipping.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = shipping.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shipping.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = shipping.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shipping.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
