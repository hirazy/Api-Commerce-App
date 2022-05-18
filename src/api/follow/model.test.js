import { Follow } from '.'

let follow

beforeEach(async () => {
  follow = await Follow.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = follow.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(follow.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = follow.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(follow.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
