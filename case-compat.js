(() => {
  const form = document.getElementById('pcForm');
  const recommendations = document.getElementById('recommendations');
  const summaryText = document.getElementById('summaryText');
  const budgetSelect = document.getElementById('budget');
  if (!form || !recommendations || !summaryText || !budgetSelect) return;

  if (!document.querySelector('link[href="case-compat.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'case-compat.css';
    document.head.appendChild(link);
  }

  if (!document.getElementById('caseSize')) {
    budgetSelect.closest('label').insertAdjacentHTML('beforebegin', `
      <label>Format du boîtier
        <select id="caseSize" required>
          <option value="unknown" selected>Je ne sais pas</option>
          <option value="mini">Mini-ITX / petit boîtier</option>
          <option value="micro">Micro-ATX / mini tour</option>
          <option value="mid">Moyenne tour</option>
          <option value="full">Grande tour</option>
        </select>
      </label>

      <label>Format de la carte mère
        <select id="motherboardForm" required>
          <option value="unknown" selected>Je ne sais pas</option>
          <option value="itx">Mini-ITX</option>
          <option value="matx">Micro-ATX</option>
          <option value="atx">ATX</option>
          <option value="eatx">E-ATX</option>
        </select>
      </label>

      <label>Longueur GPU maximale du boîtier
        <select id="gpuClearance" required>
          <option value="0" data-kind="unknown" selected>Je ne sais pas</option>
          <option value="249" data-kind="upper" data-max="249">Moins de 250 mm</option>
          <option value="279" data-kind="bounded" data-min="250" data-max="279">250 à 279 mm</option>
          <option value="309" data-kind="bounded" data-min="280" data-max="309">280 à 309 mm</option>
          <option value="339" data-kind="bounded" data-min="310" data-max="339">310 à 339 mm</option>
          <option value="400" data-kind="lower" data-min="340">340 mm ou plus</option>
        </select>
      </label>
    `);
  }

  const caseSize = document.getElementById('caseSize');
  const motherboardForm = document.getElementById('motherboardForm');
  const gpuClearance = document.getElementById('gpuClearance');

  let panel = document.getElementById('caseCompatibility');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'caseCompatibility';
    panel.className = 'case-panel hidden';
    recommendations.parentElement.insertBefore(panel, recommendations);
  }

  const caseLabels = {
    unknown: 'boîtier non renseigné',
    mini: 'petit boîtier / Mini-ITX',
    micro: 'mini tour / Micro-ATX',
    mid: 'moyenne tour',
    full: 'grande tour'
  };

  const boardLabels = {
    unknown: 'format carte mère inconnu',
    itx: 'Mini-ITX',
    matx: 'Micro-ATX',
    atx: 'ATX',
    eatx: 'E-ATX'
  };

  function clearanceRange() {
    const option = gpuClearance.selectedOptions?.[0];
    const kind = option?.dataset.kind || 'unknown';
    return {
      kind,
      min: option?.dataset.min ? Number(option.dataset.min) : null,
      max: option?.dataset.max ? Number(option.dataset.max) : null,
      label: option?.textContent?.trim() || 'Je ne sais pas'
    };
  }

  function boardFitAdvice(caseValue, boardValue) {
    if (caseValue === 'unknown' || boardValue === 'unknown') {
      return { status: 'warn', text: 'Le format boîtier/carte mère n’est pas assez précis pour valider un changement de carte mère.' };
    }

    if (caseValue === 'mini' && boardValue !== 'itx') {
      return { status: 'danger', text: `Une carte mère ${boardLabels[boardValue]} ne rentre généralement pas dans un boîtier Mini-ITX. Vérifie le modèle exact du boîtier.` };
    }

    if (caseValue === 'micro' && !['itx','matx'].includes(boardValue)) {
      return { status: 'danger', text: `Une carte mère ${boardLabels[boardValue]} n’est généralement pas adaptée à une mini tour Micro-ATX.` };
    }

    if (caseValue === 'mid' && boardValue === 'eatx') {
      return { status: 'warn', text: 'Les cartes mères E-ATX ne sont pas prises en charge par toutes les moyennes tours. Vérifie la fiche du boîtier.' };
    }

    return { status: 'ok', text: `Le couple ${caseLabels[caseValue]} + ${boardLabels[boardValue]} ne présente pas d’incompatibilité évidente de format.` };
  }

  function gpuFitAdvice(range, hasGpuRecommendation, highEndRecommendation, caseValue) {
    if (!hasGpuRecommendation) {
      return { status: 'ok', text: 'Aucun changement de carte graphique prioritaire n’est proposé dans ce diagnostic.' };
    }

    if (range.kind === 'unknown') {
      return { status: 'warn', text: 'Mesure ou retrouve la longueur GPU maximale du boîtier avant de commander une carte graphique. La longueur varie selon le fabricant, même pour un même GPU.' };
    }

    if (range.kind === 'upper') {
      return { status: highEndRecommendation ? 'danger' : 'warn', text: `Tu as indiqué « ${range.label} ». Sans mesure exacte, une carte plus courte que ${range.max} mm n’est pas automatiquement garantie de rentrer : chaque modèle affiché doit être comparé à la limite réelle du boîtier.` };
    }

    if (range.kind === 'bounded') {
      const status = highEndRecommendation && range.max <= 279 ? 'danger' : 'warn';
      return { status, text: `Tu as indiqué une plage de ${range.label}. Un GPU jusqu’à ${range.min} mm est compatible avec certitude sur le critère longueur ; entre ${range.min + 1} et ${range.max} mm, il faut connaître la limite exacte du boîtier.` };
    }

    if (range.kind === 'lower') {
      const text = caseValue === 'mini'
        ? 'Tu as indiqué 340 mm ou plus, mais dans un petit boîtier vérifie aussi l’épaisseur, les slots, le câble d’alimentation et le refroidissement.'
        : `Tu as indiqué « ${range.label} » : les cartes jusqu’à ${range.min} mm passent le critère longueur ; au-delà, vérifie la limite exacte du boîtier.`;
      return { status: caseValue === 'mini' ? 'warn' : 'ok', text };
    }

    return { status: 'warn', text: 'La longueur maximale doit être vérifiée avec la fiche exacte du boîtier.' };
  }

  function renderCaseCompatibility() {
    const caseValue = caseSize.value;
    const boardValue = motherboardForm.value;
    const range = clearanceRange();

    const cards = [...recommendations.querySelectorAll('.recommendation')];
    const gpuCard = cards.find(card => /carte graphique|gpu/i.test(card.querySelector('h3')?.textContent || ''));
    const highEndRecommendation = Boolean(gpuCard && /plus puissante|haut de gamme|gros gain/i.test(gpuCard.textContent));
    const cpuCard = cards.find(card => /processeur|plateforme/i.test(card.querySelector('h3')?.textContent || ''));

    const boardAdvice = boardFitAdvice(caseValue, boardValue);
    const gpuAdvice = gpuFitAdvice(range, Boolean(gpuCard), highEndRecommendation, caseValue);
    const statuses = [boardAdvice.status, gpuAdvice.status];
    const overall = statuses.includes('danger') ? 'danger' : statuses.includes('warn') ? 'warn' : 'ok';

    panel.className = 'case-panel';
    panel.innerHTML = `
      <div class="case-panel-head">
        <h3>Compatibilité boîtier</h3>
        <span class="case-status ${overall}">${overall === 'ok' ? 'Pas de conflit évident' : overall === 'danger' ? 'Risque de compatibilité' : 'À vérifier'}</span>
      </div>
      <p><strong>${caseLabels[caseValue]}</strong> • ${boardLabels[boardValue]}${range.kind !== 'unknown' ? ` • longueur GPU déclarée : ${range.label}` : ''}</p>
      <p><strong>Carte mère :</strong> ${boardAdvice.text}</p>
      <p><strong>Carte graphique :</strong> ${gpuAdvice.text}</p>
    `;

    if (gpuCard && !gpuCard.querySelector('.case-inline-note')) {
      gpuCard.insertAdjacentHTML('beforeend', `<div class="case-inline-note ${gpuAdvice.status === 'danger' ? 'danger' : gpuAdvice.status === 'warn' ? 'warn' : ''}">${gpuAdvice.text}</div>`);
    }

    if (cpuCard && !cpuCard.querySelector('.case-inline-note')) {
      const cpuText = boardValue === 'unknown' || caseValue === 'unknown'
        ? 'Si tu changes de carte mère, vérifie aussi son format par rapport au boîtier.'
        : `Si un changement de carte mère est nécessaire, reste sur un format accepté par ton boîtier (${caseLabels[caseValue]}).`;
      cpuCard.insertAdjacentHTML('beforeend', `<div class="case-inline-note ${boardAdvice.status === 'danger' ? 'danger' : boardAdvice.status === 'warn' ? 'warn' : ''}">${cpuText}</div>`);
    }

    const currentSummary = summaryText.textContent;
    if (currentSummary && !currentSummary.includes('boîtier')) {
      const caseSummary = caseValue === 'unknown' ? 'boîtier à vérifier' : caseLabels[caseValue];
      summaryText.textContent = `${currentSummary} • ${caseSummary}`;
    }
  }

  form.addEventListener('submit', () => setTimeout(renderCaseCompatibility, 0));
})();