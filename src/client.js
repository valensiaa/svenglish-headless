import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "41nkbk8d",
  dataset: "production",
  useCdn: true,
});

export default client;
