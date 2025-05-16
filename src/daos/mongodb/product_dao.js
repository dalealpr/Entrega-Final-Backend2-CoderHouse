import { ProductModel } from "./models/product_model.js";
import MongoDao from "./mongo_dao.js";

class ProductDaoMongo extends MongoDao {
    constructor(model) {
        super(model);
    }
}

export const productDaoMongo = new ProductDaoMongo(ProductModel);