import { Favorite } from '.'

let favorite

beforeEach(async () => {
  favorite = await Favorite.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = favorite.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(favorite.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = favorite.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(favorite.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
