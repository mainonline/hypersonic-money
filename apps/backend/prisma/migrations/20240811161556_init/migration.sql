-- CreateTable
CREATE TABLE "BeaconState" (
    "id" SERIAL NOT NULL,
    "slot" BIGINT NOT NULL,
    "state_root" TEXT NOT NULL,

    CONSTRAINT "BeaconState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExecutionBlock" (
    "id" SERIAL NOT NULL,
    "number" BIGINT NOT NULL,
    "hash" TEXT NOT NULL,
    "parent_hash" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "base_fee_per_gas" BIGINT NOT NULL,
    "difficulty" BIGINT NOT NULL,
    "gas_used" BIGINT NOT NULL,
    "total_difficulty" BIGINT NOT NULL,
    "blob_gas_used" BIGINT NOT NULL,
    "excess_blob_gas" BIGINT NOT NULL,

    CONSTRAINT "ExecutionBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EthSupply" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "block_number" BIGINT NOT NULL,
    "deposits_slot" BIGINT NOT NULL,
    "balances_slot" BIGINT NOT NULL,
    "supply" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "EthSupply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EthPrice" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "usd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EthPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EthFee" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "block_number" BIGINT NOT NULL,
    "base_fee_per_gas" BIGINT NOT NULL,
    "blob_fee_per_gas" BIGINT NOT NULL,
    "burn_rate" DECIMAL(65,30) NOT NULL,
    "issuance_rate" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "EthFee_pkey" PRIMARY KEY ("id")
);
