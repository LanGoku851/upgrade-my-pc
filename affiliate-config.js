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
      note: "Pour une plateforme DDR4 compatible.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    },
    {
      id: "ram16-ddr5",
      name: "Kit 16 Go DDR5-6000",
      tag: "DDR5",
      note: "Pour une plateforme DDR5 compatible.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    }
  ],
  ram32: [
    {
      id: "ram32-ddr4",
      name: "Kit 32 Go DDR4-3200 CL16",
      tag: "Confort",
      note: "Bon choix pour une machine DDR4 avec multitâche.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    },
    {
      id: "ram32-ddr5",
      name: "Kit 32 Go DDR5-6000 CL30",
      tag: "DDR5",
      note: "À privilégier uniquement si la carte mère accepte la DDR5.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    }
  ],
  nvme: [
    {
      id: "sn850x-1to",
      name: "WD Black SN850X 1 To",
      tag: "PCIe 4.0",
      note: "SSD NVMe rapide pour jeux et système.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    },
    {
      id: "crucial-t500-2to",
      name: "Crucial T500 2 To",
      tag: "Plus de capacité",
      note: "Option intéressante pour une grosse bibliothèque de jeux.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    }
  ],
  gpuMid: [
    {
      id: "rx9060xt16",
      name: "AMD Radeon RX 9060 XT 16 Go",
      tag: "1440p",
      note: "Option à comparer pour une montée en gamme raisonnable.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    },
    {
      id: "rtx5060ti16",
      name: "NVIDIA GeForce RTX 5060 Ti 16 Go",
      tag: "NVIDIA",
      note: "Alternative NVIDIA à comparer selon les jeux et les prix.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    }
  ],
  gpuHigh: [
    {
      id: "rx9070",
      name: "AMD Radeon RX 9070 16 Go",
      tag: "Équilibré",
      note: "À comparer pour jouer en 1440p avec davantage de marge.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    },
    {
      id: "rx9070xt",
      name: "AMD Radeon RX 9070 XT 16 Go",
      tag: "Performances",
      note: "À considérer pour un gros saut de performances, notamment en haute résolution.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    },
    {
      id: "rtx5070ti",
      name: "NVIDIA GeForce RTX 5070 Ti 16 Go",
      tag: "NVIDIA",
      note: "Option NVIDIA haut de gamme à comparer selon le budget et les fonctions recherchées.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    }
  ],
  cpu: [
    {
      id: "ryzen9800x3d",
      name: "AMD Ryzen 7 9800X3D",
      tag: "Gaming AM5",
      note: "Nécessite une plateforme AM5 compatible.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    },
    {
      id: "coreultra7-265k",
      name: "Intel Core Ultra 7 265K",
      tag: "Intel",
      note: "Implique une carte mère compatible avec sa plateforme.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    }
  ],
  monitor: [
    {
      id: "monitor-1440p-180",
      name: "Écran 27 pouces 1440p 180 Hz",
      tag: "Fluidité",
      note: "À comparer si la configuration produit déjà beaucoup de FPS.",
      merchants: { materiel: "", fnac: "", amazon: "" }
    }
  ]
};

window.AFFILIATE_MERCHANTS = {
  materiel: "Materiel.net",
  fnac: "Fnac",
  amazon: "Amazon"
};
