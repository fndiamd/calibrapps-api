'use strict'

const OrderStatus = use('App/Models/OrderStatus')

class OrderStatusController {
    
    async index({response}){
        let orderStatus = await OrderStatus.query().fetch()
        return response.json(orderStatus)
    }

    async view({params, response }){
        let orderStatus = await OrderStatus.query().where('order_status_id', params.id).first()
        return orderStatus
    }

    async store({response, request}){
        const orderStatus = new OrderStatus()
        const data = {
            order_status_keterangan : request.input('order_status_keterangan'),
            order_status_warna: request.input('order_status_warna')
        }

        orderStatus.order_status_keterangan = data.order_status_keterangan
        orderStatus.order_status_warna = data.order_status_warna

        await orderStatus.save()
        return response.json(orderStatus)   
    }

    async update({params, response, request}){
        let orderStatus = await OrderStatus.find(params.id)
        
        const data = {
          order_status_keterangan : request.input('order_status_keterangan'),
          order_status_warna: request.input('order_status_warna')
        }

        orderStatus.order_status_keterangan = data.order_status_keterangan
        orderStatus.order_status_warna = data.order_status_warna

        await orderStatus.save()
        return response.json(orderStatus)    
    }

    async delete ({ params, response }) {
      const orderStatus = await OrderStatus.find(params.id)
      orderStatus.delete()
      return response.json({message: 'Order status berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const orderStatus = await OrderStatus.query()
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(orderStatus)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])
        let orderStatus = await OrderStatus.query()
        .whereRaw(`${search.column} LIKE %${search.value}%`)
        .fetch()
        return response.json(orderStatus)
    }
}

module.exports = OrderStatusController
