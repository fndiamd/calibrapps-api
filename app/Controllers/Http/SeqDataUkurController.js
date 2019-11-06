'use strict'

const SeqDataUkur = use('App/Models/SeqDataUkur')

class SeqDataUkurController {
    
    async index({response}){
        let seqDataUkur = await SeqDataUkur.query()
        .with('dataUkur')
        .with('posisiUkur')
        .fetch()
        return response.json(seqDataUkur)
    }

    async view({params, response }){
        let seqDataUkur = await SeqDataUkur.query().where('seq_data_ukur_id', params.id)
        .with('dataUkur')
        .with('posisiUkur')
        .first()
        return seqDataUkur
    }

    async store({response, request}){
        const seqDataUkur = new SeqDataUkur()
        const data = {
            seq_data_ukur_data : request.input('seq_data_ukur_data'),
            data_ukur_id : request.input('data_ukur_id'),
            posisi_ukur_id : request.input('posisi_ukur_id')
        }

        seqDataUkur.seq_data_ukur_data = data.seq_data_ukur_data
        seqDataUkur.data_ukur_id = data.data_ukur_id
        seqDataUkur.posisi_ukur_id = data.posisi_ukur_id

        await seqDataUkur.save()
        return response.json(seqDataUkur)   
    }

    async update({params, response, request}){
        let seqDataUkur = await SeqDataUkur.find(params.id)
        
        const data = {
          seq_data_ukur_data : request.input('seq_data_ukur_data'),
          data_ukur_id : request.input('data_ukur_id'),
          posisi_ukur_id : request.input('posisi_ukur_id')
        }

        seqDataUkur.seq_data_ukur_data = data.seq_data_ukur_data
        seqDataUkur.data_ukur_id = data.data_ukur_id
        seqDataUkur.posisi_ukur_id = data.posisi_ukur_id

        await seqDataUkur.save()
        return response.json(seqDataUkur)  
    }

    async delete ({ params, response }) {
      const seqDataUkur = await SeqDataUkur.find(params.id)
      seqDataUkur.delete()
      return response.json({message: 'Seq data ukur berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const seqDataUkur = await SeqDataUkur.query()
        .with('dataUkur')
        .with('posisiUkur')
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(seqDataUkur)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])
        let seqDataUkur = await SeqDataUkur.query()
        .with('dataUkur')
        .with('posisiUkur')
        .whereRaw(`${search.column} LIKE %${search.value}%`)
        .fetch()
        return response.json(seqDataUkur)
    }
}

module.exports = SeqDataUkurController
