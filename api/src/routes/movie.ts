import express from 'express'
const router = express.Router();
import {MovieModel} from "../models/Movie";
import {verify} from "../verifyToken"
import {IGetUserAuthInfoRequest} from '../verifyToken'

//CREATE
//@ts-ignore
router.post("/", verify, async (req: IGetUserAuthInfoRequest, res: express.Response): Promise<void> => {
  if (req.user.isAdmin) {
    const newMovie = new MovieModel(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE
//@ts-ignore
router.put("/:id", verify, async (req: IGetUserAuthInfoRequest, res: express.Response): Promise<void> => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await MovieModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE
//@ts-ignore
router.delete("/:id", verify, async (req: IGetUserAuthInfoRequest, res: express.Response): Promise<void> => {
  if (req.user.isAdmin) {
    try {
      await MovieModel.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET
//@ts-ignore
router.get("/find/:id", verify, async (req: IGetUserAuthInfoRequest, res: express.Response): Promise<void> => {
  try {
    const movie = await MovieModel.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM
//@ts-ignore
router.get("/random", verify, async (req: IGetUserAuthInfoRequest, res: express.Response): Promise<void> => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await MovieModel.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await MovieModel.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
//@ts-ignore
router.get("/", verify, async (req: IGetUserAuthInfoRequest, res: express.Response): Promise<void> => {
  if (req.user.isAdmin) {
    try {
      const movies = await MovieModel.find();
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET MOVIE STATS
router.get('/stats', async (_: any, res: express.Response) => {
  try {
    const data = await MovieModel.aggregate([
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

//SEARCH
router.get('/search' , async (req: express.Request, res: express.Response) => {
  const {title} = req.query
  try {

    const movie = await MovieModel.findOne({title})
    
    if(!movie){
      return res.status(400).json({message: `Nothing found for your search ${title}. Make sure the name is entered without errors`})
    }

    const {genre, isSeries} = movie

    const offerContent = await MovieModel.aggregate([
      { $match: { isSeries, genre, title: {$ne: title } } },
      { $sample: { size: 10 } },
    ]);

    if(offerContent.length){
      return res.status(200).json({data: movie,offerContent})
    }

    res.status(200).json({data: movie})
  } catch (err) {
    res.status(500).json(err)
  }
})

export default router;