const form = document.getElementById('pcForm');
const results = document.getElementById('results');
const recommendations = document.getElementById('recommendations');
const summaryText = document.getElementById('summaryText');
const copyResult = document.getElementById('copyResult');

const affiliateProducts = window.AFFILIATE_PRODUCTS || {};
const affiliateMerchants = window.AFFILIATE_MERCHANTS || {};
let latestShareText = '';

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

  if (!active.length) {
    return `<div class="merchant-pending">Liens marchands affiliés en cours d’activation.</div>`;
  }

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

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const gpu = document.getElementById('gpu').value;
  const cpu = document.getElementById('cpu').value;
  const ram = Number(document.getElementById('ram').value);
  const storage = document.getElementById('storage').value;
  const resolution = document.getElementById('resolution').value;
  const budget = Number(document.getElementById('budget').value);
  const goal = document.getElementById('goal').value;

  let recs = [];

  if (ram < 16) pushUnique(recs, 'ram16', 'La quantité de RAM est le premier point à corriger avant d’envisager une grosse dépense.', 100);
  if (ram >= 16 && ram < 32 && goal === 'smooth') pushUnique(recs, 'ram32', 'Ton objectif privilégie la fluidité et le multitâche.', 82);
  if (storage === 'hdd') pushUnique(recs, 'nvme', 'Le stockage mécanique est le point faible le plus évident pour la réactivité et les chargements.', 97);
  if (storage === 'sata' && goal === 'loading') pushUnique(recs, 'nvme', 'Ton objectif concerne surtout les temps de chargement et la réactivité du stockage.', 86);

  const lowGpu = ['gtx1650', 'rtx2060', 'rx6600'].includes(gpu);
  const midGpu = ['rtx3060', 'rtx3070', 'rtx4060', 'rx6700'].includes(gpu);
  const strongGpu = ['rtx4070', 'rtx50', 'rx7800', 'rx9000'].includes(gpu);

  if (goal === 'fps' || goal === 'quality') {
    if (lowGpu && budget >= 300) pushUnique(recs, 'gpuMid', 'Pour cet objectif, la carte graphique est probablement l’endroit où ton budget aura le plus d’impact.', 95);
    if (midGpu && resolution !== '1080' && budget >= 500) pushUnique(recs, 'gpuHigh', 'À cette résolution, une carte graphique plus puissante peut apporter le gain le plus visible.', 91);
    if (strongGpu && resolution === '4k' && budget >= 800) pushUnique(recs, 'gpuHigh', 'La 4K reste très exigeante : un GPU supérieur peut encore améliorer les réglages ou les FPS, mais le rapport coût/gain doit être vérifié.', 70);
  }

  if ((cpu === 'old4' || cpu === 'mid6') && goal === 'fps' && budget >= 200) {
    pushUnique(recs, 'cpu', 'Ton processeur peut devenir limitant si tu recherches des FPS très élevés.', 84);
  }

  if (cpu === 'x3d' && lowGpu) {
    pushUnique(recs, 'gpuMid', 'Ton processeur est déjà très orienté gaming : la carte graphique est la piste la plus logique.', 99);
  }

  if ((cpu === 'high8' || cpu === 'x3d') && strongGpu && resolution === '1080' && budget >= 200) {
    pushUnique(recs, 'monitor', 'Ta configuration est déjà solide en 1080p : l’écran peut apporter un changement plus perceptible qu’un petit upgrade interne.', 76);
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
  summaryText.textContent = `Budget : ${budget} € • Résolution : ${resolutionLabel} • Objectif : ${goalLabel()}`;
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
