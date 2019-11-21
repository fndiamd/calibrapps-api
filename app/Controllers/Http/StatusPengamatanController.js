'use strict'

const StatusPengamatan = use('App/Models/StatusPengamatan')
const { validate } = use('Validator')

let rules = {
    pengamatan_status_keterangan: 'required|unique:pengamatan_statuses,pengamatan_status_keterangan',
    pengamatan_status_warna: 'required|unique:pengamatan_statuses,pengamatan_status_warna'
}

const vmessage = {
    'pengamatan_status_keterangan.required': 'Status tidak boleh kosong',
    'pengamatan_status_keterangan.unique': 'Status sudah ada, tidak boleh duplikat',
    'pengamatan_status_warna.required': 'Warna status tidak boleh kosong',
    'pengamatan_status_warna.unique': 'Warna sudah dipakai, tidak boleh duplikat'
}

class StatusPengamatanController {

    async index({ response }) {
        try {
            let statusPengamatan = await StatusPengamatan.query().fetch()
            return response.json(statusPengamatan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let statusPengamatan = await StatusPengamatan.findOrFail(params.id)
            return statusPengamatan
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
            const statusPengamatan = new StatusPengamatan()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                pengamatan_status_keterangan: request.input('pengamatan_status_keterangan'),
                pengamatan_status_warna: request.input('pengamatan_status_warna')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            statusPengamatan.pengamatan_status_keterangan = data.pengamatan_status_keterangan
            statusPengamatan.pengamatan_status_warna = data.pengamatan_status_warna

            await statusPengamatan.save()
            return response.json(statusPengamatan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let statusPengamatan = await StatusPengamatan.findOrFail(params.id)

            const data = {
                pengamatan_status_keterangan: request.input('pengamatan_status_keterangan'),
                pengamatan_status_warna: request.input('pengamatan_status_warna')
            }

            if (statusPengamatan.pengamatan_status_keterangan === data.pengamatan_status_keterangan ||
                statusPengamatan.pengamatan_status_warna === data.pengamatan_status_warna) {
                rules = {
                    pengamatan_status_keterangan: 'required',
                    pengamatan_status_warna: 'required'
                }
            }

            const validation = await validate(request.all(), rules, vmessage)
            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            statusPengamatan.pengamatan_status_keterangan = data.pengamatan_status_keterangan
            statusPengamatan.pengamatan_status_warna = data.pengamatan_status_warna

            await statusPengamatan.save()
            return response.json(statusPengamatan)
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
            const statusPengamatan = await StatusPengamatan.findOrFail(params.id)
            statusPengamatan.delete()

            return response.json({ message: 'Pengamatan status berhasil dihapus' })
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
            let column = pagination.column || 'pengamatan_status_id';
            let sort = pagination.sort || 'desc';

            const statusPengamatan = await StatusPengamatan.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(statusPengamatan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'pengamatan_status_keterangan';
            let value = search.value.toLowerCase();

            let statusPengamatan = await StatusPengamatan.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if (statusPengamatan.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(statusPengamatan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = StatusPengamatanController
