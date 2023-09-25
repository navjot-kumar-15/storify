import Person from "../model/person.js";
import asyncHandler from "express-async-handler";

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

// Create the person data
export const createPersonDetail = asyncHandler(async (req, res) => {
  const person = await Person(req.body);
  if (!person) {
    res.status(400);
    throw new Error("please enter all fields");
  }
  const { name, email, phone, gender } = req.body;
  const addPerson = new Person({
    user: req.user.id,
    name,
    email,
    phone,
    gender,
  });
  await addPerson.save();
  res.status(200).json(addPerson);
});

// Get the persons details
export const getPersonDetails = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const { sort } = req.query;
  const { limit } = req.query;
  const { page } = req.query;
  const personsDetails = await Person.find({
    user: req.user.id,
    $or: [
      { name: { $regex: q } },
      { email: { $regex: q } },
      { gender: { $regex: q } },
    ],
  })
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await Person.find({ user: req.user.id }).countDocuments();

  res.json({
    personsDetails,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

export const getFilterData = asyncHandler(async (req, res) => {
  let data = Person.find({ user: req.user.id });

  if (req.query.gender) {
    data = data.where("gender").equals(req.query.gender);
  }
  if (req.query.sort) {
    data = data.sort(req.query.sort);
  }
  const result = await data;
  res.send(result);
});

// Update the persons details
export const updatePersonDetails = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (!person) {
    res.send(400);
    throw new Error("not found");
  }

  if (!req.user) {
    res.status(400);
    throw new Error("user not found");
  }
  if (person.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (person) {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
  }

  res.status(201).json(updatedPerson);
});

// Delete the personal details
export const deletePersonalDetails = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (!person) {
    res.send(400);
    throw new Error("not found");
  }

  if (!req.user) {
    res.status(400);
    throw new Error("user not found");
  }
  if (person.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await person.deleteOne();
  res.status(201).json({ id: req.params.id });
});
