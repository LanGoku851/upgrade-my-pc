(() => {
  const form = document.getElementById('pcForm');
  const recommendations = document.getElementById('recommendations');
  const budgetSelect = document.getElementById('budget');
  if (!form || !recommendations || !budgetSelect) return;

  if (!document.querySelector('link[href="budget-planner.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'budget-planner.css';
    document.head.appendChild(link);
  }

  const fallbackEstimates = {
    'AMD Ryzen 7 5700X3D': { price: 220 },
    'AMD Ryzen 7 5800X3D': { price: 320 },
    'AMD Ryzen 7 9800X3D': { price: 500 },
    'Intel Core i5-14600K': { price: 270 },
    'Intel Core i7-14700K': { price: 400 },
    'Intel Core Ultra 7 265K': { price: 370 },
    'AMD Ryzen 7 9800X3D + carte mère AM5': { price: 780, bundle: 'CPU + carte mère + 32 Go DDR5' },
    'Intel Core Ultra 7 265K + carte mère LGA1851': { price: 700, bundle: 'CPU + carte mère + 32 Go DDR5' }
  };

  const allProducts = () => Object.values(window.AFFILIATE_PRODUCTS || {})
    .flatMap(items => Array.isArray(items) ? items : []);

  function byName(name) {
    return allProducts().find(product => product.name === name);
  }

  const psuUpgradeCost = (required) => required >= 850 ? 130 : required >= 750 ? 105 : 90;

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

  function currentPsu() {
    return Number(document.getElementById('psu')?.value || 0);
  }

  function currentClearance() {
    return Number(document.getElementById('gpuClearance')?.value || 0);
  }

  function budgetInfo() {
    const value = Number(budgetSelect.value);
    const label = budgetSelect.selectedOptions[0]?.textContent?.trim() || `${value} €`;
    return {
      value,
      label,
      openEnded: /\+/.test(label)
    };
  }

  function estimateProduct(name) {
    const product = byName(name);
    const fallback = fallbackEstimates[name] || {};
    const price = Number(product?.estimatePrice || fallback.price || 0);
    if (!price) return null;

    const requiredPsu = Number(product?.recommendedPsu || fallback.psu || 0);
    const psu = currentPsu();
    let addon = 0;
    let addonLabel = '';

    if (requiredPsu && psu > 0 && psu < requiredPsu) {
      addon = psuUpgradeCost(requiredPsu);
      addonLabel = ` + alimentation adaptée estimée ${formatEuro(addon)}`;
    }

    return {
      price,
      addon,
      addonLabel,
      total: price + addon,
      bundle: product?.bundle || fallback.bundle || '',
      psuUnknown: Boolean(requiredPsu && psu === 0),
      product
    };
  }

  function cleanPrevious() {
    document.querySelectorAll('.budget-meta, .budget-empty, .budget-warning').forEach(el => el.remove());
    document.querySelectorAll('.product-option').forEach(el => {
      el.classList.remove('budget-hidden', 'budget-fit');
      el.removeAttribute('data-budget-total');
    });
  }

  function cardTitleFor(row) {
    return row.closest('.recommendation')?.querySelector('h3')?.textContent?.trim() || 'Upgrade';
  }

  function directCompatibility(estimate) {
    const clearance = currentClearance();
    const length = Number(estimate?.product?.gpuLengthMm || 0);
    const tooLong = Boolean(clearance > 0 && length > 0 && length > clearance);
    return { tooLong, clearance, length };
  }

  function renderBudgetPlan() {
    cleanPrevious();

    const budget = budgetInfo();
    const productRows = [...recommendations.querySelectorAll('.product-option')];
    const scenarios = [];

    productRows.forEach(row => {
      const name = row.querySelector('strong')?.textContent?.trim();
      if (!name) return;

      const estimate = estimateProduct(name);
      if (!estimate) return;

      const compatibility = directCompatibility(estimate);
      const overBudget = !budget.openEnded && estimate.total > budget.value;
      const excluded = compatibility.tooLong || overBudget;

      // Le budget recalcule lui-même la compatibilité longueur afin de ne pas dépendre
      // d'un état intermédiaire laissé par un autre module.
      if (compatibility.tooLong) row.classList.add('product-incompatible');
      else row.classList.remove('product-incompatible');

      const reasons = [];
      if (overBudget) reasons.push(`hors budget (${formatEuro(estimate.total)} pour un budget de ${budget.label})`);
      if (compatibility.tooLong) reasons.push(`trop longue (${compatibility.length} mm pour ~${compatibility.clearance} mm indiqués)`);

      const meta = document.createElement('div');
      meta.className = 'budget-meta';
      meta.innerHTML = `
        <strong>Budget indicatif : ${formatEuro(estimate.total)}</strong>
        ${estimate.bundle ? `<span>${estimate.bundle}</span>` : ''}
        ${estimate.addonLabel ? `<span>${estimate.addonLabel}</span>` : ''}
        ${estimate.psuUnknown ? '<span>Alimentation inconnue : éventuel remplacement non inclus.</span>' : ''}
        ${reasons.length ? `<span>Non retenu dans le scénario : ${reasons.join(' • ')}.</span>` : '<span>Compatible avec les contraintes renseignées.</span>'}
      `;
      row.appendChild(meta);
      row.dataset.budgetTotal = String(estimate.total);

      // On garde toujours la fiche visible : même hors budget, l'utilisateur voit pourquoi.
      if (excluded) return;

      row.classList.add('budget-fit');
      scenarios.push({
        name,
        total: estimate.total,
        title: cardTitleFor(row),
        addonLabel: estimate.addonLabel,
        bundle: estimate.bundle || ''
      });
    });

    [...recommendations.querySelectorAll('.product-suggestions')].forEach(group => {
      const options = [...group.querySelectorAll('.product-option')];
      if (!options.length) return;
      const anyFit = options.some(option => option.classList.contains('budget-fit'));
      if (!anyFit) {
        const message = document.createElement('div');
        message.className = 'budget-empty';
        message.textContent = budget.openEnded
          ? 'Aucun des modèles affichés ne respecte toutes les contraintes renseignées. Les références restent visibles pour comprendre ce qui bloque.'
          : `Aucun des modèles affichés ne respecte à la fois ton budget de ${budget.label} et les contraintes renseignées. Les références restent visibles avec la raison.`;
        group.appendChild(message);
      }
    });

    let panel = document.getElementById('budgetPlan');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'budgetPlan';
      panel.className = 'budget-plan';
      recommendations.parentElement.insertBefore(panel, recommendations);
    }

    const uniqueByProduct = new Map();
    scenarios.forEach(item => {
      const key = normalizeName(item.name);
      const current = uniqueByProduct.get(key);
      if (!current || item.total < current.total) uniqueByProduct.set(key, item);
    });

    const choices = [...uniqueByProduct.values()]
      .sort((a, b) => a.total - b.total)
      .slice(0, 3);

    const remaining = choices.length && !budget.openEnded
      ? Math.max(0, budget.value - choices[0].total)
      : null;

    panel.innerHTML = `
      <div class="budget-plan-head">
        <div>
          <p class="budget-kicker">Budget maximum</p>
          <h3>${budget.label}</h3>
        </div>
        <span class="budget-status ${choices.length ? 'ok' : 'warn'}">${choices.length ? 'Options cohérentes' : 'Aucun modèle compatible dans cette sélection'}</span>
      </div>
      ${choices.length ? `
        <p class="budget-intro">Scénarios réalistes parmi les recommandations actuelles. Ils sont indépendants : tu n’as pas besoin d’acheter les trois.</p>
        <div class="budget-scenarios">
          ${choices.map((item, index) => `
            <div class="budget-scenario">
              <span>Scénario ${index + 1}</span>
              <strong>${item.name}</strong>
              <small>${item.title}</small>
              ${item.bundle ? `<small>${item.bundle}</small>` : ''}
              <b>≈ ${formatEuro(item.total)}</b>
            </div>
          `).join('')}
        </div>
        <p class="budget-foot">Option la moins chère : environ ${formatEuro(choices[0].total)}${remaining !== null ? ` • marge indicative restante : ${formatEuro(remaining)}` : ''}. Les prix sont des repères et le prix marchand au moment du clic fait foi.</p>
      ` : `
        <p class="budget-intro">Aucune référence affichée ne respecte actuellement toutes les contraintes. Regarde les fiches ci-dessous : elles indiquent maintenant précisément si le blocage vient du budget, de l’alimentation ou des dimensions.</p>
      `}
    `;
  }

  // Les fiches produits sont finalisées avant le calcul budget.
  form.addEventListener('submit', () => setTimeout(renderBudgetPlan, 140));
})();
