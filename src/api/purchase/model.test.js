import { Purchase } from '.'

let purchase

beforeEach(async () => {
  purchase = await Purchase.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = purchase.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(purchase.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = purchase.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(purchase.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
