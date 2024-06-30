import { container } from "tsyringe";
import { SessionController } from "./controller/controller";
import { AdHocRepository } from "./typeorm/repository/AdHocRepository";

function main(){
  container.register("AdHocRepository", { useClass: AdHocRepository });

  const sessionController = new SessionController();
  const adHoc = sessionController.getAdHoc()
  console.log(adHoc)
}

export {main};