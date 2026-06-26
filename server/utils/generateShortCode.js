import { nanoid } from "nanoid";

const generateShortCode = (length = 7) => {
  return nanoid(length);
};

export default generateShortCode;