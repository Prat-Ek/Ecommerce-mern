import multer from "multer"
import path from "path"
import fs from "fs";

const Uploader = (dir='/') => {
  const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      // const filePath = process.cwd()+"/public/uploads/"
      const filePath = path.join(process.cwd(), "public",'uploads', dir)
      if(!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }
      cb(null, filePath)
    },
    filename: (req, file, cb) => {
      // file exists
      const filename = Date.now() + "-" + file.originalname;
      cb(null, filename)
    }
  })

  return multer({
    storage: myStorage,
    limits: {
      fileSize: 3*1024*1024
    },
    fileFilter: (req, file, cb) => {
      const ext= file.originalname.split('.').pop() as string;
      if(['jpg', 'png', 'gif', 'jpeg', 'bmp', 'svg','webp', 'pdf', 'doc','docx','json','csv'].includes(ext?.toLowerCase())) {
        cb(null, true)
      } else {
        cb(new Error("File format not supported"))
      }
    }
  });
}

export default Uploader;