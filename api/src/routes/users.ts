import express from 'express'
const router = express.Router()
import { UserModel, UserSchemaDocumentInterface } from '../models/User'
import { verify } from '../verifyToken'
import { IGetUserAuthInfoRequest } from '../verifyToken'

//UPDATE
//@ts-ignore
router.put('/:id', verify, async (req: IGetUserAuthInfoRequest, res: express.Response) => {
  if (req.user._id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      //@ts-ignore
      req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    }

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      )
      res.status(200).json(updatedUser)
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json('You can update only your account!')
  }
})

//DELETE
//@ts-ignore
router.delete('/:id', verify, async (req: IGetUserAuthInfoRequest, res: express.Response) => {
  if (req.user._id === req.params.id || req.user.isAdmin) {
    try {
      await UserModel.findByIdAndDelete(req.params.id)
      res.status(200).json('User has been deleted...')
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json('You can delete only your account!')
  }
})

//GET
router.get('/find/:id', async (req: express.Request, res: express.Response) => {
  try {
    const user = await UserModel.findById(req.params.id)
    //@ts-ignore
    const { password, ...info } = user._doc
    res.status(200).json(info)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ALL
//@ts-ignore
router.get('/', verify, async (req: IGetUserAuthInfoRequest, res: express.Response) => {
  const query = req.query.new
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await UserModel.find().sort({ _id: -1 }).limit(5)
        : await UserModel.find()
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json('You are not allowed to see all users!')
  }
})

//GET USER STATS
router.get('/stats', async (_: any, res: express.Response) => {
  try {
    const data = await UserModel.aggregate([
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ])
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
})

//  PUT MOVIE TO LIST
//@ts-ignore
router.post("/addMovie", verify, async (req: IGetUserAuthInfoRequest, res: express.Response): Promise<void> => {
    try {
      const movieId = req.body.id
      const userId = req.user.id
      
      const userData = await UserModel.findByIdAndUpdate(
        userId,
      { $push: { myList: movieId } }, 
      { new: true }
      )
      
      const myList = userData?.myList
      res.status(200).json({myList})
    } catch (err) {
      res.status(500).json(err);
    }
});

//DELETE MOVIE FROM LIST
//@ts-ignore
router.delete("/deleteMovie/:id", verify, async (req: IGetUserAuthInfoRequest, res: express.Response): Promise<void> => {

    try {
        const movieId = req.params.id
        const userId = req.user.id

        const userData = await UserModel.findByIdAndUpdate(
        userId,
        {
          $pull: { myList: { $in: [ movieId ] } },
        },
        { new: true }
     )

        const myList = userData?.myList
        res.status(200).json({myList})
    } catch (err) {
      res.status(500).json(err);
    }
});


export default router
