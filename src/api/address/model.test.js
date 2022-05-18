import { Address } from '.'

let address

beforeEach(async () => {
  address = await Address.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = address.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(address.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = address.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(address.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
