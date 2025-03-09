// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ClickToEarn is ERC721URIStorage, Ownable {
    uint256 public _tokenIds;
    mapping(address => uint256) public userClicks;
    mapping(uint256 => string) public milestoneURI;

    constructor() Ownable(msg.sender) ERC721("ClickToEarn", "CTE") {
        milestoneURI[
            500
        ] = "https://white-petite-sole-505.mypinata.cloud/ipfs/bafkreifxcxqor5hg5hoelzcinnqnf54gqsnlmnnpaqdhrgl2eyuq6gviea";
        milestoneURI[
            1000
        ] = "https://white-petite-sole-505.mypinata.cloud/ipfs/bafkreifzngye32vdyh54yursep53gn3uy5isc2umr7tm2v6p3xmq36yrly";
        milestoneURI[
            5000
        ] = "https://white-petite-sole-505.mypinata.cloud/ipfs/bafkreiew2qhfh7levdh5pfh3yf7qmame6wcqodm4wq5eqqjxovjzrvpx4u";
    }

    function setMilestoneURI(
        uint256 milestone,
        string memory uri
    ) public onlyOwner {
        milestoneURI[milestone] = uri;
    }

    event NFTMinted(address recipient, uint256 tokenId, string tokenURI);

    function mintNFT(address recipient, string memory tokenURI) public {
        _tokenIds++;
        _mint(recipient, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI);
        emit NFTMinted(recipient, _tokenIds, tokenURI);
    }

    function getUserNFTs(address user) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(user);
        uint256[] memory tokenIds = new uint256[](balance);
        uint256 count = 0;

        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (ownerOf(i) == user) {
                tokenIds[count] = i;
                count++;
            }
        }
        return tokenIds;
    }
}
