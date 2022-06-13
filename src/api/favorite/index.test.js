import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Favorite } from '.'

const app = () => express(apiRoot, routes)

let favorite

beforeEach(async () => {
  favorite = await Favorite.create({})
})

test('POST /favorites 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /favorites 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /favorites/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${favorite.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(favorite.id)
})

test('GET /favorites/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /favorites/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${favorite.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(favorite.id)
})

test('PUT /favorites/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /favorites/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${favorite.id}`)
  expect(status).toBe(204)
})

test('DELETE /favorites/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
