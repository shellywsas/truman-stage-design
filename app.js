/**
 * The Truman Show - Waldorf Stage Design Application
 * Pure Light Theme & Exact Auditorium Matching Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initStageZones();
  initGalleryModal();
  initSceneAccordion();
  initPropsTable();
  initCopyButton();
});

/* -------------------------------------------------------------
 * 1. TABS NAVIGATION
 * ------------------------------------------------------------- */
function initTabs() {
  const tabs = document.querySelectorAll('.nav-item');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      window.scrollTo({
        top: document.querySelector('.nav-bar').offsetTop - 10,
        behavior: 'smooth'
      });
    });
  });
}

/* -------------------------------------------------------------
 * 2. STAGE BLUEPRINT INTERACTIVE ZONES
 * ------------------------------------------------------------- */
const zoneDetails = {
  'piano': {
    title: 'פסנתר/קלידים בלבד על הרצפה משמאל',
    badge: 'הקהל קרוב מדי לבמה',
    html: `
      <p><strong>למה רק הפסנתר יושב על הקרקע?</strong></p>
      <ul>
        <li><strong>מרחק אפסי מהקהל:</strong> כפי שרואים בצילום האולם, שורת המושבים הראשונה יושבת ממש מטר וחצי מחזית הבמה. אין שם מקום ללהקה שלמה.</li>
        <li><strong>מיקום הפסנתר/קלידים:</strong> בפינה השמאלית ביותר על רצפת האולם, צמוד לדופן הבמה, מחוץ לשורת המעבר.</li>
        <li><strong>הגיטרות והתופים:</strong> יושבים בתוך כנף הבמה השמאלית (Left Wing) מאחורי קו הוילון השחור. הם מחוברים למערכת ההגברה (PA), ולא מפריעים לקהל או למשחק.</li>
      </ul>
    `
  },
  'back': {
    title: 'וילון שחור אחורי ומסך הקרנה של האולם',
    badge: 'גב הבמה',
    html: `
      <p><strong>תפקיד הוילון האחורי:</strong></p>
      <ul>
        <li>הרקע השחור האחיד שמאפשר לאורות הבמה להבליט את השחקנים ואת חזיתות העץ הצבועות.</li>
        <li>בסצנת הסיום, מעמידים צמוד לוילון את משקוף העץ עם הדלת הלבנה ופנל השמיים.</li>
        <li>כשטרומן פותח את הדלת – מאחוריה יש חושך אמיתי שמוביל אל מאחורי הקלעים!</li>
      </ul>
    `
  },
  'center-stage': {
    title: 'במת עץ מוגבהת - שטח משחק ראשי',
    badge: '100% פנוי לתנועה',
    html: `
      <p><strong>התנהלות על במת האולם:</strong></p>
      <ul>
        <li>הבמה נשארת נקייה מכלים כבדים קבועים.</li>
        <li>סירת העץ ('סנטה מריה') על 4 גלגלי סיליקון שקטים נכנסת ויוצאת תוך 5 שניות דרך כנף ימין.</li>
        <li>הקירות המודולריים של סיהייבן מסתובבים על גלגלים ומחליפים סצנה ברגע.</li>
      </ul>
    `
  },
  'left-wing': {
    title: 'כנף שמאל (מיקום נגני גיטרה ותופים)',
    badge: 'כנף הנגנים',
    html: `
      <p><strong>סידור כנף שמאל:</strong></p>
      <ul>
        <li>1-2 נגני גיטרה יושבים או עומדים בפתח הכנף מאחורי הוילון.</li>
        <li>מתופף יושב על קחון או סט תופים צפוף מאחורי הגיטרות.</li>
        <li>הנגנים רואים את השחקנים ואת הפסנתרן ומתואמים איתם בצורה מושלמת.</li>
      </ul>
    `
  },
  'right-wing': {
    title: 'כנף ימין (מעבר שחקנים וכניסת הסירה)',
    badge: 'כנף שחקנים ואביזרים',
    html: `
      <p><strong>סידור כנף ימין:</strong></p>
      <ul>
        <li>כאן חונה סירת העץ המוכנה לכניסה בסצנת הסערה.</li>
        <li>שולחן צר לאביזרי במה מהירים (שישיית בירה, קולפן, רדיו, מסמכים).</li>
      </ul>
    `
  },
  'stairs': {
    title: 'מדרגות ומעקה מתכת כסוף (פינה ימנית)',
    badge: 'מעבר פתוח לקהל',
    html: `
      <p><strong>שמירה על המדרגות פנויות:</strong></p>
      <ul>
        <li>בדיוק כפי שנראה בתצלום האולם, המדרגות מחברות את הבמה למעבר הקהל.</li>
        <li>הן נשארות 100% נקיות מכבלים, חפצים או כלים!</li>
        <li>טרומן משתמש בהן בירידה למזח הלילי, ושחקני ניצבים עולים דרכן מהאולם.</li>
      </ul>
    `
  }
};

function initStageZones() {
  const zones = document.querySelectorAll('[data-zone]');
  const titleEl = document.getElementById('zoneDetailTitle');
  const badgeEl = document.getElementById('zoneDetailBadge');
  const contentEl = document.getElementById('zoneDetailContent');

  zones.forEach(zone => {
    zone.addEventListener('click', () => {
      const zoneKey = zone.getAttribute('data-zone');
      if (zoneDetails[zoneKey]) {
        titleEl.textContent = zoneDetails[zoneKey].title;
        badgeEl.textContent = zoneDetails[zoneKey].badge;
        contentEl.innerHTML = zoneDetails[zoneKey].html;

        zones.forEach(z => z.style.outline = 'none');
        zone.style.outline = '3px solid #d97706';
      }
    });
  });
}

/* -------------------------------------------------------------
 * 3. AI GALLERY & LIGHTBOX MODAL
 * ------------------------------------------------------------- */
function initGalleryModal() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = document.getElementById('modalClose');

  document.querySelectorAll('.clickable-preview').forEach(img => {
    img.addEventListener('click', () => {
      const src = img.getAttribute('data-img') || img.src;
      const caption = img.getAttribute('data-caption') || img.alt;

      modalImg.src = src;
      modalCaption.textContent = caption;
      modal.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

/* -------------------------------------------------------------
 * 4. SCENE ACCORDION TOGGLE
 * ------------------------------------------------------------- */
function initSceneAccordion() {
  const headers = document.querySelectorAll('.scene-top');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      if (body.style.display === 'none') {
        body.style.display = 'grid';
      } else {
        body.style.display = 'none';
      }
    });
  });
}

/* -------------------------------------------------------------
 * 5. PROPS TABLE & CHECKLIST
 * ------------------------------------------------------------- */
const defaultPropsBudget = [
  { id: 1, name: 'סירת מפרש מעץ "סנטה מריה" על 4 גלגלים', scene: 'תמונה 12-14', notes: 'בסיס סנדוויץ 17 מ"מ, דפנות דיקט מכופף, 4 גלגלי סיליקון מטמבור, תורן עץ', status: 'inprogress', checked: false },
  { id: 2, name: 'בד משי/סאטן כחול-טורקיז לגלי הים (5 מטר)', scene: 'תמונה 13-14', notes: 'בד מבריק וקל מחנות בדים, שני מקלות אחיזה בקצוות', status: 'todo', checked: false },
  { id: 3, name: 'משקוף עץ יציב עם דלת לבנה נפתחת', scene: 'תמונה 14', notes: 'מסגרת לוחות 5x10 ס"מ, רגלי תמיכה אחוריות, דלת דיקט לבנה עם צירים', status: 'inprogress', checked: false },
  { id: 4, name: '2 מדרגות עץ יציבות לעלייה לדלת', scene: 'תמונה 14', notes: '2 קוביות עץ של ביה"ס או מדרגת אירובי/שרפרף יציב ובטוח', status: 'done', checked: true },
  { id: 5, name: 'מעמד מסגרת מראה מעץ (ללא זכוכית)', scene: 'תמונה 1', notes: 'מסגרת תמונה מעץ על עמוד אנכי עם בסיס רגליים יציב', status: 'done', checked: true },
  { id: 6, name: 'פנס תיאטרון ישן תלוי על חבל וגלגלת', scene: 'תמונה 1', notes: 'גוף פנס קל תלוי מצינור התאורה, משתחרר ונבלם בגובה מטר מהבמה', status: 'inprogress', checked: false },
  { id: 7, name: '2 קירות מודולריים ניידים על גלגלים (סיהייבן/משרד)', scene: 'תמונה 1, 2, 4', notes: 'מסגרת עץ קלה 2x1.2 מ', status: 'inprogress', checked: false },
  { id: 8, name: 'שלט מתחלף "יום 10,909"', scene: 'תמונה 1', notes: 'לוח קאפה או דיקט צבוע שחור עם אותיות שבלונה לבנות', status: 'done', checked: true },
  { id: 9, name: 'שולחן משרדי מתקפל, טלפון ישן וקלסרים', scene: 'תמונה 2', notes: 'שולחן קל, טלפון חוגה ישן מבית סבא/סבתא', status: 'inprogress', checked: false },
  { id: 10, name: 'שלט עץ "מעבורת להארבור איילנד"', scene: 'תמונה 2', notes: 'שלט עץ קטן תלוי על מוט', status: 'todo', checked: false },
  { id: 11, name: 'שישיית פחיות בירה וכדור', scene: 'תמונה 3', notes: 'פחיות ריקות במארז קרטון + כדור גולף או טניס', status: 'done', checked: true },
  { id: 12, name: 'סוודר אדום בוהק וסיכת "איך זה ייגמר?"', scene: 'תמונה 6', notes: 'סוודר אדום בולט וסיכה עגולה גדולה', status: 'done', checked: true },
  { id: 13, name: '2 פנסי רכב מסנוורים בידי שחקנים', scene: 'תמונה 6', notes: 'פנסי לד עוצמתיים עם סוללות שמופנים אל הקהל בחריקת בלמים', status: 'inprogress', checked: false },
  { id: 14, name: '2 סרבלי נייר לבנים ומסכות אבק (כור גרעיני)', scene: 'תמונה 10', notes: 'סרבלי צבעים ב-12 ש"ח מטמבור ומסכות אבק', status: 'todo', checked: false },
  { id: 15, name: 'קולפן ירקות וקופסה צבעונית (פרסומת)', scene: 'תמונה 10', notes: 'קולפן מהמטבח בבית', status: 'done', checked: true }
];

let propsDataBudget = JSON.parse(localStorage.getItem('truman_budget_props_v2')) || defaultPropsBudget;

function initPropsTable() {
  renderPropsTable();

  const searchInput = document.getElementById('propSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterAndRenderProps();
    });
  }

  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(btn => {
    btn.addEventListener('click', () => {
      filterPills.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterAndRenderProps();
    });
  });
}

function filterAndRenderProps() {
  const searchInput = document.getElementById('propSearch');
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const activePill = document.querySelector('.filter-pill.active');
  const activeStatus = activePill ? activePill.getAttribute('data-status') : 'all';

  const filtered = propsDataBudget.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
                          item.scene.toLowerCase().includes(searchTerm) ||
                          item.notes.toLowerCase().includes(searchTerm);
    const matchesStatus = (activeStatus === 'all') || (item.status === activeStatus);
    return matchesSearch && matchesStatus;
  });

  renderPropsRows(filtered);
}

function renderPropsTable() {
  filterAndRenderProps();
}

function renderPropsRows(items) {
  const tbody = document.getElementById('propsTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem; color: #64748b;">לא נמצאו פריטים תואמים</td></tr>`;
    return;
  }

  items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <input type="checkbox" class="prop-check" data-id="${item.id}" ${item.checked ? 'checked' : ''}>
      </td>
      <td style="font-weight: 700; color: #0f172a; ${item.checked ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
        ${item.name}
      </td>
      <td><span class="pill" style="font-size: 0.75rem;">${item.scene}</span></td>
      <td style="color: #475569; font-size: 0.85rem;">${item.notes}</td>
      <td>
        <span class="badge-status status-${item.status}" data-id="${item.id}" title="לחצו להחלפת סטטוס">
          ${getStatusText(item.status)}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.prop-check').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const item = propsDataBudget.find(p => p.id === id);
      if (item) {
        item.checked = e.target.checked;
        if (item.checked) item.status = 'done';
        saveProps();
        filterAndRenderProps();
      }
    });
  });

  tbody.querySelectorAll('.badge-status').forEach(badge => {
    badge.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const item = propsDataBudget.find(p => p.id === id);
      if (item) {
        if (item.status === 'todo') item.status = 'inprogress';
        else if (item.status === 'inprogress') {
          item.status = 'done';
          item.checked = true;
        } else {
          item.status = 'todo';
          item.checked = false;
        }
        saveProps();
        filterAndRenderProps();
      }
    });
  });
}

function getStatusText(status) {
  switch (status) {
    case 'todo': return '📦 לרכוש/לבנות';
    case 'inprogress': return '🔨 בעבודה';
    case 'done': return '✅ מוכן';
    default: return status;
  }
}

function saveProps() {
  localStorage.setItem('truman_budget_props_v2', JSON.stringify(propsDataBudget));
}

/* -------------------------------------------------------------
 * 6. COPY REPO LINK BUTTON
 * ------------------------------------------------------------- */
function initCopyButton() {
  const btn = document.getElementById('btnCopyRepo');
  const linkEl = document.getElementById('repoLink');

  if (btn && linkEl) {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(linkEl.href).then(() => {
        const originalText = btn.textContent;
        btn.textContent = '✅ הקישור הועתק!';
        btn.style.background = '#059669';
        btn.style.color = '#fff';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
        }, 2500);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  }
}
