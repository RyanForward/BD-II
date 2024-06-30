import { AppDataSource } from "../../../conn/conn";
import { IAdHocRepository } from "../../interfaces/repository/IAdHocRepository";
import { Session } from "../entities/sessions";
import "reflect-metadata"


class AdHocRepository implements IAdHocRepository{
  private readonly adHocRepository = AppDataSource.getRepository(Session)

  async getAdHoc(): Promise<Session[]>{
    const sessions = await this.adHocRepository.find({
      where:{
        countryKey: 36,
      }
    })
    console.log(sessions); 
    return sessions
  }
}

export {AdHocRepository}