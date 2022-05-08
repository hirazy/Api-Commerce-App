import { Review } from '.'

let review

beforeEach(async () => {
  review = await Review.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = review.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(review.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = review.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(review.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
