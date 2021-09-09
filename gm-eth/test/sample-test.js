const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GM", function () {
  it("Should return the new greeter nickname once it's changed", async function () {
    const GM = await ethers.getContractFactory("GM");
    const gm = await GM.deploy("Contract Deployer");
    await gm.deployed();

    expect(await gm.greeter()).to.equal("Contract Deployer");

    const setGreeterTx = await greeter.greet("Deployer");

    // wait until the transaction is mined
    await setGreeterTx.wait();

    expect(await greeter.greeter()).to.equal("Deployer");
  });
});
