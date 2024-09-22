import {
  createClient,
  IClient,
  newSignatureProvider,
} from "postchain-client";

const signnatureProvider = newSignatureProvider({
  privKey: "0101010101010101010101010101010101010101010101010101010101010101",
});
const localClient = "http://localhost:7740";

let cachedClient: IClient | null = null;

export async function createLocalClient() {
  if (cachedClient) {
    return cachedClient;
  }
  const client = await createClient({
    nodeUrlPool: [localClient],
    blockchainIid: 0,
  });
  cachedClient = client;
  return client;
}

export async function addTemperature(temperature: number) {
  const client = await createLocalClient();
  await client.signAndSendUniqueTransaction(
    {
      name: "add_temperature",
      args: [String(temperature)],
    },
    signnatureProvider
  );
}

export async function getTemperature(addr: string) {
  const client = await createLocalClient();
  return await client.query({
    name: "get_temperatures",
    args: {
      addr,
    },
  })
}
