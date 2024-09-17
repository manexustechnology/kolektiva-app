-include .env

# Default values
DEFAULT_NETWORK := default_network
FORK_NETWORK := mainnet

# Custom network can be set via make network=<network_name>
network ?= $(DEFAULT_NETWORK)

.PHONY: account chain compile deploy deploy-verify flatten fork format generate lint test verify

account:
	node script/ListAccount.js

build:
	forge build --build-info --build-info-path out/build-info/

generate-abi:
	node script/generateTsAbis.js

chain:
	anvil --config-out localhost.json

compile:
	forge compile

deploy: build
	forge script script/Deploy.s.sol --rpc-url $(network) --broadcast --legacy
	$(MAKE) generate-abi

deploy-verify: build
	forge script script/Deploy.s.sol --rpc-url $(network) --broadcast --legacy --verify
	$(MAKE) generate-abi

deploy-liskSepolia-usdt: build
	forge create --rpc-url https://rpc.sepolia-api.lisk.com \
		--etherscan-api-key 123 \
		--verify \
		--verifier blockscout \
		--verifier-url https://sepolia-blockscout.lisk.com/api \
		--private-key $(DEPLOYER_PRIVATE_KEY) \
		contracts/mocks/MockUSDT.sol:MockUSDT

deploy-liskSepolia-oracle: build
	forge create --rpc-url https://rpc.sepolia-api.lisk.com \
		--etherscan-api-key 123 \
		--verify \
		--verifier blockscout \
		--verifier-url https://sepolia-blockscout.lisk.com/api \
		--private-key $(DEPLOYER_PRIVATE_KEY) \
		contracts/KolektivaOracle.sol:KolektivaOracle \
		--constructor-args $(DEPLOYER_ADDRESS)

deploy-liskSepolia-handler: build
	forge create --rpc-url https://rpc.sepolia-api.lisk.com \
		--etherscan-api-key 123 \
		--verify \
		--verifier blockscout \
		--verifier-url https://sepolia-blockscout.lisk.com/api \
		--private-key $(DEPLOYER_PRIVATE_KEY) \
		contracts/KolektivaHandler.sol:KolektivaHandler \
		--constructor-args $(DEPLOYER_ADDRESS) $(LISK_SEPOLIA_USDT_ADDRESS)

flatten:
	forge flatten

fork:
	anvil --fork-url $(if $(filter $(network),$(DEFAULT_NETWORK)),$(FORK_NETWORK),$(network)) --chain-id 31337 --config-out localhost.json

format:
	forge fmt && prettier --write ./script/**/*.js

generate:
	node script/generateAccount.js

lint:
	forge fmt --check && prettier --check ./script/**/*.js

test:
	forge test

verify: build
	forge script script/VerifyAll.s.sol --ffi --rpc-url $(network)

# Help command
help:
	@echo "Available commands:"
	@echo "  make account            - List accounts"
	@echo "  make chain              - Start Anvil chain"
	@echo "  make compile            - Compile contracts"
	@echo "  make deploy             - Deploy contracts"
	@echo "  make deploy-verify      - Deploy and verify contracts"
	@echo "  make flatten            - Flatten contracts"
	@echo "  make fork               - Start Anvil fork"
	@echo "  make format             - Format code"
	@echo "  make generate           - Generate account"
	@echo "  make lint               - Lint code"
	@echo "  make test               - Run tests"
	@echo "  make verify             - Verify contracts"
	@echo ""
	@echo "Use 'make <command> network=<network_name>' to specify a custom network"

