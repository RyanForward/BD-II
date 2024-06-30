import { Session } from "../../typeorm/entities/sessions";
import { inject, injectable } from "tsyringe";

interface IAdHocRepository{
  getAdHoc(): Promise<Session[]>;
}

export { IAdHocRepository }