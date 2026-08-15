// nav.js — menu compartilhado com dropdowns, usado em todas as páginas do site.
// Uso: <div id="site-nav"></div> <script src="nav.js"></script> <script>renderNav('ID-DA-PAGINA-ATUAL')</script>

const SITE_MENU = [
  { id: "diario", label: "Diário de Bordo", href: "diario.html" },
  { id: "cronograma", label: "Cronograma", href: "cronograma.html" },
  { id: "projeto", label: "Projeto Doutorado", href: "projeto-doutorado.html", children: [
    { id: "projeto-crianca", label: "Explicando para uma criança", href: "projeto-crianca.html" },
    { id: "projeto-resumo", label: "Resumo", href: "projeto-resumo.html" },
    { id: "projeto-pergunta", label: "Pergunta", href: "projeto-pergunta.html" },
    { id: "projeto-hipoteses", label: "Hipóteses", href: "projeto-hipoteses.html" },
    { id: "projeto-metodologia", label: "Metodologia", href: "projeto-metodologia.html" },
    { id: "projeto-resultados", label: "Resultados", href: "projeto-resultados.html" },
    { id: "projeto-publicacoes", label: "Artigos Publicados", href: "projeto-publicacoes.html" },
  ]},
  { id: "sobre", label: "Sobre", href: "sobre.html" },
  { id: "conhecimento", label: "Fonte de Conhecimento", href: "conhecimento.html", children: [
    { id: "disciplinas", label: "Disciplinas", href: "disciplinas.html" },
    { id: "artigos", label: "Artigos", href: "artigos.html" },
    { id: "teses", label: "Teses e Dissertações", href: "teses.html" },
    { id: "biologia-genetica", label: "Biologia e Genética", href: "conhecimento-biologia-genetica.html" },
    { id: "quimica-analitica", label: "Química Analítica", href: "quimica-analitica.html" },
  ]},
  { id: "laboratorio", label: "Laboratório", href: "laboratorio.html", children: [
    { id: "protocolos", label: "Protocolos", href: "protocolos.html" },
    { id: "equipamentos", label: "Equipamentos", href: "equipamentos.html" },
    { id: "reagentes", label: "Reagentes", href: "reagentes.html" },
    { id: "metodologia-artigos", label: "Artigos Metodologia", href: "metodologia-artigos.html" },
  ]},
];

function renderNav(activeId) {
  const root = document.getElementById('site-nav');
  if (!root) return;

  const isActive = (item) => item.id === activeId || (item.children && item.children.some(c => c.id === activeId));

  const itemsHtml = SITE_MENU.map(item => {
    const active = isActive(item);
    if (item.children) {
      const childHtml = item.children.map(c => `
        <a class="dd-item${c.id === activeId ? ' is-active' : ''}" href="${c.href}">${c.label}</a>
      `).join('');
      return `
        <div class="nav-item has-dd${active ? ' is-active' : ''}">
          <a class="nav-link" href="${item.href}">${item.label}
            <svg class="caret" viewBox="0 0 12 8" fill="none"><path d="M1.5 2L6 6.5L10.5 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <div class="dropdown">${childHtml}</div>
        </div>
      `;
    }
    return `<div class="nav-item"><a class="nav-link${active ? ' is-active' : ''}" href="${item.href}">${item.label}</a></div>`;
  }).join('');

  root.innerHTML = `
    <nav class="sitenav">
      <div class="nav-topline">
        <a class="brand" href="index.html">Fernando Curbani</a>
        <button class="burger" aria-label="Menu">
          <svg viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        </button>
      </div>
      <div class="nav-items">${itemsHtml}</div>
      <a class="side-link" href="biologia-index.html" title="Projeto pessoal à parte">🧬 Biologia</a>
    </nav>
  `;

  const nav = root.querySelector('.sitenav');
  const burger = root.querySelector('.burger');
  burger.addEventListener('click', () => nav.classList.toggle('nav-open'));

  // Mobile: tapping a parent link with children toggles the dropdown instead of navigating away,
  // on the first tap; second tap (or tapping a child) navigates normally.
  root.querySelectorAll('.has-dd > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 860) {
        const parent = link.parentElement;
        const alreadyOpen = parent.classList.contains('dd-open');
        root.querySelectorAll('.has-dd').forEach(el => el.classList.remove('dd-open'));
        if (!alreadyOpen) {
          e.preventDefault();
          parent.classList.add('dd-open');
        }
      }
    });
  });
}
