# BTCWalletJS

BTCWalletJS is a simple javascript app for generating bitcoin mnemonics and private keys, using [bitocinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib).

This is not "production ready" and should not be used to create wallets that will hold non trivial amount of funds.

## Building

Make sure you have [browserify](https://browserify.org/) installed: 
`npm install -g browserify`


Then install dependencies and build the app bundle with browserify:
```bash
npm install
browserify -e js/app.js -o js/browserified.js
```

## Usage

Simply open `index.html` in your web browser of choice.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)
