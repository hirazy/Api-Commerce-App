import { Cart } from '.'

let cart

beforeEach(async () => {
  cart = await Cart.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = cart.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cart.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = cart.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cart.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
