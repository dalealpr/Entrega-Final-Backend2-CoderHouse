import MongoDao from "./mongo_dao.js";
import {UserModel} from "./models/user_model.js"

export default class UserDaoMongo extends MongoDao {
    constructor(model) {
        super(model);
    }

    getByEmail = async (email) => {
        try {
            return this.model.findOne({ email });
        } catch (error) {
            throw new Error(error);
        }
    };

    getById = async (id) => {
        try {
            // traer el usuario junto con su respectivo carrito
            return this.model.findById(id).populate("cart");
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const userDaoMongo = new UserDaoMongo(UserModel)