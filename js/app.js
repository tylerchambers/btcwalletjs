let bip39 = require("bip39");
let bitcoin = require("bitcoinjs-lib");

const NETWORK_TYPES = {
  xpub: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "bc",
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  ypub: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "bc",
    bip32: {
      public: 0x049d7cb2,
      private: 0x049d7878,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  Ypub: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "bc",
    bip32: {
      public: 0x0295b43f,
      private: 0x0295b005,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  zpub: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "bc",
    bip32: {
      public: 0x04b24746,
      private: 0x04b2430c,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  Zpub: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "bc",
    bip32: {
      public: 0x02aa7ed3,
      private: 0x02aa7a99,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  tpub: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "tb",
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
  upub: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "tb",
    bip32: {
      public: 0x044a5262,
      private: 0x044a4e28,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
  Upub: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "tb",
    bip32: {
      public: 0x024289ef,
      private: 0x024285b5,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
  vpub: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "tb",
    bip32: {
      public: 0x045f1cf6,
      private: 0x045f18bc,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
  Vpub: {
    messagePrefix: "\x18Bitcoin Signed Message:\n",
    bech32: "tb",
    bip32: {
      public: 0x02575483,
      private: 0x02575048,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
};

class Wallet {
  mnemonic;
  seed;
  node;
  ECPair;
  network;
  constructor(mnemonicStrength = 256, mnemonic, network) {
    this.mnemonic = mnemonic || bip39.generateMnemonic(mnemonicStrength);
    this.seed = bip39.mnemonicToSeedSync(this.mnemonic);
    // Default to bech32.
    this.network = network || bitcoin.networks.bitcoin;
    this.node = bitcoin.bip32.fromSeed(this.seed, this.network);
    this.ECPair = bitcoin.ECPair.fromPrivateKey(this.node.privateKey, {
      network: this.network,
    });
  }

  set network(n) {
    this.network = n;
  }

  get mnemonic() {
    return this.mnemonic;
  }

  get privateKey() {
    return this.node.toBase58();
  }

  get publicKey() {
    return this.node.neutered().toBase58();
  }
}

const app = {
  loading: false,
  wallet: {},
  selectedFormat: {},

  run: () => {
    app.generateWallet();
    app.displayWallet();
  },

  generateWallet: () => {
    this.wallet = new Wallet();
  },

  displayWallet: () => {
    document
      .getElementById("mnemonic")
      .appendChild(document.createTextNode(this.wallet.mnemonic));

    // get the selected xpub format from the dropdown
    const selectedFormat = document.getElementById("format");

    // put the xpriv on screen
    const privkeydisplay = document.getElementById("privatekey");
    privkeydisplay.textContent = this.wallet.privateKey;

    // put the xpub on screen
    const pubkeydisplay = document.getElementById("publickey");
    pubkeydisplay.textContent = this.wallet.publicKey;

    // listen for changes to the extended public / private key type dropdown
    selectedFormat.addEventListener("change", (event) => {
      this.wallet.node = bitcoin.bip32.fromSeed(
        this.wallet.seed,
        NETWORK_TYPES[event.target.value]
      );
      privkeydisplay.textContent = this.wallet.privateKey;

      pubkeydisplay.textContent = this.wallet.publicKey;
    });
  },
};

app.run();