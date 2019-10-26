'use strict'

const BarangStatus = use('App/Models/BarangStatus')

class BarangStatusController {
    
    async index({response}){
        let barangStatus = await BarangStatus.query().fetch()
        return response.json(barangStatus)
    }

    async store({response, request}){
        const barangStatus = new BarangStatus()
        const data = {
            barang_status_keterangan : request.input('barang_status_keterangan')
        }

        barangStatus.barang_status_keterangan = data.barang_status_keterangan

        await barangStatus.save()
        return response.json(barangStatus)   
    }

    async update({params, response, request}){
        let barangStatus = await BarangStatus.find(params.id)
        
        const data = {
          barang_status_keterangan : request.input('barang_status_keterangan')
        }

        barangStatus.barang_status_keterangan = data.barang_status_keterangan

        await barangStatus.save()
        return response.json(barangStatus) 
    }

    async destroy ({ params, request, response }) {
      await BarangStatus.find(params.id).delete()
      return response.json({message: 'Barang status berhasil dihapus'})
  } 
}

module.exports = BarangStatusController
