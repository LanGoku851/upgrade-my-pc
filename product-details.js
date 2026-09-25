(() => {
  const form = document.getElementById('pcForm');
  const recommendations = document.getElementById('recommendations');
  if (!form || !recommendations) return;

  if (!document.querySelector('script[src="epn-links.js"]')) {
    const epnScript = document.createElement('script');
    epnScript.src = 'epn-links.js';
    epnScript.async = false;
    document.body.appendChild(epnScript);
  }

  if (!document.querySelector('link[href="product-details.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'product-details.css';
    document.head.appendChild(link);
  }

  const allProducts = () => Object.values(window.AFFILIATE_PRODUCTS || {})
    .flatMap(items => Array.isArray(items) ? items : []);

  function byName(name) {
    return allProducts().find(product => product.name === name);
  }

  function formatEuro(value) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  }

  function render() {
    document.querySelectorAll('.exact-product-specs, .exact-product-warning').forEach(el => el.remove());
    document.querySelectorAll('.product-option').forEach(row => row.classList.remove('product-incompatible'));

    const clearance = Number(document.getElementById('gpuClearance')?.value || 0);

    [...recommendations.querySelectorAll('.product-option')].forEach(row => {
      const name = row.querySelector('strong')?.textContent?.trim();
      const product = byName(name);
      if (!product) return;

      const specs = [];
      if (product.gpuLengthMm) specs.push(`${product.gpuLengthMm} mm`);
      if (product.slots) specs.push(`${product.slots} slots`);
      if (product.recommendedPsu) specs.push(`${product.recommendedPsu} W min.`);
      if (product.powerConnector) specs.push(product.powerConnector);
      if (product.estimatePrice) specs.push(`≈ ${formatEuro(product.estimatePrice)}`);

      if (specs.length) {
        const box = document.createElement('div');
        box.className = 'exact-product-specs';
        box.innerHTML = specs.map(spec => `<span>${spec}</span>`).join('');
        const note = row.querySelector('p');
        if (note) note.insertAdjacentElement('afterend', box);
        else row.appendChild(box);
      }

      if (product.gpuLengthMm && clearance > 0 && product.gpuLengthMm > clearance) {
        row.classList.add('product-incompatible');
        const warning = document.createElement('div');
        warning.className = 'exact-product-warning';
        warning.textContent = `Ce modèle fait ${product.gpuLengthMm} mm et dépasse la longueur maximale que tu as indiquée (≈ ${clearance} mm). Il est exclu des scénarios d’achat.`;
        row.appendChild(warning);
      }
    });
  }

  function normalizeName(value) {
    return (value || '').trim().toLocaleLowerCase('fr-FR');
  }

  function mergeDuplicateGpuRecommendations() {
    const gpuCards = [...recommendations.querySelectorAll('.recommendation')].filter(card =>
      /carte graphique|\bgpu\b/i.test(card.querySelector('h3')?.textContent || '')
    );
    if (gpuCards.length <= 1) return;

    const primary = gpuCards[0];
    const targetGroup = primary.querySelector('.product-suggestions');
    const seenProducts = new Set(
      [...primary.querySelectorAll('.product-option strong')].map(el => normalizeName(el.textContent))
    );

    gpuCards.slice(1).forEach(card => {
      const sourceGroup = card.querySelector('.product-suggestions');
      if (targetGroup && sourceGroup) {
        [...sourceGroup.querySelectorAll('.product-option')].forEach(row => {
          const name = normalizeName(row.querySelector('strong')?.textContent);
          if (!name || seenProducts.has(name)) return;
          seenProducts.add(name);
          targetGroup.appendChild(row);
        });
      }
      card.remove();
    });

    [...recommendations.querySelectorAll('.recommendation')].forEach((card, index) => {
      const rank = card.querySelector('.rank');
      if (rank) rank.textContent = String(index + 1);
    });
  }

  form.addEventListener('submit', () => {
    setTimeout(render, 35);
    setTimeout(mergeDuplicateGpuRecommendations, 90);
  });
})();