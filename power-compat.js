(() => {
  const rm850eId = 'corsair-rm850e-850w-atx31';
  const psuProducts = window.AFFILIATE_PRODUCTS?.psu;

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