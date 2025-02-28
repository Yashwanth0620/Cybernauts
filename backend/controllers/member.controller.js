const errorHandler = require("express-async-handler");
const multer = require("multer");
const MemberModel = require("../models/member.model");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const path = require("path");
const fs = require("fs");
const { google } = require("googleapis");
const {uploadFileAndGetUrl} = require("./admin.controller")

// @desc to get all the core body members of particular year
// @API GET /members/:year
const getMembers = errorHandler(async (req, res) => {
  const { year } = req.params;

  const yearDocument = await MemberModel.findOne({ year });

  if (!yearDocument || yearDocument.members.length === 0) {
    return res.status(404).json({ message: "No members found for this year" });
  }

  res.status(200).json(yearDocument.members);
});

// @desc Get all core body members of all years
// @route GET /members/all
const getAllYearsMembers = errorHandler(async (req, res) => {
  const yearDocuments = await MemberModel.find();

  if (yearDocuments.length === 0) {
    return res.status(404).json({ message: "No members found for any year" });
  }

  const allMembers = yearDocuments.flatMap(
    (yearDocument) => yearDocument.members
  );

  res.status(200).json(allMembers);
});

// @desc Get all years
// @route GET /members/years
const getYears = errorHandler(async (req, res) => {
  const yearDocuments = await MemberModel.find();

  const years = yearDocuments.flatMap((yearDocument) => yearDocument.year);

  res.status(200).json(years);
});

// @desc Get all current core body members
// @route GET /members
const getCurrentMembers = errorHandler(async (req, res) => {
  const yearDocument = await MemberModel.findOne({ present: true });

  if (yearDocument.length === 0) {
    return res.status(404).json({ message: "No members found for any year" });
  }

  // const allMembers = yearDocuments.flatMap((yearDocument) => yearDocument.members);

  res.status(200).json(yearDocument);
});



// @desc to add members to the team
// @API POST /members/add
const addMember = errorHandler(async (req, res) => {
  
  const {
    rollNo,
    name,
    designation,
    description,
    year,
    position,
    mobileNo,
    email,
  } = req.body;
  console.log(req.body)
  let yearDocument = await MemberModel.findOne({ year });
  const present = true;
  if (!yearDocument) {
    await MemberModel.updateMany({}, { $set: { present: false } });
    yearDocument = new MemberModel({ year, present, members: [] });
  }

  let image;
  if (req.file) {
    console.log("has a file");
    
    try {
      console.log("hiihhhh    1")
      console.log(__dirname)
      const tempPath = path.join(__dirname, "memberPhoto.jpg");
      console.log("hiihhhh   2")
      fs.writeFileSync(tempPath, req.file.buffer);
      console.log("hiihhhh    3")

      // Upload using event ID instead of title
      image = await uploadFileAndGetUrl(tempPath);

      fs.unlinkSync(tempPath);
    } catch (error) {
      res.status(500);
      console.log(error)
      throw new Error("Failed to upload image");
    }
  }

  const member = {
    rollNo,
    name,
    designation,
    description,
    position,
    mobileNo,
    email,
    image,
    contributions: [],
  };
  
  yearDocument.members.push(member);
  await yearDocument.save();
  res.status(200).json(yearDocument.members);
});

// @desc To add contributions to a member
// @route PUT /members/contributions/:year/:id/
const addContributions = errorHandler(async (req, res) => {
  const { year, id } = req.params;
  const { description, image, eventId } = req.body;

  const yearDocument = await MemberModel.findOne({ year, "members._id": id });

  if (!yearDocument) {
    return res.status(404).json({ message: "Member not found in this year" });
  }

  const member = yearDocument.members.id(id);

  if (!member) {
    return res.status(404).json({ message: "Member not found" });
  }

  const newContribution = {
    description,
    image,
    eventId,
  };

  member.contributions.push(newContribution);

  // Save the yearDocument with the updated member
  await yearDocument.save();

  res.status(200).json({ message: "Contributions added successfully", member });
});

// @desc To delete a member of a specific year
// @route DELETE /members/:year/:id
const deleteMember = errorHandler(async (req, res) => {
  const { year, id } = req.params;

  const yearDocument = await MemberModel.findOneAndUpdate(
    { year: year, "members._id": id },
    { $pull: { members: { _id: id } } },
    { new: true }
  );

  if (!yearDocument) {
    return res.status(404).json({ message: "Member not found in this year" });
  }

  res.status(200).json({ message: "Member Deleted Successfully" });
});

module.exports = {
  getMembers,
  addMember,
  getCurrentMembers,
  deleteMember,
  addContributions,
  getAllYearsMembers,
  getYears,
};
