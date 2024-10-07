const errorHandler = require("express-async-handler");
const multer = require("multer");
const MemberModel = require("../models/member.model");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @desc to get all the core body members of particular year
// @API GET /members/:year
const getMembers = errorHandler(async (req, res) => {
  const year = req.params.year;

  const members = await MemberModel.find({ year: year });

  if (members.length === 0) {
    res.status(404);
    throw new Error("No members found for this year");
  }

  const updatedmembers = members.map((member) => {
    return {
      _id: member._id,
      rollNo: member.rollNo,
      name: member.name,
      designation: member.designation,
      contributions: member.contributions,
      currentYear: member.currentYear,
      image: member.image
        ? `data:image/jpeg;base64,${member.image.toString("base64")}`
        : null,
    };
  });

  res.status(200).json(updatedmembers);
});

// @desc to add members to the team
// @API POST /members/add
const addMember = errorHandler(async (req, res) => {
  const { rollNo, name, designation, year, contributions, active } = req.body;

  const imageBuffer = req.file.buffer;

  const newMember = new MemberModel({
    rollNo,
    name,
    designation,
    year,
    image: imageBuffer,
    contributions: contributions ? contributions.split(",") : [],
    active: active === "true",
  });

  await newMember.save();
  res.status(200).json({ message: "Member added successfully" });
});

// @desc to add contributions to a member
// @API /members/:id
const addContributions = errorHandler(async (req, res) => {
  const { memberId } = req.params;
  const { contributions } = req.body;
    console.log(memberId)
  const member = await MemberModel.findById(memberId);

  if (!member) {
    res.status(404);
    throw new Error("No Member Found");
  }

  if (contributions) {
    const newContributions = contributions
      .split(",")
      .map((contribution) => contribution.trim());
    member.contributions.push(...newContributions);
  }

  await member.save();

  res.status(200).json({ message: "Contributions added successfully", member });
});

// @desc to delete a member
// @API /members/:id
const deleteMember = errorHandler(async (req, res) => {
  const id = req.params.id;
  const member = await MemberModel.findByIdAndDelete(id);
  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  } else res.status(200).json({ message: "Member Deleted Successfully" });
});

module.exports = { getMembers, addMember, deleteMember,addContributions };
