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

  const cpuProducts = window.AFFILIATE_PRODUCTS?.cpu;
  const ryzen57600Id = 'ryzen5-7600';

  if (Array.isArray(cpuProducts) && !cpuProducts.some(product => product.id === ryzen57600Id)) {
    cpuProducts.push({
      id: ryzen57600Id,
      name: "AMD Ryzen 5 7600",
      brand: "AMD",
      tag: "Gaming • AM5",
      estimatePrice: 161,
      socket: "AM5",
      cores: 6,
      threads: 12,
      baseClockGHz: 3.8,
      boostClockGHz: 5.1,
      cacheL3Mb: 32,
      tdpW: 65,
      memoryType: "DDR5",
      specSource: "AMD",
      note: "Ryzen 7000 Zen 4 avec 6 cœurs / 12 threads, 3,8 GHz de base, jusqu’à 5,1 GHz, 32 Mo de cache L3 et TDP 65 W. La version Boxed inclut un ventirad AMD Wraith Stealth.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    });
  }

  if (window.EPN_LINKS && !window.EPN_LINKS[ryzen57600Id]) {
    window.EPN_LINKS[ryzen57600Id] = {
      customId: 'umpcpu7600',
      destination: 'https://www.ebay.fr/sch/i.html?_nkw=AMD+Ryzen+5+7600',
      url: 'https://www.ebay.fr/sch/i.html?_nkw=AMD+Ryzen+5+7600&mkcid=1&mkrid=709-53476-19255-0&siteid=71&campid=5339214600&customid=umpcpu7600&toolid=10001&mkevt=1'
    };
    window.applyEpnLinks?.();
  }

  const ryzen77700Id = 'ryzen7-7700';
  if (Array.isArray(cpuProducts) && !cpuProducts.some(product => product.id === ryzen77700Id)) {
    cpuProducts.push({
      id: ryzen77700Id,
      name: "AMD Ryzen 7 7700",
      brand: "AMD",
      tag: "Gaming / polyvalent • AM5",
      estimatePrice: 286,
      socket: "AM5",
      cores: 8,
      threads: 16,
      baseClockGHz: 3.8,
      boostClockGHz: 5.3,
      cacheL3Mb: 32,
      tdpW: 65,
      memoryType: "DDR5",
      specSource: "AMD",
      note: "Ryzen 7000 Zen 4 avec 8 cœurs / 16 threads, 3,8 GHz de base, jusqu’à 5,3 GHz, 32 Mo de cache L3 et TDP 65 W. La version Boxed inclut un refroidisseur AMD Wraith Prism.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    });
  }

  if (window.EPN_LINKS && !window.EPN_LINKS[ryzen77700Id]) {
    window.EPN_LINKS[ryzen77700Id] = {
      customId: 'umpcpu7700',
      destination: 'https://www.ebay.fr/sch/i.html?_nkw=AMD+Ryzen+7+7700',
      url: 'https://www.ebay.fr/sch/i.html?_nkw=AMD+Ryzen+7+7700&mkcid=1&mkrid=709-53476-19255-0&siteid=71&campid=5339214600&customid=umpcpu7700&toolid=10001&mkevt=1'
    };
    window.applyEpnLinks?.();
  }

  const coreI514400fId = 'core-i5-14400f';
  if (Array.isArray(cpuProducts) && !cpuProducts.some(product => product.id === coreI514400fId)) {
    cpuProducts.push({
      id: coreI514400fId,
      name: "Intel Core i5-14400F",
      brand: "Intel",
      tag: "Gaming • LGA1700",
      estimatePrice: 152,
      socket: "LGA1700",
      cores: 10,
      performanceCores: 6,
      efficiencyCores: 4,
      threads: 16,
      baseClockGHz: 2.5,
      boostClockGHz: 4.7,
      cacheL3Mb: 20,
      tdpW: 65,
      maxTurboPowerW: 148,
      memoryType: "DDR5-4800 / DDR4-3200",
      specSource: "Intel",
      note: "Core i5 de 14e génération avec 10 cœurs (6 P-cores + 4 E-cores), 16 threads, jusqu’à 4,7 GHz, 20 Mo de Smart Cache, puissance de base 65 W et puissance turbo maximale 148 W. Modèle F sans circuit graphique intégré.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    });
  }

  if (window.EPN_LINKS && !window.EPN_LINKS[coreI514400fId]) {
    window.EPN_LINKS[coreI514400fId] = {
      customId: 'umpcpui514400f',
      destination: 'https://www.ebay.fr/sch/i.html?_nkw=Intel+Core+i5-14400F',
      url: 'https://www.ebay.fr/sch/i.html?_nkw=Intel+Core+i5-14400F&mkcid=1&mkrid=709-53476-19255-0&siteid=71&campid=5339214600&customid=umpcpui514400f&toolid=10001&mkevt=1'
    };
    window.applyEpnLinks?.();
  }

  const ryzen57500fId = 'ryzen5-7500f';
  if (Array.isArray(cpuProducts) && !cpuProducts.some(product => product.id === ryzen57500fId)) {
    cpuProducts.push({
      id: ryzen57500fId,
      name: "AMD Ryzen 5 7500F",
      brand: "AMD",
      tag: "Budget gaming • AM5",
      estimatePrice: 118,
      socket: "AM5",
      cores: 6,
      threads: 12,
      baseClockGHz: 3.7,
      boostClockGHz: 5.0,
      cacheL3Mb: 32,
      tdpW: 65,
      memoryType: "DDR5-5200",
      specSource: "AMD",
      note: "Ryzen 7000 Zen 4 avec 6 cœurs / 12 threads, 3,7 GHz de base, jusqu’à 5,0 GHz, 32 Mo de cache L3 et TDP 65 W. Carte graphique dédiée obligatoire ; la version MPK est associée à un refroidisseur AMD Wraith Stealth.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    });
  }

  if (window.EPN_LINKS && !window.EPN_LINKS[ryzen57500fId]) {
    window.EPN_LINKS[ryzen57500fId] = {
      customId: 'umpcpu7500f',
      destination: 'https://www.ebay.fr/sch/i.html?_nkw=AMD+Ryzen+5+7500F',
      url: 'https://www.ebay.fr/sch/i.html?_nkw=AMD+Ryzen+5+7500F&mkcid=1&mkrid=709-53476-19255-0&siteid=71&campid=5339214600&customid=umpcpu7500f&toolid=10001&mkevt=1'
    };
    window.applyEpnLinks?.();
  }

  const ramPriceOverrides = {
    'ram16-ddr4': 130,
    'ram16-ddr5': 290,
    'ram32-ddr4': 215,
    'kingston-fury-beast-32-ddr4-3200-cl16': 290,
    'ram32-ddr5': 500
  };

  ['ram16', 'ram32'].forEach(group => {
    const products = window.AFFILIATE_PRODUCTS?.[group];
    if (!Array.isArray(products)) return;
    products.forEach(product => {
      if (Object.prototype.hasOwnProperty.call(ramPriceOverrides, product.id)) {
        product.estimatePrice = ramPriceOverrides[product.id];
      }
    });
  });

  const storagePriceOverrides = {
    'sn850x-1to': 201,
    'sn850x-1to-capacity': 201,
    'crucial-t500-2to': 360,
    'crucial-t500-2to-capacity': 360,
    'crucial-p3plus-4to': 230,
    'crucial-p3plus-4to-capacity': 230
  };

  ['nvme', 'storageCapacity'].forEach(group => {
    const products = window.AFFILIATE_PRODUCTS?.[group];
    if (!Array.isArray(products)) return;
    products.forEach(product => {
      if (Object.prototype.hasOwnProperty.call(storagePriceOverrides, product.id)) {
        product.estimatePrice = storagePriceOverrides[product.id];
      }
    });
  });

  const gpuPriceOverrides = {
    'asus-dual-rtx5060-oc8': 399,
    'sapphire-pulse-rx9060xt8': 434,
    'asus-dual-rtx5060ti8-oc': 434,
    'asrock-arc-b580-challenger12': 368,
    'sapphire-pulse-rx9060xt16': 565,
    'sapphire-pulse-rx9060xt16-high': 565,
    'asus-dual-rtx5060ti16-oc': 730,
    'sapphire-pure-rx9060xt16': 542,
    'powercolor-reaper-rx9070': 705,
    'asus-prime-rtx5070': 807,
    'powercolor-reaper-rx9070xt': 812,
    'powercolor-hellhound-rx9070xt': 826,
    'msi-rtx5070ti-ventus3x': 1242
  };

  ['gpuMid', 'gpuHigh'].forEach(group => {
    const products = window.AFFILIATE_PRODUCTS?.[group];
    if (!Array.isArray(products)) return;
    products.forEach(product => {
      if (Object.prototype.hasOwnProperty.call(gpuPriceOverrides, product.id)) {
        product.estimatePrice = gpuPriceOverrides[product.id];
      }
    });
  });

  const psuPriceOverrides = {
    'corsair-rm750e-750w-atx31': 133,
    'corsair-rm850e-850w-atx31': 144
  };

  function applyPsuPriceOverrides() {
    const products = window.AFFILIATE_PRODUCTS?.psu;
    if (!Array.isArray(products)) return false;

    let allFound = true;
    Object.entries(psuPriceOverrides).forEach(([id, price]) => {
      const product = products.find(item => item.id === id);
      if (product) product.estimatePrice = price;
      else allFound = false;
    });
    return allFound;
  }

  applyPsuPriceOverrides();

  window.addEventListener('load', () => {
    let attempts = 0;
    const retry = () => {
      attempts += 1;
      if (applyPsuPriceOverrides() || attempts >= 20) return;
      setTimeout(retry, 100);
    };
    setTimeout(retry, 0);
  });
})();