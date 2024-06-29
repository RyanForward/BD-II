import { inject, injectable } from "tsyringe";
import { IAdHocRepository } from "../interfaces/repository/IAdHocRepository";

@injectable()
export class getAdHoc{
  constructor(
    @inject('AdHocRepository')
    private readonly adhocRepository: IAdHocRepository,
  ){}

  async execute(){
    await this.adhocRepository.getAdHoc();
  }
}