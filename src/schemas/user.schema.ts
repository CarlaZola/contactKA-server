import { z } from "zod";
import { contactArray } from "./contact.schema";

const user = z.object({
  id: z.number(),
  full_name: z.string().max(255),
  email: z.string().email().max(120),
  phone: z
    .string()
    .max(18)
    .regex(
      new RegExp(/^\([0-9]{2}\) (?:[1-9]|9[1-9])[0-9]{3}\-[0-9]{4}$/),
      "Must follow the format (xx) xxxxx-xxxx"
    ),
  password: z.string().max(200),
  nickname: z.string().nullish().optional(),
  createdAt: z.string(),
  deletedAt: z.string().nullish(),
});

const userRequest = user.omit({ id: true, createdAt: true, deletedAt: true });
const userResponse = user.omit({ password: true });

const userReadResponse = userResponse.extend({
  contacts: contactArray,
});

const userUpdateRequest = userRequest.deepPartial();

const userArrayResponse = z.array(userResponse);

export {
  user,
  userRequest,
  userResponse,
  userReadResponse,
  userArrayResponse,
  userUpdateRequest,
};
