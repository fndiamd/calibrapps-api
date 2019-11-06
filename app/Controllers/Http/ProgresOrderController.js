'use strict'

const ProgresOrder = use('App/Models/ProgresOrder')

class ProgresOrderController {
    
    async index({response}){
        let progresOrder = await ProgresOrder.query()
        .with('customerPerusahaan')
        .with('penawaranOrder')
        .with('kantorCabang')
        .with('orderStatus')
        .fetch()
        return response.json(progresOrder)
    }

    async view({params, response }){
      let progresOrder = await ProgresOrder.query().where('progres_order_id', params.id)
      .with('customerPerusahaan')
      .with('penawaranOrder')
      .with('kantorCabang')
      .with('orderStatus')
      .first()
      return progresOrder
    }

    async store({response, request}){
        const progresOrder = new ProgresOrder()
        const data = {
            progres_order_tanggal_order : request.input('posisi_ukur_posisi'),
            progres_order_estimasi : request.input('progres_order_estimasi'),
            customer_perusahaan_id : request.input('customer_perusahaan_id'),
            penawaran_order_id : request.input('penawaran_order_id'),
            kantor_cabang_id : request.input('kantor_cabang_id'),
            order_status_id : request.input('order_status_id')
          }

        progresOrder.progres_order_tanggal_order = data.progres_order_tanggal_order
        progresOrder.progres_order_estimasi = data.progres_order_estimasi
        progresOrder.customer_perusahaan_id = data.customer_perusahaan_id
        progresOrder.penawaran_order_id = data.penawaran_order_id
        progresOrder.kantor_cabang_id = data.kantor_cabang_id
        progresOrder.order_status_id = data.order_status_id

        await progresOrder.save()
        return response.json(progresOrder)   
    }

    async update({params, response, request}){
        let progresOrder = await ProgresOrder.find(params.id)
        
        const data = {
          progres_order_tanggal_order : request.input('posisi_ukur_posisi'),
          progres_order_estimasi : request.input('progres_order_estimasi'),
          customer_perusahaan_id : request.input('customer_perusahaan_id'),
          penawaran_order_id : request.input('penawaran_order_id'),
          kantor_cabang_id : request.input('kantor_cabang_id'),
          order_status_id : request.input('order_status_id')
        }

        progresOrder.progres_order_tanggal_order = data.progres_order_tanggal_order
        progresOrder.progres_order_estimasi = data.progres_order_estimasi
        progresOrder.customer_perusahaan_id = data.customer_perusahaan_id
        progresOrder.penawaran_order_id = data.penawaran_order_id
        progresOrder.kantor_cabang_id = data.kantor_cabang_id
        progresOrder.order_status_id = data.order_status_id

        await progresOrder.save()
        return response.json(progresOrder)     
    }

    async delete ({ params, response }) {
      const progresOrder = await ProgresOrder.find(params.id)
      progresOrder.delete()
      return response.json({message: 'Progres Order berhasil dihapus'})
    } 

    async pagination({ request, response }) {
      let pagination = request.only(['page', 'limit', 'column', 'sort'])
      let page = pagination.page || 1;
      let limit = pagination.limit || 10;
      const progresOrder = await ProgresOrder.query()
      .with('customerPerusahaan')
      .with('penawaranOrder')
      .with('kantorCabang')
      .with('orderStatus')
      .orderBy(`${pagination.column}`, `${pagination.sort}`)
      .paginate(page, limit)
      return response.json(progresOrder)
  }
}

module.exports = ProgresOrderController
