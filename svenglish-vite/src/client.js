import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "41nkbk8d",
  dataset: "production",
  apiVersion: "2024-02-18",
  token: "",
  // useCdn: true,
});

export default client;
