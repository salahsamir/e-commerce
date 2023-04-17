import path from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../config/.env') })
import cloudinary from 'cloudinary';


cloudinary.v2.config({
    cloud_name: "dvzvx4m3t",
  api_key: "721631396576469",
  api_secret: "8hdoqieMdtulyw4C9YABJD-fhYQ",
    secure: true
})

export default cloudinary.v2;