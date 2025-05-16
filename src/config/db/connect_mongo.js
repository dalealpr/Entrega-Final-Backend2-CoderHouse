import {connect} from 'mongoose'
import 'dotenv/config'


export const initMongoDb = async()=>{
    try {
        await connect(process.env.MONGO_URL)
    } catch (error) {
        throw new Error(error)
    }
}