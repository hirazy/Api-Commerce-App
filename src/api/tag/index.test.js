import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Tag } from '.'

const app = () => express(apiRoot, routes)

let tag

beforeEach(async () => {
  tag = await Tag.create({})
})

test('POST /tags 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /tags 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /tags/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${tag.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tag.id)
})

test('GET /tags/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /tags/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${tag.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tag.id)
})

test('PUT /tags/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /tags/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tag.id}`)
  expect(status).toBe(204)
})

test('DELETE /tags/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
