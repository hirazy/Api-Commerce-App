import { OrderItem } from '.'

let orderItem

beforeEach(async () => {
  orderItem = await OrderItem.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = orderItem.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(orderItem.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = orderItem.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(orderItem.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
