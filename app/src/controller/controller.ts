import { container } from "tsyringe";
import { getAdHoc } from "../testes/main"

export class SessionController{
  async getAdHoc(){
    const getAdHocSession = container.resolve(getAdHoc);
    const result = getAdHocSession.execute()

    return result;
  }
}