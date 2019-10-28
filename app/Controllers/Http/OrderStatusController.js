'use strict'

const OrderStatus = use('App/Models/OrderStatus')

class OrderStatusController {
    
    async index({response}){
        let orderStatus = await OrderStatus.query().fetch()
        return response.json(orderStatus)
    }

    async store({response, request}){
        const orderStatus = new OrderStatus()
        const data = {
            order_status_keterangan : request.input('order_status_keterangan')
        }

        orderStatus.order_status_keterangan = data.order_status_keterangan

        await orderStatus.save()
        return response.json(orderStatus)   
    }

    async update({params, response, request}){
        let orderStatus = await OrderStatus.find(params.id)
        
        const data = {
          order_status_keterangan : request.input('order_status_keterangan')
        }

        orderStatus.order_status_keterangan = data.order_status_keterangan

        await orderStatus.save()
        return response.json(orderStatus)    
    }

    async delete ({ params, response }) {
      const orderStatus = await OrderStatus.find(params.id)
      orderStatus.delete()
      return response.json({message: 'Order status berhasil dihapus'})
  } 
}

module.exports = OrderStatusController
