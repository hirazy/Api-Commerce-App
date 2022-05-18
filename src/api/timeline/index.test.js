import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Timeline } from '.'

const app = () => express(apiRoot, routes)

let timeline

beforeEach(async () => {
  timeline = await Timeline.create({})
})

test('POST /timelines 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /timelines 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /timelines/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${timeline.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(timeline.id)
})

test('GET /timelines/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /timelines/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${timeline.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(timeline.id)
})

test('PUT /timelines/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /timelines/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${timeline.id}`)
  expect(status).toBe(204)
})

test('DELETE /timelines/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
