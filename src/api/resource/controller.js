import { success, notFound } from '../../services/response/'
import {} from '../../services/s3'
const fs = require("fs");
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
import { uploadFile, getFileStream } from '../../services/s3'
import Resource, { schema } from './model'

/**
 * Save in Google Cloud
 */

export const create = async(req, res, next) => {
    const files = req.files
    console.log(files.length)
    let listFiles = []
    for (const file of files) {
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        const description = req.body.description

        // listFiles.push(result.key)
        const bodyResource = {
            key: result.key,
        }

        let resource = await Resource.create(bodyResource)
            .then((resource) => resource.view(true))
            .catch(next)
            //     .then(success(res, 201))
            //     .catch(next)

        listFiles.push(resource.id)
    }

    res.status(200).json(listFiles);
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Resource.find(query, select, cursor)
    .then((resources) => resources.map((resource) => resource.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    Resource.findById(params.id)
    .then(notFound(res))
    .then((resource) => resource ? resource.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    Resource.findById(params.id)
    .then(notFound(res))
    .then((resource) => resource ? Object.assign(resource, body).save() : null)
    .then((resource) => resource ? resource.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Resource.findById(params.id)
    .then(notFound(res))
    .then((resource) => resource ? resource.remove() : null)
    .then(success(res, 204))
    .catch(next)