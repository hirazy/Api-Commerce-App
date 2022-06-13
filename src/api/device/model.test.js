import { Device } from '.'

let device

beforeEach(async () => {
  device = await Device.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = device.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(device.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = device.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(device.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
