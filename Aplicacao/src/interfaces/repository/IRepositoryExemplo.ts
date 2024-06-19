
export interface GetTabelaExemplo {
    select: {
        id?: number,
        texto?: string,
    },
    filters: {
        id?: number,
        texto?: string,
    }

}

export class IRepositorioExemplo{
    getAdHoc(filters: GetTabelaExemplo): Promise<GetTabelaExemplo>
}