'use strict'

const OrderDetail = use('App/Models/OrderDetail')

class OrderDetailController {
    
    async index({response}){
        let orderDetail = await OrderDetail.query()
        .with('progresOrder')
        .with('barangKalibrasi')
        .fetch()
        return response.json(orderDetail)
    }

    async view({params, response }){
      let orderDetail = await OrderDetail.query().where('order_detail_id', params.id)
      .with('progresOrder')
      .with('barangKalibrasi')
      .first()
      return orderDetail
  }

    async store({response, request}){
        const orderDetail = new OrderDetail()
        const data = {
            progres_order_id : request.input('progres_order_id'),
            barang_kalibrasi_id : request.input('barang_kalibrasi_id')
          }

        orderDetail.progres_order_id = data.progres_order_id
        orderDetail.barang_kalibrasi_id = data.barang_kalibrasi_id

        await orderDetail.save()
        return response.json(orderDetail)   
    }

    async update({params, response, request}){
        let orderDetail = await OrderDetail.find(params.id)
        
        const data = {
          progres_order_id : request.input('progres_order_id'),
          barang_kalibrasi_id : request.input('barang_kalibrasi_id')
        }

        orderDetail.progres_order_id = data.progres_order_id
        orderDetail.barang_kalibrasi_id = data.barang_kalibrasi_id

        await orderDetail.save()
        return response.json(orderDetail) 
    }

    async delete ({ params, response }) {
      const orderDetail = await OrderDetail.find(params.id)
      orderDetail.delete()
      return response.json({message: 'Order detail berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
      let pagination = request.only(['page', 'limit'])
      let page = pagination.page || 1;
      let limit = pagination.limit || 10;
      const orderDetail = await OrderDetail.query()
      .with('progresOrder')
      .with('barangKalibrasi')
      .paginate(page, limit)
      return response.json(orderDetail)
  }
}

module.exports = OrderDetailController
