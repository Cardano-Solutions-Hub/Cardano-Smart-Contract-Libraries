import {
  burnContractController,
  giftContractController,
  nftContractController,
  vestingContractController,
} from '../controllers/handler.controller.js';

const handler = {
  Burn: burnContractController,
  NFT: nftContractController,
  Vesting: vestingContractController,
  Gift: giftContractController,
};

export default handler;
