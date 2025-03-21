const errorHandler = require("express-async-handler");
const multer = require("multer");
const MemberModel = require("../models/member.model");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const path = require("path");
const fs = require("fs");
const { google } = require("googleapis");
const {uploadFileAndGetUrl} = require("./drive.controller");

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

// @desc to get all the core body members of particular year
// @API GET /members/:year/:id
const getMember = errorHandler(async (req, res) => {
  const { year, id } = req.params;
  const yearDocument = await MemberModel.findOne({ year });

  if (!yearDocument || yearDocument.members.length === 0) {
    return res.status(404).json({ message: "No members found for this year" });
  }

  const member = yearDocument.members.id(id);
  if (!member) {
    return res.status(404).json({ message: "Member not found" });
  }
  res.status(200).json(member);
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
  ("Hjkllk")
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
  let yearDocument = await MemberModel.findOne({ year });
  const present = true;
  if (!yearDocument) {
    await MemberModel.updateMany({}, { $set: { present: false } });
    yearDocument = new MemberModel({ year, present, members: [] });
  }

  let image;
  if (req.file) {
    
    try {
      const tempPath = path.join(__dirname, "memberPhoto.jpg");
      fs.writeFileSync(tempPath, req.file.buffer);

      // Upload using event ID instead of title
      image = await uploadFileAndGetUrl(tempPath);
      

      fs.unlinkSync(tempPath);
    } catch (error) {
      res.status(500);
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

// @desc to Edit member to the team
// @API POST /members/:year/:id
const editMember = errorHandler(async (req, res) => {
  try {
    const { year, id } = req.params;
    const {
      name,
      rollNo,
      designation,
      description,
      position,
      mobileNo,
      email,
    } = req.body;
    // Find the document for the given year
    let yearDocument = await MemberModel.findOne({ year });
    if (!yearDocument) {
      return res.status(400).json({ message: "Failed to edit: Year not found" });
    }
    let image;
    if (req.file) {
      try {
        const tempPath = path.join(__dirname, "memberPhoto.jpg");
        fs.writeFileSync(tempPath, req.file.buffer);

        // Upload image and get URL
        image = await uploadFileAndGetUrl(tempPath);
        fs.unlinkSync(tempPath);
      } catch (error) {
        console.error("Image Upload Error:", error);
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }
    // Find the existing member by _id
    const existingMemberIndex = yearDocument.members.findIndex(
      (member) => member._id.toString() === id
    );
    if (existingMemberIndex !== -1) {
      // Update existing member
      yearDocument.members[existingMemberIndex].set({
        name,
        rollNo,
        designation,
        description,
        position,
        mobileNo,
        email,
        // image: image || yearDocument.members[existingMemberIndex].image, // Keep old image if no new one
      });
    } else {
      return res.status(404).json({ message: "Member not found" });
    }

    await yearDocument.save();

    const updatedMember = yearDocument.members[existingMemberIndex];

    res.status(200).json({ message: "Member updated successfully", member: updatedMember });
  } catch (error) {
    console.error("Edit Member Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc To add contributions to a member
// @route PUT /members/contributions/:year/:id/
const addContribution = errorHandler(async (req, res) => {
  const { year, id } = req.params;
  const { description} = req.body;
  const yearDocument = await MemberModel.findOne({ year});

  if (!yearDocument) {
    return res.status(404).json({ message: "Member not found in this year" });
  }

  const member = yearDocument.members.id(id);
  if (!member) {
    return res.status(404).json({ message: "Member not found" });
  }

  let image;
    if (req.file) {
      try {
        const tempPath = path.join(__dirname, "contributionPhoto.jpg");
        fs.writeFileSync(tempPath, req.file.buffer);

        // Upload image and get URL
        image = await uploadFileAndGetUrl(tempPath);
        fs.unlinkSync(tempPath);
      } catch (error) {
        console.error("Image Upload Error:", error);
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

  const newContribution = {
    description,
    image,
  };

  member.contributions.push(newContribution);

  // Save the yearDocument with the updated member
  await yearDocument.save();
  res.status(200).json({ message: "Contribution added successfully", member });
});
// @desc To add contributions to a member
// @route PUT /members/eventcontribution/:year/:id/
const eventContribution = errorHandler(async (req, res) => {
  const { year, id } = req.params;
  const { rollNo, description, eventId, eventName} = req.body;
  const yearDocument = await MemberModel.findOne({ year});

  if (!yearDocument) {
    return res.status(404).json({ message: "Member not found in this year" });
  }

  const member = yearDocument.members.id(id);
  if (!member) {
    return res.status(404).json({ message: "Member not found" });
  }

  let image;
    if (req.file) {
      try {
        const tempPath = path.join(__dirname, "contributionPhoto.jpg");
        fs.writeFileSync(tempPath, req.file.buffer);

        // Upload image and get URL
        image = await uploadFileAndGetUrl(tempPath);
        fs.unlinkSync(tempPath);
      } catch (error) {
        console.error("Image Upload Error:", error);
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

  const newContribution = {
    description,
    image,
    eventId,
    eventName
  };

  member.contributions.push(newContribution);

  // Save the yearDocument with the updated member
  await yearDocument.save();

  res.status(200).json({ message: "Contribution added successfully", member });
});

// @desc To delete a member of a specific year
// @route DELETE /members/:year/:id
const deleteMember = errorHandler(async (req, res) => {
  const { year, id } = req.params;
  const yearDocument = await MemberModel.findOneAndUpdate(
    { year: year},
    { $pull: { members: { _id: id } } }, 
    { new: true }
  );

  if (!yearDocument) {
    return res.status(404).json({ message: "Member not found in this year" });
  }

  res.status(200).json({ message: "Member Deleted Successfully" });
});


// @desc To delete a contribution from a member
// @route DELETE /members/contributions/:year/:memberId/:contributionId
const deleteContribution = errorHandler(async (req, res) => {
  try {
    const { year, memberId, contributionId } = req.params;

    // Find the document for the given year and member
    const yearDocument = await MemberModel.findOne({ year });

    if (!yearDocument) {
      return res.status(404).json({ message: "Member not found in this year" });
    }

    const member = yearDocument.members.id(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Find the index of the contribution to delete
    const contributionIndex = member.contributions.findIndex(
      (contribution) => contribution._id.toString() === contributionId
    );

    if (contributionIndex === -1) {
      return res.status(404).json({ message: "Contribution not found" });
    }

    // Remove the contribution from the array
    member.contributions.splice(contributionIndex, 1);

    // Save the updated document
    await yearDocument.save();

    res.status(200).json({ message: "Contribution deleted successfully", member:member });
  } catch (error) {
    console.error("Delete Contribution Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = {
  getMembers,
  addMember,
  getCurrentMembers,
  deleteMember,
  addContribution,
  getAllYearsMembers,
  getYears,
  editMember,
  getMember,
  deleteContribution,
  eventContribution
};
