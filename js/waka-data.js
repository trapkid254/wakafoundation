// ════════════════════════════════════════════════════════════
//  WAKA WILL WORK FOUNDATION — Shared Admin Data Store
//  All admin pages import this file to share live state
// ════════════════════════════════════════════════════════════

const WAKA = {

  // ── AUTH ──────────────────────────────────────────────────
  auth: {
    check() {
      if (localStorage.getItem('waka_admin_logged_in') !== 'true') {
        window.location.href = 'login.html';
        return false;
      }
      return true;
    },
    logout() {
      localStorage.removeItem('waka_admin_logged_in');
      localStorage.removeItem('waka_admin_role');
      window.location.href = 'login.html';
    },
    getUser() {
      return {
        name: localStorage.getItem('waka_admin_name') || 'Admin',
        email: localStorage.getItem('waka_admin_email') || 'admin@wakafoundation.org',
        role: localStorage.getItem('waka_admin_role') || 'admin'
      };
    }
  },

  // ── STORAGE HELPERS ───────────────────────────────────────
  store: {
    get(key, fallback = null) {
      try { const v = localStorage.getItem('waka_' + key); return v ? JSON.parse(v) : fallback; }
      catch { return fallback; }
    },
    set(key, val) {
      try { localStorage.setItem('waka_' + key, JSON.stringify(val)); return true; }
      catch { return false; }
    }
  },

  // ── SEED DEFAULT DATA ─────────────────────────────────────
  seed() {
    // Only seed if first time
    if (this.store.get('seeded')) return;

    // DONATIONS
    this.store.set('donations', [
      { id: 'D001', donor: 'Mary Wanjiku', email: 'mary@email.com', phone: '+254712345678', amount: 5000, currency: 'KES', method: 'mpesa', program: 'Education', frequency: 'monthly', status: 'completed', date: '2025-04-28', reference: 'QKJ9ABCDE', message: 'Keep up the great work!', anonymous: false },
      { id: 'D002', donor: 'John Kamau', email: 'john@email.com', phone: '+254722334455', amount: 1000, currency: 'KES', method: 'mpesa', program: 'Health', frequency: 'one-time', status: 'completed', date: '2025-04-27', reference: 'QKJ9XYZAB', message: '', anonymous: false },
      { id: 'D003', donor: 'Anonymous', email: '', phone: '', amount: 10000, currency: 'KES', method: 'card', program: 'General', frequency: 'one-time', status: 'completed', date: '2025-04-26', reference: 'STR8765432', message: '', anonymous: true },
      { id: 'D004', donor: 'Sarah Odhiambo', email: 'sarah@email.com', phone: '+254733112233', amount: 2500, currency: 'KES', method: 'mpesa', program: 'Youth', frequency: 'monthly', status: 'completed', date: '2025-04-25', reference: 'QKJ9MNOPQ', message: 'For the youth!', anonymous: false },
      { id: 'D005', donor: 'David Mutua', email: 'david@email.com', phone: '', amount: 150, currency: 'USD', method: 'paypal', program: 'Education', frequency: 'monthly', status: 'completed', date: '2025-04-24', reference: 'PP7654321X', message: 'From diaspora with love', anonymous: false },
      { id: 'D006', donor: 'Grace Atieno', email: 'grace@email.com', phone: '+254744556677', amount: 500, currency: 'KES', method: 'mpesa', program: 'Community', frequency: 'one-time', status: 'pending', date: '2025-04-28', reference: 'QKJ9PNDNG', message: '', anonymous: false },
      { id: 'D007', donor: 'Peter Njoroge', email: 'peter@email.com', phone: '+254755667788', amount: 3000, currency: 'KES', method: 'mpesa', program: 'Health', frequency: 'one-time', status: 'failed', date: '2025-04-23', reference: 'QKJ9FAILED', message: '', anonymous: false },
      { id: 'D008', donor: 'Equity Foundation', email: 'csr@equity.co.ke', phone: '+254202626000', amount: 50000, currency: 'KES', method: 'bank', program: 'General', frequency: 'one-time', status: 'completed', date: '2025-04-20', reference: 'BNK2025042', message: 'CSR Initiative Q2 2025', anonymous: false },
      { id: 'D009', donor: 'Amina Hassan', email: 'amina@email.com', phone: '+254766778899', amount: 1500, currency: 'KES', method: 'mpesa', program: 'Education', frequency: 'monthly', status: 'completed', date: '2025-04-19', reference: 'QKJ9AMINA1', message: '', anonymous: false },
      { id: 'D010', donor: 'Tom Mbeki', email: 'tom@email.com', phone: '', amount: 75, currency: 'USD', method: 'paypal', program: 'Youth', frequency: 'one-time', status: 'completed', date: '2025-04-18', reference: 'PP9988776X', message: 'Go Africa!', anonymous: false },
    ]);

    // BENEFICIARIES
    this.store.set('beneficiaries', [
      { id: 'B001', name: 'Amina Juma', age: 14, gender: 'Female', county: 'Kisumu', program: 'Education', status: 'active', joinDate: '2024-09-01', story: 'Dropped out at 11, returned through scholarship', contact: '+254700000001' },
      { id: 'B002', name: 'James Otieno', age: 22, gender: 'Male', county: 'Nairobi', program: 'Youth Empowerment', status: 'graduated', joinDate: '2024-01-15', story: 'Now runs a tailoring shop employing 3 people', contact: '+254700000002' },
      { id: 'B003', name: 'Grace Auma', age: 32, gender: 'Female', county: 'Turkana', program: 'Health', status: 'active', joinDate: '2024-06-10', story: 'Receives monthly maternal health support', contact: '+254700000003' },
      { id: 'B004', name: 'Michael Waweru', age: 17, gender: 'Male', county: 'Kiambu', program: 'Education', status: 'active', joinDate: '2024-09-01', story: 'Scholarship recipient, top of his class', contact: '+254700000004' },
      { id: 'B005', name: 'Fatuma Ali', age: 28, gender: 'Female', county: 'Mombasa', program: 'Community Support', status: 'active', joinDate: '2024-03-20', story: 'Receiving food support for family of 6', contact: '+254700000005' },
      { id: 'B006', name: 'Samuel Kipchoge', age: 19, gender: 'Male', county: 'Uasin Gishu', program: 'Youth Empowerment', status: 'active', joinDate: '2025-01-10', story: 'Enrolled in welding vocational program', contact: '+254700000006' },
      { id: 'B007', name: 'Eunice Wambui', age: 11, gender: 'Female', county: 'Murang\'a', program: 'Education', status: 'active', joinDate: '2025-01-15', story: 'Grade 5 scholarship recipient', contact: '+254700000007' },
      { id: 'B008', name: 'Hassan Omar', age: 45, gender: 'Male', county: 'Garissa', program: 'Poverty Reduction', status: 'active', joinDate: '2024-07-05', story: 'Micro-loan recipient, started a small farm', contact: '+254700000008' },
    ]);

    // VOLUNTEERS
    this.store.set('volunteers', [
      { id: 'V001', name: 'Dr. Lucy Mwangi', email: 'lucy@email.com', phone: '+254711222333', skill: 'Medicine / Healthcare', availability: 'Weekends', county: 'Nairobi', status: 'active', joinDate: '2024-01-10', hours: 120, tasks: ['Health Outreach Kisumu', 'Mobile Clinic Turkana'] },
      { id: 'V002', name: 'Brian Omondi', email: 'brian@email.com', phone: '+254722333444', skill: 'Teaching / Education', availability: 'Full-time', county: 'Kisumu', status: 'active', joinDate: '2024-03-15', hours: 340, tasks: ['Kilifi Learning Centre'] },
      { id: 'V003', name: 'Priya Sharma', email: 'priya@email.com', phone: '', skill: 'Web Development', availability: 'Remote', county: 'Remote', status: 'active', joinDate: '2024-06-01', hours: 80, tasks: ['Website Redesign', 'CRM Setup'] },
      { id: 'V004', name: 'Ahmed Khalid', email: 'ahmed@email.com', phone: '+254733444555', skill: 'Finance / Accounting', availability: 'Weekdays', county: 'Nairobi', status: 'inactive', joinDate: '2023-11-20', hours: 60, tasks: ['Q3 Audit Support'] },
      { id: 'V005', name: 'Faith Chebet', email: 'faith@email.com', phone: '+254744555666', skill: 'Social Work', availability: 'Weekends', county: 'Eldoret', status: 'active', joinDate: '2024-08-12', hours: 95, tasks: ['Community Survey Turkana'] },
    ]);

    // PROGRAMS
    this.store.set('programs', [
      { id: 'P001', name: 'Education Access', icon: '📚', description: 'Scholarships, supplies, and learning centres', budget: 1200000, spent: 850000, beneficiaries: 4800, status: 'active', lead: 'Brian Omondi', counties: ['Nairobi','Kisumu','Kilifi','Murang\'a'], startDate: '2020-01-01' },
      { id: 'P002', name: 'Youth Empowerment', icon: '🌱', description: 'Vocational training and mentorship', budget: 800000, spent: 560000, beneficiaries: 1200, status: 'active', lead: 'Faith Chebet', counties: ['Nairobi','Eldoret','Kisumu'], startDate: '2020-06-01' },
      { id: 'P003', name: 'Health Outreach', icon: '🏥', description: 'Mobile clinics and maternal health', budget: 950000, spent: 710000, beneficiaries: 3100, status: 'active', lead: 'Dr. Lucy Mwangi', counties: ['Turkana','Samburu','Marsabit','Garissa'], startDate: '2021-01-01' },
      { id: 'P004', name: 'Community Support', icon: '🤝', description: 'Food, water, and emergency relief', budget: 600000, spent: 490000, beneficiaries: 2800, status: 'active', lead: 'Ahmed Khalid', counties: ['Nairobi','Mombasa','Garissa'], startDate: '2020-03-01' },
      { id: 'P005', name: 'Poverty Reduction', icon: '💰', description: 'Microfinance and sustainable livelihoods', budget: 700000, spent: 320000, beneficiaries: 900, status: 'active', lead: 'Hassan Omar', counties: ['Garissa','Turkana','Marsabit'], startDate: '2022-01-01' },
    ]);

    // BLOG POSTS
    this.store.set('posts', [
      { id: 'PO001', title: 'New Learning Centre Opened in Kilifi County', category: 'Education', author: 'Waka Admin', date: '2025-03-15', status: 'published', views: 1243, excerpt: 'Thanks to our donors, we\'ve opened a new learning centre serving 400+ children.', content: 'Full story here...', featured: true },
      { id: 'PO002', title: 'Mobile Health Clinic Reaches 2,000 Patients This Quarter', category: 'Health', author: 'Dr. Lucy Mwangi', date: '2025-02-20', status: 'published', views: 876, excerpt: 'Our mobile clinic completed 18 outreach visits this quarter.', content: 'Full story here...', featured: false },
      { id: 'PO003', title: '120 Youth Graduate from Vocational Training Program', category: 'Youth', author: 'Brian Omondi', date: '2025-01-30', status: 'published', views: 2140, excerpt: '78% of graduates already have job placements.', content: 'Full story here...', featured: true },
      { id: 'PO004', title: 'Q1 2025 Financial Transparency Report', category: 'Transparency', author: 'Waka Admin', date: '2025-04-01', status: 'published', views: 543, excerpt: 'Where every shilling went in Q1 2025.', content: 'Full report...', featured: false },
      { id: 'PO005', title: 'Emergency Food Relief: Garissa Drought Response', category: 'Community', author: 'Faith Chebet', date: '2025-04-10', status: 'draft', views: 0, excerpt: 'Deploying emergency food to 500 families.', content: 'Draft...', featured: false },
    ]);

    // MESSAGES / CONTACT SUBMISSIONS
    this.store.set('messages', [
      { id: 'M001', name: 'Alice Njeri', email: 'alice@email.com', phone: '+254700111222', subject: 'Volunteer Application', message: 'I am a nurse and want to volunteer in your health outreach program.', intent: 'Volunteer', date: '2025-04-28', status: 'unread' },
      { id: 'M002', name: 'TechCorp Kenya', email: 'csr@techcorp.co.ke', phone: '+254202000111', subject: 'Corporate Partnership', message: 'We would like to partner for our 2025 CSR initiative.', intent: 'Partner With Us', date: '2025-04-27', status: 'read' },
      { id: 'M003', name: 'James Oloo', email: 'james@email.com', phone: '', subject: 'Donation Receipt', message: 'I donated KES 5000 but have not received my receipt.', intent: 'Donate / Ask about donations', date: '2025-04-26', status: 'replied' },
      { id: 'M004', name: 'NTV Kenya', email: 'news@ntv.co.ke', phone: '+254202330000', subject: 'Media Interview Request', message: 'We would like to feature Waka Foundation in our evening bulletin.', intent: 'Media inquiry', date: '2025-04-25', status: 'read' },
      { id: 'M005', name: 'Ruth Achieng', email: 'ruth@email.com', phone: '+254711000999', subject: 'Scholarship Inquiry', message: 'My daughter dropped out of school and I heard you offer scholarships.', intent: 'Other', date: '2025-04-24', status: 'unread' },
    ]);

    // PARTNERS
    this.store.set('partners', [
      { id: 'PR001', name: 'UN Kenya', type: 'International NGO', contact: 'liaison@un.org', contribution: 'Technical support & training', status: 'active', since: '2022' },
      { id: 'PR002', name: 'Kenya Red Cross', type: 'Local NGO', contact: 'partner@redcross.or.ke', contribution: 'Emergency relief collaboration', status: 'active', since: '2021' },
      { id: 'PR003', name: 'AMREF Health Africa', type: 'Health NGO', contact: 'amref@amref.org', contribution: 'Mobile clinic co-funding', status: 'active', since: '2023' },
      { id: 'PR004', name: 'Equity Foundation', type: 'Corporate', contact: 'foundation@equity.co.ke', contribution: 'KES 50,000 quarterly grant', status: 'active', since: '2024' },
      { id: 'PR005', name: 'Kenya MOE', type: 'Government', contact: 'moe@education.go.ke', contribution: 'Curriculum support & accreditation', status: 'active', since: '2021' },
    ]);

    // FINANCIAL RECORDS
    this.store.set('finances', [
      { id: 'F001', type: 'income', category: 'Donations', description: 'M-Pesa donations April 2025', amount: 287500, date: '2025-04-30', reference: 'MPESA-APR25' },
      { id: 'F002', type: 'income', category: 'Grants', description: 'Equity Foundation Q2 Grant', amount: 50000, date: '2025-04-20', reference: 'EQ-Q2-2025' },
      { id: 'F003', type: 'expense', category: 'Programs', description: 'School supplies — Kilifi Learning Centre', amount: 85000, date: '2025-04-18', reference: 'EXP-EDU-001' },
      { id: 'F004', type: 'expense', category: 'Programs', description: 'Mobile clinic medical supplies', amount: 120000, date: '2025-04-15', reference: 'EXP-HLT-001' },
      { id: 'F005', type: 'expense', category: 'Operations', description: 'Office rent — Westlands Q2', amount: 35000, date: '2025-04-01', reference: 'EXP-OPS-001' },
      { id: 'F006', type: 'expense', category: 'Programs', description: 'Youth vocational training materials', amount: 65000, date: '2025-04-10', reference: 'EXP-YTH-001' },
      { id: 'F007', type: 'income', category: 'Donations', description: 'PayPal international donations', amount: 34500, date: '2025-04-28', reference: 'PP-APR25' },
      { id: 'F008', type: 'expense', category: 'Programs', description: 'Emergency food — Garissa', amount: 95000, date: '2025-04-22', reference: 'EXP-EMG-001' },
    ]);

    // IMPACT METRICS (shown on public site)
    this.store.set('metrics', {
      livesImpacted: 12000, communities: 47, counties: 8, fundUtilization: 95,
      childrenEducation: 4800, youthTrained: 3800, mealsServed: 25000, clinicVisits: 2000
    });

    // SETTINGS
    this.store.set('settings', {
      orgName: 'WAKA Will Work Foundation',
      tagline: 'Empowering Africa, One Life at a Time',
      email: 'info@wakafoundation.org',
      phone: '+254 700 000 000',
      address: 'Westlands Business Park, Waiyaki Way, Nairobi, Kenya',
      regNumber: 'NG/XXXX/2020',
      mpesaPaybill: '123456',
      mpesaAccount: 'WAKA',
      primaryColor: '#1a56a0',
      accentColor: '#2e9e5b',
      currency: 'KES',
      fiscalYearStart: 'January',
      autoReceipts: true,
      publicFinancials: true,
      maintenanceMode: false
    });

    this.store.set('seeded', true);
  },

  // ── UTILITIES ─────────────────────────────────────────────
  fmt: {
    currency(n, curr = 'KES') { return curr + ' ' + Number(n).toLocaleString(); },
    date(d) { return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }); },
    pct(v, t) { return Math.round((v / t) * 100) + '%'; }
  },

  notify(msg, type = 'success') {
    const toast = document.createElement('div');
    const colors = { success: '#2e9e5b', error: '#ef4444', info: '#1a56a0', warning: '#f0a500' };
    const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
    toast.style.cssText = `position:fixed;bottom:24px;right:24px;background:${colors[type]};color:#fff;padding:14px 22px;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:.9rem;font-weight:500;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,.25);display:flex;align-items:center;gap:10px;max-width:340px;animation:slideIn .3s ease`;
    toast.innerHTML = `<span style="font-size:1rem">${icons[type]}</span>${msg}`;
    const style = document.createElement('style');
    style.textContent = `@keyframes slideIn{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}`;
    document.head.appendChild(style);
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  },

  // ── INIT ─────────────────────────────────────────────────
  init() {
    this.seed();
    this.auth.check();
  }
};