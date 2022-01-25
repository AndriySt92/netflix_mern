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

export default router;