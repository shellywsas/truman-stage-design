/**
 * The Truman Show - Waldorf Stage Design Application (DIY & Black Box Stage Version)
 * Fast, lightweight, zero-budget student production logic.
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
  const tabs = document.querySelectorAll('.nav-tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }

      window.scrollTo({
        top: document.querySelector('.main-nav').offsetTop - 10,
        behavior: 'smooth'
      });
    });
  });
}

/* -------------------------------------------------------------
 * 2. BLACK STAGE BLUEPRINT INTERACTIVE ZONES
 * ------------------------------------------------------------- */
const zoneDetails = {
  'compact-band': {
    title: 'פינת הכלים הקומפקטית והמצומצמת (בשמאל למטה)',
    badge: 'שטח צפוף וחסכוני במיוחד',
    html: `
      <p><strong>איך דוחסים קלידים, 2 גיטרות ותופים לשטח של 1.8 מ' על 1.5 מ'?</strong></p>
      <ul>
        <li><strong>רצפת האולם מתחת לבמה:</strong> הכלים לא עולים לבמה בכלל! הם יושבים בפינה השמאלית על רצפת האולם, צמוד לשולי הבמה. זה שומר על כל הבמה הקטנה פנויה.</li>
        <li><strong>פסנתר/קלידים:</strong> קלידים חשמליים על סטנד X צמוד לקיר/וילון, תופסים רוחב מינימלי.</li>
        <li><strong>גיטרות:</strong> סטנד כפול אחד לגיטרות (או גיטרות מונחות על כיסאות תלמידים רגילים של הנגנים).</li>
        <li><strong>תופים / קחון (Cajon):</strong> מקרבים את הסנר וההיי-האט קרוב לבס, או הכי קומפקטי: מתופף יושב על קחון עץ עם מצילה אחת וסנר קטן.</li>
      </ul>
      <div class="tip-box">
        <strong>💡 נורת קליפ לתווים:</strong> נורת קריאה קטנה או נורת לד מוצמדת לעמוד התווים כדי שלא תאיר את הבמה החשוכה.
      </div>
    `
  },
  backcurtain: {
    title: 'וילון שחור אחורי (הסימון האדום בסקיצה)',
    badge: 'רקע שחור בסיסי',
    html: `
      <p><strong>איך מנצלים את הוילון השחור במינימום מאמץ?</strong></p>
      <ul>
        <li><strong>הרקע הניטרלי המושלם:</strong> הוילון השחור מאפשר לכל אלמנט קרטון או צבע בהיר לבלוט בצורה מדהימה תחת תאורת הבמה.</li>
        <li><strong>תליית ענני קרטון:</strong> עננים מקרטון לבן תלויים על חוטי דיג שקופים שמוצמדים לצינור התאורה או לקליפסים בוילון.</li>
        <li><strong>סצנת הסיום (הקיר והדלת):</strong> תולים סדין תכלת עם ציור עננים ודלת קרטון לבנה בסיכות ביטחון ישר על הוילון השחור! בסיום ההצגה מפרקים אותם ב-10 שניות.</li>
      </ul>
    `
  },
  center: {
    title: 'במה שחורה אינטימית - שטח משחק עיקרי',
    badge: 'רצפה שחורה נקייה',
    html: `
      <p><strong>חוקי תנועה לבמה קטנה:</strong></p>
      <ul>
        <li><strong>אפס עומס:</strong> אין שום רהיט קבוע שעומד על הבמה.</li>
        <li><strong>כניסה ויציאה ב-5 שניות:</strong> כל אביזר (מזרן, מסגרת מראה, סירת קרטון על גלגלים) מועלה ביד אחת או מגולגל ויוצא ברגע.</li>
        <li><strong>תאורת ספוטים:</strong> כשהאור ממוקד על טרומן, כל שאר הבמה והקלעים נשארים בחושך מוחלט.</li>
      </ul>
    `
  },
  'wing-left': {
    title: 'מעבר קלעים שמאל (וילון שחור צר)',
    badge: 'מעבר צר',
    html: `
      <p><strong>תפעול מעבר שמאל:</strong></p>
      <ul>
        <li>כניסת שחקנים אינטימית (מריל בבוקר, סילביה/לורן, כריסטוף).</li>
        <li>הצמדת קרטונים שטוחים לקיר (מסגרת המראה הדקה, שלטי קרטון).</li>
      </ul>
    `
  },
  'wing-right': {
    title: 'מעבר קלעים ימין (וילון שחור צר)',
    badge: 'מעבר צר',
    html: `
      <p><strong>תפעול מעבר ימין:</strong></p>
      <ul>
        <li>כניסת סירת הקרטון על כיסא המשרד בשיא ההצגה.</li>
        <li>שולחן צר צמוד לקיר לאביזרי כיס (מגזין, שישיית פחיות בירה, קולפן, רדיו).</li>
      </ul>
    `
  },
  stairs: {
    title: 'מדרגות אל הקהל (פינה ימנית תחתונה)',
    badge: 'גשר לאולם',
    html: `
      <p><strong>שימוש במדרגות:</strong></p>
      <ul>
        <li>טרומן יושב על המדרגה התחתונה ומביט אל החושך של האולם (המזח והים).</li>
        <li>ניצבים ועוברי אורח עולים מהאולם וחוצים את הבמה.</li>
        <li>נשארות פנויות לחלוטין מכבלים וציוד!</li>
      </ul>
    `
  }
};

function initStageZones() {
  const zones = document.querySelectorAll('.zone-item');
  const titleEl = document.getElementById('zoneInfoTitle');
  const badgeEl = document.getElementById('zoneInfoBadge');
  const bodyEl = document.getElementById('zoneInfoBody');

  zones.forEach(zone => {
    zone.addEventListener('click', () => {
      const zoneKey = zone.getAttribute('data-zone');
      if (zoneDetails[zoneKey]) {
        titleEl.textContent = zoneDetails[zoneKey].title;
        badgeEl.textContent = zoneDetails[zoneKey].badge;
        bodyEl.innerHTML = zoneDetails[zoneKey].html;

        zones.forEach(z => z.style.outline = 'none');
        zone.style.outline = '3px solid #f8b449';
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
  const headers = document.querySelectorAll('.scene-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      if (body.style.display === 'none') {
        body.style.display = 'block';
      } else {
        body.style.display = 'none';
      }
    });
  });
}

/* -------------------------------------------------------------
 * 5. DIY PROPS TABLE & CHECKLIST (ZERO BUDGET)
 * ------------------------------------------------------------- */
const defaultPropsDIY = [
  { id: 1, name: 'סירת מפרש "סנטה מריה" על גלגלים', scene: 'תמונה 12-14', notes: 'כיסא משרדי ישן + קרטון מקרר חתוך לצורת סירה ומקל מטאטא', status: 'inprogress', checked: false },
  { id: 2, name: '2 סדיני תכלת לגלי הים', scene: 'תמונה 13-14', notes: 'סדינים ישנים מהבית שמנופפים בהם 2 תלמידים', status: 'todo', checked: false },
  { id: 3, name: 'סדין שמיים תכול + דלת קרטון נפתחת', scene: 'תמונה 14', notes: 'סדין צבוע בעננים תלוי על הוילון השחור בסיכות ביטחון + דלת קרטון', status: 'inprogress', checked: false },
  { id: 4, name: 'שרפרף עץ פשוט של כיתה', scene: 'תמונה 14', notes: 'מדרגות אל דלת הקרטון בקיר השמיים (לקחת מכיתה)', status: 'done', checked: true },
  { id: 5, name: 'מסגרת מראה ריקה מעץ (ללא זכוכית)', scene: 'תמונה 1', notes: '4 קרשים פשוטים או מסגרת ישנה על רגלית עץ', status: 'done', checked: true },
  { id: 6, name: 'מזרן פשוט של בית ספר', scene: 'תמונה 1', notes: 'מזרן התעמלות/שינה מונח על 2 ארגזים, מפונה בשנייה', status: 'done', checked: true },
  { id: 7, name: 'פנס נופל מהשמיים על חוט דיג', scene: 'תמונה 1', notes: 'קופסת נעליים צבועה שחור עם חוט דיג שיורד מצינור התאורה', status: 'inprogress', checked: false },
  { id: 8, name: 'שלט קרטון מתחלף "יום 10,909"', scene: 'תמונה 1', notes: 'קרטון קורנפלקס/משלוח צבוע בטוש שחור עבה', status: 'done', checked: true },
  { id: 9, name: 'חזית בית צהובה מקרטון על רגלי לייסט', scene: 'תמונה 1, 4', notes: 'קרטון מקרר צבוע בצהוב פסטל עם חלון וגדר לבנה', status: 'inprogress', checked: false },
  { id: 10, name: 'שולחן תלמיד, טלפון ישן וקלסר', scene: 'תמונה 2', notes: 'שולחן וכיסא מכיתה, טלפון חוגה מבית סבא/סבתא', status: 'inprogress', checked: false },
  { id: 11, name: 'שלט קרטון "מעבורת להארבור איילנד"', scene: 'תמונה 2', notes: 'קרטון מחובר למקל מטאטא', status: 'todo', checked: false },
  { id: 12, name: 'שישיית פחיות בירה ריקות + כדור', scene: 'תמונה 3', notes: 'פחיות שתייה ריקות בקרטון + כדור גולף או טניס', status: 'done', checked: true },
  { id: 13, name: 'סוודר אדום בוהק וסיכת "איך זה ייגמר?"', scene: 'תמונה 6', notes: 'סוודר מהארון בבית וסיכת קרטון עגולה עם סיכת ביטחון', status: 'done', checked: true },
  { id: 14, name: '2 פנסי יד/אופניים חזקים (מכונית האב)', scene: 'תמונה 6', notes: 'פנסי לד מסנוורים ששחקנים מחזיקים מהקלעים + צפצפה', status: 'inprogress', checked: false },
  { id: 15, name: '2 סרבלי נייר לבנים ומסכות אבק (כור גרעיני)', scene: 'תמונה 10', notes: 'סרבלי צבעים ב-10 ש"ח מטמבור ומסכות קורונה', status: 'todo', checked: false },
  { id: 16, name: 'קולפן ירקות וקופסה צבעונית (פרסומת)', scene: 'תמונה 10', notes: 'קולפן מהמטבח בבית', status: 'done', checked: true },
  { id: 17, name: 'שלט קרטון זוהר "המופע של טרומן"', scene: 'פרולוג', notes: 'קרטון עם כיתוב מודגש בטוש זוהר/צבע זוהר', status: 'inprogress', checked: false }
];

let propsDataDIY = JSON.parse(localStorage.getItem('truman_diy_props')) || defaultPropsDIY;

function initPropsTable() {
  renderPropsTable();

  const searchInput = document.getElementById('propSearch');
  searchInput.addEventListener('input', () => {
    filterAndRenderProps();
  });

  const statusBtns = document.querySelectorAll('.status-filter');
  statusBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      statusBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterAndRenderProps();
    });
  });
}

function filterAndRenderProps() {
  const searchTerm = document.getElementById('propSearch').value.toLowerCase().trim();
  const activeStatus = document.querySelector('.status-filter.active').getAttribute('data-status');

  const filtered = propsDataDIY.filter(item => {
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
  tbody.innerHTML = '';

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem; color: #9ca3af;">לא נמצאו פריטים תואמים</td></tr>`;
    return;
  }

  items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <input type="checkbox" class="prop-check" data-id="${item.id}" ${item.checked ? 'checked' : ''}>
      </td>
      <td style="font-weight: 600; color: #fff; ${item.checked ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
        ${item.name}
      </td>
      <td><span class="badge" style="font-size: 0.75rem;">${item.scene}</span></td>
      <td style="color: #9ca3af; font-size: 0.85rem;">${item.notes}</td>
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
      const item = propsDataDIY.find(p => p.id === id);
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
      const item = propsDataDIY.find(p => p.id === id);
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
    case 'todo': return '📦 לאסוף';
    case 'inprogress': return '✂️ בהכנה';
    case 'done': return '✅ מוכן';
    default: return status;
  }
}

function saveProps() {
  localStorage.setItem('truman_diy_props', JSON.stringify(propsDataDIY));
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
        btn.style.background = '#10b981';
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
