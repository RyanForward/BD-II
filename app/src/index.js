"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var tsyringe_1 = require("tsyringe");
var controller_1 = require("./controller/controller");
var AdHocRepository_1 = require("./typeorm/repository/AdHocRepository");
function main() {
    tsyringe_1.container.register("AdHocRepository", { useClass: AdHocRepository_1.AdHocRepository });
    var sessionController = new controller_1.SessionController();
    var adHoc = sessionController.getAdHoc();
    console.log(adHoc);
}
exports.main = main;
