import { Image } from '.'

let image

beforeEach(async () => {
  image = await Image.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = image.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(image.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = image.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(image.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
