import { Timeline } from '.'

let timeline

beforeEach(async () => {
  timeline = await Timeline.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = timeline.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(timeline.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = timeline.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(timeline.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
