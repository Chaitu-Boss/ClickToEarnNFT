const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ClickToEarn", function () {
    let ClickToEarn, contract, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        ClickToEarn = await ethers.getContractFactory("ClickToEarn");
        contract = await ClickToEarn.deploy();
        await contract.waitForDeployment();
    });

    it("Should mint an NFT to user when called", async function () {
        await contract.mintNFT(addr1.address, "https://example.com/token1.json");
        expect(await contract.balanceOf(addr1.address)).to.equal(1);
    });

    it("Should return correct user NFTs", async function () {
        await contract.mintNFT(addr1.address, "https://example.com/token1.json");
        await contract.mintNFT(addr1.address, "https://example.com/token2.json");

        const nfts = await contract.getUserNFTs(addr1.address);
        expect(nfts.length).to.equal(2);
    });

    it("Should allow owner to set milestone URI", async function () {
        await contract.setMilestoneURI(2000, "https://example.com/milestone2000.json");
        expect(await contract.milestoneURI(2000)).to.equal("https://example.com/milestone2000.json");
    });
});
