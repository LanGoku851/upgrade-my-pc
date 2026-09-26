(() => {
  const psuProducts = window.AFFILIATE_PRODUCTS?.psu;

  const rm650eId = 'corsair-rm650e-650w-atx31';
  if (Array.isArray(psuProducts) && !psuProducts.some(product => product.id === rm650eId)) {
    const product = {
      id: rm650eId,
      name: "Corsair RM650e 650 W ATX 3.1",
      brand: "Corsair",
      tag: "650 W • ATX 3.1",
      wattage: 650,
      estimatePrice: 85,
      efficiency: "Cybenetics Gold",
      atxVersion: "ATX 3.1",
      powerConnector: "12V-2x6",
      specSource: "Corsair",
      note: "Référence CP-9020302-EU : 650 W, entièrement modulaire, ATX 3.1 / PCIe 5.1, câble 12V-2x6 natif, mode Zero RPM et garantie constructeur de 7 ans.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    };

    const generic650Index = psuProducts.findIndex(item => item.id === 'psu-650-gold');
    if (generic650Index >= 0) psuProducts.splice(generic650Index + 1, 0, product);
    else psuProducts.push(product);
  }

  if (window.EPN_LINKS && !window.EPN_LINKS[rm650eId]) {
    window.EPN_LINKS[rm650eId] = {
      customId: 'umppsucorsairrm650e',
      destination: 'https://www.ebay.fr/sch/i.html?_nkw=Corsair+RM650e+650W+ATX+3.1+CP-9020302-EU',
      url: 'https://www.ebay.fr/sch/i.html?_nkw=Corsair+RM650e+650W+ATX+3.1+CP-9020302-EU&mkcid=1&mkrid=709-53476-19255-0&siteid=71&campid=5339214608&customid=umppsucorsairrm650e&toolid=10001&mkevt=1'
    };
    window.applyEpnLinks?.();
  }

  const rm850eId = 'corsair-rm850e-850w-atx31';
  if (Array.isArray(psuProducts) && !psuProducts.some(product => product.id === rm850eId)) {
    const product = {
      id: rm850eId,
      name: "Corsair RM850e 850 W ATX 3.1",
      brand: "Corsair",
      tag: "850 W • ATX 3.1",
      wattage: 850,
      estimatePrice: 200,
      efficiency: "80 PLUS Gold",
      atxVersion: "ATX 3.1",
      powerConnector: "12V-2x6",
      specSource: "Corsair",
      note: "Référence CP-9020263-EU : 850 W, entièrement modulaire, ATX 3.1, câble 12V-2x6 inclus, mode Zero RPM et garantie constructeur de 7 ans.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    };

    const generic850Index = psuProducts.findIndex(item => item.id === 'psu-850-gold');
    if (generic850Index >= 0) psuProducts.splice(generic850Index + 1, 0, product);
    else psuProducts.push(product);
  }

  if (window.EPN_LINKS && !window.EPN_LINKS[rm850eId]) {
    window.EPN_LINKS[rm850eId] = {
      customId: 'umppsucorsairrm850e',
      destination: 'https://www.ebay.fr/sch/i.html?_nkw=Corsair+RM850e+850W+ATX+3.1+CP-9020263-EU',
      url: 'https://www.ebay.fr/sch/i.html?_nkw=Corsair+RM850e+850W+ATX+3.1+CP-9020263-EU&mkcid=1&mkrid=709-53476-19255-0&siteid=71&campid=5339214608&customid=umppsucorsairrm850e&toolid=10001&mkevt=1'
    };
    window.applyEpnLinks?.();
  }

  const monitorProducts = window.AFFILIATE_PRODUCTS?.monitor;
  const lg27gs75qId = 'lg-ultragear-27gs75q-b';
  if (Array.isArray(monitorProducts) && !monitorProducts.some(product => product.id === lg27gs75qId)) {
    const product = {
      id: lg27gs75qId,
      name: "LG UltraGear 27GS75Q-B 27 pouces QHD 180 Hz",
      brand: "LG",
      tag: "QHD • IPS • 180 Hz",
      estimatePrice: 180,
      resolution: "2560 × 1440",
      panel: "IPS",
      refreshRateHz: 180,
      overclockRefreshRateHz: 200,
      specSource: "LG",
      note: "27 pouces QHD IPS, 180 Hz natifs (jusqu’à 200 Hz en overclock via DisplayPort 1.4), 1 ms GtG, G-SYNC Compatible et AMD FreeSync.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    };

    const generic1440Index = monitorProducts.findIndex(item => item.id === 'monitor-1440p-180');
    if (generic1440Index >= 0) monitorProducts.splice(generic1440Index + 1, 0, product);
    else monitorProducts.push(product);
  }

  if (window.EPN_LINKS && !window.EPN_LINKS[lg27gs75qId]) {
    window.EPN_LINKS[lg27gs75qId] = {
      customId: 'umpmonitorlg27gs75q',
      destination: 'https://www.ebay.fr/sch/i.html?_nkw=LG+UltraGear+27GS75Q-B+27+QHD+180Hz',
      url: 'https://www.ebay.fr/sch/i.html?_nkw=LG+UltraGear+27GS75Q-B+27+QHD+180Hz&mkcid=1&mkrid=709-53476-19255-0&siteid=71&campid=5339214610&customid=umpmonitorlg27gs75q&toolid=10001&mkevt=1'
    };
    window.applyEpnLinks?.();
  }

  const lg27gr93uId = 'lg-ultragear-27gr93u-b';
  if (Array.isArray(monitorProducts) && !monitorProducts.some(product => product.id === lg27gr93uId)) {
    const product = {
      id: lg27gr93uId,
      name: "LG UltraGear 27GR93U-B 27 pouces 4K 144 Hz",
      brand: "LG",
      tag: "4K • IPS • 144 Hz",
      estimatePrice: 690,
      resolution: "3840 × 2160",
      panel: "IPS",
      refreshRateHz: 144,
      specSource: "LG",
      note: "27 pouces UHD 4K IPS, 144 Hz, 1 ms GtG, HDMI 2.1, G-SYNC Compatible, AMD FreeSync Premium et VESA DisplayHDR 400.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    };

    const generic4kIndex = monitorProducts.findIndex(item => item.id === 'monitor-4k-144');
    if (generic4kIndex >= 0) monitorProducts.splice(generic4kIndex + 1, 0, product);
    else monitorProducts.push(product);
  }

  if (window.EPN_LINKS && !window.EPN_LINKS[lg27gr93uId]) {
    window.EPN_LINKS[lg27gr93uId] = {
      customId: 'umpmonitorlg27gr93u',
      destination: 'https://www.ebay.fr/sch/i.html?_nkw=LG+UltraGear+27GR93U-B+27+4K+144Hz',
      url: 'https://www.ebay.fr/sch/i.html?_nkw=LG+UltraGear+27GR93U-B+27+4K+144Hz&mkcid=1&mkrid=709-53476-19255-0&siteid=71&campid=5339214610&customid=umpmonitorlg27gr93u&toolid=10001&mkevt=1'
    };
    window.applyEpnLinks?.();
  }

  const lg27gs95qeId = 'lg-ultragear-27gs95qe-b';
  if (Array.isArray(monitorProducts) && !monitorProducts.some(product => product.id === lg27gs95qeId)) {
    const product = {
      id: lg27gs95qeId,
      name: "LG UltraGear 27GS95QE-B 27 pouces QHD OLED 240 Hz",
      brand: "LG",
      tag: "QHD • OLED • 240 Hz",
      estimatePrice: 570,
      resolution: "2560 × 1440",
      panel: "OLED",
      refreshRateHz: 240,
      responseTimeMs: 0.03,
      specSource: "LG",
      note: "27 pouces QHD OLED, 240 Hz, 0,03 ms GtG, G-SYNC Compatible, AMD FreeSync Premium Pro et VESA DisplayHDR True Black 400.",
      merchants: { ebay: "", fnac: "", amazon: "" }
    };

    const generic1440Index = monitorProducts.findIndex(item => item.id === 'monitor-1440p-180');
    if (generic1440Index >= 0) monitorProducts.splice(generic1440Index + 1, 0, product);
    else monitorProducts.push(product);
  }

  if (window.EPN_LINKS && !window.EPN_LINKS[lg27gs95qeId]) {
    window.EPN_LINKS[lg27gs95qeId] = {
      customId: 'umpmonitorlg27gs95qe',
      destination: 'https://www.ebay.fr/sch/i.html?_nkw=LG+UltraGear+27GS95QE-B+27+QHD+240Hz',
      url: 'https://www.ebay.fr/sch/i.html?_nkw=LG+UltraGear+27GS95QE-B+27+QHD+240Hz&mkcid=1&mkrid=709-53476-19255-0&siteid=71&campid=5339214610&customid=umpmonitorlg27gs95qe&toolid=10001&mkevt=1'
    };
    window.applyEpnLinks?.();
  }

  const form = document.getElementById('pcForm');
  const recommendations = document.getElementById('recommendations');
  if (!form || !recommendations) return;

  const allProducts = () => Object.values(window.AFFILIATE_PRODUCTS || {})
    .flatMap(items => Array.isArray(items) ? items : []);

  function byName(name) {
    return allProducts().find(product => product.name === name);
  }

  function renumberCards() {
    [...recommendations.querySelectorAll('.recommendation')].forEach((card, index) => {
      const rank = card.querySelector('.rank');
      if (rank) rank.textContent = String(index + 1);
    });
  }

  function renderPowerCompatibility() {
    document.querySelectorAll('.power-inline-note').forEach(el => el.remove());

    const psu = Number(document.getElementById('psu')?.value || 0);
    const cards = [...recommendations.querySelectorAll('.recommendation')];
    const gpuCard = cards.find(card => /carte graphique|gpu/i.test(card.querySelector('h3')?.textContent || ''));
    if (!gpuCard) return;

    const productRows = [...gpuCard.querySelectorAll('.product-option')]
      .filter(row => !row.classList.contains('product-incompatible'));
    const knownProducts = [];

    productRows.forEach(row => {
      const name = row.querySelector('strong')?.textContent?.trim();
      const product = byName(name);
      if (!product?.recommendedPsu) return;

      const required = Number(product.recommendedPsu);
      knownProducts.push({ name, required, connector: product.powerConnector || '' });

      const note = document.createElement('div');
      note.className = 'platform-inline-note power-inline-note';
      note.textContent = `${product.specSource || product.brand || 'Le fabricant'} recommande au moins ${required} W pour ce modèle${product.powerConnector ? ` avec ${product.powerConnector}` : ''}.`;
      row.appendChild(note);
    });

    if (!knownProducts.length || !psu) return;

    const fitting = knownProducts.filter(product => psu >= product.required);
    const psuCard = cards.find(card => /alimentation adaptée/i.test(card.querySelector('h3')?.textContent || ''));

    if (fitting.length) {
      const names = fitting.map(product => product.name).join(' ou ');
      const note = document.createElement('div');
      note.className = 'platform-inline-note power-inline-note';
      note.textContent = `Avec ${psu} W, au moins une option affichée respecte la puissance recommandée par son fabricant (${names}). Vérifie encore les connecteurs et la qualité du bloc.`;
      gpuCard.appendChild(note);

      if (psuCard) {
        psuCard.remove();
        renumberCards();
      }
      return;
    }

    if (psuCard) {
      const reason = psuCard.querySelector('.reason');
      const lowest = Math.min(...knownProducts.map(product => product.required));
      if (reason) reason.textContent = `Ton alimentation indiquée (${psu} W) est sous la recommandation fabricant des modèles compatibles affichés. La première cible à vérifier est au moins ${lowest} W, puis les connecteurs requis.`;
    }
  }

  form.addEventListener('submit', () => setTimeout(renderPowerCompatibility, 60));
})();