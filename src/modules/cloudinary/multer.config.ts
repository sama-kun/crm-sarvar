import multer from "multer";

import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

const storage = multer.memoryStorage(); // Store files in memory

const multerConfig: MulterOptions = {
  storage: storage,
};

export default multerConfig;
