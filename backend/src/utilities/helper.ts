import { appConfig } from "../config/config";

export const mapImageForDb = (file: Express.Multer.File, dirPath='/') => {
  return {
    name: file.filename,
    path: file.path,
    size: file.size,
    type: file.mimetype,
    url: `${appConfig.assetsUrl}${dirPath}${file.filename}`,
  };
}

export const normalizeJsonField = (value: unknown) => {
  let parsed = value ?? null;
  for (let depth = 0; depth < 3 && typeof parsed === "string"; depth++) {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      break;
    }
  }
  return parsed;
};

export const mapBannerData = (row: any) => {
  return {
   // image:row.image? JSON.parse(row.image): null,
    image: normalizeJsonField(row.image),
    links: normalizeJsonField(row.links),
    status: row.status,
    subTitle: row.subTitle,
    title: row.title,
    _id: row._id,
  };
};
