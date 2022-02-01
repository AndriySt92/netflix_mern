import express from 'express'
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || 'drcptrml4',
  api_key:process.env.CLOUDINARY_API_KEY || '284412134166591',
  api_secret:process.env.CLOUDINARY_API_SECRET || 'cogaLBCfFhoelbpENbickkwPO6Q',
})

class UploadFileController {
  async upload(req: express.Request, res: express.Response): Promise<void> {

    const file: Express.Multer.File | undefined = req.file

    cloudinary.uploader
      .upload_stream(
        { resource_type: 'auto', folder: 'netflix' },
        function (error: any, result: any) {
          if (error || !result) {
            res.sendStatus(500).json({
              status: 'error',
              message: error || 'upload error',
            })
          } else {
            res.json({
              url: result.url,
            })
          }
        },
      )
      .end(file?.buffer)
  }
}

export default new UploadFileController()
