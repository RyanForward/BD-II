import { IAdHoc } from "../../interfaces/entity/IAdHoc";

export class TabelaExemploUseCase{
    constructor(
        private readonly repositorioExemplo: IRepositorioExemplo;
    ){}

    async execute(table, select, filters): Promise<IAdHoc>: {
        //aqui chama a função do repositório e passa como argumento os filters
    } 
}