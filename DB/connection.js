import chalk from 'chalk';
import mongoose from 'mongoose'
const connectDB  = async ()=>{
   
    return await mongoose.connect(process.env.DB_LOCAL)
    .then(res=>console.log(chalk.blue(`DB Connected successfully on .........`)))
    .catch(err=>console.log(chalk.blue(` Fail to connect  DB......... `)))
}

export default connectDB;