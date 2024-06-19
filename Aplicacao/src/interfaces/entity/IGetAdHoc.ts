export interface IRequestAdHoc <T> {
    table: string,
    select: string[],
    filters?: string[]
}
  