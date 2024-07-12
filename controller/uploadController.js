const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config();

// Google Drive credentials from environment variables
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

// Function to authorize with Google Drive
async function authorize() {
    const jwtClient = new google.auth.JWT(
        process.env.GOOGLE_CLIENT_EMAIL,
        null,
        process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Handle newlines in the private key
        SCOPES
    );
    await jwtClient.authorize();
    return jwtClient;
}

// Function to upload file to Google Drive
async function uploadFile(authClient, filePath, fileName) {
    const drive = google.drive({ version: "v3", auth: authClient });

    const fileMetadata = {
        name: fileName,
    };
    const media = {
        mimeType: "application/octet-stream",
        body: fs.createReadStream(filePath),
    };

    const file = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id",
    });

    const fileId = file.data.id;
    await drive.permissions.create({
        fileId: fileId,
        requestBody: {
            role: "reader",
            type: "anyone",
        },
    });

    const fileLink = `https://drive.google.com/uc?id=${fileId}&export=download`;
    return fileLink;
}

exports.upload = async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    try {
        const authClient = await authorize();
        const filePath = path.join(__dirname, "../", req.file.path);
        const fileName = req.file.originalname;

        const fileLink = await uploadFile(authClient, filePath, fileName);

        // Delete the file from the server after uploading to Drive
        fs.unlinkSync(filePath);

        res.status(200).send({ link: fileLink });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading file.");
    }
};
