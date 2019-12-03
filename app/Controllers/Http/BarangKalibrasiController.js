'use strict'

const BarangKalibrasi = use('App/Models/BarangKalibrasi')

class BarangKalibrasiController {

    async index({ response }) {
        try {
            let barangKalibrasi = await BarangKalibrasi
                .query()
                .with('merkBarang')
                .with('barangStatus')
                .with('listKalibrasi')
                .fetch()

            return response.json(barangKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }

    async view({ params }) {
        try {

            let barang = await BarangKalibrasi.findOrFail(params.id)
            let barangKalibrasi = await BarangKalibrasi.query()
                .where('barang_kalibrasi_id', params.id)
                .with('merkBarang')
                .with('barangStatus')
                .with('listKalibrasi')
                .fetch()

            return barangKalibrasi

        } catch (error) {

            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Barang kalibrasi tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: error
            })

        }

    }

    async store({ response, request }) {
        try {
            const barangKalibrasi = new BarangKalibrasi()
            const data = {
                barang_kalibrasi_kode: request.input('barang_kalibrasi_kode'),
                barang_kalibrasi_sn: request.input('barang_kalibrasi_sn'),
                barang_kalibrasi_tipe: request.input('barang_kalibrasi_tipe'),
                list_kalibrasi_id: request.input('list_kalibrasi_id'),
                barang_status_id: request.input('barang_status_id'),
                merk_barang_id: request.input('merk_barang_id')
            }

            barangKalibrasi.barang_kalibrasi_kode = data.barang_kalibrasi_kode
            barangKalibrasi.barang_kalibrasi_sn = data.barang_kalibrasi_sn
            barangKalibrasi.barang_kalibrasi_tipe = data.barang_kalibrasi_tipe
            barangKalibrasi.list_kalibrasi_id = data.list_kalibrasi_id
            barangKalibrasi.barang_status_id = data.barang_status_id
            barangKalibrasi.merk_barang_id = data.merk_barang_id

            await barangKalibrasi.save()
            return response.json(barangKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let barangKalibrasi = await BarangKalibrasi.findOrFail(params.id)
            
            const data = {
                barang_kalibrasi_kode: request.input('barang_kalibrasi_kode'),
                barang_kalibrasi_sn: request.input('barang_kalibrasi_sn'),
                barang_kalibrasi_tipe: request.input('barang_kalibrasi_tipe'),
                list_kalibrasi_id: request.input('list_kalibrasi_id'),
                barang_status_id: request.input('barang_status_id'),
                merk_barang_id: request.input('merk_barang_id')
            }

            barangKalibrasi.barang_kalibrasi_kode = data.barang_kalibrasi_kode
            barangKalibrasi.barang_kalibrasi_sn = data.barang_kalibrasi_sn
            barangKalibrasi.barang_kalibrasi_tipe = data.barang_kalibrasi_tipe
            barangKalibrasi.list_kalibrasi_id = data.list_kalibrasi_id
            barangKalibrasi.barang_status_id = data.barang_status_id
            barangKalibrasi.merk_barang_id = data.merk_barang_id

            await barangKalibrasi.save()
            return response.json(barangKalibrasi)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Barang kalibrasi tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }

    async delete({ params, response }) {
        try {
            const barangKalibrasi = await BarangKalibrasi.findOrFail(params.id)
            barangKalibrasi.delete()

            return response.json({ message: 'Barang kalibrasi berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Barang kalibrasi tidak ditemukan'
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
            let column = pagination.column || 'barang_kalibrasi_id';
            let sort = pagination.sort || 'desc';

            const barangKalibrasi = await BarangKalibrasi.query()
                .with('merkBarang')
                .with('barangStatus')
                .with('listKalibrasi')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(barangKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'barang_kalibrasi_kode';
            let value = search.value.toLowerCase();

            let barangKalibrasi = await BarangKalibrasi.query()
                .with('merkBarang')
                .with('barangStatus')
                .with('listKalibrasi')
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            let data = {
                barang_kalibrasi: barangKalibrasi,
                total: barangKalibrasi.rows.length
            }

            return response.json(data)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }
}

module.exports = BarangKalibrasiController
