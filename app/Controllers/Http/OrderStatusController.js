'use strict'

const OrderStatus = use('App/Models/OrderStatus')
const { validate } = use('Validator')

let rules = {
    order_status_keterangan: 'required|unique:order_statuses,order_status_keterangan',
    order_status_warna: 'required|unique:order_statuses,order_status_warna'
}

const vmessage = {
    'order_status_keterangan.required': 'Status tidak boleh kosong',
    'order_status_keterangan.unique': 'Status sudah ada, tidak boleh duplikat',
    'order_status_warna.required': 'Warna status tidak boleh kosong',
    'order_status_warna.unique': 'Warna sudah dipakai, tidak boleh duplikat'
}

class OrderStatusController {

    async index({ response }) {
        try {
            let orderStatus = await OrderStatus.query().fetch()
            return response.json(orderStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let orderStatus = await OrderStatus.findOrFail(params.id)

            return orderStatus
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const orderStatus = new OrderStatus()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                order_status_keterangan: request.input('order_status_keterangan'),
                order_status_warna: request.input('order_status_warna')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            orderStatus.order_status_keterangan = data.order_status_keterangan
            orderStatus.order_status_warna = data.order_status_warna

            await orderStatus.save()
            return response.json(orderStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let orderStatus = await OrderStatus.findOrFail(params.id)

            const data = {
                order_status_keterangan: request.input('order_status_keterangan'),
                order_status_warna: request.input('order_status_warna')
            }

            if (orderStatus.order_status_keterangan === data.order_status_keterangan ||
                orderStatus.order_status_warna === data.order_status_warna) {
                rules = {
                    order_status_keterangan: 'required',
                    order_status_warna: 'required'
                }
            }

            const validation = await validate(request.all(), rules, vmessage)
            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            orderStatus.order_status_keterangan = data.order_status_keterangan
            orderStatus.order_status_warna = data.order_status_warna

            await orderStatus.save()
            return response.json(orderStatus)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const orderStatus = await OrderStatus.findOrFail(params.id)
            orderStatus.delete()

            return response.json({ message: 'Order status berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async pagination({ request, response }) {
        try {
            let pagination = request.only(['page', 'limit', 'column', 'sort'])
            let page = pagination.page || 1;
            let limit = pagination.limit || 10;
            let column = pagination.column || 'order_status_id';
            let sort = pagination.sort || 'desc';

            const orderStatus = await OrderStatus.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(orderStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'order_status_keterangan';
            let value = search.value.toLowerCase();

            let orderStatus = await OrderStatus.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(orderStatus.rows.length == 0 ){
                return response.status(404).send({
                    message : 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(orderStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = OrderStatusController
