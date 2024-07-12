// const { google } = require("googleapis");
// const fs = require("fs");
// const path = require("path");
// require("dotenv").config();

// // Decode the Base64 encoded JSON credentials
// const decodedCredentials = Buffer.from(
//     process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
//     "base64"
// ).toString("utf8");
// const pkey = JSON.parse(decodedCredentials);

// const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

// // Function to authorize with Google Drive
// async function authorize() {
//     const jwtClient = new google.auth.JWT(
//         pkey.client_email,
//         null,
//         pkey.private_key.replace(/\\n/g, "\n"), // Handle newlines in the private key
//         SCOPES
//     );
//     await jwtClient.authorize();
//     return jwtClient;
// }

// // Function to upload file to Google Drive
// async function uploadFile(authClient, filePath, fileName) {
//     const drive = google.drive({ version: "v3", auth: authClient });

//     const fileMetadata = {
//         name: fileName,
//     };
//     const media = {
//         mimeType: "application/octet-stream",
//         body: fs.createReadStream(filePath),
//     };

//     const file = await drive.files.create({
//         resource: fileMetadata,
//         media: media,
//         fields: "id",
//     });

//     const fileId = file.data.id;
//     await drive.permissions.create({
//         fileId: fileId,
//         requestBody: {
//             role: "reader",
//             type: "anyone",
//         },
//     });

//     const fileLink = `https://drive.google.com/uc?id=${fileId}&export=download`;
//     return fileLink;
// }

// // Function to handle file upload request
// exports.upload = async (req, res) => {
//     const filePath = req.body.filePath; // File path should be provided in the request body
//     const fileName = path.basename(filePath);

//     try {
//         const authClient = await authorize();
//         const fileLink = await uploadFile(authClient, filePath, fileName);

//         res.status(200).send({ link: fileLink });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error uploading file.");
//     }
// };
