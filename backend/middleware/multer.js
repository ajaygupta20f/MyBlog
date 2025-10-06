import multer from "multer"

// multer setup
const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");