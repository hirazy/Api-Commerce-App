import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Follow } from '.'

const app = () => express(apiRoot, routes)

let follow

beforeEach(async () => {
  follow = await Follow.create({})
})

test('POST /follows 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /follows 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /follows/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${follow.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(follow.id)
})

test('GET /follows/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /follows/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${follow.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(follow.id)
})

test('PUT /follows/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /follows/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${follow.id}`)
  expect(status).toBe(204)
})

test('DELETE /follows/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
