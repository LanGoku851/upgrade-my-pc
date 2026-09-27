(() => {
  const form = document.getElementById('pcForm');
  const recommendations = document.getElementById('recommendations');
  if (!form || !recommendations) return;

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

  function normalizeName(value) {
    return (value || '').trim().toLocaleLowerCase('fr-FR');
  }

  function clearanceRange() {
    const select = document.getElementById('gpuClearance');
    const option = select?.selectedOptions?.[0];
    const kind = option?.dataset.kind || (Number(select?.value || 0) ? 'legacy' : 'unknown');
    return {
      kind,
      min: option?.dataset.min ? Number(option.dataset.min) : null,
      max: option?.dataset.max ? Number(option.dataset.max) : (kind === 'legacy' ? Number(select?.value || 0) : null),
      label: option?.textContent?.trim() || 'Je ne sais pas'
    };
  }

  function evaluateGpuLength(length, range) {
    if (!length || range.kind === 'unknown') return { status: 'unknown' };

    if (range.kind === 'upper' || range.kind === 'legacy') {
      if (range.max && length > range.max) return { status: 'too-long' };
      return { status: 'uncertain' };
    }

    if (range.kind === 'bounded') {
      if (range.max && length > range.max) return { status: 'too-long' };
      if (range.min && length <= range.min) return { status: 'fit' };
      return { status: 'uncertain' };
    }

    if (range.kind === 'lower') {
      if (range.min && length <= range.min) return { status: 'fit' };
      return { status: 'uncertain' };
    }

    return { status: 'unknown' };
  }

  function mergeDuplicateGpuRecommendations() {
    const gpuCards = [...recommendations.querySelectorAll('.recommendation')].filter(card =>
      /carte graphique|\bgpu\b/i.test(card.querySelector('h3')?.textContent || '')
    );
    if (gpuCards.length <= 1) return;

    // On conserve la première carte affichée et on y rassemble les références uniques.
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

  function render() {
    document.querySelectorAll('.exact-product-specs, .exact-product-warning').forEach(el => el.remove());
    document.querySelectorAll('.product-option').forEach(row => row.classList.remove('product-incompatible'));

    const range = clearanceRange();

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

      if (!product.gpuLengthMm) return;
      const fit = evaluateGpuLength(Number(product.gpuLengthMm), range);

      if (fit.status === 'too-long') {
        row.classList.add('product-incompatible');
        const warning = document.createElement('div');
        warning.className = 'exact-product-warning';
        warning.textContent = `Ce modèle fait ${product.gpuLengthMm} mm et dépasse la borne haute de la plage indiquée (« ${range.label} »). Il n’est pas retenu dans les scénarios compatibles.`;
        row.appendChild(warning);
      } else if (fit.status === 'uncertain') {
        const warning = document.createElement('div');
        warning.className = 'exact-product-warning';
        warning.textContent = `Ce modèle fait ${product.gpuLengthMm} mm. Avec la plage « ${range.label} », la longueur n’est pas garantie : vérifie que la limite réelle du boîtier atteint au moins ${product.gpuLengthMm} mm.`;
        row.appendChild(warning);
      }
    });
  }

  function finalizeProductCards() {
    // Important : fusionner d'abord, puis recalculer les dimensions sur l'état final du DOM.
    mergeDuplicateGpuRecommendations();
    render();
  }

  form.addEventListener('submit', () => setTimeout(finalizeProductCards, 55));
})();