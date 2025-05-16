import { RoleModel } from "./models/role_model.js";
import MongoDao from "./mongo_dao.js";

class RolDaoMongo extends MongoDao {
    constructor(model) {
        super(model);
    }
}

export const rolDaoMongo = new RolDaoMongo(RoleModel);