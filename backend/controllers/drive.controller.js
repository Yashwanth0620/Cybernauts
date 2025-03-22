const { google } = require("googleapis");
const fs = require("fs");

// Load the service account JSON key file
const auth = new google.auth.GoogleAuth({
  keyFile: "cybernauts-450008-c5b2f864526e.json", // Path to your downloaded JSON file
  scopes: ["https://www.googleapis.com/auth/drive"], // Full access to Drive
});

// Initialize the Google Drive API
const drive = google.drive({ version: "v3", auth });

const FOLDER_ID = "1yYv8yt0XLLJX3FF8WNlo5uJzminZLlJB"; // Replace with your shared folder ID

// Function to upload a file and return the public URL
const uploadFileAndGetUrl = async (filePath, type = "image") => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: `${type}.jpg`,
        mimeType: "image/jpg",
        parents: [FOLDER_ID], // Save inside the shared folder
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
    });

    const fileId = response.data.id;

    // Make the file public
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return `https://drive.google.com/thumbnail?id=${fileId}`;
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error.message);
  }
};

// Function to delete a file from Google Drive using its URL
const deleteFileFromUrl = async (fileUrl) => {
  try {
    // Extract file ID from URL
    const fileIdMatch = fileUrl.match(/id=([a-zA-Z0-9_-]+)/);
    if (!fileIdMatch) {
      throw new Error("Invalid Google Drive file URL");
    }

    const fileId = fileIdMatch[1];

    // Delete the file
    await drive.files.delete({ fileId });
  } catch (error) {
    // console.error("Error deleting file:", error.message);
  }
};

module.exports = {
  deleteFileFromUrl,
  uploadFileAndGetUrl,
};
