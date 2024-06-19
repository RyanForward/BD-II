export interface IAdHoc<T>{
    tempoDeExecução: number,
    resultados: T[],
    qtdRetornos: number,
}