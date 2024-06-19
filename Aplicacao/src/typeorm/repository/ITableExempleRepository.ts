import { Equal, ILike } from "typeorm";
import { GetTabelaExemplo, IRepositorioExemplo } from "../../interfaces/repository/IRepositoryExemplo";

export class TableExemploRepository implements IRepositorioExemplo{
  
  getAdHoc(filters: GetTabelaExemplo): Promise<GetTabelaExemplo>{
  
    //aqui sera chamado o repositorio para fazer a query
    filters.filters.id ? where.id = Equal(filters.filters.id) : undefined; 
    filters.filters.texto ? where.id = ILike(`%${filters.filters.id}%`) : undefined; 

    //iremos utilizar o where como um objeto filtro, da mesma forma que o select;

    //return query: após isso a query será retornada
     
  }

}