//importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//bitcoin - rede principal - mainet
//testnet - rede de teste - tesnet
const network = bitcoin.networks.testnet

//derivação de carteiras HD
const path = `m/49'/1'/o'/0`

let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publickey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("chave privada:", node.toWIF())
console.log("Seed", mnemonic)
