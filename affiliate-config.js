/*
  CATALOGUE & LIENS D'AFFILIATION
  ------------------------------
  Ne renseigne que des URL fournies/générées par les programmes d'affiliation
  auxquels UpgradeMyPC a été accepté.

  Chaque produit peut avoir plusieurs marchands. Dès qu'une URL est renseignée,
  le bouton du marchand devient cliquable et utilise rel="nofollow sponsored".
*/

if (!document.querySelector('link[href="affiliate-products.css"]')) {
  const affiliateStyle = document.createElement('link');
  affiliateStyle.rel = 'stylesheet';
  affiliateStyle.href = 'affiliate-products.css';
  document.head.appendChild(affiliateStyle);
}

window.AFFILIATE_PRODUCTS = {
  ram16: [
    {
      id: "ram16-ddr4",
      name: "Kit 16 Go DDR4-3200 CL16",
      tag: "DDR4",
      ramType: "ddr4",
      estimatePrice: 45,
      note: "Pour une plateforme DDR4 compatible.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "ram16-ddr5",
      name: "Kit 16 Go DDR5-6000",
      tag: "DDR5",
      ramType: "ddr5",
      estimatePrice: 65,
      note: "Pour une plateforme DDR5 compatible.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ],
  ram32: [
    {
      id: "ram32-ddr4",
      name: "Kit 32 Go DDR4-3200 CL16",
      tag: "DDR4",
      ramType: "ddr4",
      estimatePrice: 70,
      note: "Bon choix pour une machine DDR4 avec multitâche.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "ram32-ddr5",
      name: "Kit 32 Go DDR5-6000 CL30",
      tag: "DDR5",
      ramType: "ddr5",
      estimatePrice: 105,
      note: "À privilégier uniquement si la carte mère accepte la DDR5.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ],
  nvme: [
    {
      id: "sn850x-1to",
      name: "WD Black SN850X 1 To",
      tag: "PCIe 4.0",
      capacityGb: 1000,
      estimatePrice: 90,
      note: "SSD NVMe rapide pour jeux et système.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "crucial-t500-2to",
      name: "Crucial T500 2 To",
      tag: "2 To",
      capacityGb: 2000,
      estimatePrice: 145,
      note: "Option intéressante pour une grosse bibliothèque de jeux.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ],
  storageCapacity: [
    {
      id: "sn850x-1to-capacity",
      name: "WD Black SN850X 1 To",
      tag: "1 To",
      capacityGb: 1000,
      estimatePrice: 90,
      note: "Pour gagner de la place tout en restant sur un SSD rapide.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "crucial-t500-2to-capacity",
      name: "Crucial T500 2 To",
      tag: "2 To",
      capacityGb: 2000,
      estimatePrice: 145,
      note: "Plus adapté aux grosses bibliothèques de jeux.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ],

  // Modèles exacts : dimensions et alimentation viennent des fiches fabricants.
  // Les prix sont des repères de planification et ne remplacent jamais le prix marchand.
  gpuMid: [
    {
      id: "asus-dual-rtx5060-oc8",
      name: "ASUS Dual GeForce RTX 5060 OC Edition 8GB",
      family: "RTX 5060 8 Go",
      brand: "ASUS",
      tag: "Compacte • NVIDIA",
      tier: 4,
      estimatePrice: 435,
      gpuLengthMm: 228,
      gpuWidthMm: 123,
      gpuThicknessMm: 50,
      slots: "2.5",
      recommendedPsu: 550,
      powerConnector: "1 × 8-pin",
      specSource: "ASUS",
      note: "Option compacte et plus accessible pour un upgrade GPU milieu de gamme.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "sapphire-pulse-rx9060xt8",
      name: "Sapphire PULSE Radeon RX 9060 XT OC 8GB",
      family: "RX 9060 XT 8 Go",
      brand: "Sapphire",
      tag: "1080p • AMD",
      tier: 4,
      estimatePrice: 435,
      gpuLengthMm: 244,
      gpuWidthMm: 111.25,
      gpuThicknessMm: 46.1,
      slots: "2.3",
      recommendedPsu: 450,
      powerConnector: "1 × 8-pin",
      specSource: "Sapphire",
      note: "Alternative AMD 8 Go plus accessible pour un upgrade orienté 1080p.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "asus-dual-rtx5060ti8-oc",
      name: "ASUS Dual GeForce RTX 5060 Ti OC Edition 8GB",
      family: "RTX 5060 Ti 8 Go",
      brand: "ASUS",
      tag: "Compacte • NVIDIA",
      tier: 4,
      estimatePrice: 485,
      gpuLengthMm: 229,
      gpuWidthMm: 120,
      gpuThicknessMm: 50,
      slots: "2.5",
      recommendedPsu: 550,
      powerConnector: "1 × 8-pin",
      specSource: "ASUS",
      note: "Palier intermédiaire entre la RTX 5060 et les modèles 16 Go, dans un format compact.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "asrock-arc-b580-challenger12",
      name: "ASRock Intel Arc B580 Challenger 12GB OC",
      family: "Intel Arc B580 12 Go",
      brand: "ASRock",
      tag: "12 Go • Intel",
      tier: 4,
      estimatePrice: 390,
      gpuLengthMm: 249,
      gpuWidthMm: 132,
      gpuThicknessMm: 41,
      slots: "2",
      recommendedPsu: 650,
      powerConnector: "1 × 8-pin",
      specSource: "ASRock",
      note: "Option 12 Go compacte ; pour de bonnes performances, vérifie que Resizable BAR / Smart Access Memory est pris en charge et activé.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "sapphire-pulse-rx9060xt16",
      name: "Sapphire PULSE Radeon RX 9060 XT OC 16GB",
      family: "RX 9060 XT 16 Go",
      brand: "Sapphire",
      tag: "Compacte • AMD",
      tier: 4,
      estimatePrice: 670,
      gpuLengthMm: 240,
      gpuWidthMm: 111.25,
      gpuThicknessMm: 46.08,
      slots: "2.3",
      recommendedPsu: 450,
      powerConnector: "1 × 8-pin",
      specSource: "Sapphire",
      note: "Modèle double ventilateur compact, intéressant quand la place dans le boîtier est limitée.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "asus-dual-rtx5060ti16-oc",
      name: "ASUS Dual GeForce RTX 5060 Ti OC Edition 16GB",
      family: "RTX 5060 Ti 16 Go",
      brand: "ASUS",
      tag: "Compacte • NVIDIA",
      tier: 4,
      estimatePrice: 820,
      gpuLengthMm: 229,
      gpuWidthMm: 120,
      gpuThicknessMm: 50,
      slots: "2.5",
      recommendedPsu: 550,
      powerConnector: "1 × 8-pin",
      specSource: "ASUS",
      note: "Carte courte et relativement facile à intégrer dans de nombreux boîtiers.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "sapphire-pure-rx9060xt16",
      name: "Sapphire PURE Radeon RX 9060 XT OC 16GB",
      family: "RX 9060 XT 16 Go",
      brand: "Sapphire",
      tag: "AMD • Blanche",
      tier: 4,
      estimatePrice: 670,
      gpuLengthMm: 240,
      gpuWidthMm: 124,
      gpuThicknessMm: 46.1,
      slots: "2.3",
      recommendedPsu: 450,
      powerConnector: "1 × 8-pin",
      specSource: "Sapphire",
      note: "Alternative RX 9060 XT 16 Go avec format encore raisonnable.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ],

  gpuHigh: [
    {
      id: "sapphire-pulse-rx9060xt16-high",
      name: "Sapphire PULSE Radeon RX 9060 XT OC 16GB",
      family: "RX 9060 XT 16 Go",
      brand: "Sapphire",
      tag: "Premier palier",
      tier: 4,
      estimatePrice: 670,
      gpuLengthMm: 240,
      gpuWidthMm: 111.25,
      gpuThicknessMm: 46.08,
      slots: "2.3",
      recommendedPsu: 450,
      powerConnector: "1 × 8-pin",
      specSource: "Sapphire",
      note: "Premier palier concret si le budget ne permet pas encore une RX 9070.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "powercolor-reaper-rx9070",
      name: "PowerColor Reaper Radeon RX 9070 16GB",
      family: "RX 9070 16 Go",
      brand: "PowerColor",
      tag: "1440p • 2 slots",
      tier: 5,
      estimatePrice: 760,
      gpuLengthMm: 304,
      gpuWidthMm: 127,
      gpuThicknessMm: 42,
      slots: "2",
      recommendedPsu: 650,
      powerConnector: "2 × 8-pin",
      specSource: "PowerColor",
      note: "Version Reaper relativement fine, avec dimensions totales incluant le bracket prises en compte.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "asus-prime-rtx5070",
      name: "ASUS Prime GeForce RTX 5070 12GB",
      family: "RTX 5070 12 Go",
      brand: "ASUS",
      tag: "1440p • NVIDIA",
      tier: 5,
      estimatePrice: 800,
      gpuLengthMm: 304,
      gpuWidthMm: 126,
      gpuThicknessMm: 50,
      slots: "2.5",
      recommendedPsu: 750,
      powerConnector: "1 × 16-pin",
      specSource: "ASUS",
      note: "Option NVIDIA 12 Go SFF Ready ; vérifie surtout la longueur de 304 mm et la présence d’un connecteur 16 broches adapté.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "powercolor-reaper-rx9070xt",
      name: "PowerColor Reaper Radeon RX 9070 XT 16GB",
      family: "RX 9070 XT 16 Go",
      brand: "PowerColor",
      tag: "4K • 2 slots",
      tier: 6,
      estimatePrice: 950,
      gpuLengthMm: 304,
      gpuWidthMm: 127,
      gpuThicknessMm: 42,
      slots: "2",
      recommendedPsu: 750,
      powerConnector: "2 × 8-pin",
      specSource: "PowerColor",
      note: "Modèle performant avec encombrement contenu pour une RX 9070 XT.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "powercolor-hellhound-rx9070xt",
      name: "PowerColor Hellhound Radeon RX 9070 XT 16GB OC",
      family: "RX 9070 XT 16 Go",
      brand: "PowerColor",
      tag: "Refroidissement renforcé",
      tier: 6,
      estimatePrice: 1000,
      gpuLengthMm: 340,
      gpuWidthMm: 142,
      gpuThicknessMm: 49,
      slots: "2.5",
      recommendedPsu: 800,
      powerConnector: "2 × 8-pin",
      specSource: "PowerColor",
      note: "Plus longue que la Reaper : à éviter dans un boîtier avec moins de 340 mm de marge réelle.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "msi-rtx5070ti-ventus3x",
      name: "MSI GeForce RTX 5070 Ti 16G VENTUS 3X OC",
      family: "RTX 5070 Ti 16 Go",
      brand: "MSI",
      tag: "NVIDIA • 16-pin",
      tier: 6,
      estimatePrice: 1430,
      gpuLengthMm: 303,
      gpuWidthMm: 121,
      gpuThicknessMm: 49,
      slots: "2.5",
      recommendedPsu: 750,
      powerConnector: "1 × 16-pin",
      specSource: "MSI",
      note: "Option NVIDIA avec connecteur 16 broches ; alimentation ATX 3.1 recommandée par MSI.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "asus-prime-rtx5070ti",
      name: "ASUS Prime GeForce RTX 5070 Ti 16GB",
      family: "RTX 5070 Ti 16 Go",
      brand: "ASUS",
      tag: "NVIDIA • SFF Ready",
      tier: 6,
      estimatePrice: 1450,
      gpuLengthMm: 304,
      gpuWidthMm: 126,
      gpuThicknessMm: 50,
      slots: "2.5",
      recommendedPsu: 750,
      powerConnector: "1 × 16-pin",
      specSource: "ASUS",
      note: "Modèle ASUS Prime annoncé SFF Ready, mais la longueur de 304 mm reste à vérifier dans le boîtier.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ],

  cpu: [
    {
      id: "ryzen9800x3d",
      name: "AMD Ryzen 7 9800X3D",
      tag: "Gaming AM5",
      estimatePrice: 500,
      note: "Nécessite une plateforme AM5 compatible.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "coreultra7-265k",
      name: "Intel Core Ultra 7 265K",
      tag: "Intel",
      estimatePrice: 370,
      note: "Implique une carte mère compatible avec sa plateforme.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ],
  psu: [
    {
      id: "psu-650-gold",
      name: "Alimentation 650 W 80+ Gold ATX 3.1",
      tag: "650 W",
      estimatePrice: 90,
      note: "Option intermédiaire pour les cartes graphiques dont la recommandation se situe autour de 650 W.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "psu-750-gold",
      name: "Alimentation 750 W 80+ Gold",
      tag: "750 W",
      estimatePrice: 105,
      note: "À dimensionner selon la carte graphique exacte et ses connecteurs.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "psu-850-gold",
      name: "Alimentation 850 W 80+ Gold",
      tag: "850 W",
      estimatePrice: 130,
      note: "Apporte davantage de marge pour une configuration haut de gamme.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ],
  monitor: [
    {
      id: "monitor-1440p-180",
      name: "Écran 27 pouces 1440p 180 Hz",
      tag: "Fluidité",
      estimatePrice: 250,
      note: "À comparer si la configuration produit déjà beaucoup de FPS.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ]
};

window.AFFILIATE_MERCHANTS = {
  ebay: "eBay",
  fnac: "Fnac",
  amazon: "Amazon"
};

window.addEventListener('load', () => {
  const loadScript = (src) => {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.body.appendChild(script);
  };

  loadScript('platform-compat.js');
  loadScript('case-compat.js');
  loadScript('performance-goals.js');
  loadScript('product-details.js');
  loadScript('power-compat.js');
  loadScript('budget-planner.js');
});