
import MongoDao from "./mongo_dao.js";
import { TicketModel } from "./models/ticket_model.js";

export default class TicketDaoMongo extends MongoDao {
  constructor(model) {
    super(model);
  }
}

export const ticketDaoMongo = new TicketDaoMongo(TicketModel);