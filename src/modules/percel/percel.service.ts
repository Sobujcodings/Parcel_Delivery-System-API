import { Ipercel } from "./percel.interface";
import { percel } from "./percel.model";

const createPercel = async (payload: Partial<Ipercel>) => {
  console.log("payload", payload);

  // automatically generated trackingId
  const trackingId = "TRK" + Date.now();
  payload.trackingId = trackingId;

  const createdPercel = await percel.create(payload);
  console.log("createdPercel", createdPercel);

  return createdPercel;
};

const getSinglePercel = async (id: string) => {
  const createdPercel = await percel.findById(id);
  console.log("createdPercel", createdPercel);

  return createdPercel;
};

export const percelService = {
  createPercel,
  getSinglePercel,
};
