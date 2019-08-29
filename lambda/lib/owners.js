let owners = {
    admins: ["ronaldxkan", "weijunyu", "JohnsonKoh1110"],
    productOwners: {
        apex: ["weijunyu"],
        "design-system": ["Sylphias", "JohnsonKoh1110", "weijunyu"]
    },
    getAllOwners() {
        let allOwners = [];
        for (let product of Object.keys(this.productOwners)) {
            let productOwners = this.productOwners[product];
            for (let owner of productOwners) {
                if (!allOwners.includes(owner)) {
                    allOwners.push(owner);
                }
            }
        }
        return allOwners;
    }
};

module.exports = owners;
