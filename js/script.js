document.getElementById('year').textContent = new Date().getFullYear();

// Navbar responsif
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

window.addEventListener('resize', () => { 
  if (window.innerWidth > 1024) closeMenu(); 
});

document.addEventListener('click', e => {
  if (!navLinks.classList.contains('open')) return;
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
});

document.addEventListener('keydown', e => { 
  if (e.key === 'Escape') closeMenu(); 
});

// Modal karier
const jobModal = document.getElementById('jobModal');

function openJobModal(posisi) {
  document.getElementById('jobPosisi').value = posisi;
  jobModal.style.display = 'grid';
  document.body.style.overflow = 'hidden';
}

function closeJobModal() {
  jobModal.style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('jobForm').reset();
}

jobModal.addEventListener('click', e => { 
  if (e.target === jobModal) closeJobModal(); 
});

document.addEventListener('keydown', e => { 
  if (e.key === 'Escape' && jobModal.style.display === 'grid') closeJobModal(); 
});

document.getElementById('jobForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nama = document.getElementById('jobNama').value.trim();
  const usia = document.getElementById('jobUsia').value.trim();
  const domisili = document.getElementById('jobDomisili').value.trim();
  const posisi = document.getElementById('jobPosisi').value;
  const message = `Halo saya ingin melamar pekerjaan\nNama: ${nama}\nUsia: ${usia}\nDomisili: ${domisili}\nPosisi: ${posisi}`;
  const url = `https://wa.me/6285282972604?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  closeJobModal();
});

// Switcher program
let currentProgram = 'live';

function setProgramType(type) {
  currentProgram = type;
  const btnLive = document.getElementById('btnLive');
  const btnGo = document.getElementById('btnGo');
  const title = document.getElementById('formTitle');
  const desc = document.getElementById('formDesc');
  const programInput = document.getElementById('selectedProgram');
  const liveFields = document.getElementById('dynamicLiveFields');
  const goFields = document.getElementById('dynamicGoFields');
  const submitBtn = document.getElementById('submitBtn');

  if (type === 'live') {
    btnLive.classList.add('active');
    btnGo.classList.remove('active');
    title.textContent = 'Pendaftaran Host TikTok LIVE';
    desc.textContent = 'Isi identitas diri untuk registrasi sesi casting dan evaluasi awal host live streaming.';
    programInput.value = 'Host TikTok LIVE';
    liveFields.style.display = 'block';
    goFields.style.display = 'none';
    submitBtn.textContent = 'Kirim Pendaftaran via WhatsApp ↗';
  } else {
    btnGo.classList.add('active');
    btnLive.classList.remove('active');
    title.textContent = 'Pendaftaran Kreator TikTok GO';
    desc.textContent = 'Isi data diri untuk program akselerasi pertumbuhan followers, monetisasi, dan partnership TikTok GO.';
    programInput.value = 'Kreator TikTok GO';
    liveFields.style.display = 'none';
    goFields.style.display = 'block';
    submitBtn.textContent = 'Kirim Pendaftaran via WhatsApp ↗';
  }
}

function applyCategory(program, categoryValue) {
  setProgramType(program);
  if (program === 'live') {
    const liveSelect = document.getElementById('kategoriLive');
    if (liveSelect) liveSelect.value = categoryValue;
  } else {
    const goSelect = document.getElementById('nicheGo');
    if (goSelect) goSelect.value = categoryValue;
  }
  const daftarSection = document.getElementById('daftar');
  if (daftarSection) daftarSection.scrollIntoView({ behavior: 'smooth' });
}

// Kirim pendaftaran ke WhatsApp
const regForm = document.getElementById('registrationForm');
if (regForm) {
  regForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!regForm.reportValidity()) return;

    const getVal = id => document.getElementById(id)?.value?.trim() || '-';
    const program = getVal('selectedProgram');

    let dynamicText = '';
    if (currentProgram === 'live') {
      dynamicText = [
        'Kategori Host: ' + getVal('kategoriLive'),
        'Pengalaman Live: ' + getVal('pengalamanLive')
      ].join('\n');
    } else {
      dynamicText = [
        'Niche Konten: ' + getVal('nicheGo'),
        'Followers Saat Ini: ' + getVal('followersGo')
      ].join('\n');
    }

    const messageLines = [
      '⚡ *REGISTRASI KREATOR - RICH ENTERTAINMENT* ⚡',
      '----------------------------------------',
      '📌 *Program:* ' + program,
      '👤 *Nama Lengkap:* ' + getVal('nama'),
      '🎂 *Usia:* ' + getVal('usia') + ' tahun',
      '📱 *WhatsApp:* ' + getVal('telepon'),
      '📍 *Domisili:* ' + getVal('domisili'),
      '🔗 *Username TikTok:* ' + getVal('akun'),
      '----------------------------------------',
      dynamicText,
      '----------------------------------------',
      '📝 *Target / Motivasi:*',
      getVal('targetKarier')
    ];

    const finalMessage = messageLines.join('\n');
    const waUrl = 'https://wa.me/6285282972604?text=' + encodeURIComponent(finalMessage);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}
