'use strict'

const MerkBarang = use('App/Models/MerkBarang')

class MerkBarangController {
    
    async index({response}){
        let merkBarang = await MerkBarang.query().fetch()
        return response.json(merkBarang)
    }

    async view({params, response }){
        let merkBarang = await MerkBarang.query().where('merk_barang_id', params.id).first()
        return merkBarang
    }

    async store({response, request}){
        const merkBarang = new MerkBarang()
        const data = {
            merk_barang_nama : request.input('merk_barang_nama')
        }

        merkBarang.merk_barang_nama = data.merk_barang_nama

        await merkBarang.save()
        return response.json(merkBarang)   
    }

    async update({params, response, request}){
        let merkBarang = await MerkBarang.find(params.id)
        
        const data = {
          merk_barang_nama : request.input('merk_barang_nama')
        }

        merkBarang.merk_barang_nama = data.merk_barang_nama

        await merkBarang.save()
        return response.json(merkBarang) 
    }

    async delete ({ params, response }) {
      const merkBarang = await MerkBarang.find(params.id)
      merkBarang.delete()
      return response.json({message: 'Merk barang berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const merkBarang = await MerkBarang.query()
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(merkBarang)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])
        let merkBarang = await MerkBarang.query()
        .whereRaw(`${search.column} LIKE %${search.value}%`)
        .fetch()
        return response.json(merkBarang)
    }
}

module.exports = MerkBarangController
