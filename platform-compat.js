(() => {
  const form = document.getElementById('pcForm');
  const cpuSelect = document.getElementById('cpu');
  const ramTypeSelect = document.getElementById('ramType');
  const summaryText = document.getElementById('summaryText');
  const recommendations = document.getElementById('recommendations');
  if (!form || !cpuSelect || !summaryText || !recommendations) return;

  if (!document.querySelector('link[href="platform-compat.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'platform-compat.css';
    document.head.appendChild(link);
  }

  const platformData = {
    am4: { label: 'AMD Socket AM4', memory: 'DDR4', chipsets: ['A320','B350','X370','B450','X470','A520','B550','X570'] },
    am5: { label: 'AMD Socket AM5', memory: 'DDR5', chipsets: ['A620','B650','B650E','X670','X670E','B840','B850','X870','X870E'] },
    lga1151v2: { label: 'Intel LGA1151 (8e/9e gén.)', memory: 'DDR4', chipsets: ['H310','B360','H370','Z370','B365','Z390'] },
    lga1200: { label: 'Intel LGA1200', memory: 'DDR4', chipsets: ['H410','B460','H470','Z490','H510','B560','H570','Z590'] },
    lga1700: { label: 'Intel LGA1700', memory: 'DDR4 ou DDR5', chipsets: ['H610','B660','H670','Z690','B760','H770','Z790'] },
    lga1851: { label: 'Intel LGA1851', memory: 'DDR5', chipsets: ['H810','B860','Z890'] },
    unknown: { label: 'Plateforme inconnue', memory: 'À vérifier', chipsets: [] }
  };

  const cpuPlatform = (cpu) => {
    if (/^r[579]-(1|2|3|5)/.test(cpu)) return 'am4';
    if (/^r[579]-(7|9)/.test(cpu)) return 'am5';
    if (/^i[579]-(8|9)/.test(cpu)) return 'lga1151v2';
    if (/^i[579]-(10|11)/.test(cpu)) return 'lga1200';
    if (/^i[579]-(12|13|14)/.test(cpu)) return 'lga1700';
    if (/^ultra/.test(cpu)) return 'lga1851';
    return 'unknown';
  };

  const cpuProductsByPlatform = {
    am4: [
      { id:'ryzen5700x3d', name:'AMD Ryzen 7 5700X3D', tag:'AM4', note:'À vérifier dans la liste CPU/BIOS de ta carte mère.', merchants:{ ebay:'', fnac:'', amazon:'' } },
      { id:'ryzen5800x3d', name:'AMD Ryzen 7 5800X3D', tag:'AM4', note:'Option AM4 hautes performances si encore disponible et supportée.', merchants:{ ebay:'', fnac:'', amazon:'' } }
    ],
    am5: [
      { id:'ryzen9800x3d', name:'AMD Ryzen 7 9800X3D', tag:'AM5', note:'Compatible avec la plateforme AM5 ; un BIOS récent peut être nécessaire selon la carte mère.', merchants:{ ebay:'', fnac:'', amazon:'' } }
    ],
    lga1700: [
      { id:'i5-14600k', name:'Intel Core i5-14600K', tag:'LGA1700', note:'Même socket, mais vérifie chipset, BIOS et type de RAM de la carte mère.', merchants:{ ebay:'', fnac:'', amazon:'' } },
      { id:'i7-14700k', name:'Intel Core i7-14700K', tag:'LGA1700', note:'Même socket, avec compatibilité carte mère/BIOS à confirmer.', merchants:{ ebay:'', fnac:'', amazon:'' } }
    ],
    lga1851: [
      { id:'coreultra7-265k', name:'Intel Core Ultra 7 265K', tag:'LGA1851', note:'Pour carte mère LGA1851 compatible.', merchants:{ ebay:'', fnac:'', amazon:'' } }
    ],
    modern: [
      { id:'ryzen9800x3d-platform', name:'AMD Ryzen 7 9800X3D + carte mère AM5', tag:'Nouvelle plateforme', note:'Implique une carte mère AM5 et de la DDR5.', merchants:{ ebay:'', fnac:'', amazon:'' } },
      { id:'coreultra7-265k-platform', name:'Intel Core Ultra 7 265K + carte mère LGA1851', tag:'Nouvelle plateforme', note:'Implique une carte mère LGA1851 et de la DDR5.', merchants:{ ebay:'', fnac:'', amazon:'' } }
    ]
  };

  const cpuLabel = cpuSelect.closest('label');
  if (cpuLabel && !document.getElementById('chipset')) {
    cpuLabel.insertAdjacentHTML('afterend', `
      <label>Carte mère / chipset
        <select id="chipset" required><option value="unknown">Je ne sais pas</option></select>
        <small id="platformHint" class="platform-hint"></small>
      </label>
    `);
  }

  const chipsetSelect = document.getElementById('chipset');
  const platformHint = document.getElementById('platformHint');

  let panel = document.getElementById('platformCompatibility');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'platformCompatibility';
    panel.className = 'platform-panel hidden';
    recommendations.parentElement.insertBefore(panel, recommendations);
  }

  function syncPlatform() {
    const platform = cpuPlatform(cpuSelect.value);
    const data = platformData[platform];
    chipsetSelect.innerHTML = '<option value="unknown">Je ne sais pas</option>' + data.chipsets.map(c => `<option value="${c}">${c}</option>`).join('');
    platformHint.textContent = platform === 'unknown' ? 'Plateforme non détectée.' : `Plateforme détectée : ${data.label} • Mémoire : ${data.memory}`;

    if (window.AFFILIATE_PRODUCTS) {
      if (platform === 'am4' || platform === 'am5' || platform === 'lga1700' || platform === 'lga1851') {
        window.AFFILIATE_PRODUCTS.cpu = cpuProductsByPlatform[platform];
      } else if (platform === 'lga1151v2' || platform === 'lga1200') {
        window.AFFILIATE_PRODUCTS.cpu = cpuProductsByPlatform.modern;
      }
    }
  }

  function am4Advice(chipset) {
    if (['B450','X470','A520','B550','X570'].includes(chipset)) {
      return { status:'ok', title:'Upgrade AM4 potentiellement simple', text:'Un Ryzen 5000/X3D peut rester sur la même plateforme. Vérifie tout de même la liste CPU du fabricant et la version du BIOS avant achat.' };
    }
    if (['A320','B350','X370'].includes(chipset)) {
      return { status:'warn', title:'AM4 : support BIOS à confirmer', text:'Certaines cartes de cette génération peuvent accepter des Ryzen 5000 via BIOS spécifique/bêta. Le modèle exact de carte mère doit être vérifié avant achat.' };
    }
    return { status:'warn', title:'AM4 détecté', text:'Avant de changer toute la plateforme, vérifie si ta carte mère supporte un Ryzen 7 5700X3D/5800X3D avec un BIOS adapté.' };
  }

  function platformAdvice(platform, chipset) {
    if (platform === 'am4') return am4Advice(chipset);
    if (platform === 'am5') {
      const biosNote = ['A620','B650','B650E','X670','X670E'].includes(chipset) || chipset === 'unknown'
        ? ' Un BIOS récent peut être nécessaire pour certains Ryzen 8000/9000 sur les cartes série 600.' : '';
      return { status:'ok', title:'Plateforme AM5 réutilisable', text:`Tu peux rester sur AM5 pour un futur Ryzen 7000/8000/9000 compatible.${biosNote}` };
    }
    if (platform === 'lga1700') return { status:'warn', title:'LGA1700 : même socket possible', text:'Les Intel Core 12e, 13e et 14e génération utilisent LGA1700. Une mise à jour BIOS peut être nécessaire, et ta carte mère impose DDR4 ou DDR5 selon son modèle.' };
    if (platform === 'lga1851') return { status:'ok', title:'Plateforme LGA1851 actuelle', text:'Les Core Ultra desktop série 2 utilisent LGA1851. Reste sur des processeurs et chipsets explicitement compatibles LGA1851.' };
    if (platform === 'lga1151v2' || platform === 'lga1200') return { status:'change', title:'Nouvelle carte mère à prévoir', text:'Pour passer à une plateforme actuelle, il faudra changer de carte mère. Une migration vers AM5 ou LGA1851 implique aussi de la DDR5.' };
    return { status:'warn', title:'Compatibilité à vérifier', text:'Le processeur sélectionné ne permet pas de déterminer automatiquement la plateforme. Vérifie le socket et le chipset de la carte mère.' };
  }

  function renderCompatibility() {
    const platform = cpuPlatform(cpuSelect.value);
    const chipset = chipsetSelect.value;
    const data = platformData[platform];
    const advice = platformAdvice(platform, chipset);
    const ramType = ramTypeSelect ? ramTypeSelect.value : 'unknown';

    let mismatch = '';
    if (platform === 'am5' && ramType === 'ddr4') mismatch = 'Attention : AM5 utilise de la DDR5, alors que tu as indiqué DDR4.';
    if (platform === 'lga1851' && ramType === 'ddr4') mismatch = 'Attention : LGA1851 / Core Ultra 200S utilise de la DDR5.';
    if ((platform === 'am4' || platform === 'lga1151v2' || platform === 'lga1200') && ramType === 'ddr5') mismatch = 'Attention : la plateforme indiquée utilise de la DDR4, pas de la DDR5.';

    panel.className = 'platform-panel';
    panel.innerHTML = `
      <div class="platform-panel-head">
        <h3>Compatibilité carte mère</h3>
        <span class="platform-status ${advice.status}">${advice.status === 'ok' ? 'Même plateforme possible' : advice.status === 'change' ? 'Changement de plateforme' : 'À vérifier'}</span>
      </div>
      <p><strong>${data.label}</strong>${chipset !== 'unknown' ? ` • chipset ${chipset}` : ''}</p>
      <p><strong>${advice.title} :</strong> ${advice.text}</p>
      ${mismatch ? `<div class="platform-inline-note">${mismatch}</div>` : ''}
    `;

    const currentSummary = summaryText.textContent;
    const platformLabel = chipset !== 'unknown' ? `${chipset} / ${data.label}` : data.label;
    if (currentSummary && !currentSummary.includes(data.label)) summaryText.textContent = `${currentSummary} • ${platformLabel}`;

    const cpuCard = [...recommendations.querySelectorAll('.recommendation')].find(card => /processeur|plateforme/i.test(card.querySelector('h3')?.textContent || ''));
    if (cpuCard && !cpuCard.querySelector('.platform-inline-note')) {
      cpuCard.insertAdjacentHTML('beforeend', `<div class="platform-inline-note">${advice.text}</div>`);
    }
  }

  cpuSelect.addEventListener('change', syncPlatform);
  form.addEventListener('submit', () => setTimeout(renderCompatibility, 0));
  syncPlatform();
})();