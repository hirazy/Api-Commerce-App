import { Shop } from '.'

let shop

beforeEach(async () => {
  shop = await Shop.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = shop.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shop.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = shop.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shop.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
