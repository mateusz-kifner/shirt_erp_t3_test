import type { IncomingMessage, ServerResponse } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import type IncomingForm from "formidable/Formidable";
import HTTPError from "~/utils/HTTPError";
import { prisma } from "~/server/db";
import { type Prisma } from "@prisma/client";
import { genRandomStringServerOnly } from "~/utils/genRandomString";

/**
 * Upload using multiform data, requires using name file
 */

let form: IncomingForm;

// disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Upload(
  req: IncomingMessage & NextApiRequest,
  res: ServerResponse & NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      throw new HTTPError(405, `Method ${req.method as string} not allowed`);
    }

    form = new formidable.IncomingForm({
      multiples: true,
      uploadDir: "./uploads/",
      maxFileSize: 10 * 1024 * 1024 * 1024, // 10Gb
      maxFieldsSize: 10 * 1024 * 1024 * 1024, // 10Gb
      maxFiles: 1024,
      hashAlgorithm: "sha1",
    });

    const { files } = await new Promise<{
      fields: formidable.Fields;
      files: formidable.File | formidable.File[];
    }>((resolve, reject) => {
      form.parse(req, (err: Error, fields, files) => {
        if (err) {
          reject(new HTTPError(500, err?.message));
          return;
        }
        const { file: unpackedFiles } = files;
        if (unpackedFiles == undefined) {
          reject(new HTTPError(500, "Failed to upload file"));
          return;
        }

        resolve({ fields, files: unpackedFiles });
      });
    });

    const fileArray = Array.isArray(files) ? files : [files];

    const newFiles: Prisma.FileCreateInput[] = fileArray.map((file) => ({
      size: file.size,
      filepath: file.filepath,
      originalFilename: file.originalFilename,
      newFilename: file.newFilename,
      mimetype: file.mimetype,
      hash: file.hash,
      token: genRandomStringServerOnly(40),
    }));

    prisma.file
      .createMany({ data: newFiles, skipDuplicates: false })
      .then()
      .catch((err) => {
        throw err;
      });

    // const { originalFilename, filepath: tempFilePath } = file;
    // const ext = (originalFilename ?? "unknown.unknown").split(".").pop();
    // const id = originalFilename;
    // const filePath = `./uploads/${id}.${ext}`;
    // fs.renameSync(tempFilePath, filePath);

    res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "Success: File uploaded successfully",
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({
        status: "error",
        statusCode: err.statusCode,
        message: err.name + ": " + err.message,
      });
      return;
    } else {
      res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "UnknownError",
      });
      return;
    }
  }
}

// function setMetadata(file:formidable.File[]){

// }
