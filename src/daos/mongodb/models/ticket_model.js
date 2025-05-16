import { Schema, model } from 'mongoose';

export const ticketSchema = new Schema({
  code: { type: String, required: true },
  purchase_datetime: { type: String, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  // Estatus del pedido 
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled', 'failed'],
    default: 'pending', 
  },
});

export const TicketModel = model(
  'ticket',
  ticketSchema
);