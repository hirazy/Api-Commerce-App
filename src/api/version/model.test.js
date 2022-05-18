import { Version } from '.'

let version

beforeEach(async () => {
  version = await Version.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = version.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(version.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = version.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(version.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
