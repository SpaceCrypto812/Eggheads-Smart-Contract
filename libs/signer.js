const { utils } = require('ethers')
const { ecsign } = require('ethereumjs-util')

const { keccak256, solidityPack } = utils

module.exports = (
  privateKey,
  data
) => {
  let result = '0x';
  for (i = 0; i < data.length; i++) {
    for (j = 0; j < data[i].length; j++) {
      result = solidityPack(
        ['bytes', 'address', 'uint256'],
        [result, data[i][j].tokenAddress, data[i][j].tokenAmount]
      );
    }
  }
  const msg = keccak256(result)

  const { v, r, s } = ecsign(
    Buffer.from(msg.slice(2), 'hex'),
    Buffer.from(privateKey.slice(2), 'hex')
  )

  return '0x' + r.toString('hex') + s.toString('hex') + v.toString(16)

  //       let result = "0x"

  //       result = solidityPack(
  //           ["bytes", "address", "uint256"],
  //           [result, "0xA477A87d3e3EB8172fC512eb41AA42B6E9ec1338", 15],
  //       )

  //       let msg = keccak256(result)

  //       msg = await this.escrow.connect(this.alice).toEthSignedMessageHash(msg)

  //       const { v, r, s } = ecsign(Buffer.from(msg.slice(2), "hex"), Buffer.from(privateKey.slice(2), "hex"))

  //       return signature = "0x" + r.toString("hex") + s.toString("hex") + v.toString(16)

}
