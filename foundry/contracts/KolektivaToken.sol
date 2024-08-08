// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title KolektivaToken
 * @dev ERC20 token representing a property, with additional metadata and controlled minting and burning.
 */
contract KolektivaToken is ERC20, Ownable {
    error KolektivaToken__ExceedMaxSupply();

    uint256 public availableForSale;
    uint256 public propertyValue;
    uint256 public lastAppraisalDate;
    address public tokenHandler;

    string private propertyType;
    string private province;
    string private city;
    string private location;

    /**
     * @dev Constructor to initialize the KolektivaToken contract.
     * @param name The name of the token.
     * @param symbol The symbol of the token.
     * @param _propertyType The type of the property.
     * @param _province The province where the property is located.
     * @param _city The city where the property is located.
     * @param _location The specific location of the property.
     * @param _totalSupply The total supply of tokens.
     * @param _tokenHandler The address of the token handler.
     */
    constructor(
        string memory name,
        string memory symbol,
        string memory _propertyType,
        string memory _province,
        string memory _city,
        string memory _location,
        uint256 _totalSupply,
        address _tokenHandler
    ) ERC20(name, symbol) Ownable(_tokenHandler) {
        propertyType = _propertyType;
        province = _province;
        city = _city;
        location = _location;
        tokenHandler = _tokenHandler;

        availableForSale = _totalSupply;
        _mint(_tokenHandler, _totalSupply);
    }

    /**
     * @dev Mints new tokens.
     * @param to The address to mint the tokens to.
     * @param amount The amount of tokens to mint.
     *
     * Requirements:
     * - Only the owner can call this function.
     * - The total supply after minting must not exceed the current total supply.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        if (totalSupply() + amount >= totalSupply()) {
            revert KolektivaToken__ExceedMaxSupply();
        }
        _mint(to, amount);
    }

    /**
     * @dev Burns tokens from a specified address.
     * @param from The address to burn the tokens from.
     * @param amount The amount of tokens to burn.
     *
     * Requirements:
     * - Only the owner can call this function.
     */
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }

    /**
     * @dev Transfers tokens to a specified address.
     * @param to The address to transfer the tokens to.
     * @param amount The amount of tokens to transfer.
     * @return A boolean value indicating whether the operation succeeded.
     *
     * Example:
     * ```
     * bool success = token.transfer(recipient, 100);
     * ```
     */
    function transfer(
        address to,
        uint256 amount
    ) public override returns (bool) {
        return super.transfer(to, amount);
    }

    /**
     * @dev Transfers tokens from one address to another.
     * @param from The address to transfer the tokens from.
     * @param to The address to transfer the tokens to.
     * @param amount The amount of tokens to transfer.
     * @return A boolean value indicating whether the operation succeeded.
     *
     * Example:
     * ```
     * bool success = token.transferFrom(sender, recipient, 100);
     * ```
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        return super.transferFrom(from, to, amount);
    }

    /**
     * @dev Retrieves the property information.
     * @return A tuple containing the property type, province, city, and location.
     *
     * Example:
     * ```
     * (string memory type, string memory province, string memory city, string memory location) = token.getInformation();
     * ```
     */
    function getInformation()
        external
        view
        returns (string memory, string memory, string memory, string memory)
    {
        return (propertyType, province, city, location);
    }
}