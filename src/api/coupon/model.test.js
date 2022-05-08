import { Coupon } from '.'

let coupon

beforeEach(async () => {
  coupon = await Coupon.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = coupon.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(coupon.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = coupon.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(coupon.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
