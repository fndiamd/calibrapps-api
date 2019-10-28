'use strict'

const OrderDetail = use('App/Models/OrderDetail')

class OrderDetailController {
    
    async index({response}){
        let orderDetail = await OrderDetail.query().fetch()
        return response.json(orderDetail)
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
}

module.exports = OrderDetailController
