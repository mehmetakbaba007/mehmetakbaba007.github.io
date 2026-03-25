
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.archive-list .report-card');

let activeFilter = 'all';

function applyFilters() {
  const q = (searchInput?.value || '').trim().toLowerCase();
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const kind = card.dataset.kind || '';
    const matchesFilter = activeFilter === 'all' || kind === activeFilter;
    const matchesSearch = !q || text.includes(q);
    card.style.display = matchesFilter && matchesSearch ? '' : 'none';
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', applyFilters);
}

// Stable dropdown behavior
document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('.nav-dropdown-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('.nav-dropdown.open').forEach(other => {
      if (other !== dropdown) other.classList.remove('open');
    });
    dropdown.classList.toggle('open');
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.nav-dropdown.open').forEach(dropdown => {
    dropdown.classList.remove('open');
  });
});
