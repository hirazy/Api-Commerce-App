import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Coupon } from '.'

const app = () => express(apiRoot, routes)

let coupon

beforeEach(async () => {
  coupon = await Coupon.create({})
})

test('POST /coupons 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /coupons 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /coupons/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${coupon.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(coupon.id)
})

test('GET /coupons/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /coupons/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${coupon.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(coupon.id)
})

test('PUT /coupons/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /coupons/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${coupon.id}`)
  expect(status).toBe(204)
})

test('DELETE /coupons/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
