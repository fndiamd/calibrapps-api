'use strict'

const SeqDataUkur = use('App/Models/SeqDataUkur')

class SeqDataUkurController {

    async index({ response }) {
        try {
            let seqDataUkur = await SeqDataUkur
                .query()
                .with('dataUkur')
                .with('posisiUkur')
                .fetch()
            return response.json(seqDataUkur)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let data = await SeqDataUkur.findOrFail(params.id)
            let seqDataUkur = await SeqDataUkur
                .query()
                .where('seq_data_ukur_id', params.id)
                .with('dataUkur')
                .with('posisiUkur')
                .first()

            return seqDataUkur
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Sequence data ukur tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const seqDataUkur = new SeqDataUkur()
            const data = {
                seq_data_ukur_data: request.input('seq_data_ukur_data'),
                data_ukur_id: request.input('data_ukur_id'),
                posisi_ukur_id: request.input('posisi_ukur_id')
            }

            seqDataUkur.seq_data_ukur_data = data.seq_data_ukur_data
            seqDataUkur.data_ukur_id = data.data_ukur_id
            seqDataUkur.posisi_ukur_id = data.posisi_ukur_id

            await seqDataUkur.save()
            return response.json(seqDataUkur)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let seqDataUkur = await SeqDataUkur.findOrFail(params.id)

            const data = {
                seq_data_ukur_data: request.input('seq_data_ukur_data'),
                data_ukur_id: request.input('data_ukur_id'),
                posisi_ukur_id: request.input('posisi_ukur_id')
            }

            seqDataUkur.seq_data_ukur_data = data.seq_data_ukur_data
            seqDataUkur.data_ukur_id = data.data_ukur_id
            seqDataUkur.posisi_ukur_id = data.posisi_ukur_id

            await seqDataUkur.save()
            return response.json(seqDataUkur)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Sequence data ukur tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const seqDataUkur = await SeqDataUkur.findOrFail(params.id)
            seqDataUkur.delete()

            return response.json({ message: 'Seq data ukur berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Sequence data ukur tidak ditemukan'
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
            let column = pagination.column || 'seq_data_ukur_id';
            let sort = pagination.sort || 'desc';

            const seqDataUkur = await SeqDataUkur.query()
                .with('dataUkur')
                .with('posisiUkur')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)
            return response.json(seqDataUkur)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'seq_data_ukur_data';
            let value = search.value

            let seqDataUkur = await SeqDataUkur.query()
                .with('dataUkur')
                .with('posisiUkur')
                .whereRaw(`${column} LIKE '%${value}%'`)
                .fetch()
            return response.json(seqDataUkur)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = SeqDataUkurController
