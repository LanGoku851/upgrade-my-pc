const form = document.getElementById('pcForm');
const results = document.getElementById('results');
const recommendations = document.getElementById('recommendations');
const summaryText = document.getElementById('summaryText');
const copyResult = document.getElementById('copyResult');
const gpuSelect = document.getElementById('gpu');

const affiliateProducts = window.AFFILIATE_PRODUCTS || {};
const affiliateMerchants = window.AFFILIATE_MERCHANTS || {};
let latestShareText = '';

// On remplace la liste GPU générique du HTML par de vrais modèles.
gpuSelect.innerHTML = `
  <option value="">Choisir</option>

  <optgroup label="NVIDIA GeForce GTX 10">
    <option value="gtx-1050ti">GTX 1050 Ti</option>
    <option value="gtx-1060">GTX 1060</option>
    <option value="gtx-1070">GTX 1070</option>
    <option value="gtx-1070ti">GTX 1070 Ti</option>
    <option value="gtx-1080">GTX 1080</option>
    <option value="gtx-1080ti">GTX 1080 Ti</option>
  </optgroup>

  <optgroup label="NVIDIA GeForce GTX 16">
    <option value="gtx-1650">GTX 1650</option>
    <option value="gtx-1650s">GTX 1650 Super</option>
    <option value="gtx-1660">GTX 1660</option>
    <option value="gtx-1660s">GTX 1660 Super</option>
    <option value="gtx-1660ti">GTX 1660 Ti</option>
  </optgroup>

  <optgroup label="NVIDIA GeForce RTX 20">
    <option value="rtx-2060">RTX 2060</option>
    <option value="rtx-2060s">RTX 2060 Super</option>
    <option value="rtx-2070">RTX 2070</option>
    <option value="rtx-2070s">RTX 2070 Super</option>
    <option value="rtx-2080">RTX 2080</option>
    <option value="rtx-2080s">RTX 2080 Super</option>
    <option value="rtx-2080ti">RTX 2080 Ti</option>
  </optgroup>

  <optgroup label="NVIDIA GeForce RTX 30">
    <option value="rtx-3050">RTX 3050</option>
    <option value="rtx-3060">RTX 3060</option>
    <option value="rtx-3060ti">RTX 3060 Ti</option>
    <option value="rtx-3070">RTX 3070</option>
    <option value="rtx-3070ti">RTX 3070 Ti</option>
    <option value="rtx-3080">RTX 3080</option>
    <option value="rtx-3080ti">RTX 3080 Ti</option>
    <option value="rtx-3090">RTX 3090</option>
    <option value="rtx-3090ti">RTX 3090 Ti</option>
  </optgroup>

  <optgroup label="NVIDIA GeForce RTX 40">
    <option value="rtx-4060">RTX 4060</option>
    <option value="rtx-4060ti">RTX 4060 Ti</option>
    <option value="rtx-4070">RTX 4070</option>
    <option value="rtx-4070s">RTX 4070 Super</option>
    <option value="rtx-4070ti">RTX 4070 Ti</option>
    <option value="rtx-4070tis">RTX 4070 Ti Super</option>
    <option value="rtx-4080">RTX 4080</option>
    <option value="rtx-4080s">RTX 4080 Super</option>
    <option value="rtx-4090">RTX 4090</option>
  </optgroup>

  <optgroup label="NVIDIA GeForce RTX 50">
    <option value="rtx-5050">RTX 5050</option>
    <option value="rtx-5060">RTX 5060</option>
    <option value="rtx-5060ti">RTX 5060 Ti</option>
    <option value="rtx-5070">RTX 5070</option>
    <option value="rtx-5070ti">RTX 5070 Ti</option>
    <option value="rtx-5080">RTX 5080</option>
    <option value="rtx-5090">RTX 5090</option>
  </optgroup>

  <optgroup label="AMD Radeon RX 500">
    <option value="rx-570">RX 570</option>
    <option value="rx-580">RX 580</option>
    <option value="rx-590">RX 590</option>
  </optgroup>

  <optgroup label="AMD Radeon RX 5000">
    <option value="rx-5500xt">RX 5500 XT</option>
    <option value="rx-5600xt">RX 5600 XT</option>
    <option value="rx-5700">RX 5700</option>
    <option value="rx-5700xt">RX 5700 XT</option>
  </optgroup>

  <optgroup label="AMD Radeon RX 6000">
    <option value="rx-6400">RX 6400</option>
    <option value="rx-6500xt">RX 6500 XT</option>
    <option value="rx-6600">RX 6600</option>
    <option value="rx-6600xt">RX 6600 XT</option>
    <option value="rx-6650xt">RX 6650 XT</option>
    <option value="rx-6700">RX 6700</option>
    <option value="rx-6700xt">RX 6700 XT</option>
    <option value="rx-6750xt">RX 6750 XT</option>
    <option value="rx-6800">RX 6800</option>
    <option value="rx-6800xt">RX 6800 XT</option>
    <option value="rx-6900xt">RX 6900 XT</option>
    <option value="rx-6950xt">RX 6950 XT</option>
  </optgroup>

  <optgroup label="AMD Radeon RX 7000">
    <option value="rx-7600">RX 7600</option>
    <option value="rx-7600xt">RX 7600 XT</option>
    <option value="rx-7700xt">RX 7700 XT</option>
    <option value="rx-7800xt">RX 7800 XT</option>
    <option value="rx-7900gre">RX 7900 GRE</option>
    <option value="rx-7900xt">RX 7900 XT</option>
    <option value="rx-7900xtx">RX 7900 XTX</option>
  </optgroup>

  <optgroup label="AMD Radeon RX 9000">
    <option value="rx-9050">RX 9050</option>
    <option value="rx-9060">RX 9060</option>
    <option value="rx-9060xt8">RX 9060 XT 8 Go</option>
    <option value="rx-9060xt16">RX 9060 XT 16 Go</option>
    <option value="rx-9070gre">RX 9070 GRE</option>
    <option value="rx-9070">RX 9070</option>
    <option value="rx-9070xt">RX 9070 XT</option>
  </optgroup>

  <optgroup label="Intel Arc A-Series">
    <option value="arc-a380">Arc A380</option>
    <option value="arc-a580">Arc A580</option>
    <option value="arc-a750">Arc A750</option>
    <option value="arc-a770">Arc A770</option>
  </optgroup>

  <optgroup label="Intel Arc B-Series">
    <option value="arc-b570">Arc B570</option>
    <option value="arc-b580">Arc B580</option>
  </optgroup>

  <option value="other">Autre / Je ne sais pas</option>
`;

const catalog = {
  ram16: {
    title: 'Passer à au moins 16 Go de RAM',
    price: 'Budget généralement accessible',
    impact: 'Priorité forte',
    desc: 'À envisager avant un gros achat si la mémoire disponible provoque déjà des ralentissements ou des fermetures d’applications.'
  },
  ram32: {
    title: 'Passer à 32 Go de RAM',
    price: 'Upgrade de confort',
    impact: 'Confort',
    desc: 'Particulièrement utile avec Discord, navigateur, mods, streaming ou plusieurs applications ouvertes pendant le jeu.'
  },
  nvme: {
    title: 'Ajouter ou remplacer par un SSD NVMe',
    price: 'Bon rapport confort / prix',
    impact: 'Chargements',
    desc: 'Réduit surtout les temps de chargement, les installations et certaines attentes liées au stockage.'
  },
  gpuMid: {
    title: 'Monter en gamme côté carte graphique',
    price: 'Investissement moyen',
    impact: 'FPS',
    desc: 'La carte graphique est souvent le levier principal pour obtenir plus de FPS ou augmenter les réglages graphiques.'
  },
  gpuHigh: {
    title: 'Passer à une carte graphique plus puissante',
    price: 'Investissement important',
    impact: 'Gros gain potentiel',
    desc: 'Pertinent lorsque la résolution et les réglages graphiques sollicitent fortement la carte graphique.'
  },
  cpu: {
    title: 'Étudier un upgrade processeur / plateforme',
    price: 'Dépend de la carte mère',
    impact: 'FPS CPU',
    desc: 'À regarder si le processeur limite les hauts FPS. Un changement de plateforme peut aussi imposer une nouvelle carte mère ou de la RAM.'
  },
  monitor: {
    title: 'Améliorer l’écran plutôt que le PC',
    price: 'Upgrade visible immédiatement',
    impact: 'Expérience',
    desc: 'Si le PC atteint déjà beaucoup de FPS, un écran mieux adapté peut être plus perceptible qu’un petit remplacement de composant.'
  }
};

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

// Tiers internes volontairement larges : ils servent à comparer les grandes classes de GPU,
// pas à prétendre remplacer des benchmarks jeu par jeu.
const gpuProfiles = {
  'gtx-1050ti': { tier: 1 }, 'gtx-1060': { tier: 1 }, 'gtx-1070': { tier: 2 }, 'gtx-1070ti': { tier: 2 }, 'gtx-1080': { tier: 2 }, 'gtx-1080ti': { tier: 3 },
  'gtx-1650': { tier: 1 }, 'gtx-1650s': { tier: 1 }, 'gtx-1660': { tier: 2 }, 'gtx-1660s': { tier: 2 }, 'gtx-1660ti': { tier: 2 },
  'rtx-2060': { tier: 2 }, 'rtx-2060s': { tier: 3 }, 'rtx-2070': { tier: 3 }, 'rtx-2070s': { tier: 3 }, 'rtx-2080': { tier: 3 }, 'rtx-2080s': { tier: 3 }, 'rtx-2080ti': { tier: 4 },
  'rtx-3050': { tier: 2 }, 'rtx-3060': { tier: 3 }, 'rtx-3060ti': { tier: 4 }, 'rtx-3070': { tier: 4 }, 'rtx-3070ti': { tier: 4 },
  'rtx-3080': { tier: 5 }, 'rtx-3080ti': { tier: 5 }, 'rtx-3090': { tier: 5 }, 'rtx-3090ti': { tier: 5 },
  'rtx-4060': { tier: 3 }, 'rtx-4060ti': { tier: 4 }, 'rtx-4070': { tier: 5 }, 'rtx-4070s': { tier: 5 },
  'rtx-4070ti': { tier: 5 }, 'rtx-4070tis': { tier: 6 }, 'rtx-4080': { tier: 6 }, 'rtx-4080s': { tier: 6 }, 'rtx-4090': { tier: 7 },
  'rtx-5050': { tier: 3 }, 'rtx-5060': { tier: 4 }, 'rtx-5060ti': { tier: 4 }, 'rtx-5070': { tier: 5 },
  'rtx-5070ti': { tier: 6 }, 'rtx-5080': { tier: 6 }, 'rtx-5090': { tier: 7 },

  'rx-570': { tier: 1 }, 'rx-580': { tier: 1 }, 'rx-590': { tier: 1 },
  'rx-5500xt': { tier: 1 }, 'rx-5600xt': { tier: 2 }, 'rx-5700': { tier: 3 }, 'rx-5700xt': { tier: 3 },
  'rx-6400': { tier: 1 }, 'rx-6500xt': { tier: 1 }, 'rx-6600': { tier: 2 }, 'rx-6600xt': { tier: 3 }, 'rx-6650xt': { tier: 3 },
  'rx-6700': { tier: 3 }, 'rx-6700xt': { tier: 4 }, 'rx-6750xt': { tier: 4 }, 'rx-6800': { tier: 4 },
  'rx-6800xt': { tier: 5 }, 'rx-6900xt': { tier: 5 }, 'rx-6950xt': { tier: 5 },
  'rx-7600': { tier: 3 }, 'rx-7600xt': { tier: 3 }, 'rx-7700xt': { tier: 4 }, 'rx-7800xt': { tier: 5 },
  'rx-7900gre': { tier: 5 }, 'rx-7900xt': { tier: 6 }, 'rx-7900xtx': { tier: 6 },
  'rx-9050': { tier: 2 }, 'rx-9060': { tier: 3 }, 'rx-9060xt8': { tier: 4 }, 'rx-9060xt16': { tier: 4 },
  'rx-9070gre': { tier: 5 }, 'rx-9070': { tier: 5 }, 'rx-9070xt': { tier: 6 },

  'arc-a380': { tier: 1 }, 'arc-a580': { tier: 2 }, 'arc-a750': { tier: 3 }, 'arc-a770': { tier: 3 },
  'arc-b570': { tier: 3 }, 'arc-b580': { tier: 4 },
  other: { tier: 3 }
};

function pushUnique(arr, key, reason, score) {
  if (!arr.some(x => x.key === key)) arr.push({ key, reason, score });
}

function isValidUrl(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url);
}

function productListFor(key, budget) {
  const products = Array.isArray(affiliateProducts[key]) ? affiliateProducts[key] : [];
  if (key === 'gpuHigh') {
    if (budget < 700) return products.slice(0, 1);
    if (budget < 1000) return products.slice(0, 2);
  }
  return products.slice(0, 3);
}

function merchantButtons(product) {
  const merchants = product.merchants || {};
  const entries = Object.entries(merchants);
  const active = entries.filter(([, url]) => isValidUrl(url));

  if (!entries.length) return '';
  if (!active.length) return `<div class="merchant-pending">Liens marchands affiliés en cours d’activation.</div>`;

  return `<div class="merchant-actions">${active.map(([merchantId, url]) => {
    const merchantName = affiliateMerchants[merchantId] || merchantId;
    return `<a class="merchant-btn" href="${url}" target="_blank" rel="nofollow sponsored noopener" data-affiliate="${product.id}" data-merchant="${merchantId}">Voir chez ${merchantName}</a>`;
  }).join('')}</div>`;
}

function renderProducts(key, budget) {
  const products = productListFor(key, budget);
  if (!products.length) return '';

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

function goalLabel() {
  return document.getElementById('goal').selectedOptions[0].text;
}

function cpuLabel() {
  return document.getElementById('cpu').selectedOptions[0].text;
}

function gpuLabel() {
  return document.getElementById('gpu').selectedOptions[0].text;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const gpu = document.getElementById('gpu').value;
  const cpu = document.getElementById('cpu').value;
  const ram = Number(document.getElementById('ram').value);
  const storage = document.getElementById('storage').value;
  const resolution = document.getElementById('resolution').value;
  const budget = Number(document.getElementById('budget').value);
  const goal = document.getElementById('goal').value;
  const cpuInfo = cpuProfiles[cpu] || cpuProfiles.other;
  const gpuInfo = gpuProfiles[gpu] || gpuProfiles.other;

  let recs = [];

  if (ram < 16) pushUnique(recs, 'ram16', 'La quantité de RAM est le premier point à corriger avant d’envisager une grosse dépense.', 100);
  if (ram >= 16 && ram < 32 && goal === 'smooth') pushUnique(recs, 'ram32', 'Ton objectif privilégie la fluidité et le multitâche.', 82);
  if (storage === 'hdd') pushUnique(recs, 'nvme', 'Le stockage mécanique est le point faible le plus évident pour la réactivité et les chargements.', 97);
  if (storage === 'sata' && goal === 'loading') pushUnique(recs, 'nvme', 'Ton objectif concerne surtout les temps de chargement et la réactivité du stockage.', 86);

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
      pushUnique(recs, 'cpu', `${cpuLabel()} peut aujourd’hui devenir limitant si tu recherches des FPS élevés${gpuInfo.tier >= 4 ? ` avec une ${gpuLabel()}` : ''}.`, cpuScore);
    } else if (cpuInfo.tier === 3 && resolution === '1080' && gpuInfo.tier >= 4 && budget >= 350) {
      pushUnique(recs, 'cpu', `${cpuLabel()} reste utilisable, mais un processeur plus rapide peut améliorer les hauts FPS en 1080p avec ${gpuLabel()}.`, 78);
    }
  }

  if (cpuInfo.x3d && gpuInfo.tier <= 3) {
    pushUnique(recs, 'gpuMid', `${cpuLabel()} est déjà très performant en jeu : avec ${gpuLabel()}, la carte graphique est nettement plus logique à améliorer en premier.`, 100);
  } else if (cpuInfo.tier >= 4 && gpuInfo.tier <= 2) {
    pushUnique(recs, 'gpuMid', `${cpuLabel()} est encore solide pour jouer : avec ${gpuLabel()}, le GPU est la priorité la plus logique.`, 98);
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
        ${renderProducts(rec.key, budget)}
        <small class="compatibility">Avant achat : vérifie compatibilité, alimentation, dimensions et connectique. Les prix et stocks sont ceux du marchand au moment du clic.</small>
      </article>
    `;
  }).join('');

  const resolutionLabel = resolution === '4k' ? '4K' : `${resolution}p`;
  summaryText.textContent = `${cpuLabel()} + ${gpuLabel()} • Budget : ${budget} € • Résolution : ${resolutionLabel} • Objectif : ${goalLabel()}`;
  latestShareText = `Mon diagnostic UpgradeMyPC — ${summaryText.textContent}\n${top.map((rec, i) => {
    const productNames = productListFor(rec.key, budget).map(product => product.name).join(', ');
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
    setTimeout(() => copyResult.textContent = original, 1800);
  } catch {
    window.prompt('Copie ton diagnostic :', latestShareText);
  }
});

document.addEventListener('click', (event) => {
  const affiliate = event.target.closest('[data-affiliate]');
  if (!affiliate) return;
  console.info('Outbound affiliate click:', affiliate.dataset.affiliate, affiliate.dataset.merchant);
});
