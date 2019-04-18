const LendingRequestFactory = artifacts.require("LendingRequestFactory");
const LendingRequest = artifacts.require("LendingRequest");
const ProposalManagement = artifacts.require("ProposalManagement");
const TrustToken = artifacts.require("TrustToken");

contract("LendingRequestFactory", accounts => {
    beforeEach(async () => {
        asker = accounts[0];
        lender = accounts[1];
        lendingRequestFactory = await LendingRequestFactory.new(
            TrustToken.address,
            ProposalManagement.address,
            { from: asker }
        );
    });

    it("create new LendingRequest", async () => {
        // create lendingRequest
        let lendingRequest = await lendingRequestFactory.newLendingRequest.call(
            1,
            2,
            "test",
            asker
        );
        assert.notStrictEqual(
            lendingRequest,
            0x0000000000000000000000000000000000000000,
            "should create a valid lending Request"
        );
    });

    it("factory cannot receive ETH", async () => {
        try {
            await lendingRequestFactory.send(web3.utils.toWei("1", "ether"));
        } catch (error) {
            assert(
                error.message.indexOf("revert") >= 0,
                "factory does not accept ETH"
            );
        }
    });

    // Missing: Can validate User via Uport
});
