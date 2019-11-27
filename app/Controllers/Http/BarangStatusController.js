'use strict'

const BarangStatus = use('App/Models/BarangStatus')
const { validate } = use('Validator')

let rules = {
    barang_status_keterangan: 'required|unique:barang_statuses,barang_status_keterangan',
    barang_status_warna: 'required|unique:barang_statuses,barang_status_warna'
}

const vmessage = {
    'barang_status_keterangan.required': 'Status tidak boleh kosong',
    'barang_status_keterangan.unique': 'Status sudah ada, tidak boleh duplikat',
    'barang_status_warna.required': 'Warna status tidak boleh kosong',
    'barang_status_warna.unique': 'Warna sudah dipakai, tidak boleh duplikat'
}

class BarangStatusController {

    async index({ response }) {
        try {
            const barangStatus = await BarangStatus.query().fetch()

            return response.json(barangStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async view({ params }) {
        try {
            let barangStatus = await BarangStatus.findOrFail(params.id)

            return barangStatus
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status barang tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const barangStatus = new BarangStatus()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                barang_status_keterangan: request.input('barang_status_keterangan'),
                barang_status_warna: request.input('barang_status_warna')
            }

            if (validation.fails()) {
                return response.status(400).message({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            barangStatus.barang_status_keterangan = data.barang_status_keterangan
            barangStatus.barang_status_warna = data.barang_status_warna

            await barangStatus.save()
            return response.json(barangStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let barangStatus = await BarangStatus.findOrFail(params.id)

            const data = {
                barang_status_keterangan: request.input('barang_status_keterangan'),
                barang_status_warna: request.input('barang_status_warna')
            }

            if (barangStatus.barang_status_keterangan === data.barang_status_keterangan ||
                barangStatus.barang_status_warna === data.barang_status_warna) {
                rules = {
                    barang_status_keterangan: 'required',
                    barang_status_warna: 'required'
                }
            }

            const validation = await validate(request.all(), rules, vmessage)
            if (validation.fails()) {
                return response.status(400).message({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }
            
            barangStatus.barang_status_keterangan = data.barang_status_keterangan
            barangStatus.barang_status_warna = data.barang_status_warna

            await barangStatus.save()
            return response.json(barangStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const barangStatus = await BarangStatus.findOrFail(params.id)
            barangStatus.delete()

            return response.json({ message: 'Barang status berhasil dihapus' })
        } catch (error) {
            if (error.nama === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status barang tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async pagination({ request, response }) {
        try {
            let pagination = request.only(['page', 'limit', 'column', 'sort'])
            let page = pagination.page || 1;
            let limit = pagination.limit || 10;
            let column = pagination.column || 'barang_status_id';
            let sort = pagination.sort || 'desc';

            const barangStatus = await BarangStatus.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(barangStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'barang_status_keterangan';
            let value = search.value.toLowerCase();

            let barangStatus = await BarangStatus.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(barangStatus.rows.length == 0){
                return response.status(404).send({
                    message : 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(barangStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres'
            })
        }
    }
}

module.exports = BarangStatusController
