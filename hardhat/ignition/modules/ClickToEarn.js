const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ClickToEarnModule", (m) => {
    const ClickToEarn = m.contract("ClickToEarn");

    return { ClickToEarn };
});