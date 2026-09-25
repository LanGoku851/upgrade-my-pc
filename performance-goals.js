(() => {
  const form = document.getElementById('pcForm');
  const recommendations = document.getElementById('recommendations');
  const summaryText = document.getElementById('summaryText');
  const resolutionSelect = document.getElementById('resolution');
  const budgetSelect = document.getElementById('budget');
  const cpuSelect = document.getElementById('cpu');
  const gpuSelect = document.getElementById('gpu');
  const goalSelect = document.getElementById('goal');
  if (!form || !recommendations || !summaryText || !resolutionSelect || !budgetSelect || !cpuSelect || !gpuSelect || !goalSelect) return;

  if (!document.querySelector('link[href="performance-goals.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'performance-goals.css';
    document.head.appendChild(link);
  }

  if (!document.getElementById('targetFps')) {
    budgetSelect.closest('label').insertAdjacentHTML('beforebegin', `
      <label>Nombre de FPS visé
        <select id="targetFps" required>
          <option value="60">60 FPS</option>
          <option value="90">90 FPS</option>
          <option value="120">120 FPS</option>
          <option value="144" selected>144 FPS</option>
          <option value="165">165 FPS</option>
          <option value="240">240 FPS</option>
          <option value="360">360 FPS et plus</option>
        </select>
      </label>

      <label>Type de jeux principal
        <select id="gameType" required>
          <option value="mixed" selected>Mixte / un peu de tout</option>
          <option value="competitive">Compétitif / e-sport</option>
          <option value="aaa">AAA / solo exigeant</option>
          <option value="simulation">Simulation / stratégie</option>
        </select>
      </label>
    `);
  }

  const targetFps = document.getElementById('targetFps');
  const gameType = document.getElementById('gameType');

  let panel = document.getElementById('performanceTarget');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'performanceTarget';
    panel.className = 'performance-panel hidden';
    recommendations.parentElement.insertBefore(panel, recommendations);
  }

  const highCpu = new Set([
    'r7-5700x3d','r7-5800x3d','r5-7500f','r5-7600','r7-7700','r7-7800x3d','r9-7900x','r9-7950x3d',
    'r5-9600x','r7-9700x','r7-9800x3d','r9-9900x','r9-9950x3d','i5-12600k','i7-12700k','i9-12900k',
    'i5-13600k','i7-13700k','i9-13900k','i5-14600k','i7-14700k','i9-14900k','ultra5-245k','ultra7-265k','ultra9-285k'
  ]);
  const midCpu = new Set([
    'r5-5600','r7-5700x','r9-5900x','i9-10900k','i9-11900k','i5-12400','i5-13400f','i5-14400f'
  ]);

  const highGpu = new Set([
    'rtx-3080','rtx-3080ti','rtx-3090','rtx-3090ti','rtx-4070','rtx-4070s','rtx-4070ti','rtx-4070tis','rtx-4080','rtx-4080s','rtx-4090',
    'rtx-5070','rtx-5070ti','rtx-5080','rtx-5090','rx-6800xt','rx-6900xt','rx-6950xt','rx-7800xt','rx-7900gre','rx-7900xt','rx-7900xtx',
    'rx-9070gre','rx-9070','rx-9070xt'
  ]);
  const midGpu = new Set([
    'rtx-3060ti','rtx-3070','rtx-3070ti','rtx-4060ti','rtx-5060','rtx-5060ti','rx-6700xt','rx-6750xt','rx-6800','rx-7700xt','rx-9060xt8','rx-9060xt16','arc-b580'
  ]);

  function cpuTier(id) {
    if (highCpu.has(id)) return 3;
    if (midCpu.has(id)) return 2;
    return id === 'other' ? 2 : 1;
  }

  function gpuTier(id) {
    if (highGpu.has(id)) return 3;
    if (midGpu.has(id)) return 2;
    return id === 'other' ? 2 : 1;
  }

  function analyseTarget() {
    const fps = Number(targetFps.value);
    const type = gameType.value;
    const resolution = resolutionSelect.value;
    const cpu = cpuTier(cpuSelect.value);
    const gpu = gpuTier(gpuSelect.value);

    let priority = 'balanced';
    let status = 'balanced';
    let title = 'Équilibre CPU / GPU';
    let text = `Pour viser ${fps} FPS en ${resolution === '4k' ? '4K' : `${resolution}p`}, le CPU et le GPU doivent rester cohérents entre eux.`;

    if (type === 'competitive' && fps >= 240) {
      priority = cpu <= 1 ? 'cpu' : gpu <= 1 ? 'gpu' : 'balanced';
      status = 'high';
      title = 'Cible très élevée : attention au CPU';
      text = cpu <= 1
        ? `${fps} FPS en compétitif demande souvent beaucoup au processeur. Ton CPU devient une priorité importante avant de chercher une carte graphique extrême.`
        : `${fps} FPS en compétitif exige un processeur rapide et une carte graphique suffisante. Ton CPU paraît déjà solide, donc le GPU et les réglages du jeu deviennent déterminants.`;
    } else if (type === 'competitive' && fps >= 144) {
      priority = cpu <= 1 ? 'cpu' : gpu <= 1 ? 'gpu' : 'balanced';
      status = 'high';
      title = 'Hauts FPS compétitifs';
      text = cpu <= 1
        ? `À ${fps} FPS, ton processeur peut limiter les performances avant même que la carte graphique soit pleinement utilisée.`
        : `Pour ${fps} FPS en compétitif, ta plateforme CPU est raisonnable ; surveille surtout le GPU si tu augmentes aussi les détails graphiques.`;
    } else if (type === 'simulation') {
      priority = cpu <= 2 ? 'cpu' : (gpu <= 1 && resolution !== '1080' ? 'gpu' : 'balanced');
      status = 'cpu';
      title = 'Simulation : charge CPU importante';
      text = `Les simulations et jeux de stratégie peuvent fortement dépendre du processeur, surtout lorsque la scène contient beaucoup d’unités, d’IA ou de physique.`;
    } else if (type === 'aaa' && (resolution === '4k' || resolution === '1440')) {
      priority = gpu <= 2 ? 'gpu' : 'balanced';
      status = 'gpu';
      title = 'AAA : priorité aux performances graphiques';
      text = `En ${resolution === '4k' ? '4K' : '1440p'} sur des jeux AAA, la carte graphique est généralement davantage sollicitée. Pour ${fps} FPS, son niveau devient central.`;
    } else if (fps <= 90 && resolution === '4k') {
      priority = gpu <= 2 ? 'gpu' : 'balanced';
      status = 'gpu';
      title = '4K : charge GPU dominante';
      text = `Même à ${fps} FPS, la 4K demande beaucoup de puissance graphique. Le GPU reste le premier point à surveiller.`;
    } else if (fps >= 165 && resolution === '1080') {
      priority = cpu <= 1 ? 'cpu' : gpu <= 1 ? 'gpu' : 'balanced';
      status = 'high';
      title = 'Hauts FPS en 1080p';
      text = `À ${fps} FPS en 1080p, le processeur prend davantage d’importance qu’à 60–90 FPS, surtout dans les jeux compétitifs ou très dépendants du CPU.`;
    }

    if (goalSelect.value === 'loading') {
      priority = 'storage';
      status = 'balanced';
      title = 'Objectif chargements : le stockage passe avant les FPS';
      text = 'Tu as choisi les chargements comme objectif principal : le FPS visé reste informatif, mais le SSD doit rester prioritaire si le stockage actuel est lent.';
    }

    return { fps, type, resolution, cpu, gpu, priority, status, title, text };
  }

  function movePriorityCard(priority) {
    if (!['cpu','gpu'].includes(priority)) return;
    const cards = [...recommendations.querySelectorAll('.recommendation')];
    if (!cards.length) return;

    const target = priority === 'cpu'
      ? cards.find(card => /processeur|plateforme/i.test(card.querySelector('h3')?.textContent || ''))
      : cards.find(card => /carte graphique|gpu/i.test(card.querySelector('h3')?.textContent || ''));

    if (!target || target === cards[0]) return;
    recommendations.insertBefore(target, recommendations.firstElementChild);
    [...recommendations.querySelectorAll('.recommendation')].forEach((card, index) => {
      const rank = card.querySelector('.rank');
      if (rank) rank.textContent = String(index + 1);
    });
  }

  function renderTarget() {
    const result = analyseTarget();
    const labels = {
      mixed: 'mixte',
      competitive: 'compétitif / e-sport',
      aaa: 'AAA / solo exigeant',
      simulation: 'simulation / stratégie'
    };

    panel.className = 'performance-panel';
    panel.innerHTML = `
      <div class="performance-panel-head">
        <h3>Objectif de performances</h3>
        <span class="performance-status ${result.status}">${result.fps} FPS</span>
      </div>
      <p><strong>${result.title}</strong></p>
      <p>${result.text}</p>
      <p class="performance-meta">Profil : ${labels[result.type]} • Résolution : ${result.resolution === '4k' ? '4K' : `${result.resolution}p`}</p>
    `;

    movePriorityCard(result.priority);

    const currentSummary = summaryText.textContent;
    if (currentSummary && !currentSummary.includes(`${result.fps} FPS`)) {
      summaryText.textContent = `${currentSummary} • cible ${result.fps} FPS • ${labels[result.type]}`;
    }

    const firstCard = recommendations.querySelector('.recommendation');
    if (firstCard && !firstCard.querySelector('.performance-inline-note')) {
      firstCard.insertAdjacentHTML('beforeend', `<div class="performance-inline-note">Cible utilisateur : <strong>${result.fps} FPS</strong> en profil ${labels[result.type]}.</div>`);
    }
  }

  form.addEventListener('submit', () => setTimeout(renderTarget, 20));
})();
