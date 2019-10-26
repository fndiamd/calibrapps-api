'use strict'

const MerkBarang = use('App/Models/MerkBarang')

class MerkBarangController {
    
    async index({response}){
        let merkBarang = await MerkBarang.query().fetch()
        return response.json(merkBarang)
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

    async destroy ({ params, request, response }) {
      await MerkBarang.find(params.id).delete()
      return response.json({message: 'Merk barang berhasil dihapus'})
  } 
}

module.exports = MerkBarangController
