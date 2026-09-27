(() => {
  const nvmeProducts = window.AFFILIATE_PRODUCTS?.nvme;
  const samsung990pro4toId = 'samsung-990pro-4to';

  if (Array.isArray(nvmeProducts) && !nvmeProducts.some(product => product.id === samsung990pro4toId)) {
    nvmeProducts.push({
      id: samsung990pro4toId,
      name: "Samsung 990 PRO 4 To",
      brand: "Samsung",
      tag: "4 To • PCIe 4.0",
      capacityGb: 4000,
      estimatePrice: 600,
      specSource: "Samsung",
      note: "Référence MZ-V9P4T0BW : SSD NVMe M.2 2280 PCIe 4.0 x4 / NVMe 2.0, mémoire Samsung V-NAND TLC, cache DRAM 4 Go LPDDR4, jusqu’à 7 450 Mo/s en lecture et 6 900 Mo/s en écriture.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    });
  }

  if (window.EPN_LINKS && !window.EPN_LINKS[samsung990pro4toId]) {
    window.EPN_LINKS[samsung990pro4toId] = {
      customId: 'umpsamsung990pro4tb',
      destination: 'https://www.ebay.fr/sch/i.html?_nkw=Samsung+990+PRO+4TB+MZ-V9P4T0BW',
      url: 'https://www.ebay.fr/sch/i.html?_nkw=Samsung+990+PRO+4TB+MZ-V9P4T0BW&mkcid=1&mkrid=709-53476-19255-0&siteid=71&campid=5339214616&customid=umpsamsung990pro4tb&toolid=10001&mkevt=1'
    };
    window.applyEpnLinks?.();
  }

  const storageCapacityProducts = window.AFFILIATE_PRODUCTS?.storageCapacity;
  const samsung990pro4toCapacityId = 'samsung-990pro-4to-capacity';

  if (Array.isArray(storageCapacityProducts) && !storageCapacityProducts.some(product => product.id === samsung990pro4toCapacityId)) {
    storageCapacityProducts.push({
      id: samsung990pro4toCapacityId,
      name: "Samsung 990 PRO 4 To",
      brand: "Samsung",
      tag: "4 To • capacité",
      capacityGb: 4000,
      estimatePrice: 600,
      specSource: "Samsung",
      note: "Option 4 To hautes performances pour augmenter fortement la capacité de stockage avec un SSD NVMe PCIe 4.0 rapide.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    });
  }

  if (window.EPN_LINKS && !window.EPN_LINKS[samsung990pro4toCapacityId]) {
    window.EPN_LINKS[samsung990pro4toCapacityId] = {
      customId: 'umpsamsung990pro4tbcapacity',
      destination: 'https://www.ebay.fr/sch/i.html?_nkw=Samsung+990+PRO+4TB+MZ-V9P4T0BW',
      url: 'https://www.ebay.fr/sch/i.html?_nkw=Samsung+990+PRO+4TB+MZ-V9P4T0BW&mkcid=1&mkrid=709-53476-19255-0&siteid=71&campid=5339214616&customid=umpsamsung990pro4tbcapacity&toolid=10001&mkevt=1'
    };
    window.applyEpnLinks?.();
  }
})();
