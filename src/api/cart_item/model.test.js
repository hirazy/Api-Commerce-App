import { CartItem } from '.'

let cartItem

beforeEach(async () => {
  cartItem = await CartItem.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = cartItem.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cartItem.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = cartItem.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cartItem.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
