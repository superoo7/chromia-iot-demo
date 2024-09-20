import postclient, {
  createClient,
  newSignatureProvider,
} from "postchain-client";

const signnatureProvider = newSignatureProvider({ privKey: "0101010101010101010101010101010101010101010101010101010101010101" });
const localClient = "http://localhost:7740";

export async function addTemperature(temperature: number) {
  const client = await createClient({
    nodeUrlPool: [localClient],
    blockchainIid: 0,
  });
  await client.signAndSendUniqueTransaction(
    {
      name: "add_temperature",
      args: [String(temperature)],
    },
    signnatureProvider
  );
}
