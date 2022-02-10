import express from 'express'
const router = express.Router();
import {ListModel} from "../models/List";
import {verify} from "../verifyToken"
import {IGetUserAuthInfoRequest} from '../verifyToken'

//CREATE
//@ts-ignore
router.post("/", verify, async (req: IGetUserAuthInfoRequest, res: express.Response): Promise<void> => {
  if (req.user.isAdmin) {
    const newList = new ListModel(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});


//Update
//@ts-ignore
router.put("/:id", verify, async (req: IGetUserAuthInfoRequest, res: express.Response): Promise<void> => {
  if (req.user.isAdmin) {
    try {
      const updatedList = await ListModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET by ID
//@ts-ignore
router.get("/find/:id", verify, async (req: IGetUserAuthInfoRequest, res: express.Response): Promise<void> => {
  if (req.user.isAdmin) {
  try {
    const list = await ListModel.findById(req.params.id);
    res.status(200).json(list);
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
      await ListModel.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET
//@ts-ignore
router.get("/", verify, async (req: express.Request, res: express.Response): Promise<void> => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await ListModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await ListModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await ListModel.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
