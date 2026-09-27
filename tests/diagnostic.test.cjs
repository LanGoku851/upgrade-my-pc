const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const root = path.resolve(__dirname, '..');
async function setup(t) {
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {
    runScripts: 'outside-only', url: 'https://example.test/'
  });
  t.after(() => dom.window.close());
  const w = dom.window;
  w.HTMLElement.prototype.scrollIntoView = () => {};
  for (const file of ['affiliate-config.js', 'epn-links.js', 'catalog-additions.js', 'app.js',
    'platform-compat.js', 'case-compat.js', 'performance-goals.js', 'product-details.js',
    'power-compat.js', 'budget-planner.js']) {
    w.eval(fs.readFileSync(path.join(root, file), 'utf8'));
  }
  const select = (id, value) => {
    const el = w.document.getElementById(id);
    el.value = String(value);
    assert.equal(el.value, String(value), `Unknown option ${id}=${value}`);
    el.dispatchEvent(new w.Event('change', { bubbles: true }));
  };
  const submit = async (values = {}) => {
    for (const [id, value] of Object.entries(values)) select(id, value);
    w.document.getElementById('pcForm').dispatchEvent(new w.Event('submit', { cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 180));
    return [...w.document.querySelectorAll('.recommendation h3')].map(el => el.textContent);
  };
  select('cpu', 'r7-7800x3d');
  select('gpu', 'rtx-3060');
  return { w, select, submit };
}

test('automatic RAM inference clears when the next CPU supports both generations', async t => {
  const { w, select } = await setup(t);
  select('cpu', 'i5-12400');
  assert.equal(w.document.getElementById('ramType').value, 'unknown');
  select('cpu', 'r5-5600');
  assert.equal(w.document.getElementById('ramType').value, 'ddr4');
  select('cpu', 'other');
  assert.equal(w.document.getElementById('ramType').value, 'unknown');
});

test('a manually entered incompatible RAM type cannot produce purchase suggestions', async t => {
  const { w, select, submit } = await setup(t);
  select('ramType', 'ddr4');
  await submit({ ram: 8 });
  assert.doesNotMatch(w.document.getElementById('recommendations').textContent, /DDR4-3200|DDR4 3200/);
  const ramCard = [...w.document.querySelectorAll('.recommendation')].find(el => /RAM/.test(el.querySelector('h3').textContent));
  assert.equal(ramCard.querySelectorAll('.product-option').length, 0);
});

test('loading goal keeps HDD upgrade first and does not recommend a GPU', async t => {
  const { submit } = await setup(t);
  const titles = await submit({ goal: 'loading', storage: 'hdd' });
  assert.match(titles[0], /SSD/);
  assert.ok(titles.every(title => !/carte graphique/.test(title)));
});

test('GPU deduplication preserves the third useful recommendation', async t => {
  const { submit } = await setup(t);
  const titles = await submit({ ram: 8, storage: 'nvme4', storageCapacity: 500, psu: 1000 });
  assert.equal(titles.length, 3);
  assert.equal(titles.filter(title => /carte graphique/.test(title)).length, 1);
  assert.ok(titles.some(title => /stockage/.test(title)));
});

test('unknown GPU never triggers an orphan PSU upgrade', async t => {
  const { submit } = await setup(t);
  const titles = await submit({ gpu: 'other', psu: 450 });
  assert.ok(titles.length > 0);
  assert.ok(titles.every(title => !/carte graphique|alimentation adaptée/.test(title)));
});

test('unknown CPU and GPU retain RAM and storage advice', async t => {
  const { submit } = await setup(t);
  const titles = await submit({ cpu: 'other', gpu: 'other', ram: 8, storage: 'hdd', psu: 450 });
  assert.ok(titles.some(title => /RAM/.test(title)));
  assert.ok(titles.some(title => /SSD/.test(title)));
  assert.ok(titles.every(title => !/processeur|carte graphique|alimentation adaptée/.test(title)));
});

test('copied diagnosis lists product names without treating budget labels as products', async t => {
  const { w, submit } = await setup(t);
  let copied = '';
  Object.defineProperty(w.navigator, 'clipboard', { value: { writeText: async text => { copied = text; } } });
  await submit();
  w.document.getElementById('copyResult').click();
  assert.match(copied, /Mon diagnostic UpgradeMyPC/);
  assert.doesNotMatch(copied, /, Budget indicatif/);
});

test('Intel LGA1700 preserves either manually confirmed DDR4 or DDR5', async t => {
  const { w, select, submit } = await setup(t);
  select('cpu', 'i5-12400');
  for (const type of ['ddr4', 'ddr5']) {
    await submit({ ramType: type, ram: 8 });
    const ramCard = [...w.document.querySelectorAll('.recommendation')].find(el => /RAM/.test(el.querySelector('h3').textContent));
    assert.ok(ramCard.querySelectorAll('.product-option').length > 0);
    assert.equal(w.document.getElementById('ramType').value, type);
  }
  await submit({ ramType: 'ddr3' });
  assert.match(w.document.getElementById('platformCompatibility').textContent, /Attention/);
});

test('known GPU with insufficient power retains a PSU recommendation and includes its cost', async t => {
  const { w, submit } = await setup(t);
  const titles = await submit({ gpu: 'rtx-3070', psu: 450, budget: 800 });
  assert.ok(titles.some(title => /alimentation adaptée/.test(title)));
  const gpuCard = [...w.document.querySelectorAll('.recommendation')].find(el => /carte graphique/.test(el.querySelector('h3').textContent));
  assert.match(gpuCard.textContent, /alimentation adaptée estimée/);
});

test('tiny case excludes oversized GPUs from budget scenarios', async t => {
  const { w, submit } = await setup(t);
  await submit({ gpu: 'rtx-3070', gpuClearance: 249, budget: 1200 });
  assert.ok(w.document.querySelectorAll('.product-incompatible').length > 0);
  for (const row of w.document.querySelectorAll('.product-incompatible')) {
    assert.ok(!row.classList.contains('budget-fit'));
    const name = row.querySelector('.product-option-head > strong').textContent;
    const scenarioNames = [...w.document.querySelectorAll('.budget-scenario > strong')].map(el => el.textContent);
    assert.ok(!scenarioNames.includes(name));
  }
});
