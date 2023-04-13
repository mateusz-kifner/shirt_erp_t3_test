import type { IncomingMessage, ServerResponse } from "http";
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

// // first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Upload(
  req: IncomingMessage & NextApiRequest,
  res: ServerResponse & NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: "./uploads",
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024 * 1024, // 10Gb
    maxFieldsSize: 10 * 1024 * 1024 * 1024, // 10Gb
    filename: function (name, ext, part, form) {
      return name + ext;
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to upload file" });
      return;
    }
    const { file } = files;
    if (file == undefined) {
      res.status(500).json({ message: "Failed to upload file" });
      return;
    }
    if (Array.isArray(file)) {
    } else {
      const { originalFilename, filepath: tempFilePath } = file;

      const ext = (originalFilename ?? "unknown.unknown").split(".").pop();
      const id = originalFilename;
      const filePath = `./uploads/${id}.${ext}`;

      fs.renameSync(tempFilePath, filePath);
    }

    res.status(201).json({ message: "File uploaded successfully" });
  });
}
