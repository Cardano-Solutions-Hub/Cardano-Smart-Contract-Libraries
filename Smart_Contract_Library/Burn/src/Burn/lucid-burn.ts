import {
  Data,
  Lucid,
  Blockfrost,
  getAddressDetails,
  SpendingValidator,
  TxHash,
  Datum,
  UTxO,
  Address,
  AddressDetails,
} from "https://deno.land/x/lucid@0.9.1/mod.ts";
// create a seed.ts file with your seed
import { secretSeed } from "./seed.ts";

// set blockfrost endpoint
const lucid = await Lucid.new(
  new Blockfrost(
    "https://cardano-preprod.blockfrost.io/api/v0",
    "insert you own api key here"
  ),
  "Preprod"
);

// load local stored seed as a wallet into lucid
lucid.selectWalletFromSeed(secretSeed);
const addr: Address = await lucid.wallet.address();
console.log(addr);

// Define the burn plutus script
const burnScript: SpendingValidator = {
  type: "PlutusV2",
  script: "",
};
const burnAddress: Address = lucid.utils.validatorToAddress(burnScript);

async function burn(amount: bigint): Promise<TxHash> {
  const tx = await lucid
    .newTx()
    .payToContract(burnAddress, { lovelace: {{amount}} })
    .complete();
  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();
  return txHash;
}

// console.log(await burn(100000000n));
