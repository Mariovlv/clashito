import { ClanIdParams } from "../types";

function postClanId({ params }: { params: ClanIdParams }) {
  return { id: params.id };
}

export { postClanId };
