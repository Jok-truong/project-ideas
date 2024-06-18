import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../uploads'))
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`)
  }
})

const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1000000 // 1MB
  },
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  }
})

export { uploadPicture }
