import {
  Lucid,
  Blockfrost,
  Address,
  MintingPolicy,
  PolicyId,
  Unit,
  fromText,
  fromUnit,
  Data,
  applyParamsToScript,
} from "https://deno.land/x/lucid@0.9.1/mod.ts";
import { blockfrostKey, secretSeed } from "./secret.ts";

// set blockfrost endpoint
const lucid = await Lucid.new(
  new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", blockfrostKey),
  "Preprod"
);

// load local stored seed as a wallet into lucid
lucid.selectWalletFromSeed(secretSeed);
const addr: Address = await lucid.wallet.address();
console.log("own address: " + addr);

const utxos = await lucid.utxosAt(addr);
const utxo = utxos[0];
console.log("utxo: " + utxo.txHash + "#" + utxo.outputIndex);

const Params = Data.Tuple([Data.String, Data.BigInt, Data.String]);
type Params = Data.Static<typeof Params>;

const nftPolicy: MintingPolicy = {
  type: "PlutusV2",
  script: "insert here the on-chain nft smartcontractHash"
};

const policyId: PolicyId = lucid.utils.mintingPolicyToId(nftPolicy);
console.log("minting policy: " + policyId);

const unit: Unit = policyId;
const policy = fromUnit(unit).policyId;

const metadata = {
  [policy]: {
    [" "]: {
      {{metadata}}
    },
  },
};
const tx = await lucid
  .newTx()
  .mintAssets({ [unit]: 1n }, Data.void())
  .attachMintingPolicy(nftPolicy)
  .attachMetadata(721, metadata)
  .collectFrom([utxo])
  .complete();

const signedTx = await tx.sign().complete();
const txHash = await signedTx.submit();
console.log("tid: " + txHash);
