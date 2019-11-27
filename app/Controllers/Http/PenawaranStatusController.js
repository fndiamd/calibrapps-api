'use strict'

const PenawaranStatus = use('App/Models/PenawaranStatus')
const { validate } = use('Validator')

let rules = {
    penawaran_status_keterangan: 'required|unique:penawaran_statuses,penawaran_status_keterangan',
    penawaran_status_warna: 'required|unique:penawaran_statuses,penawaran_status_warna'
}

const vmessage = {
    'penawaran_status_keterangan.required': 'Status tidak boleh kosong',
    'penawaran_status_keterangan.unique': 'Status sudah ada, tidak boleh duplikat',
    'penawaran_status_warna.required': 'Warna status tidak boleh kosong',
    'penawaran_status_warna.unique': 'Warna sudah dipakai, tidak boleh duplikat'
}

class PenawaranStatusController {

    async index({ response }) {
        try {
            let penawaranStatus = await PenawaranStatus.query().fetch()
            return response.json(penawaranStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let penawaranStatus = await PenawaranStatus.findOrFail(params.id)

            return penawaranStatus
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const penawaranStatus = new PenawaranStatus()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                penawaran_status_keterangan: request.input('penawaran_status_keterangan'),
                penawaran_status_warna: request.input('penawaran_status_warna')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            penawaranStatus.penawaran_status_keterangan = data.penawaran_status_keterangan
            penawaranStatus.penawaran_status_warna = data.penawaran_status_warna

            await penawaranStatus.save()
            return response.json(penawaranStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let penawaranStatus = await PenawaranStatus.findOrFail(params.id)

            const data = {
                penawaran_status_keterangan: request.input('penawaran_status_keterangan'),
                penawaran_status_warna: request.input('penawaran_status_warna')
            }

            if (penawaranStatus.penawaran_status_keterangan === data.penawaran_status_keterangan ||
                penawaranStatus.penawaran_status_warna === data.penawaran_status_warna) {
                rules = {
                    penawaran_status_keterangan: 'required',
                    penawaran_status_warna: 'required'
                }
            }

            const validation = await validate(request.all(), rules, vmessage)
            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            penawaranStatus.penawaran_status_keterangan = data.penawaran_status_keterangan
            penawaranStatus.penawaran_status_warna = data.penawaran_status_warna

            await penawaranStatus.save()
            return response.json(penawaranStatus)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const penawaranStatus = await PenawaranStatus.findOrFail(params.id)
            penawaranStatus.delete()

            return response.json({ message: 'Penawaran status berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async pagination({ request, response }) {
        try {
            let pagination = request.only(['page', 'limit', 'column', 'sort'])
            let page = pagination.page || 1;
            let limit = pagination.limit || 10;
            let column = pagination.column || 'penawaran_status_id';
            let sort = pagination.sort || 'desc';

            const penawaranStatus = await PenawaranStatus.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(penawaranStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'penawaran_status_keterangan';
            let value = search.value.toLowerCase();

            let penawaranStatus = await PenawaranStatus.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()
                
            return response.json(penawaranStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = PenawaranStatusController
