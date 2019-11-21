'use strict'

const UnsurKalibrasi = use('App/Models/UnsurKalibrasi')
const { validate } = use('Validator')

let rules = {
    unsur_kalibrasi_nama: 'required|unique:unsur_kalibrasis,unsur_kalibrasi_nama'
}

const vmessage = {
    'unsur_kalibrasi_nama.required': 'Nama unsur tidak boleh kosong!',
    'unsur_kalibrasi_nama.unique': 'Nama unsur sudah ada, tidak boleh duplikat!'
}

class UnsurKalibrasiController {

    async index({ response }) {
        try {
            let unsurKalibrasi = await UnsurKalibrasi
                .query()
                .fetch()

            return response.json(unsurKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }

    async view({ params, response }) {
        try {
            let unsurKalibrasi = await UnsurKalibrasi.findOrFail(params.id)
            
            return unsurKalibrasi
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Unsur kalibrasi tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }

    async store({ response, request }) {
        try {
            const unsurKalibrasi = new UnsurKalibrasi()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                unsur_kalibrasi_nama: request.input('unsur_kalibrasi_nama')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            unsurKalibrasi.unsur_kalibrasi_nama = data.unsur_kalibrasi_nama

            await unsurKalibrasi.save()
            return response.json(unsurKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }

    async update({ params, response, request }) {
        try {
            const unsurKalibrasi = await UnsurKalibrasi.findOrFail(params.id)

            const data = {
                unsur_kalibrasi_nama: request.input('unsur_kalibrasi_nama')
            }

            if (unsurKalibrasi.unsur_kalibrasi_nama === data.unsur_kalibrasi_nama) {
                rules = {
                    unsur_kalibrasi_nama: 'required'
                }
            }

            const validation = await validate(request.all(), rules, vmessage)

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            unsurKalibrasi.unsur_kalibrasi_nama = data.unsur_kalibrasi_nama

            await unsurKalibrasi.save()
            return response.json(unsurKalibrasi)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Unsur kalibrasi tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const unsurKalibrasi = await UnsurKalibrasi.findOrFail(params.id)
            unsurKalibrasi.delete()
            
            return response.json({ message: 'Unsur kalibrasi berhasil dihapus' })

        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Unsur kalibrasi tidak ditemukan'
                })
            }

            return response.status(404).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async pagination({ request, response }) {
        try {
            let pagination = request.only(['page', 'limit', 'column', 'sort'])
            let page = pagination.page || 1;
            let limit = pagination.limit || 10;
            let column = pagination.column || 'unsur_kalibrasi_nama';
            let sort = pagination.sort || 'desc';

            const unsurKalibrasi = await UnsurKalibrasi
                .query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)
            return response.json(unsurKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'unsur_kalibrasi_nama';
            let value = search.value.toLowerCase();

            let unsurKalibrasi = await UnsurKalibrasi.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if (unsurKalibrasi.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(unsurKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, keliatannya ada yang tidak beres!'
            })
        }

    }
}

module.exports = UnsurKalibrasiController
