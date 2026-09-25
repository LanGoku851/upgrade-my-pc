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

  // Montants volontairement indicatifs : ils servent uniquement à éviter des
  // recommandations incohérentes avec le budget. Le prix marchand fait foi.
  const estimates = {
    'Kit 16 Go DDR4-3200 CL16': { price: 45 },
    'Kit 16 Go DDR5-6000': { price: 65 },
    'Kit 32 Go DDR4-3200 CL16': { price: 70 },
    'Kit 32 Go DDR5-6000 CL30': { price: 105 },
    'WD Black SN850X 1 To': { price: 90 },
    'Crucial T500 2 To': { price: 145 },

    'AMD Radeon RX 9060 XT 16 Go': { price: 410, psu: 450 },
    'NVIDIA GeForce RTX 5060 Ti 16 Go': { price: 470, psu: 600 },
    'AMD Radeon RX 9070 16 Go': { price: 620, psu: 650 },
    'AMD Radeon RX 9070 XT 16 Go': { price: 740, psu: 750 },
    'NVIDIA GeForce RTX 5070 Ti 16 Go': { price: 900, psu: 750 },

    'AMD Ryzen 7 5700X3D': { price: 220 },
    'AMD Ryzen 7 5800X3D': { price: 320 },
    'AMD Ryzen 7 9800X3D': { price: 500 },
    'Intel Core i5-14600K': { price: 270 },
    'Intel Core i7-14700K': { price: 400 },
    'Intel Core Ultra 7 265K': { price: 370 },
    'AMD Ryzen 7 9800X3D + carte mère AM5': { price: 780, bundle: 'CPU + carte mère + 32 Go DDR5' },
    'Intel Core Ultra 7 265K + carte mère LGA1851': { price: 700, bundle: 'CPU + carte mère + 32 Go DDR5' },

    'Alimentation 750 W 80+ Gold': { price: 105 },
    'Alimentation 850 W 80+ Gold': { price: 130 },
    'Écran 27 pouces 1440p 180 Hz': { price: 250 }
  };

  const psuUpgradeCost = (required) => required >= 850 ? 130 : required >= 750 ? 105 : 90;

  function formatEuro(value) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  function currentPsu() {
    return Number(document.getElementById('psu')?.value || 0);
  }

  function estimateProduct(name) {
    const data = estimates[name];
    if (!data) return null;

    const psu = currentPsu();
    let addon = 0;
    let addonLabel = '';

    if (data.psu && psu > 0 && psu < data.psu) {
      addon = psuUpgradeCost(data.psu);
      addonLabel = ` + alimentation ${data.psu} W estimée ${formatEuro(addon)}`;
    }

    return {
      ...data,
      addon,
      addonLabel,
      total: data.price + addon,
      psuUnknown: Boolean(data.psu && psu === 0)
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

  function renderBudgetPlan() {
    cleanPrevious();

    const budget = Number(budgetSelect.value);
    const productRows = [...recommendations.querySelectorAll('.product-option')];
    const scenarios = [];

    productRows.forEach(row => {
      const name = row.querySelector('strong')?.textContent?.trim();
      if (!name) return;

      const estimate = estimateProduct(name);
      if (!estimate) return;

      const meta = document.createElement('div');
      meta.className = 'budget-meta';
      meta.innerHTML = `<strong>Budget indicatif : ${formatEuro(estimate.total)}</strong>${estimate.bundle ? `<span>${estimate.bundle}</span>` : ''}${estimate.addonLabel ? `<span>${estimate.addonLabel}</span>` : ''}${estimate.psuUnknown ? '<span>Alimentation inconnue : éventuel remplacement non inclus.</span>' : ''}`;
      row.appendChild(meta);
      row.dataset.budgetTotal = String(estimate.total);

      if (estimate.total > budget) {
        row.classList.add('budget-hidden');
      } else {
        row.classList.add('budget-fit');
        scenarios.push({
          name,
          total: estimate.total,
          title: cardTitleFor(row),
          addonLabel: estimate.addonLabel,
          bundle: estimate.bundle || ''
        });
      }
    });

    [...recommendations.querySelectorAll('.product-suggestions')].forEach(group => {
      const options = [...group.querySelectorAll('.product-option')];
      if (options.length && options.every(option => option.classList.contains('budget-hidden'))) {
        const message = document.createElement('div');
        message.className = 'budget-empty';
        message.textContent = `Aucun des modèles actuellement proposés dans cette gamme ne rentre dans ton budget de ${formatEuro(budget)}. Mieux vaut attendre, viser une gamme moins chère ou augmenter le budget plutôt que forcer un achat.`;
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

    const cheapestByTitle = new Map();
    scenarios.forEach(item => {
      const current = cheapestByTitle.get(item.title);
      if (!current || item.total < current.total) cheapestByTitle.set(item.title, item);
    });

    const choices = [...cheapestByTitle.values()].sort((a, b) => a.total - b.total).slice(0, 3);
    const remaining = choices.length ? Math.max(0, budget - choices[0].total) : budget;

    panel.innerHTML = `
      <div class="budget-plan-head">
        <div>
          <p class="budget-kicker">Budget maximum</p>
          <h3>${formatEuro(budget)}</h3>
        </div>
        <span class="budget-status ${choices.length ? 'ok' : 'warn'}">${choices.length ? 'Options dans le budget' : 'Budget trop serré pour les modèles affichés'}</span>
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
        <p class="budget-foot">Option la moins chère : environ ${formatEuro(choices[0].total)} • marge indicative restante : ${formatEuro(remaining)}. Les prix réels sont ceux du marchand au moment du clic.</p>
      ` : `
        <p class="budget-intro">Les modèles concrets actuellement proposés dépassent ce budget. Le site les masque pour éviter de te pousser vers un achat incohérent. Les recommandations générales restent visibles pour expliquer le prochain upgrade pertinent.</p>
      `}
    `;
  }

  form.addEventListener('submit', () => setTimeout(renderBudgetPlan, 80));
})();