'use strict'

const BarangKalibrasi = use('App/Models/BarangKalibrasi')

class BarangKalibrasiController {

    async index({ response }) {
        let barangKalibrasi = await BarangKalibrasi.query()
            .with('merkBarang')
            .with('barangStatus')
            .with('listKalibrasi')
            .fetch()
        return response.json(barangKalibrasi)
    }

    async view({ params }) {
        let barangKalibrasi = await BarangKalibrasi.query()
            .where('barang_kalibrasi_id', params.id)
            .with('merkBarang')
            .with('barangStatus')
            .with('listKalibrasi')
            .first()
        return barangKalibrasi
    }

    async store({ response, request }) {
        const barangKalibrasi = new BarangKalibrasi()
        const data = {
            barang_kalibrasi_kode: request.input('barang_kalibrasi_kode'),
            barang_kalibrasi_sn: request.input('barang_kalibrasi_sn'),
            list_kalibrasi_id: request.input('list_kalibrasi_id'),
            barang_status_id: request.input('barang_status_id'),
            merk_barang_id: request.input('merk_barang_id')
        }

        barangKalibrasi.barang_kalibrasi_kode = data.barang_kalibrasi_kode
        barangKalibrasi.barang_kalibrasi_sn = data.barang_kalibrasi_sn
        barangKalibrasi.list_kalibrasi_id = data.list_kalibrasi_id
        barangKalibrasi.barang_status_id = data.barang_status_id
        barangKalibrasi.merk_barang_id = data.merk_barang_id

        await barangKalibrasi.save()
        return response.json(barangKalibrasi)
    }

    async update({ params, response, request }) {
        let barangKalibrasi = await BarangKalibrasi.find(params.id)

        const data = {
            barang_kalibrasi_kode: request.input('barang_kalibrasi_kode'),
            barang_kalibrasi_sn: request.input('barang_kalibrasi_sn'),
            list_kalibrasi_id: request.input('list_kalibrasi_id'),
            barang_status_id: request.input('barang_status_id'),
            merk_barang_id: request.input('merk_barang_id')
        }

        barangKalibrasi.barang_kalibrasi_kode = data.barang_kalibrasi_kode
        barangKalibrasi.barang_kalibrasi_sn = data.barang_kalibrasi_sn
        barangKalibrasi.list_kalibrasi_id = data.list_kalibrasi_id
        barangKalibrasi.barang_status_id = data.barang_status_id
        barangKalibrasi.merk_barang_id = data.merk_barang_id

        await barangKalibrasi.save()
        return response.json(barangKalibrasi)
    }

    async delete({ params, response }) {
        const barangKalibrasi = await BarangKalibrasi.find(params.id)
        barangKalibrasi.delete()
        return response.json({ message: 'Barang kalibrasi berhasil dihapus' })
    }

    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const barangKalibrasi = await BarangKalibrasi.query()
            .with('merkBarang')
            .with('barangStatus')
            .with('listKalibrasi')
            .orderBy(`${pagination.column}`, `${pagination.sort}`)
            .paginate(page, limit)
        return response.json(barangKalibrasi)
    }
}

module.exports = BarangKalibrasiController
