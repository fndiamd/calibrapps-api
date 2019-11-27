'use strict'

const ListKalibrasi = use('App/Models/ListKalibrasi')

class ListKalibrasiController {

    async index({ response }) {
        try {
            let listKalibrasi = await ListKalibrasi.query()
                .with('ruangLingkup')
                .with('standarKalibrasi')
                .with('tipePengerjaan')
                .fetch()

            return response.json(listKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let list = await ListKalibrasi.findOrFail(params.id)
            let listKalibrasi = await ListKalibrasi
                .query()
                .where('list_kalibrasi_id', params.id)
                .with('ruangLingkup')
                .with('standarKalibrasi')
                .with('tipePengerjaan')
                .first()

            return listKalibrasi
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'List kalibrasi tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const listKalibrasi = new ListKalibrasi()

            const data = {
                list_kalibrasi_nama_alat: request.input('list_kalibrasi_nama_alat'),
                list_kalibrasi_harga: request.input('list_kalibrasi_harga'),
                ruang_lingkup_id: request.input('ruang_lingkup_id'),
                standar_kalibrasi_id: request.input('standar_kalibrasi_id'),
                tipe_pengerjaan_id: request.input('tipe_pengerjaan_id')
            }

            listKalibrasi.list_kalibrasi_nama_alat = data.list_kalibrasi_nama_alat
            listKalibrasi.list_kalibrasi_harga = data.list_kalibrasi_harga
            listKalibrasi.ruang_lingkup_id = data.ruang_lingkup_id
            listKalibrasi.standar_kalibrasi_id = data.standar_kalibrasi_id
            listKalibrasi.tipe_pengerjaan_id = data.tipe_pengerjaan_id

            await listKalibrasi.save()
            return response.json(listKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let listKalibrasi = await ListKalibrasi.findOrFail(params.id)

            const data = {
                list_kalibrasi_nama_alat: request.input('list_kalibrasi_nama_alat'),
                list_kalibrasi_harga: request.input('list_kalibrasi_harga'),
                ruang_lingkup_id: request.input('ruang_lingkup_id'),
                standar_kalibrasi_id: request.input('standar_kalibrasi_id'),
                tipe_pengerjaan_id: request.input('tipe_pengerjaan_id')
            }

            listKalibrasi.list_kalibrasi_nama_alat = data.list_kalibrasi_nama_alat
            listKalibrasi.list_kalibrasi_harga = data.list_kalibrasi_harga
            listKalibrasi.ruang_lingkup_id = data.ruang_lingkup_id
            listKalibrasi.standar_kalibrasi_id = data.standar_kalibrasi_id
            listKalibrasi.tipe_pengerjaan_id = data.tipe_pengerjaan_id

            await listKalibrasi.save()
            return response.json(listKalibrasi)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'List kalibrasi tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const listKalibrasi = await ListKalibrasi.findOrFail(params.id)
            listKalibrasi.delete()

            return response.json({ message: 'List kalibrasi berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'List kalibrasi tidak ditemukan'
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
            let column = pagination.column || 'list_kalibrasi_id';
            let sort = pagination.sort || 'desc';

            const listKalibrasi = await ListKalibrasi.query()
                .with('ruangLingkup')
                .with('standarKalibrasi')
                .with('tipePengerjaan')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(listKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'list_kalibrasi_nama_alat';
            let value = search.value.toLowerCase();

            let listKalibrasi = await ListKalibrasi.query()
                .with('ruangLingkup')
                .with('standarKalibrasi')
                .with('tipePengerjaan')
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(listKalibrasi.rows.length == 0){
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(listKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

}

module.exports = ListKalibrasiController
