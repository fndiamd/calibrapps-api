'use strict'

const BarangStatus = use('App/Models/BarangStatus')

class BarangStatusController {

    async index({ response }) {
        let barangStatus = await BarangStatus.query().fetch()
        return response.json(barangStatus)
    }

    async view({ params }) {
        let barangStatus = await BarangStatus.query().where('barang_status_id', params.id).first()
        return barangStatus
    }

    async store({ response, request }) {
        const barangStatus = new BarangStatus()
        const data = {
            barang_status_keterangan: request.input('barang_status_keterangan'),
            barang_status_warna: request.input('barang_status_warna')
        }

        barangStatus.barang_status_keterangan = data.barang_status_keterangan
        barangStatus.barang_status_warna = data.barang_status_warna

        await barangStatus.save()
        return response.json(barangStatus)
    }

    async update({ params, response, request }) {
        let barangStatus = await BarangStatus.find(params.id)

        const data = {
            barang_status_keterangan: request.input('barang_status_keterangan'),
            barang_status_warna: request.input('barang_status_warna')
        }

        barangStatus.barang_status_keterangan = data.barang_status_keterangan
        barangStatus.barang_status_warna = data.barang_status_warna

        await barangStatus.save()
        return response.json(barangStatus)
    }

    async delete({ params, response }) {
        const barangStatus = await BarangStatus.find(params.id)
        barangStatus.delete()
        return response.json({ message: 'Barang status berhasil dihapus' })
    }

    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const barangStatus = await BarangStatus.query()
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(barangStatus)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])
        let barangStatus = await BarangStatus.query()
        .whereRaw(`${search.column} LIKE %${search.value}%`)
        .fetch()
        return response.json(barangStatus)
    }
}

module.exports = BarangStatusController
