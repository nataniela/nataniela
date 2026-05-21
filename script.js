// Theme toggle and image preview
const toggle = document.getElementById('theme-toggle');
const body = document.body;

// Initialize theme from localStorage or OS preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  if (savedTheme === 'light') body.classList.add('light');
} else {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    body.classList.add('light');
  }
}

function updateToggleLabel() {
  if (body.classList.contains('light')) {
    toggle.textContent = '🌙';
    toggle.setAttribute('aria-label', 'Ativar modo escuro');
  } else {
    toggle.textContent = '☀️';
    toggle.setAttribute('aria-label', 'Ativar modo claro');
  }
}

updateToggleLabel();

toggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateToggleLabel();
});

// Image upload preview
const upload = document.getElementById('upload');
const preview = document.getElementById('preview');

if (upload && preview) {
  upload.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.transform = 'scale(1.05)';
        setTimeout(() => {
          preview.style.transform = 'scale(1)';
        }, 300);
      };
      reader.readAsDataURL(file);
    }
  });
}
