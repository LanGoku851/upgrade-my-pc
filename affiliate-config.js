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
      note: "Pour une plateforme DDR4 compatible.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "ram16-ddr5",
      name: "Kit 16 Go DDR5-6000",
      tag: "DDR5",
      ramType: "ddr5",
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
      note: "Bon choix pour une machine DDR4 avec multitâche.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "ram32-ddr5",
      name: "Kit 32 Go DDR5-6000 CL30",
      tag: "DDR5",
      ramType: "ddr5",
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
      note: "SSD NVMe rapide pour jeux et système.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "crucial-t500-2to",
      name: "Crucial T500 2 To",
      tag: "2 To",
      capacityGb: 2000,
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
      note: "Pour gagner de la place tout en restant sur un SSD rapide.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "crucial-t500-2to-capacity",
      name: "Crucial T500 2 To",
      tag: "2 To",
      capacityGb: 2000,
      note: "Plus adapté aux grosses bibliothèques de jeux.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ],
  gpuMid: [
    {
      id: "rx9060xt16",
      name: "AMD Radeon RX 9060 XT 16 Go",
      tag: "1440p",
      tier: 4,
      recommendedPsu: 450,
      note: "Option à comparer pour une montée en gamme raisonnable.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "rtx5060ti16",
      name: "NVIDIA GeForce RTX 5060 Ti 16 Go",
      tag: "NVIDIA",
      tier: 4,
      recommendedPsu: 600,
      note: "Alternative NVIDIA à comparer selon les jeux et les prix.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ],
  gpuHigh: [
    {
      id: "rx9060xt16-high",
      name: "AMD Radeon RX 9060 XT 16 Go",
      tag: "Budget maîtrisé",
      tier: 4,
      recommendedPsu: 450,
      note: "Premier palier à regarder si le budget ne permet pas encore une RX 9070.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "rtx5060ti16-high",
      name: "NVIDIA GeForce RTX 5060 Ti 16 Go",
      tag: "Alternative NVIDIA",
      tier: 4,
      recommendedPsu: 600,
      note: "Option NVIDIA à considérer avant de dépasser le budget prévu.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "rx9070",
      name: "AMD Radeon RX 9070 16 Go",
      tag: "Équilibré",
      tier: 5,
      recommendedPsu: 650,
      note: "À comparer pour jouer en 1440p avec davantage de marge.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "rx9070xt",
      name: "AMD Radeon RX 9070 XT 16 Go",
      tag: "Performances",
      tier: 6,
      recommendedPsu: 750,
      note: "À considérer pour un gros saut de performances, notamment en haute résolution.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "rtx5070ti",
      name: "NVIDIA GeForce RTX 5070 Ti 16 Go",
      tag: "NVIDIA",
      tier: 6,
      recommendedPsu: 750,
      note: "Option NVIDIA haut de gamme à comparer selon le budget et les fonctions recherchées.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ],
  cpu: [
    {
      id: "ryzen9800x3d",
      name: "AMD Ryzen 7 9800X3D",
      tag: "Gaming AM5",
      note: "Nécessite une plateforme AM5 compatible.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "coreultra7-265k",
      name: "Intel Core Ultra 7 265K",
      tag: "Intel",
      note: "Implique une carte mère compatible avec sa plateforme.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ],
  psu: [
    {
      id: "psu-750-gold",
      name: "Alimentation 750 W 80+ Gold",
      tag: "750 W",
      note: "À dimensionner selon la carte graphique exacte et ses connecteurs.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    },
    {
      id: "psu-850-gold",
      name: "Alimentation 850 W 80+ Gold",
      tag: "850 W",
      note: "Apporte davantage de marge pour une configuration haut de gamme.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    }
  ],
  monitor: [
    {
      id: "monitor-1440p-180",
      name: "Écran 27 pouces 1440p 180 Hz",
      tag: "Fluidité",
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
  loadScript('power-compat.js');
  loadScript('budget-planner.js');
});
