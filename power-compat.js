(() => {
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