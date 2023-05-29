import { type Prisma } from "@prisma/client";
import { createReadStream } from "fs";
import fs from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import HTTPError from "~/utils/HTTPError";

type _ = Prisma.EmailMessageFindManyArgs;

export default async function Files(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      throw new HTTPError(405, `Method ${req.method as string} not allowed`);
    }

    if (req.query.fileName === undefined || Array.isArray(req.query.fileName)) {
      throw new HTTPError(422, `FileName cannot be processed`);
    }
    if (Array.isArray(req.query.token)) {
      throw new HTTPError(422, `Token cannot be processed`);
    }

    const { fileName, token } = req.query;
    const download = req.query.download === "";
    console.log(fileName, token, download);

    const file = await prisma.file.findFirst({ where: { filename: fileName } });
    if (!file) {
      throw new HTTPError(404, `File not found`);
    }
    if (file.token !== token ?? "") {
      throw new HTTPError(404, `File not found`);
    }
    if (download) {
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${file?.originalFilename}`
      );
      res.setHeader("Content-Type", "application/octet-stream");

      const fileStream = createReadStream(
        `./uploads/${file?.newFilename as string}`
      );
      fileStream.pipe(res);
    } else {
      const imageData = await fs.readFile(
        `./uploads/${file?.newFilename as string}`
      );

      // Set the appropriate headers for the image response
      res.setHeader("Content-Type", file.mimetype ?? ""); // Replace 'image/png' with the appropriate MIME type for your image

      // Send the image data as the response
      res.send(imageData);
    }

    // res.status(201).json({
    //   status: "success",
    //   statusCode: 201,
    //   message: "Success: File uploaded successfully",
    // });
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
