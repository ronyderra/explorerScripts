import { ethers } from "ethers"
import { abi } from "./abi/abi.js";
// import abia from "./abia.json" assert { type: "json" };


export const getName = async () => {
    for (let item of array) {
        try {
            const provider = await new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
            const contractInstance = await new ethers.Contract(item['native'].contract, abi, provider);
            const tokenId = item['native'].tokenId
            const name = await contractInstance.functions.tokenURI(tokenId);
            console.log({ name });
        } catch (err) {
            console.log(err.message)
        }

    }
}

const array = [
    {
        uri: 'https://nft.xp.network/w/30689338733460722331309386918',
        'native': {
            chainId: '7',
            tokenId: '30689338733460722331309386918',
            contract: '0xC254a8D4eF5f825FD31561bDc69551ed2b8db134',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://nft.xp.network/w/30689338733460722331309386918',
            symbol: 'Wrapped NFT',
            name: 'WNFT',
            contractType: 'ERC721'
        },
        collectionIdent: '0xc254a8d4ef5f825fd31561bdc69551ed2b8db134'
    },
    {
        uri: 'https://nft.xp.network/w/30681569831853847332524282353',
        'native': {
            chainId: '7',
            tokenId: '30681569831853847332524282353',
            contract: '0xC254a8D4eF5f825FD31561bDc69551ed2b8db134',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://nft.xp.network/w/30681569831853847332524282353',
            symbol: 'Wrapped NFT',
            name: 'WNFT',
            contractType: 'ERC721'
        },
        collectionIdent: '0xc254a8d4ef5f825fd31561bdc69551ed2b8db134'
    },
    {
        uri: 'https://nft.xp.network/w/30681180347299475029050962045',
        'native': {
            chainId: '7',
            tokenId: '30681180347299475029050962045',
            contract: '0xC254a8D4eF5f825FD31561bDc69551ed2b8db134',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://nft.xp.network/w/30681180347299475029050962045',
            symbol: 'Wrapped NFT',
            name: 'WNFT',
            contractType: 'ERC721'
        },
        collectionIdent: '0xc254a8d4ef5f825fd31561bdc69551ed2b8db134'
    },
    {
        uri: 'https://nft.xp.network/w/30678416231827238168704536956',
        'native': {
            chainId: '7',
            tokenId: '30678416231827238168704536956',
            contract: '0xC254a8D4eF5f825FD31561bDc69551ed2b8db134',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://nft.xp.network/w/30678416231827238168704536956',
            symbol: 'Wrapped NFT',
            name: 'WNFT',
            contractType: 'ERC721'
        },
        collectionIdent: '0xc254a8d4ef5f825fd31561bdc69551ed2b8db134'
    },
    {
        uri: 'https://nft.xp.network/w/30678037796872566017252586554',
        'native': {
            chainId: '7',
            tokenId: '30678037796872566017252586554',
            contract: '0xC254a8D4eF5f825FD31561bDc69551ed2b8db134',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://nft.xp.network/w/30678037796872566017252586554',
            symbol: 'Wrapped NFT',
            name: 'WNFT',
            contractType: 'ERC721'
        },
        collectionIdent: '0xc254a8d4ef5f825fd31561bdc69551ed2b8db134'
    },
    {
        uri: 'https://nft.xp.network/w/30665154627704975413820753050',
        'native': {
            chainId: '7',
            tokenId: '30665154627704975413820753050',
            contract: '0xC254a8D4eF5f825FD31561bDc69551ed2b8db134',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://nft.xp.network/w/30665154627704975413820753050',
            symbol: 'Wrapped NFT',
            name: 'WNFT',
            contractType: 'ERC721'
        },
        collectionIdent: '0xc254a8d4ef5f825fd31561bdc69551ed2b8db134'
    },
    {
        uri: 'https://nft.xp.network/w/30665226662240583249619902927',
        'native': {
            chainId: '7',
            tokenId: '30665226662240583249619902927',
            contract: '0xC254a8D4eF5f825FD31561bDc69551ed2b8db134',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://nft.xp.network/w/30665226662240583249619902927',
            symbol: 'Wrapped NFT',
            name: 'WNFT',
            contractType: 'ERC721'
        },
        collectionIdent: '0xc254a8d4ef5f825fd31561bdc69551ed2b8db134'
    },
    {
        uri: 'https://ipfs.moralis.io:2053/ipfs/QmUyGiGSRK56Pz9XizhiXp6ABfUimm8TVHJ3n3HA7NNwSN/30',
        'native': {
            chainId: '7',
            tokenId: '30',
            contract: '0xa36251C995D8376B6FCf9964eed79E62706b4723',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://ipfs.moralis.io:2053/ipfs/QmUyGiGSRK56Pz9XizhiXp6ABfUimm8TVHJ3n3HA7NNwSN/30',
            symbol: 'NANO',
            name: 'Nano Paint',
            contractType: 'ERC1155'
        },
        collectionIdent: '0xa36251c995d8376b6fcf9964eed79e62706b4723'
    },
    {
        uri: 'https://ipfs.moralis.io:2053/ipfs/bafkreig3ds66oa7dvg4noy47nhdjpg7atpswqmd3ommm2kcbtjhrs5qliu',
        'native': {
            chainId: '7',
            tokenId: '51011234293813589101296383711550475294342590029205334363661321273771600904205',
            contract: '0xBA4fe18Bb1c7c7829B4A4a42ad74417f63201550',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://ipfs.moralis.io:2053/ipfs/bafkreig3ds66oa7dvg4noy47nhdjpg7atpswqmd3ommm2kcbtjhrs5qliu',
            symbol: 'CDRP',
            name: 'Correct Drops',
            contractType: 'ERC1155'
        },
        collectionIdent: '0xba4fe18bb1c7c7829b4a4a42ad74417f63201550'
    },
    {
        uri: '',
        'native': {
            chainId: '7',
            tokenId: '1',
            contract: '0x7EfC70f78710887A84a98c2C5398a92DC47CE5A6',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: '',
            symbol: 'NFT',
            name: 'MATIC.ART   Market Place ',
            contractType: 'ERC1155'
        },
        collectionIdent: '0x7efc70f78710887a84a98c2c5398a92dc47ce5a6'
    },
    {
        uri: '',
        'native': {
            chainId: '7',
            tokenId: '1',
            contract: '0xfC5B66FD000EAF6Ae6B0BB938457220dD51D47f3',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: '',
            symbol: 'NFT',
            name: 'MATIC.ART   Market Place ',
            contractType: 'ERC1155'
        },
        collectionIdent: '0xfc5b66fd000eaf6ae6b0bb938457220dd51d47f3'
    },
    {
        uri: '',
        'native': {
            chainId: '7',
            tokenId: '3',
            contract: '0x9aEb92eF2579822E53c82D601c812EeC6Cd6d988',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: '',
            symbol: 'NFT',
            name: 'MATIC.ART   NFT FREE MARKET PLACE Erotic Art',
            contractType: 'ERC1155'
        },
        collectionIdent: '0x9aeb92ef2579822e53c82d601c812eec6cd6d988'
    },
    {
        uri: '',
        'native': {
            chainId: '7',
            tokenId: '2',
            contract: '0x9aEb92eF2579822E53c82D601c812EeC6Cd6d988',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: '',
            symbol: 'NFT',
            name: 'MATIC.ART   NFT FREE MARKET PLACE Erotic Art',
            contractType: 'ERC1155'
        },
        collectionIdent: '0x9aeb92ef2579822e53c82d601c812eec6cd6d988'
    },
    {
        uri: '',
        'native': {
            chainId: '7',
            tokenId: '1',
            contract: '0x2AC2EB99A696ceE368699EB4AD7217f8A706b905',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: '',
            symbol: 'NFT',
            name: 'MATIC.ART   Erotic Art',
            contractType: 'ERC1155'
        },
        collectionIdent: '0x2ac2eb99a696cee368699eb4ad7217f8a706b905'
    },
    {
        uri: '',
        'native': {
            chainId: '7',
            tokenId: '5',
            contract: '0xF49a0aD9E671156C674e15d89961a7005C0bBe35',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: '',
            symbol: 'NFT',
            name: 'Clairz\'heART',
            contractType: 'ERC1155'
        },
        collectionIdent: '0xf49a0ad9e671156c674e15d89961a7005c0bbe35'
    },
    {
        uri: 'https://wnfts.xp.network/w/61c1ff4a4298fe05d75ea143',
        'native': {
            chainId: '7',
            tokenId: '55',
            contract: '0xc69ECD37122A9b5FD7e62bC229d478BB83063C9d',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://wnfts.xp.network/w/61c1ff4a4298fe05d75ea143',
            symbol: 'XPNFT',
            name: 'XpWrapNft',
            contractType: 'ERC721'
        },
        collectionIdent: '0xc69ecd37122a9b5fd7e62bc229d478bb83063c9d'
    },
    {
        uri: '',
        'native': {
            chainId: '7',
            tokenId: '2',
            contract: '0x5Bc9c90bE23AF74dB084934c683d80f722E074d9',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: '',
            symbol: 'NFT',
            name: 'MATIC.ART   NFT FREE MARKET PLACE',
            contractType: 'ERC1155'
        },
        collectionIdent: '0x5bc9c90be23af74db084934c683d80f722e074d9'
    },
    {
        uri: 'https://ipfs.moralis.io:2053/ipfs/QmdUBujVC7eLLUnTiWXTYxjBAuiAdDPYsj8UULfQ2uQWgo',
        'native': {
            chainId: '7',
            tokenId: '43',
            contract: '0x9cB50C4C0005D10ca4B8f97ec860c6DEa88D342B',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://ipfs.moralis.io:2053/ipfs/QmdUBujVC7eLLUnTiWXTYxjBAuiAdDPYsj8UULfQ2uQWgo',
            symbol: 'OFT',
            name: 'Orange Wallet NFT',
            contractType: 'ERC721'
        },
        collectionIdent: '0x9cb50c4c0005d10ca4b8f97ec860c6dea88d342b'
    },
    {
        uri: 'https://metadata.nft-studio.com/otakucoin_world_regular/26087',
        'native': {
            chainId: '7',
            tokenId: '26087',
            contract: '0x65082b234a007E2D1c8E0BF2F91dc5fD805E63E0',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://metadata.nft-studio.com/otakucoin_world_regular/26087',
            symbol: 'awrrXOC',
            name: 'Otaku Coin World Replica',
            contractType: 'ERC721'
        },
        collectionIdent: '0x65082b234a007e2d1c8e0bf2f91dc5fd805e63e0'
    },
    {
        uri: 'https://ipfs.moralis.io:2053/ipfs/QmZwzrZc37eieGo9A5ZS5qU3LUxabnv46upnNaWgoRGLSJ',
        'native': {
            chainId: '7',
            tokenId: '5229',
            contract: '0x72B6Dc1003E154ac71c76D3795A3829CfD5e33b9',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://ipfs.moralis.io:2053/ipfs/QmZwzrZc37eieGo9A5ZS5qU3LUxabnv46upnNaWgoRGLSJ',
            symbol: 'NFM',
            name: 'Non-Fungible Matic',
            contractType: 'ERC721'
        },
        collectionIdent: '0x72b6dc1003e154ac71c76d3795a3829cfd5e33b9'
    },
    {
        uri: 'https://ipfs.moralis.io:2053/ipfs/QmbhZ5FtLLP2ScQPETy3n88Jsf9tDMhQVjAPe6HaYTdBFX',
        'native': {
            chainId: '7',
            tokenId: '62',
            contract: '0x4508aF04dE4073b10a53ac416eb311F4A2AB9569',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://ipfs.moralis.io:2053/ipfs/QmbhZ5FtLLP2ScQPETy3n88Jsf9tDMhQVjAPe6HaYTdBFX',
            symbol: 'ART',
            name: 'КОТЫ',
            contractType: 'ERC721'
        },
        collectionIdent: '0x4508af04de4073b10a53ac416eb311f4a2ab9569'
    },
    {
        uri: 'https://portal.neondistrict.io/api/getNft/158456336483957307910674897023',
        'native': {
            chainId: '7',
            tokenId: '158456336483957307910674897023',
            contract: '0x7227e371540CF7b8e512544Ba6871472031F3335',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://portal.neondistrict.io/api/getNft/158456336483957307910674897023',
            symbol: 'NDITEM1',
            name: 'Neon District Season One Item',
            contractType: 'ERC721'
        },
        collectionIdent: '0x7227e371540cf7b8e512544ba6871472031f3335'
    },
    {
        uri: 'https://wnfts.xp.network/w/6212161d1a581161f1e30ece',
        'native': {
            chainId: '7',
            tokenId: '103',
            contract: '0xc69ECD37122A9b5FD7e62bC229d478BB83063C9d',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://wnfts.xp.network/w/6212161d1a581161f1e30ece',
            symbol: 'XPNFT',
            name: 'XpWrapNft',
            contractType: 'ERC721'
        },
        collectionIdent: '0xc69ecd37122a9b5fd7e62bc229d478bb83063c9d'
    },
    {
        uri: 'https://ipfs.moralis.io:2053/ipfs/QmRW35AveU9X5rQqXN7TzzXrrPw8AQXM1f6DLKw4tpmE1Y',
        'native': {
            chainId: '7',
            tokenId: '479',
            contract: '0x2Dd7eA1b9c67115EaC74248ba8E024f1d72A15b1',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'https://ipfs.moralis.io:2053/ipfs/QmRW35AveU9X5rQqXN7TzzXrrPw8AQXM1f6DLKw4tpmE1Y',
            symbol: 'YARDv1',
            name: 'NFT Yard v1',
            contractType: 'ERC721'
        },
        collectionIdent: '0x2dd7ea1b9c67115eac74248ba8e024f1d72a15b1'
    },
    {
        uri: 'Invalid uri',
        'native': {
            chainId: '7',
            tokenId: '1190',
            contract: '0xca0fA1f34567B260c70C93DeC03b45EEa77f5A93',
            owner: '0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE',
            uri: 'Invalid uri',
            symbol: 'ReplicaAnimeLoot',
            name: 'ReplicaAnimeLoot',
            contractType: 'ERC721'
        },
        collectionIdent: '0xca0fa1f34567b260c70c93dec03b45eea77f5a93'
    }
]

[
    {
      "uri": "https://gateway.pinata.cloud/ipfs/QmbwEWq7Fm9SvZcfTNQTdAXfHEpY2uxurihdyUZwt5mjkE",
      "native": {
        "balance": 1,
        "creator": "erd1rts6c6gegdquxlt9en28kcu6wuz8jjtq7rswg0kah3mqnpcsjkuq27m774",
        "tokenIdentifier": "BADGES-8b41cd-03",
        "attributes": [
          "VGhlaXIgbGl2ZXMgYXJlIHRoZSBzdW0gb2YgaW5jcmVkaWJsZSBzdG9yaWVzIHRoYXQgYXJlIGFuIGluc3BpcmF0aW9uIHRvIG1hbnkuICJPSywgc28gdGhpcyBqdXN0IGhhcHBlbmVkLi4uIg=="
        ],
        "name": "InfluencerBadgeSJI",
        "uris": [
          "aHR0cHM6Ly9nYXRld2F5LnBpbmF0YS5jbG91ZC9pcGZzL1FtYndFV3E3Rm05U3ZaY2ZUTlFUZEFYZkhFcFkydXh1cmloZHlVWnd0NW1qa0U="
        ],
        "nonce": 3,
        "royalties": "300",
        "chainId": "2",
        "contract": "",
        "uri": "https://gateway.pinata.cloud/ipfs/QmbwEWq7Fm9SvZcfTNQTdAXfHEpY2uxurihdyUZwt5mjkE",
        "tokenId": "BADGES-8b41cd-03"
      },
      "collectionIdent": "BADGES-8b41cd"
    },
    {
      "uri": "https://ipfs.io/ipfs/QmUhSc794CgWgjsuPvYB82ek4vZfahLen1AN9mBtq3WxcD/238.json",
      "native": {
        "balance": 1,
        "creator": "erd1qqqqqqqqqqqqqpgqmkqz2z9agrxpezqd993atypq48n30qxlyl5sfx24jc",
        "tokenIdentifier": "OLIVEIRA-bcfb8e-db",
        "attributes": [
          "dGFnczpVTk8sIE1lZHVzYSwgTkZULCBTb3BoaWEsIENsdWJHb3Jnb247ZGVzY3JpcHRpb246VU5PIE1lZHVzYSAtIFNPUEhJQSBORlQgQ29sbGVjdGlvbjttZXRhZGF0YTpRbVVoU2M3OTRDZ1dnanN1UHZZQjgyZWs0dlpmYWhMZW4xQU45bUJ0cTNXeGNELzIzOC5qc29u"
        ],
        "name": "Sophia Medusa #238",
        "uris": [
          "aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1kaWpqSFRkaEtZZXFkWUhHWUU5eDFrV0E1SHFQclU5d2N1a1J0QmMzdmhjZi8yMzgucG5n",
          "aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1VaFNjNzk0Q2dXZ2pzdVB2WUI4MmVrNHZaZmFoTGVuMUFOOW1CdHEzV3hjRC8yMzguanNvbg=="
        ],
        "nonce": 219,
        "royalties": "1200",
        "chainId": "2",
        "contract": "",
        "uri": "https://ipfs.io/ipfs/QmUhSc794CgWgjsuPvYB82ek4vZfahLen1AN9mBtq3WxcD/238.json",
        "tokenId": "OLIVEIRA-bcfb8e-db"
      },
      "collectionIdent": "OLIVEIRA-bcfb8e"
    },
    {
      "uri": "https://wnfts.xp.network/w/61b9c7754298fe05d7bac551",
      "native": {
        "balance": 1,
        "creator": "erd1qqqqqqqqqqqqqpgq98ufyktqukxqw79f7n22sr3u6n05u7d7p7tqmzhv32",
        "tokenIdentifier": "XPNFT-676422-1c",
        "attributes": [
          "AAAACSJQb2x5Z29uIgAAAAMiNyIAAABKImh0dHBzOi8vcG9ydGFsLm5lb25kaXN0cmljdC5pby9hcGkvZ2V0TmZ0LzE1ODQ1NjM0Mzg5OTU0ODQyNTU0MTkxNDM1OTcyMCIAAAAHIkFybW9yIgAAAAgiQ29tbW9uIgAAAAExAAAAATEAAAAGIkhlYWQiAAAAATUAAAABNQAAAAEwAAAAAjEwAAAAATAAAAABNQAAAAE1AAAAATU="
        ],
        "name": "Ceres Infector: Paragon",
        "uris": [
          "aHR0cHM6Ly9uZW9uLWRpc3RyaWN0LXNlYXNvbi1vbmUuczMuYW1hem9uYXdzLmNvbS9pbWFnZXMvY2VyZXNpbmZlY3RvcnAtY29tbW9uLWhlYWQtZmVtYWxlLXRodW1iLnBuZw==",
          "aHR0cHM6Ly93bmZ0cy54cC5uZXR3b3JrL3cvNjFiOWM3NzU0Mjk4ZmUwNWQ3YmFjNTUx"
        ],
        "nonce": 28,
        "royalties": "0",
        "chainId": "2",
        "contract": "",
        "uri": "https://wnfts.xp.network/w/61b9c7754298fe05d7bac551",
        "tokenId": "XPNFT-676422-1c"
      },
      "collectionIdent": "XPNFT-676422"
    },
    {
      "uri": "https://wnfts.xp.network/w/61c07b1e4298fe05d740332a",
      "native": {
        "balance": 1,
        "creator": "erd1qqqqqqqqqqqqqpgq98ufyktqukxqw79f7n22sr3u6n05u7d7p7tqmzhv32",
        "tokenIdentifier": "XPNFT-676422-1e",
        "attributes": [
          "AAAABSJCU0MiAAAAAyI0IgAAAF4iaHR0cHM6Ly9waW5hdGEuYnV6ei9pcGZzL1FtVGpuQlM0bXVpSGVZTE1qNlJweWlrWTJWbzdkQlVNQnRhcWo5TmJYUHVSVkYvbG9vdGpzb24vMC83MzE4Lmpzb24iAAAABiJEYXJrIgAAAA0iRnJvbnQgQmVhcmQiAAAABiJNYWxlIgAAAAMiMyI="
        ],
        "name": "LootPunks  #7318",
        "uris": [
          "aHR0cHM6Ly9waW5hdGEuZGlnaXRhbC9pcGZzL1FtVGpuQlM0bXVpSGVZTE1qNlJweWlrWTJWbzdkQlVNQnRhcWo5TmJYUHVSVkYvbG9vdHB1bmtzaW1hZ2UvMC83MzE4LnBuZw==",
          "aHR0cHM6Ly93bmZ0cy54cC5uZXR3b3JrL3cvNjFjMDdiMWU0Mjk4ZmUwNWQ3NDAzMzJh"
        ],
        "nonce": 30,
        "royalties": "0",
        "chainId": "2",
        "contract": "",
        "uri": "https://wnfts.xp.network/w/61c07b1e4298fe05d740332a",
        "tokenId": "XPNFT-676422-1e"
      },
      "collectionIdent": "XPNFT-676422"
    },
    {
      "uri": "https://wnfts.xp.network/w/61dab0ea4298fe05d74de675",
      "native": {
        "balance": 1,
        "creator": "erd1qqqqqqqqqqqqqpgq98ufyktqukxqw79f7n22sr3u6n05u7d7p7tqmzhv32",
        "tokenIdentifier": "XPNFT-676422-23",
        "attributes": [
          "AAAACSJQb2x5Z29uIgAAAAMiNyIAAABKImh0dHBzOi8vcG9ydGFsLm5lb25kaXN0cmljdC5pby9hcGkvZ2V0TmZ0LzE1ODQ1NjMzNTQzMjQ5Mjg5NTcwOTIyOTkwNDA5NiIAAAAHIkFybW9yIgAAAAoiVW5jb21tb24iAAAAATIAAAABMQAAAAYiQXJtcyIAAAABNwAAAAEwAAAAAjEzAAAAAjU4AAAAATMAAAABMAAAAAE1AAAAATI="
        ],
        "name": "Yume Riveter: Renegade",
        "uris": [
          "aHR0cHM6Ly9uZW9uLWRpc3RyaWN0LXNlYXNvbi1vbmUuczMuYW1hem9uYXdzLmNvbS9pbWFnZXMveXVtZXJpdmV0ZXJyLXVuY29tbW9uLWFybXMtZmVtYWxlLXRodW1iLnBuZw==",
          "aHR0cHM6Ly93bmZ0cy54cC5uZXR3b3JrL3cvNjFkYWIwZWE0Mjk4ZmUwNWQ3NGRlNjc1"
        ],
        "nonce": 35,
        "royalties": "0",
        "chainId": "2",
        "contract": "",
        "uri": "https://wnfts.xp.network/w/61dab0ea4298fe05d74de675",
        "tokenId": "XPNFT-676422-23"
      },
      "collectionIdent": "XPNFT-676422"
    }
  ]
