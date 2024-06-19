import { IAdHoc } from "../entity/IAdHoc";

export interface GetTabelaExemplo {
    select: {
        id?: number,
        texto?: string,
    }
}

export class IRepositorioExemplo{
    getAdHoc(filters: IAdHoc<GetTabelaExemplo>)
}