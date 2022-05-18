import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Version } from '.'

const app = () => express(apiRoot, routes)

let version

beforeEach(async () => {
  version = await Version.create({})
})

test('POST /versions 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /versions 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /versions/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${version.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(version.id)
})

test('GET /versions/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /versions/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${version.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(version.id)
})

test('PUT /versions/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /versions/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${version.id}`)
  expect(status).toBe(204)
})

test('DELETE /versions/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
