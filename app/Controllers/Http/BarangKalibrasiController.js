'use strict'

const BarangKalibrasi = use('App/Models/BarangKalibrasi')

class BarangKalibrasiController {
    
    async index({response}){
        let barangKalibrasi = await BarangKalibrasi.query().fetch()
        return response.json(barangKalibrasi)
    }

    async store({response, request}){
        const barangKalibrasi = new BarangKalibrasi()
        const data = {
            barang_kalibrasi_kode : request.input('barang_kalibrasi_kode'),
            barang_kalibrasi_sn : request.input('barang_kalibrasi_sn'),
            list_kalibrasi_id : request.input('list_kalibrasi_id'),
            barang_status_id : request.input('barang_status_id'),
            merk_barang_id : request.input('merk_barang_id')
        }

        barangKalibrasi.barang_kalibrasi_kode = data.barang_kalibrasi_kode
        barangKalibrasi.barang_kalibrasi_sn = data.barang_kalibrasi_sn
        barangKalibrasi.list_kalibrasi_id = data.list_kalibrasi_id
        barangKalibrasi.barang_status_id = data.barang_status_id
        barangKalibrasi.merk_barang_id = data.merk_barang_id

        await barangKalibrasi.save()
        return response.json(barangKalibrasi)   
    }

    async update({params, response, request}){
        let barangKalibrasi = await BarangKalibrasi.find(params.id)
        
        const data = {
          barang_kalibrasi_kode : request.input('barang_kalibrasi_kode'),
          barang_kalibrasi_sn : request.input('barang_kalibrasi_sn'),
          list_kalibrasi_id : request.input('list_kalibrasi_id'),
          barang_status_id : request.input('barang_status_id'),
          merk_barang_id : request.input('merk_barang_id')
        }

        barangKalibrasi.barang_kalibrasi_kode = data.barang_kalibrasi_kode
        barangKalibrasi.barang_kalibrasi_sn = data.barang_kalibrasi_sn
        barangKalibrasi.list_kalibrasi_id = data.list_kalibrasi_id
        barangKalibrasi.barang_status_id = data.barang_status_id
        barangKalibrasi.merk_barang_id = data.merk_barang_id

        await barangKalibrasi.save()
        return response.json(barangKalibrasi) 
    }

    async destroy ({ params, request, response }) {
      await BarangKalibrasi.find(params.id).delete()
      return response.json({message: 'Barang kalibrasi berhasil dihapus'})
  } 
}

module.exports = BarangKalibrasiController
