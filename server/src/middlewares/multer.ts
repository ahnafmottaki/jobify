import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    console.log(file);
    cb(null, fileName);
  },
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../public/uploads"));
  },
});

const upload = multer({ storage });

export default upload;
