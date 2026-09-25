const form = document.getElementById('pcForm');
const results = document.getElementById('results');
const recommendations = document.getElementById('recommendations');
const summaryText = document.getElementById('summaryText');
const copyResult = document.getElementById('copyResult');
const gpuSelect = document.getElementById('gpu');
const cpuSelect = document.getElementById('cpu');

const affiliateProducts = window.AFFILIATE_PRODUCTS || {};
const affiliateMerchants = window.AFFILIATE_MERCHANTS || {};
let latestShareText = '';

const GPU_GROUPS = [
  ['NVIDIA GeForce GTX 10', [
    ['gtx-1050ti','GTX 1050 Ti',1], ['gtx-1060','GTX 1060',1], ['gtx-1070','GTX 1070',2],
    ['gtx-1070ti','GTX 1070 Ti',2], ['gtx-1080','GTX 1080',2], ['gtx-1080ti','GTX 1080 Ti',3]
  ]],
  ['NVIDIA GeForce GTX 16', [
    ['gtx-1650','GTX 1650',1], ['gtx-1650s','GTX 1650 Super',1], ['gtx-1660','GTX 1660',2],
    ['gtx-1660s','GTX 1660 Super',2], ['gtx-1660ti','GTX 1660 Ti',2]
  ]],
  ['NVIDIA GeForce RTX 20', [
    ['rtx-2060','RTX 2060',2], ['rtx-2060s','RTX 2060 Super',3], ['rtx-2070','RTX 2070',3],
    ['rtx-2070s','RTX 2070 Super',3], ['rtx-2080','RTX 2080',3], ['rtx-2080s','RTX 2080 Super',3],
    ['rtx-2080ti','RTX 2080 Ti',4]
  ]],
  ['NVIDIA GeForce RTX 30', [
    ['rtx-3050','RTX 3050',2], ['rtx-3060','RTX 3060',3], ['rtx-3060ti','RTX 3060 Ti',4],
    ['rtx-3070','RTX 3070',4], ['rtx-3070ti','RTX 3070 Ti',4], ['rtx-3080','RTX 3080',5],
    ['rtx-3080ti','RTX 3080 Ti',5], ['rtx-3090','RTX 3090',5], ['rtx-3090ti','RTX 3090 Ti',5]
  ]],
  ['NVIDIA GeForce RTX 40', [
    ['rtx-4060','RTX 4060',3], ['rtx-4060ti','RTX 4060 Ti',4], ['rtx-4070','RTX 4070',5],
    ['rtx-4070s','RTX 4070 Super',5], ['rtx-4070ti','RTX 4070 Ti',5], ['rtx-4070tis','RTX 4070 Ti Super',6],
    ['rtx-4080','RTX 4080',6], ['rtx-4080s','RTX 4080 Super',6], ['rtx-4090','RTX 4090',7]
  ]],
  ['NVIDIA GeForce RTX 50', [
    ['rtx-5050','RTX 5050',3], ['rtx-5060','RTX 5060',4], ['rtx-5060ti','RTX 5060 Ti',4],
    ['rtx-5070','RTX 5070',5], ['rtx-5070ti','RTX 5070 Ti',6], ['rtx-5080','RTX 5080',6],
    ['rtx-5090','RTX 5090',7]
  ]],
  ['AMD Radeon RX 500', [
    ['rx-570','RX 570',1], ['rx-580','RX 580',1], ['rx-590','RX 590',1]
  ]],
  ['AMD Radeon RX 5000', [
    ['rx-5500xt','RX 5500 XT',1], ['rx-5600xt','RX 5600 XT',2], ['rx-5700','RX 5700',2],
    ['rx-5700xt','RX 5700 XT',3]
  ]],
  ['AMD Radeon RX 6000', [
    ['rx-6400','RX 6400',1], ['rx-6500xt','RX 6500 XT',1], ['rx-6600','RX 6600',2],
    ['rx-6600xt','RX 6600 XT',3], ['rx-6650xt','RX 6650 XT',3], ['rx-6700','RX 6700',3],
    ['rx-6700xt','RX 6700 XT',4], ['rx-6750xt','RX 6750 XT',4], ['rx-6800','RX 6800',4],
    ['rx-6800xt','RX 6800 XT',5], ['rx-6900xt','RX 6900 XT',5], ['rx-6950xt','RX 6950 XT',5]
  ]],
  ['AMD Radeon RX 7000', [
    ['rx-7600','RX 7600',3], ['rx-7600xt','RX 7600 XT',3], ['rx-7700xt','RX 7700 XT',4],
    ['rx-7800xt','RX 7800 XT',5], ['rx-7900gre','RX 7900 GRE',5], ['rx-7900xt','RX 7900 XT',6],
    ['rx-7900xtx','RX 7900 XTX',6]
  ]],
  ['AMD Radeon RX 9000', [
    ['rx-9050','RX 9050',2], ['rx-9060','RX 9060',3], ['rx-9060xt8','RX 9060 XT 8 Go',4],
    ['rx-9060xt16','RX 9060 XT 16 Go',4], ['rx-9070gre','RX 9070 GRE',5], ['rx-9070','RX 9070',5],
    ['rx-9070xt','RX 9070 XT',6]
  ]],
  ['Intel Arc A-Series', [
    ['arc-a380','Arc A380',1], ['arc-a580','Arc A580',2], ['arc-a750','Arc A750',3], ['arc-a770','Arc A770',3]
  ]],
  ['Intel Arc B-Series', [
    ['arc-b570','Arc B570',3], ['arc-b580','Arc B580',4]
  ]]
];

gpuSelect.innerHTML = '<option value="">Choisir</option>' +
  GPU_GROUPS.map(([label, cards]) => `<optgroup label="${label}">${cards.map(([id, name]) => `<option value="${id}">${name}</option>`).join('')}</optgroup>`).join('') +
  '<option value="other">Autre / Je ne sais pas</option>';

const gpuProfiles = Object.fromEntries(
  GPU_GROUPS.flatMap(([, cards]) => cards.map(([id, , tier]) => [id, { tier }]))
);
gpuProfiles.other = { tier: 3 };

const cpuProfiles = {
  'r5-1600': { tier: 1 }, 'r7-1700': { tier: 1 }, 'r5-2600': { tier: 1 }, 'r7-2700': { tier: 1 },
  'r5-3600': { tier: 2 }, 'r7-3700x': { tier: 2 }, 'r9-3900x': { tier: 2 }, 'r5-5500': { tier: 2 },
  'r5-5600': { tier: 3 }, 'r7-5700x': { tier: 3 }, 'r7-5700x3d': { tier: 4, x3d: true },
  'r7-5800x3d': { tier: 5, x3d: true }, 'r9-5900x': { tier: 3 },
  'r5-7500f': { tier: 4 }, 'r5-7600': { tier: 4 }, 'r7-7700': { tier: 4 },
  'r7-7800x3d': { tier: 5, x3d: true }, 'r9-7900x': { tier: 4 }, 'r9-7950x3d': { tier: 5, x3d: true },
  'r5-9600x': { tier: 4 }, 'r7-9700x': { tier: 4 }, 'r7-9800x3d': { tier: 5, x3d: true },
  'r9-9900x': { tier: 4 }, 'r9-9950x3d': { tier: 5, x3d: true },
  'i5-8400': { tier: 1 }, 'i7-8700k': { tier: 2 }, 'i5-9600k': { tier: 2 }, 'i7-9700k': { tier: 2 }, 'i9-9900k': { tier: 2 },
  'i5-10400': { tier: 2 }, 'i7-10700k': { tier: 2 }, 'i9-10900k': { tier: 3 },
  'i5-11400': { tier: 2 }, 'i7-11700k': { tier: 2 }, 'i9-11900k': { tier: 3 },
  'i5-12400': { tier: 3 }, 'i5-12600k': { tier: 4 }, 'i7-12700k': { tier: 4 }, 'i9-12900k': { tier: 4 },
  'i5-13400f': { tier: 3 }, 'i5-13600k': { tier: 4 }, 'i7-13700k': { tier: 4 }, 'i9-13900k': { tier: 4 },
  'i5-14400f': { tier: 3 }, 'i5-14600k': { tier: 4 }, 'i7-14700k': { tier: 4 }, 'i9-14900k': { tier: 4 },
  'ultra5-245k': { tier: 4 }, 'ultra7-265k': { tier: 4 }, 'ultra9-285k': { tier: 4 },
  other: { tier: 3 }
};

const catalog = {
  ram16: { title: 'Passer à au moins 16 Go de RAM', price: 'Budget généralement accessible', impact: 'Priorité forte', desc: 'Une quantité de mémoire insuffisante peut provoquer des ralentissements, des saccades ou des fermetures d’applications.' },
  ram32: { title: 'Passer à 32 Go de RAM', price: 'Upgrade de confort', impact: 'Confort', desc: 'Utile avec Discord, navigateur, mods, streaming ou plusieurs applications ouvertes pendant le jeu.' },
  nvme: { title: 'Passer à un SSD NVMe', price: 'Bon rapport confort / prix', impact: 'Chargements', desc: 'Réduit surtout les temps de chargement, les installations et les attentes liées au stockage.' },
  storageCapacity: { title: 'Augmenter la capacité de stockage', price: 'Selon la capacité', impact: 'Espace', desc: 'Un SSD plus grand évite de désinstaller constamment des jeux et permet de garder davantage de titres rapides à lancer.' },
  gpuMid: { title: 'Monter en gamme côté carte graphique', price: 'Investissement moyen', impact: 'FPS', desc: 'La carte graphique est souvent le levier principal pour gagner des FPS ou augmenter les réglages graphiques.' },
  gpuHigh: { title: 'Passer à une carte graphique plus puissante', price: 'Investissement important', impact: 'Gros gain potentiel', desc: 'Pertinent lorsque la résolution et les réglages graphiques sollicitent fortement la carte graphique.' },
  cpu: { title: 'Étudier un upgrade processeur / plateforme', price: 'Dépend de la carte mère', impact: 'FPS CPU', desc: 'À regarder si le processeur limite les hauts FPS. Un changement de plateforme peut aussi imposer une nouvelle carte mère ou de la RAM.' },
  psu: { title: 'Prévoir une alimentation adaptée', price: 'Sécurité et marge', impact: 'Compatibilité', desc: 'Une carte graphique plus puissante peut demander davantage de puissance et de connecteurs. Le modèle exact de l’alimentation reste à vérifier.' },
  monitor: { title: 'Améliorer l’écran plutôt que le PC', price: 'Upgrade visible immédiatement', impact: 'Expérience', desc: 'Si le PC atteint déjà beaucoup de FPS, un écran mieux adapté peut être plus perceptible qu’un petit remplacement de composant.' }
};

function injectExtraFields() {
  const ramSelect = document.getElementById('ram');
  ramSelect.closest('label').insertAdjacentHTML('afterend', `
    <label>Type de RAM
      <select id="ramType" required>
        <option value="unknown">Je ne sais pas</option>
        <option value="ddr3">DDR3</option>
        <option value="ddr4">DDR4</option>
        <option value="ddr5">DDR5</option>
      </select>
    </label>
  `);

  const storage = document.getElementById('storage');
  storage.innerHTML = `
    <option value="hdd">Disque dur HDD</option>
    <option value="sata">SSD SATA 2,5"</option>
    <option value="nvme3">SSD NVMe PCIe 3.0</option>
    <option value="nvme4" selected>SSD NVMe PCIe 4.0</option>
    <option value="nvme5">SSD NVMe PCIe 5.0</option>
    <option value="unknown">Je ne sais pas</option>
  `;
  storage.closest('label').insertAdjacentHTML('afterend', `
    <label>Capacité du stockage principal
      <select id="storageCapacity" required>
        <option value="256">256 Go ou moins</option>
        <option value="500">500 Go</option>
        <option value="1000" selected>1 To</option>
        <option value="2000">2 To</option>
        <option value="4000">4 To ou plus</option>
      </select>
    </label>
  `);

  document.getElementById('budget').closest('label').insertAdjacentHTML('beforebegin', `
    <label>Puissance de l’alimentation
      <select id="psu" required>
        <option value="0" selected>Je ne sais pas</option>
        <option value="450">450 W ou moins</option>
        <option value="500">500 W</option>
        <option value="550">550 W</option>
        <option value="600">600 W</option>
        <option value="650">650 W</option>
        <option value="750">750 W</option>
        <option value="850">850 W</option>
        <option value="1000">1000 W ou plus</option>
      </select>
    </label>
  `);
}

injectExtraFields();

const ramTypeSelect = document.getElementById('ramType');

function inferRamType(cpu) {
  if (/^r[579]-(1|2|3|5)/.test(cpu)) return 'ddr4';
  if (/^r[579]-(7|9)/.test(cpu)) return 'ddr5';
  if (/^i[579]-(8|9|10|11)/.test(cpu)) return 'ddr4';
  if (/^ultra/.test(cpu)) return 'ddr5';
  return 'unknown';
}

function syncRamTypeFromCpu() {
  if (ramTypeSelect.dataset.manual === '1') return;
  const inferred = inferRamType(cpuSelect.value);
  if (inferred !== 'unknown') ramTypeSelect.value = inferred;
}

ramTypeSelect.addEventListener('change', () => { ramTypeSelect.dataset.manual = '1'; });
cpuSelect.addEventListener('change', syncRamTypeFromCpu);

function pushUnique(arr, key, reason, score) {
  if (!arr.some(x => x.key === key)) arr.push({ key, reason, score });
}

function isValidUrl(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url);
}

function productListFor(key, budget, context = {}) {
  let products = Array.isArray(affiliateProducts[key]) ? [...affiliateProducts[key]] : [];

  if ((key === 'ram16' || key === 'ram32') && context.ramType && context.ramType !== 'unknown') {
    products = products.filter(product => product.ramType === context.ramType);
  }

  if ((key === 'gpuMid' || key === 'gpuHigh') && Number.isFinite(context.gpuTier)) {
    products = products.filter(product => !product.tier || product.tier > context.gpuTier);
  }

  if (key === 'nvme' || key === 'storageCapacity') {
    if (context.storageCapacity >= 1000) products.sort((a, b) => (b.capacityGb || 0) - (a.capacityGb || 0));
    else products.sort((a, b) => (a.capacityGb || 0) - (b.capacityGb || 0));
  }

  if (key === 'gpuHigh') {
    if (budget < 700) return products.slice(0, 1);
    if (budget < 1000) return products.slice(0, 2);
  }
  return products.slice(0, 3);
}

function merchantButtons(product) {
  const active = Object.entries(product.merchants || {}).filter(([, url]) => isValidUrl(url));
  if (!Object.keys(product.merchants || {}).length) return '';
  if (!active.length) return '<div class="merchant-pending">Liens marchands affiliés en cours d’activation.</div>';

  return `<div class="merchant-actions">${active.map(([merchantId, url]) => {
    const merchantName = affiliateMerchants[merchantId] || merchantId;
    return `<a class="merchant-btn" href="${url}" target="_blank" rel="nofollow sponsored noopener" data-affiliate="${product.id}" data-merchant="${merchantId}">Voir chez ${merchantName}</a>`;
  }).join('')}</div>`;
}

function renderProducts(key, budget, context) {
  const products = productListFor(key, budget, context);
  if (!products.length) {
    if (key === 'ram16' || key === 'ram32') {
      return '<div class="merchant-pending">Indique le type de RAM compatible pour afficher des kits adaptés.</div>';
    }
    return '';
  }

  return `
    <div class="product-suggestions">
      <div class="product-suggestions-title">Matériel à comparer</div>
      ${products.map(product => `
        <div class="product-option">
          <div class="product-option-head">
            <strong>${product.name}</strong>
            ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
          </div>
          ${product.note ? `<p>${product.note}</p>` : ''}
          ${merchantButtons(product)}
        </div>
      `).join('')}
    </div>
  `;
}

function goalLabel() { return document.getElementById('goal').selectedOptions[0].text; }
function cpuLabel() { return cpuSelect.selectedOptions[0].text; }
function gpuLabel() { return gpuSelect.selectedOptions[0].text; }
function ramTypeLabel() { return ramTypeSelect.selectedOptions[0].text; }

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const gpu = gpuSelect.value;
  const cpu = cpuSelect.value;
  const ram = Number(document.getElementById('ram').value);
  const ramType = ramTypeSelect.value;
  const storage = document.getElementById('storage').value;
  const storageCapacity = Number(document.getElementById('storageCapacity').value);
  const psu = Number(document.getElementById('psu').value);
  const resolution = document.getElementById('resolution').value;
  const budget = Number(document.getElementById('budget').value);
  const goal = document.getElementById('goal').value;
  const cpuInfo = cpuProfiles[cpu] || cpuProfiles.other;
  const gpuInfo = gpuProfiles[gpu] || gpuProfiles.other;
  const context = { ramType, storageCapacity, psu, gpuTier: gpuInfo.tier };

  let recs = [];

  if (ram < 16) pushUnique(recs, 'ram16', `Avec ${ram} Go de RAM, la mémoire est un point à corriger avant une grosse dépense.`, 100);
  else if (ram < 32 && goal === 'smooth') pushUnique(recs, 'ram32', 'Ton objectif privilégie la fluidité et le multitâche : 32 Go peuvent apporter davantage de confort.', 82);

  if (storage === 'hdd') pushUnique(recs, 'nvme', 'Le disque dur mécanique est le point faible le plus évident pour la réactivité et les chargements.', 97);
  else if (storage === 'sata' && goal === 'loading') pushUnique(recs, 'nvme', 'Pour réduire les temps de chargement, un SSD NVMe compatible est la piste la plus logique.', 86);
  else if (storageCapacity <= 500 && budget >= 100) pushUnique(recs, 'storageCapacity', `Ton stockage principal ne fait que ${storageCapacity} Go : un SSD plus grand peut être plus utile qu’un petit gain de performances.`, 62);

  if (goal === 'fps' || goal === 'quality') {
    if (gpuInfo.tier <= 2 && budget >= 300) {
      pushUnique(recs, 'gpuMid', `${gpuLabel()} commence à être limitée pour cet objectif : le GPU est probablement l’endroit où ton budget aura le plus d’impact.`, 96);
    } else if (gpuInfo.tier <= 4 && resolution !== '1080' && budget >= 500) {
      pushUnique(recs, 'gpuHigh', `${gpuLabel()} reste correcte, mais en ${resolution === '4k' ? '4K' : '1440p'} une carte graphique plus rapide peut apporter le gain le plus visible.`, 92);
    } else if (gpuInfo.tier <= 3 && resolution === '1080' && budget >= 500) {
      pushUnique(recs, 'gpuHigh', `${gpuLabel()} peut encore limiter les hauts FPS ou les réglages élevés en 1080p.`, 86);
    }
  }

  if (goal === 'fps' && budget >= 200) {
    if (cpuInfo.tier <= 2) {
      const cpuScore = gpuInfo.tier >= 4 ? 96 : 86;
      pushUnique(recs, 'cpu', `${cpuLabel()} peut devenir limitant si tu recherches des FPS élevés${gpuInfo.tier >= 4 ? ` avec une ${gpuLabel()}` : ''}.`, cpuScore);
    } else if (cpuInfo.tier === 3 && resolution === '1080' && gpuInfo.tier >= 4 && budget >= 350) {
      pushUnique(recs, 'cpu', `${cpuLabel()} reste utilisable, mais un processeur plus rapide peut améliorer les hauts FPS en 1080p avec ${gpuLabel()}.`, 78);
    }
  }

  if (cpuInfo.x3d && gpuInfo.tier <= 3) {
    pushUnique(recs, 'gpuMid', `${cpuLabel()} est déjà très performant en jeu : avec ${gpuLabel()}, la carte graphique est nettement plus logique à améliorer en premier.`, 100);
  } else if (cpuInfo.tier >= 4 && gpuInfo.tier <= 2) {
    pushUnique(recs, 'gpuMid', `${cpuLabel()} est encore solide pour jouer : avec ${gpuLabel()}, le GPU est la priorité la plus logique.`, 98);
  }

  const gpuRec = recs.find(rec => rec.key === 'gpuHigh' || rec.key === 'gpuMid');
  if (gpuRec && psu > 0) {
    const targetPsu = gpuRec.key === 'gpuHigh' ? 750 : 650;
    if (psu < targetPsu) {
      pushUnique(recs, 'psu', `Ton alimentation de ${psu} W peut manquer de marge avec certaines cartes proposées. Vérifie la puissance et les connecteurs exigés par le modèle choisi.`, gpuRec.key === 'gpuHigh' ? 94 : 88);
    }
  }

  if (cpuInfo.tier >= 4 && gpuInfo.tier >= 5 && resolution === '1080' && budget >= 200) {
    pushUnique(recs, 'monitor', 'Ta configuration est déjà très solide en 1080p : un meilleur écran peut apporter un changement plus perceptible qu’un petit upgrade interne.', 76);
  }

  if (recs.length === 0) {
    if (ram < 32) pushUnique(recs, 'ram32', 'Ta configuration paraît assez équilibrée ; la RAM est surtout un upgrade de confort.', 55);
    pushUnique(recs, 'monitor', 'Avant de remplacer une pièce encore correcte, vérifie si un meilleur écran améliorerait davantage ton expérience.', 50);
  }

  recs.sort((a, b) => b.score - a.score);
  const top = recs.slice(0, 3);

  recommendations.innerHTML = top.map((rec, index) => {
    const item = catalog[rec.key];
    return `
      <article class="recommendation">
        <div class="recommendation-top">
          <span class="rank">${index + 1}</span>
          <span class="badge">${item.impact}</span>
        </div>
        <h3>${item.title}</h3>
        <p class="reason">${rec.reason}</p>
        <p>${item.desc}</p>
        <div class="price">${item.price}</div>
        ${renderProducts(rec.key, budget, context)}
        <small class="compatibility">Avant achat : vérifie la carte mère, l’alimentation, les dimensions et la connectique. Les prix et stocks sont ceux du marchand au moment du clic.</small>
      </article>
    `;
  }).join('');

  const resolutionLabel = resolution === '4k' ? '4K' : `${resolution}p`;
  const psuLabel = psu ? `${psu} W` : 'alimentation inconnue';
  summaryText.textContent = `${cpuLabel()} + ${gpuLabel()} • ${ram} Go ${ramTypeLabel()} • ${psuLabel} • ${resolutionLabel} • Budget : ${budget} € • ${goalLabel()}`;

  latestShareText = `Mon diagnostic UpgradeMyPC — ${summaryText.textContent}\n${top.map((rec, i) => {
    const productNames = productListFor(rec.key, budget, context).map(product => product.name).join(', ');
    return `${i + 1}. ${catalog[rec.key].title}${productNames ? ` — ${productNames}` : ''}`;
  }).join('\n')}`;

  results.classList.remove('hidden');
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

copyResult.addEventListener('click', async () => {
  if (!latestShareText) return;
  try {
    await navigator.clipboard.writeText(latestShareText);
    const original = copyResult.textContent;
    copyResult.textContent = 'Diagnostic copié ✓';
    setTimeout(() => { copyResult.textContent = original; }, 1800);
  } catch {
    window.prompt('Copie ton diagnostic :', latestShareText);
  }
});

document.addEventListener('click', (event) => {
  const affiliate = event.target.closest('[data-affiliate]');
  if (!affiliate) return;
  console.info('Outbound affiliate click:', affiliate.dataset.affiliate, affiliate.dataset.merchant);
});
