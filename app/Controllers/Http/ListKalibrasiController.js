'use strict'

const ListKalibrasi = use('App/Models/ListKalibrasi')

class ListKalibrasiController {
    
    async index({response}){
        let listKalibrasi = await ListKalibrasi.query()
        .with('ruangLingkup')
        .with('standarKalibrasi')
        .with('tipePengerjaan')
        .fetch()
        return response.json(listKalibrasi)
    }

    async view({params, response }){
        let listKalibrasi = await ListKalibrasi.query().where('list_kalibrasi_id', params.id)
        .with('ruangLingkup')
        .with('standarKalibrasi')
        .with('tipePengerjaan')
        .first()
        return listKalibrasi
    }

    async store({response, request}){
        const listKalibrasi = new ListKalibrasi()
        const data = {
            list_kalibrasi_nama_alat : request.input('list_kalibrasi_nama_alat'),
            list_kalibrasi_harga : request.input('list_kalibrasi_harga'),
            ruang_lingkup_id : request.input('ruang_lingkup_id'),
            standar_kalibrasi_id : request.input('standar_kalibrasi_id'),
            tipe_pengerjaan_id : request.input('tipe_pengerjaan_id')
        }

        listKalibrasi.list_kalibrasi_nama_alat = data.list_kalibrasi_nama_alat
        listKalibrasi.list_kalibrasi_harga = data.list_kalibrasi_harga
        listKalibrasi.ruang_lingkup_id = data.ruang_lingkup_id
        listKalibrasi.standar_kalibrasi_id = data.standar_kalibrasi_id
        listKalibrasi.tipe_pengerjaan_id = data.tipe_pengerjaan_id

        await listKalibrasi.save()
        return response.json(listKalibrasi)   
    }

    async update({params, response, request}){
        let listKalibrasi = await ListKalibrasi.find(params.id)
        
        const data = {
          list_kalibrasi_nama_alat : request.input('list_kalibrasi_nama_alat'),
          list_kalibrasi_harga : request.input('list_kalibrasi_harga'),
          ruang_lingkup_id : request.input('ruang_lingkup_id'),
          standar_kalibrasi_id : request.input('standar_kalibrasi_id'),
          tipe_pengerjaan_id : request.input('tipe_pengerjaan_id')
        }

        listKalibrasi.list_kalibrasi_nama_alat = data.list_kalibrasi_nama_alat
        listKalibrasi.list_kalibrasi_harga = data.list_kalibrasi_harga
        listKalibrasi.ruang_lingkup_id = data.ruang_lingkup_id
        listKalibrasi.standar_kalibrasi_id = data.standar_kalibrasi_id
        listKalibrasi.tipe_pengerjaan_id = data.tipe_pengerjaan_id

        await listKalibrasi.save()
        return response.json(listKalibrasi)   
    }

    async delete ({ params, response }) {
      const listKalibrasi = await ListKalibrasi.find(params.id)
      listKalibrasi.delete()
      return response.json({message: 'List kalibrasi berhasil dihapus'})
    } 

    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const listKalibrasi = await ListKalibrasi.query()
        .with('ruangLingkup')
        .with('standarKalibrasi')
        .with('tipePengerjaan')
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(listKalibrasi)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])
        let listKalibrasi = await ListKalibrasi.query()
        .with('ruangLingkup')
        .with('standarKalibrasi')
        .with('tipePengerjaan')
        .whereRaw(`${search.column} LIKE %${search.value}%`)
        .fetch()
        return response.json(listKalibrasi)
    }

}

module.exports = ListKalibrasiController
