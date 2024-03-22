import mongoose,{Mongoose} from "mongoose";



const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseConnection{
    promise:Promise<Mongoose>|null
    conn:Mongoose|null
}


let cached:MongooseConnection = (global as any).mongoose

if(!cached) {
    cached = { 
      conn: null, promise: null 
    }
  }

  
  const connectDB =async()=>{ 

    if(cached.conn){
        
        return cached.conn
    }
    
    if(!MONGODB_URI) throw new Error('Missing MONGODB_URL');
    
    cached.promise = mongoose.connect(MONGODB_URI)
    
    
    cached.conn = await cached.promise
    
    return cached.conn;
    }
    
    export default connectDB;