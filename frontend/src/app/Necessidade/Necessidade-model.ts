import { PessoaModel } from '../Pessoa/Pessoa-model'

export interface NecessidadeModel{
    id: string
    descricao: string
    quantidade: number
    logotipo: string
    hashtags: string
    dia: string
    pessoa: PessoaModel
}