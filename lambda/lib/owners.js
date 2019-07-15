module.exports = {
  fetchProductOwners,
  fetchProductDetails
};

function fetchProductOwners() {
  const owners = [
    "ronaldxkan",
    "weijunyu",
    "JohnsonKoh1110"
  ];

  return owners;
}

function fetchProductDetails() {
    const details = {
      "Sentimeter": ["ronaldxkan", "weijunyu", "JohnsonKoh1110"]
    }

    return details
}