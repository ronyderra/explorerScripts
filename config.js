import dotenv from "dotenv";
dotenv.config();

export const MainNetRpcUri = {
    ELROND: "https://gateway.elrond.com",
    HECO: "https://http-mainnet-node.huobichain.com",
    BSC: "https://bsc-dataseed.binance.org/",
    ETHEREUM: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    AVALANCHE: "https://api.avax.network/ext/bc/C/rpc",
    POLYGON: "https://polygon-rpc.com",
    FANTOM: "https://rpc.ftm.tools/",
    TRON: "https://api.trongrid.io/",
    CELO: "https://forno.celo.org",
    HARMONY: "https://rpc.s0.t.hmny.io",
    XDAI: "https://rpc.xdaichain.com/",
    FUSE: "https://rpc.fuse.io/",
    VELAS: "https://mainnet.velas.com/rpc",
    TEZOS: "https://mainnet.smartpy.io",
    IOTEX: "https://babel-api.mainnet.iotex.io",
    AURORA: "https://mainnet.aurora.dev",
    GODWOKEN: "https://mainnet.godwoken.io/rpc",
    GATECHAIN: "https://evm.gatenode.cc",
    VECHAIN: "https://sync-mainnet.veblocks.net",
    // TODO: Algorand
  };

  export function chainNonceToName(nonce) {
    return getChain(nonce)?.name || "UNKNOWN";
  }

  export const getChain = (nonce) => {
    try {
      Object.keys(config).forEach((key) => {
        const item = config[key];
  
        if (Array.isArray(item)) {
          for (const c of item) {
            if (c.nonce === nonce || c.name.toUpperCase() === nonce.toUpperCase()) throw c;
          }
        } else {
          if (item.nonce && item.nonce === nonce || item.name && item.name.toUpperCase() === nonce.toUpperCase()) throw item;
        }
      });
    } catch (chain) {
      return chain;
    }
  };

  function getOrThrow(key) {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing env var ${key}`);
    }
    return value;
  }

  const config = {
    web3: [
      {
        name: "AURORA",
        node: getOrThrow("AURORA_RPC_URL"),
        contract: getOrThrow("AURORA_MINTER_ADDRESS"),
        nonce: getOrThrow("AURORA_NONCE"),
        id: "aurora-near",
      },
      {
        name: "BSC",
        node: getOrThrow("BSC_RPC_URL"),
        contract: getOrThrow("BSC_MINTER_ADDRESS"),
        nonce: getOrThrow("BSC_NONCE"),
        id: "binancecoin",
      },
      {
        name: "ETHEREUM",
        node: getOrThrow("ETHEREUM_RPC_URL"),
        contract: getOrThrow("ETHEREUM_MINTER_ADDRESS"),
        nonce: getOrThrow("ETHEREUM_NONCE"),
        id: "ethereum",
      },
      {
        name: "VELAS",
        node: getOrThrow("VELAS_RPC_URL"),
        contract: getOrThrow("VELAS_MINTER_ADDRESS"),
        nonce: getOrThrow("VELAS_NONCE"),
        id: "velas",
      },
      {
        name: "POLYGON",
        node: getOrThrow("POLYGON_RPC_URL"),
        contract: getOrThrow("POLYGON_MINTER_ADDRESS"),
        nonce: getOrThrow("POLYGON_NONCE"),
        id: "matic-network",
      },
      {
        name: "AVALANCHE",
        node: getOrThrow("AVALANCHE_RPC_URL"),
        contract: getOrThrow("AVALANCHE_MINTER_ADDRESS"),
        nonce: getOrThrow("AVALANCHE_NONCE"),
        id: "avalanche-2",
      },
      {
        name: "IOTEX",
        node: getOrThrow("IOTEX_RPC_URL"),
        contract: getOrThrow("IOTEX_MINTER_ADDRESS"),
        nonce: getOrThrow("IOTEX_NONCE"),
        id: "iotex",
        actionIdOffset: 10,
      },
      {
        name: "FANTOM",
        node: getOrThrow("FANTOM_RPC_URL"),
        contract: getOrThrow("FANTOM_MINTER_ADDRESS"),
        nonce: getOrThrow("FANTOM_NONCE"),
        id: "fantom",
      },
      // {
      //   name: "CELO",
      //   node: getOrThrow("CELO_RPC_URL"),
      //   contract: getOrThrow("CELO_MINTER_ADDRESS"),
      //   nonce: getOrThrow("CELO_NONCE")
      // },
      {
        name: "HARMONY",
        node: getOrThrow("HARMONY_RPC_URL"),
        contract: getOrThrow("HARMONY_MINTER_ADDRESS"),
        nonce: getOrThrow("HARMONY_NONCE"),
        id: "harmony",
      },
      {
        name: "GNOSIS CHAIN",
        node: getOrThrow("GNOSIS_RPC_URL"),
        contract: getOrThrow("GNOSIS_MINTER_ADDRESS"),
        nonce: getOrThrow("GNOSIS_NONCE"),
        id: "gnosis",
      },
      {
        name: "FUSE",
        node: getOrThrow("FUSE_RPC_URL"),
        contract: getOrThrow("FUSE_MINTER_ADDRESS"),
        nonce: getOrThrow("FUSE_NONCE"),
        id: "fuse-network-token",
      },
      {
        name: "GATECHAIN",
        node: getOrThrow("GATECHAIN_RPC_URL"),
        contract: getOrThrow("GATECHAIN_MINTER_ADDRESS"),
        nonce: getOrThrow("GATECHAIN_NONCE"),
        id: "gatechain-wormhole",
      },
      {
        name: "VECHAIN",
        node: getOrThrow("VECHAIN_RPC_URL"),
        contract: getOrThrow("VECHAIN_MINTER_ADDRESS"),
        nonce: getOrThrow("VECHAIN_NONCE"),
        id: "vechain",
      },
    ],
    elrond: {
      name: "ELROND",
      node: getOrThrow("ELROND_RPC_URL"),
      contract: getOrThrow("ELROND_MINTER_ADDRESS"),
      api: getOrThrow("ELROND_API"),
      nonce: getOrThrow("ELROND_NONCE"),
      socket: getOrThrow("ELROND_SOCKET_URL"),
      id: "elrond-erd-2",
    },
    tezos: {
      name: "TEZOS",
      node: "",
      socket: getOrThrow("TEZOS_RPC_URL"),
      xpnft: getOrThrow("TEZOS_XPNFT_ADDRESS"),
      contract: getOrThrow("TEZOS_MINTER_ADDRESS"),
      nonce: getOrThrow("TEZOS_NONCE"),
      id: "tezos",
    },
    algorand: {
      name: "ALGORAND",
      node: getOrThrow("ALGORAND_NODE"),
      indexerNode: getOrThrow("ALGORAND_INDEXER"),
      apiKey: getOrThrow("ALGORAND_API_KEY"),
      //socket: getOrThrow("TEZOS_RPC_URL"),
      //xpnft: getOrThrow("TEZOS_XPNFT_ADDRESS"),
      contract: getOrThrow("ALGORAND_APPLICATION"),
      nonce: getOrThrow("ALGORAND_NONCE"),
      id: "algorand",
    },
    tron: {
      name: "TRON",
      node: getOrThrow("TRON_RPC_URL"),
      contract: getOrThrow("TRON_MINTER_ADDRESS"),
      nonce: getOrThrow("TRON_NONCE"),
      id: "tron",
      apiKey: getOrThrow("TRON_API_KEY"),
    },
    db: getOrThrow("DB_URL"),
    indexer_db: getOrThrow("XP_INDEXER_DB"),
    port: getOrThrow("PORT"),
    socketUrl: getOrThrow("SOCKET_URL"),
    type: getOrThrow("type_sheets"),
    project_id: getOrThrow("project_id_sheets"),
    private_key_id: getOrThrow("private_key_id_sheets"),
    private_key: getOrThrow("private_key_sheet"),
    client_email: getOrThrow("client_email_sheet"),
    client_id: getOrThrow("client_id_sheet"),
    auth_uri: getOrThrow("auth_uri_sheet"),
    token_uri: getOrThrow("token_uri_sheet"),
    auth_provider_x509_cert_url: getOrThrow("auth_provider_x509_cert_url"),
    client_x509_cert_url: getOrThrow("client_x509_cert_url"),
    mail_key: getOrThrow("SENDING_BLUE"),
    captcha_secret: getOrThrow("SECRET_CAPTCHA"),
    web3socketUrl: getOrThrow("WEB3_SOCKET_URL"),
    telegramBotToken:getOrThrow("TELEGRAM_BOT"),
    telChatId:getOrThrow("TELEGRAM_CHAT")
  };