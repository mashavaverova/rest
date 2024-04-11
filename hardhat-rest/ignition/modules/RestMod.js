const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RestMod", (m) => {

  const restaurants = m.contract("Restaurants", [], {
   
  });

  return { restaurants };
});