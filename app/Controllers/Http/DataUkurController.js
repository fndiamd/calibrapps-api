'use strict'

const DataUkur = use('App/Models/DataUkur')

class DataUkurController {

    async index({ response }) {
        let dataUkur = await DataUkur.query()
        .with('dataPengamatan')
        .with('barangKalibrasi')
        .fetch()
        return response.json(dataUkur)
    }

    async view({ params }) {
        let dataUkur = await DataUkur.query().where('data_ukur_id', params.id)
        .with('dataPengamatan')
        .with('barangKalibrasi')
        .first()
        return dataUkur
    }

    async store({ response, request }) {
        const dataUkur = new DataUkur()
        const data = {
            data_ukur_setting_point: request.input('data_ukur_setting_point'),
            data_pengamatan_id: request.input('data_pengamatan_id'),
            barang_kalibrasi_id: request.input('barang_kalibrasi_id')
        }

        dataUkur.data_ukur_setting_point = data.data_ukur_setting_point
        dataUkur.data_pengamatan_id = data.data_pengamatan_id
        dataUkur.barang_kalibrasi_id = data.barang_kalibrasi_id

        await dataUkur.save()
        return response.json(dataUkur)
    }

    async update({ params, response, request }) {
        let dataUkur = await DataUkur.find(params.id)

        const data = {
            data_ukur_setting_point: request.input('data_ukur_setting_point'),
            data_pengamatan_id: request.input('data_pengamatan_id'),
            barang_kalibrasi_id: request.input('barang_kalibrasi_id')
        }

        dataUkur.data_ukur_setting_point = data.data_ukur_setting_point
        dataUkur.data_pengamatan_id = data.data_pengamatan_id
        dataUkur.barang_kalibrasi_id = data.barang_kalibrasi_id

        await dataUkur.save()
        return response.json(dataUkur)
    }

    async delete({ params, response }) {
        const dataUkur = await DataUkur.find(params.id)
        dataUkur.delete()
        return response.json({ message: 'Data ukur berhasil dihapus' })
    }

    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const dataUkur = await DataUkur.query()
        .with('dataPengamatan')
        .with('barangKalibrasi')
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(dataUkur)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])
        let dataUkur = await DataUkur.query()
        .with('dataPengamatan')
        .with('barangKalibrasi')
        .whereRaw(`LOWER(${search.column}) LIKE '%${search.value.toLowerCase()}%'`)
        .fetch()
        return response.json(dataUkur)
    }
}

module.exports = DataUkurController
