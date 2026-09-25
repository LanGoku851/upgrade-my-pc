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

  form.addEventListener('submit', () => setTimeout(render, 35));
})();
