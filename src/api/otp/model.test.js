import { Otp } from '.'

let otp

beforeEach(async () => {
  otp = await Otp.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = otp.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(otp.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = otp.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(otp.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
