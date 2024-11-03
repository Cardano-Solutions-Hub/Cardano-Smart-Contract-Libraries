import templateCompiler from '../lib/templateCompiler.js';

export const burnContractController = async (socket, data) => {
  // TODO: add the remaning data
  let { contract } = data;
  const { type } = data;

  contract = contract.toUpperCase();

  let context;
  // TODO: update contexti
  if (type === 'onchain') {
    context = { error: data.error, scriptName: data.scriptName };
  } else if (type === 'offchain') {
    context = {};
  }

  try {
    const updatedCode = await templateCompiler(contract, type, context);

    socket.emit('codeUpdate', updatedCode);
  } catch (e) {
    socket.emit('error', { message: e });
  }
};

export const nftContractController = async (socket, data) => {
  // TODO: add the remaning data
  let { contract } = data;
  const { type } = data;

  contract = contract.toUpperCase();

  // TODO: udpate context
  let context = { tokenname: data.tokenname, scriptName: data.scriptName };

  if (type === 'onchain') {
    context = { tokenname: data.tokenname, scriptName: data.scriptName };
  } else if (type === 'offchain') {
    let metadataString;
    const { metadata } = data;
    const isArray = Array.isArray(metadata);

    if (isArray) {
      metadataString = metadata
        .map((item) => `${item.key}: ${item.value}`)
        .join(',\n\t');
    } else {
      metadataString = '';
    }
    context = { metadata: metadataString };
  }
  try {
    const updatedCode = await templateCompiler(contract, type, context);

    socket.emit('codeUpdate', updatedCode);
  } catch (e) {
    socket.emit('error', { message: e });
  }
};

export const vestingContractController = async (socket, data) => {
  // TODO: add the remaning data
  let { contract } = data;
  const { type } = data;

  contract = contract.toUpperCase();

  let context;

  // TODO: update contexti
  if (type === 'onchain') {
    context = {
      PubKeyHash: data.PubKeyHash,
      POSIXTime: data.POSIXTime,
      scriptName: data.scriptName,
    };
  } else if (type === 'offchain') {
    context = { amount: data.amount };
  }

  try {
    const updatedCode = await templateCompiler(contract, type, context);

    socket.emit('codeUpdate', updatedCode);
  } catch (e) {
    socket.emit('error', { message: e });
  }
};

export const giftContractController = async (socket, data) => {
  // TODO: add the remaning data
  let { contract } = data;
  const { type } = data;

  contract = contract.toUpperCase();

  let context;

  // TODO: update contexti
  if (type === 'onchain') {
    context = {
      scriptName: data.scriptName,
    };
  } else if (type === 'offchain') {
    context = {};
  }

  try {
    const updatedCode = await templateCompiler(contract, type, context);

    socket.emit('codeUpdate', updatedCode);
  } catch (e) {
    socket.emit('error', { message: e });
  }
};
