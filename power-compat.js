(() => {
  const form = document.getElementById('pcForm');
  const recommendations = document.getElementById('recommendations');
  if (!form || !recommendations) return;

  // Valeurs de puissance système minimale issues des fiches constructeur des GPU
  // proposés par le site. Les modèles partenaires peuvent avoir des exigences
  // différentes : la fiche du fabricant de la carte reste prioritaire.
  const minimumPsu = {
    'AMD Radeon RX 9060 XT 16 Go': 450,
    'NVIDIA GeForce RTX 5060 Ti 16 Go': 600,
    'AMD Radeon RX 9070 16 Go': 650,
    'AMD Radeon RX 9070 XT 16 Go': 750,
    'NVIDIA GeForce RTX 5070 Ti 16 Go': 750
  };

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

    const productRows = [...gpuCard.querySelectorAll('.product-option')];
    const knownProducts = [];

    productRows.forEach(row => {
      const name = row.querySelector('strong')?.textContent?.trim();
      const required = minimumPsu[name];
      if (!name || !required) return;
      knownProducts.push({ name, required });

      const note = document.createElement('div');
      note.className = 'platform-inline-note power-inline-note';
      note.textContent = `Alimentation système minimale indiquée par le constructeur du GPU de référence : ${required} W. Vérifie aussi la fiche du modèle exact vendu.`;
      row.appendChild(note);
    });

    if (!knownProducts.length || !psu) return;

    const fitting = knownProducts.filter(product => psu >= product.required);
    const psuCard = cards.find(card => /alimentation adaptée/i.test(card.querySelector('h3')?.textContent || ''));

    if (fitting.length) {
      const names = fitting.map(product => product.name).join(' ou ');
      const note = document.createElement('div');
      note.className = 'platform-inline-note power-inline-note';
      note.textContent = `Avec ${psu} W, au moins une option affichée respecte la puissance système minimale annoncée pour le GPU de référence (${names}). Le modèle exact de carte et les connecteurs de ton bloc restent à vérifier.`;
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
      if (reason) reason.textContent = `Ton alimentation indiquée (${psu} W) est sous la puissance système minimale du GPU de référence pour les modèles affichés. La première cible à vérifier est au moins ${lowest} W, puis les connecteurs et les exigences du modèle exact.`;
    }
  }

  form.addEventListener('submit', () => setTimeout(renderPowerCompatibility, 55));
})();