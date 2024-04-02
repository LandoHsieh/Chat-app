import * as dotenv from 'dotenv'

if(process.env.NODE_ENV !== 'prod'){
    const configFile = `./.env.${process.env.NODE_ENV}`
    dotenv.config({ path: configFile})
}else{
    dotenv.config()
}

const PORT = process.env.PORT
const MONGO_DB_URI = process.env.MONGO_DB_URI
const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const JWT_SECRET = process.env.JWT_SECRET 
export {
    PORT,
    MONGO_DB_URI,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    JWT_SECRET
}