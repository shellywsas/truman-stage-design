/**
 * The Truman Show - Waldorf Stage Design Application
 * Interactive logic for tabs, stage blueprint, AI gallery, scenes & props.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initStageZones();
  initOrchestraOptions();
  initGalleryModal();
  initSceneFilters();
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
 * 2. STAGE BLUEPRINT INTERACTIVE ZONES
 * ------------------------------------------------------------- */
const zoneDetails = {
  orchestra: {
    title: 'מתחם התזמורת החיה (פסנתר, גיטרות, תופים)',
    badge: 'מיקום אקוסטי ומבני',
    html: `
      <p><strong>למה דווקא באגף שמאל הקדמי?</strong></p>
      <ul>
        <li><strong>שמירה על זרימת שחקנים:</strong> המדרגות אל האולם נמצאות בימין. הצבת התזמורת בשמאל מאזנת את המשקל הויזואלי של הבמה ומאפשרת ירידה חופשית לאולם בימין.</li>
        <li><strong>חיסכון קריטי במאחורי הקלעים:</strong> מאחורי הקלעים צפוף מאוד. אם נשים את התופים והפסנתר במאחורי הקלעים, נאבד את כל מעבר השחקנים. הצבתם בקדמת אגף שמאל משחררת את כל מאחורי הקלעים!</li>
        <li><strong>סאונד ותיאום:</strong> הנגנים רואים היטב את המתרחש על הבמה ויכולים להגיב מוזיקלית ברגע לקיוויים (למשל ברעמי הסערה, נפילת הפנס, ומוזיקת הפרודיה של כריסטוף).</li>
      </ul>
      <div class="tip-box">
        <strong>🪵 נגיעה אנתרופוסופית:</strong> נבנה מעקה עץ מעוגל נמוך או בד יוטה מתוח סביב התזמורת עם תאורה חמה עדינה (נורות פחם חמות), כך שהתזמורת נראית כמו "תזמורת אולפן שידור חי" אותנטית.
      </div>
    `
  },
  backwall: {
    title: 'קיר אחורי (האזור האדום בסקיצה) + דלת סודית',
    badge: 'שיא ההצגה וסצנוגרפיה',
    html: `
      <p><strong>תפקיד הקיר האחורי במחזה:</strong></p>
      <ul>
        <li><strong>ציור עננים ושמיים (סגנון ולדורף):</strong> ציור שכבות בצבעי מים רכים (Lazur) של שמיים ועננים חלומיים, שנראה לאורך כל ההצגה כרקע פסטורלי של סיהייבן.</li>
        <li><strong>הדלת הסודית והמדרגות:</strong> בחלקו הימני של הקיר, חבוי פתח דלת פשוטה בקו אפס עם הקיר. בסצנה האחרונה, טרומן פוגע בקיר, מגלה את הדלת, עולה במדרגות עץ פשוטות ויוצא לעולם האמיתי.</li>
        <li><strong>מסך הקרנה עליון:</strong> ניתן להשתמש בחלקו העליון להקרנת שקופיות קצרות ("המופע של טרומן", פרסומות מוקלטות, שידור חי).</li>
      </ul>
    `
  },
  center: {
    title: 'במה מרכזית - שטח משחק ראשי (70%)',
    badge: 'מרחב גמיש ומודולרי',
    html: `
      <p><strong>עקרונות לתנועה מהירה:</strong></p>
      <ul>
        <li><strong>במת עץ נקייה:</strong> שומרים על מרכז הבמה פנוי ללא מבנים מקובעים.</li>
        <li><strong>כניסה ויציאה ב-10 שניות:</strong> כל אביזר (מיטת טרומן, שולחן המשרד, סירת המפרש) מורכב על גלגלי סיליקון שקטים עם מעצורים.</li>
        <li><strong>שימוש בבדים וגופים:</strong> המוני העיירה (ניצבים) יוצרים את הצפיפות והאשליה של עיר חיה בתנועה סביב טרומן.</li>
      </ul>
    `
  },
  'wing-left': {
    title: 'מעבר מאחורי הקלעים - שמאל',
    badge: 'מעבר צר',
    html: `
      <p><strong>תפעול מעבר שמאל הצר:</strong></p>
      <ul>
        <li><strong>אחסון שטוח בלבד:</strong> כאן מחזיקים אלמנטים שעוביים קטן מ-15 ס"מ – מסגרת המראה הפתוחה, בדי גלי הים המקופלים, ושלטים נישאים.</li>
        <li><strong>כניסת שחקנים אינטימית:</strong> כניסת מריל בבוקר, כניסת סילביה/לורן, וכניסת כריסטוף בתחילת המופע.</li>
      </ul>
    `
  },
  'wing-right': {
    title: 'מעבר מאחורי הקלעים - ימין',
    badge: 'מעבר צר + עמדת עזר',
    html: `
      <p><strong>תפעול מעבר ימין הצר:</strong></p>
      <ul>
        <li><strong>כניסת סירת המפרש:</strong> החרטום של הסירה (סנטה מריה) נכנס דרך מעבר זה ישירות לקראת קיר השמיים.</li>
        <li><strong>שולחן אביזרים מהיר:</strong> שולחן צר צמוד לקיר עבור אביזרים אישיים (מגזינים, שישיית בירה, קולפן, רדיו).</li>
      </ul>
    `
  },
  stairs: {
    title: 'מדרגות אל הקהל (פינה ימנית תחתונה)',
    badge: 'גשר בין עולמות',
    html: `
      <p><strong>שימוש דרמטי במדרגות היורדות לאולם:</strong></p>
      <ul>
        <li><strong>טרומן על שפת המזח:</strong> טרומן יושב על המדרגה התחתונה ומביט אל החושך של האולם (המייצג את האוקיינוס והפחד מטביעה).</li>
        <li><strong>כניסת ניצבים ועוברי אורח:</strong> שחקנים מגיעים לעיתים מתוך האולם ועולים במדרגות, מה שמגביר את תחושת הריאליטי וההשתתפות של הקהל.</li>
        <li><strong>איזון מרחבי:</strong> כשהמדרגות בימין והתזמורת בשמאל, כל החזית של הבמה מנוצלת בהרמוניה מושלמת.</li>
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

        // highlight selected zone
        zones.forEach(z => z.style.outline = 'none');
        zone.style.outline = '3px solid #f8b449';
      }
    });
  });
}

/* -------------------------------------------------------------
 * 3. ORCHESTRA 3-OPTION TOGGLES
 * ------------------------------------------------------------- */
const orchOptionsText = {
  1: `<strong>חלופה א׳ (מומלצת ביותר):</strong> תופסת אפס שטח ממשטח הבמה! הפסנתר, הגיטרות ומערכת התופים יושבים על רצפת האולם משמאל לבמה, מתחת למפלס השחקנים. הקהל נהנה מסאונד חי ומקצועי, ומאחורי הקלעים נשאר 100% פנוי למעבר שחקנים.`,
  2: `<strong>חלופה ב׳ (במה מוגבהת באגף שמאל האחורי):</strong> התזמורת יושבת על במה קטנה בפינה השמאלית האחורית, כחלק מ"אולפן הטלוויזיה של כריסטוף". יתרון: מראה ויזואלי מהפנט של להקת אולפן שידור חי. חסרון: תופס שטח יקר ליד מעבר הקלעים השמאלי.`,
  3: `<strong>חלופה ג׳ (בפיט מרכזי מתחת לקו הבמה):</strong> התזמורת ממוקמת בשורה הראשונה של האולם לפני קדמת הבמה. יתרון: פיזור סאונד אקוסטי אחיד לכל הקהל. חסרון: דורש חסימה של 1-2 שורות מושבים קדמיות באולם.`
};

function initOrchestraOptions() {
  const btns = document.querySelectorAll('.opt-btn');
  const expEl = document.getElementById('optExplanation');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const optNum = btn.getAttribute('data-opt');
      if (orchOptionsText[optNum]) {
        expEl.innerHTML = orchOptionsText[optNum];
      }
    });
  });
}

/* -------------------------------------------------------------
 * 4. AI GALLERY & LIGHTBOX MODAL
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
 * 5. SCENE FILTERS
 * ------------------------------------------------------------- */
function initSceneFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sceneItems = document.querySelectorAll('.scene-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      sceneItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-act') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 6. SCENE ACCORDION TOGGLE
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
 * 7. PROPS TABLE & CHECKLIST
 * ------------------------------------------------------------- */
const defaultProps = [
  { id: 1, name: 'שלט מואר "שידור חי" / "המופע של טרומן"', scene: 'פרולוג + תמונה 1', notes: 'קופסת עץ עם חזית פרספקס מוארת בלד', status: 'inprogress', checked: false },
  { id: 2, name: 'מסגרת מראה פתוחה ללא זכוכית', scene: 'תמונה 1', notes: 'מסגרת עץ טבעי על מעמד דק קל משקל', status: 'done', checked: true },
  { id: 3, name: 'מיטת טרומן על גלגלים שקטים', scene: 'תמונה 1', notes: 'רוחב 90 ס"מ, גלגלי סיליקון עם מעצור רגל', status: 'done', checked: true },
  { id: 4, name: 'שלט קרטון מתחלף "יום 10,909"', scene: 'תמונה 1', notes: 'קרטון אפור כבד עם כיתוב אותיות שבלונה', status: 'done', checked: true },
  { id: 5, name: 'פנס נופל מהשמיים (חוט דיג וגלגלת)', scene: 'תמונה 1', notes: 'פנס תיאטרון מקרטון/פלסטיק בטוח לנפילה', status: 'inprogress', checked: false },
  { id: 6, name: 'מגזין "ההוא!" (Now!) ועיתון יומי', scene: 'תמונה 1, 4', notes: 'שער מודפס על מגזין קיים עם כותרת מוגדלת', status: 'todo', checked: false },
  { id: 7, name: 'מגאפון לשוטר', scene: 'תמונה 1', notes: 'מגאפון וינטג׳ ידני', status: 'todo', checked: false },
  { id: 8, name: 'שולחן משרדי מתקפל, טלפון חוגה וקלסרים', scene: 'תמונה 2', notes: 'שולחן קל מתקפל, טלפון חוגה שחור ישן', status: 'inprogress', checked: false },
  { id: 9, name: 'שלט "מעבורת להארבור איילנד" + חבל מזח', scene: 'תמונה 2', notes: 'שלט עץ שרוף/מצויר תלוי על מוט', status: 'todo', checked: false },
  { id: 10, name: 'שישיית פחיות בירה + כדור/מקל', scene: 'תמונה 3', notes: 'פחיות מתכת ריקות באריזת קרטון', status: 'done', checked: true },
  { id: 11, name: 'סוודר אדום של סילביה וסיכת "איך זה ייגמר?"', scene: 'תמונה 6', notes: 'סוודר צמר אדום בוהק, סיכה מודפסת גדולה', status: 'done', checked: true },
  { id: 12, name: 'שני פנסי רכב מסנוורים בידי שחקנים', scene: 'תמונה 6', notes: 'פנסי לד עוצמתיים עם סוללות עצמאיות', status: 'inprogress', checked: false },
  { id: 13, name: 'פרגוד בית חולים לבן נייד + חלוקי רופאים', scene: 'תמונה 7', notes: 'מסגרת בד לבנה ניידת + 2 חלוקים ומסכות', status: 'todo', checked: false },
  { id: 14, name: 'פוסטר סוכנות נסיעות (מטוס פוגע בברק)', scene: 'תמונה 9', notes: 'פוסטר קומי מוגדל ומודפס על קאפה', status: 'inprogress', checked: false },
  { id: 15, name: 'שלט "סכנה - תחנת כוח גרעינית סיהייבן"', scene: 'תמונה 10', notes: 'שלט צהוב זוהר + חליפות מגן ומסכות עשן', status: 'todo', checked: false },
  { id: 16, name: 'קולפן ירקות רב-תכליתי (פרסומת מריל)', scene: 'תמונה 10', notes: 'קולפן עם קופסה צבעונית מוגזמת', status: 'done', checked: true },
  { id: 17, name: 'חרטום סירת המפרש "סנטה מריה" על גלגלים', scene: 'תמונה 12-14', notes: 'מבנה עץ קל, תורן חבלים, הגה עץ קטן', status: 'inprogress', checked: false },
  { id: 18, name: 'יריעות משי כחולות לגלי הסערה', scene: 'תמונה 13-14', notes: '2 יריעות משי/אורגנזה באורך 5 מטר כל אחת', status: 'todo', checked: false },
  { id: 19, name: 'קיר שמיים אחורי עם דלת ומדרגות עץ', scene: 'תמונה 14', notes: 'קיר עננים מצויר, דלת לבנה בקו אפס ומדרגות יציבות', status: 'inprogress', checked: false }
];

let propsData = JSON.parse(localStorage.getItem('truman_props_data')) || defaultProps;

function initPropsTable() {
  renderPropsTable();

  // Search input
  const searchInput = document.getElementById('propSearch');
  searchInput.addEventListener('input', () => {
    filterAndRenderProps();
  });

  // Status buttons
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

  const filtered = propsData.filter(item => {
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
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem; color: #9ca3af;">לא נמצאו רקוויזיטים תואמים</td></tr>`;
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

  // Attach events
  tbody.querySelectorAll('.prop-check').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const item = propsData.find(p => p.id === id);
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
      const item = propsData.find(p => p.id === id);
      if (item) {
        // Cycle status: todo -> inprogress -> done -> todo
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
    case 'todo': return '⏳ לביצוע';
    case 'inprogress': return '🔨 בעבודה';
    case 'done': return '✅ מוכן';
    default: return status;
  }
}

function saveProps() {
  localStorage.setItem('truman_props_data', JSON.stringify(propsData));
}

/* -------------------------------------------------------------
 * 8. COPY REPO LINK BUTTON
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
