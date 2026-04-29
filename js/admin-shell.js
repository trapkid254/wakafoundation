// ════════════════════════════════════════════════════════════
//  WAKA FOUNDATION — Shared Admin Shell
//  Injects sidebar + topbar into every admin page
// ════════════════════════════════════════════════════════════

function buildAdminShell(activeNav = '') {
  const user = WAKA.auth.getUser();
  const roleLabels = { admin: '🛡 Super Admin', manager: '📋 Program Manager', finance: '💰 Finance Officer', comms: '📣 Communications' };

  // Inject global styles
  const style = document.createElement('style');
  style.textContent = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --ink:#0d1b2a;--blue:#1a56a0;--blue-light:#2e7dd4;--blue-pale:#e8f1fb;
      --green:#2e9e5b;--green-light:#3dbd70;--green-pale:#e6f7ee;
      --gold:#f0a500;--gold-pale:#fff8e6;
      --red:#ef4444;--red-pale:#fef2f2;
      --orange:#f97316;--orange-pale:#fff7ed;
      --white:#fff;--grey:#f5f6f8;--text:#374151;
      --muted:#6b7280;--border:#e5e7eb;
      --sidebar:240px;
      --font-display:'Playfair Display',Georgia,serif;
      --font-body:'DM Sans',system-ui,sans-serif;
    }
    html,body{height:100%;font-family:var(--font-body);background:var(--grey);color:var(--text)}
    a{text-decoration:none;color:inherit}
    h1,h2,h3,h4{font-family:var(--font-display);color:var(--ink);line-height:1.25}
    h1{font-size:1.7rem;font-weight:900}h2{font-size:1.4rem;font-weight:700}h3{font-size:1.1rem;font-weight:700}
    p{line-height:1.65}
    input,select,textarea{font-family:var(--font-body)}
    button{font-family:var(--font-body);cursor:pointer}

    /* LAYOUT */
    .admin-shell{display:flex;min-height:100vh}
    .sidebar{width:var(--sidebar);background:var(--ink);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;transition:.3s}
    .sidebar-header{padding:20px 16px;border-bottom:1px solid rgba(255,255,255,.08)}
    .logo{display:flex;align-items:center;gap:10px}
    .logo-icon{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,var(--blue),var(--green));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:1rem;flex-shrink:0}
    .logo-text{color:#fff;font-family:var(--font-display);font-weight:900;font-size:1rem;line-height:1.1}
    .logo-text span{color:var(--green-light);display:block;font-size:.72rem;font-weight:400;font-family:var(--font-body)}
    .sidebar-nav{flex:1;overflow-y:auto;padding:12px 8px}
    .nav-section-label{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.3);padding:12px 12px 6px}
    .nav-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;color:rgba(255,255,255,.65);font-size:.88rem;font-weight:500;transition:.2s;cursor:pointer;margin-bottom:2px;text-decoration:none}
    .nav-item:hover{background:rgba(255,255,255,.08);color:#fff}
    .nav-item.active{background:linear-gradient(135deg,var(--blue),var(--blue-light));color:#fff;box-shadow:0 4px 14px rgba(26,86,160,.4)}
    .nav-item .icon{font-size:1.05rem;width:22px;text-align:center;flex-shrink:0}
    .nav-badge{margin-left:auto;background:var(--red);color:#fff;font-size:.68rem;font-weight:700;padding:2px 7px;border-radius:99px}
    .nav-badge-gold{background:var(--gold)}
    .sidebar-footer{padding:14px 8px;border-top:1px solid rgba(255,255,255,.08)}
    .user-card{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;background:rgba(255,255,255,.06)}
    .user-avatar{width:34px;height:34px;border-radius:8px;background:linear-gradient(135deg,var(--blue),var(--green));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.88rem;flex-shrink:0}
    .user-info{flex:1;min-width:0}
    .user-info strong{display:block;color:#fff;font-size:.82rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .user-info span{font-size:.72rem;color:rgba(255,255,255,.45)}
    .logout-btn{background:none;border:none;color:rgba(255,255,255,.4);font-size:1rem;cursor:pointer;transition:.2s;padding:4px}
    .logout-btn:hover{color:var(--red)}

    /* MAIN */
    .main{margin-left:var(--sidebar);flex:1;display:flex;flex-direction:column;min-height:100vh}
    .topbar{background:#fff;border-bottom:1px solid var(--border);padding:0 28px;height:64px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:90}
    .page-title{font-size:1.1rem;font-weight:700;color:var(--ink)}
    .topbar-right{display:flex;align-items:center;gap:12px}
    .topbar-btn{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:#fff;cursor:pointer;font-size:1rem;transition:.2s;position:relative}
    .topbar-btn:hover{background:var(--grey)}
    .notif-dot{position:absolute;top:6px;right:6px;width:8px;height:8px;border-radius:50%;background:var(--red);border:2px solid #fff}
    .view-site{display:flex;align-items:center;gap:6px;padding:8px 16px;background:linear-gradient(135deg,var(--blue),var(--green));color:#fff;border-radius:8px;font-size:.83rem;font-weight:600;cursor:pointer;border:none;text-decoration:none}

    /* PAGE CONTENT */
    .page-content{padding:28px;flex:1}
    .page-header{margin-bottom:28px}
    .page-header h1{margin-bottom:6px}
    .page-header p{font-size:.9rem;color:var(--muted)}

    /* CARDS */
    .card{background:#fff;border-radius:14px;padding:24px;box-shadow:0 1px 4px rgba(13,27,42,.06);border:1px solid var(--border)}
    .card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px}
    .card-title{font-size:1rem;font-weight:700;color:var(--ink)}
    
    /* STATS ROW */
    .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:24px}
    .stat-card{background:#fff;border-radius:14px;padding:22px;border:1px solid var(--border);box-shadow:0 1px 4px rgba(13,27,42,.06)}
    .stat-card .top{display:flex;align-items:flex-start;justify-content:space-between}
    .stat-card .icon-box{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.3rem}
    .stat-card .label{font-size:.78rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
    .stat-card .value{font-family:var(--font-display);font-size:1.8rem;font-weight:900;color:var(--ink);line-height:1}
    .stat-card .change{font-size:.78rem;margin-top:8px;display:flex;align-items:center;gap:4px}
    .change-up{color:var(--green)}
    .change-dn{color:var(--red)}

    /* TABLE */
    .table-wrap{overflow-x:auto}
    table{width:100%;border-collapse:collapse}
    th{text-align:left;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);padding:10px 16px;border-bottom:2px solid var(--border);white-space:nowrap}
    td{padding:13px 16px;border-bottom:1px solid var(--border);font-size:.88rem;vertical-align:middle}
    tr:last-child td{border-bottom:none}
    tr:hover td{background:var(--grey)}
    .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:99px;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
    .badge-green{background:var(--green-pale);color:var(--green)}
    .badge-red{background:var(--red-pale);color:var(--red)}
    .badge-gold{background:var(--gold-pale);color:#b47800}
    .badge-blue{background:var(--blue-pale);color:var(--blue)}
    .badge-grey{background:var(--grey);color:var(--muted)}
    .badge-orange{background:var(--orange-pale);color:var(--orange)}

    /* BUTTONS */
    .btn{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:8px;font-size:.88rem;font-weight:600;cursor:pointer;border:none;transition:.2s;text-decoration:none}
    .btn-primary{background:var(--blue);color:#fff}
    .btn-primary:hover{background:var(--blue-light)}
    .btn-green{background:var(--green);color:#fff}
    .btn-green:hover{background:var(--green-light)}
    .btn-red{background:var(--red);color:#fff}
    .btn-gold{background:var(--gold);color:#fff}
    .btn-outline{background:#fff;color:var(--ink);border:1.5px solid var(--border)}
    .btn-outline:hover{border-color:var(--blue);color:var(--blue)}
    .btn-sm{padding:6px 12px;font-size:.78rem}
    .btn-icon{width:32px;height:32px;padding:0;justify-content:center;border-radius:7px}

    /* FORM */
    .form-group{margin-bottom:18px}
    .form-group label{display:block;font-size:.83rem;font-weight:600;color:var(--ink);margin-bottom:7px}
    .form-group input,.form-group select,.form-group textarea{width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:8px;font-size:.9rem;color:var(--ink);outline:none;transition:.2s;background:#fff}
    .form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(26,86,160,.1)}
    .form-group textarea{resize:vertical;min-height:100px}
    .form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}

    /* MODAL */
    .modal-overlay{position:fixed;inset:0;background:rgba(13,27,42,.65);z-index:500;display:none;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px)}
    .modal-overlay.open{display:flex}
    .modal{background:#fff;border-radius:16px;padding:32px;max-width:560px;width:100%;max-height:90vh;overflow-y:auto;position:relative}
    .modal-close{position:absolute;top:14px;right:14px;width:30px;height:30px;border:none;background:var(--grey);border-radius:50%;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;color:var(--muted)}
    .modal-close:hover{background:var(--red);color:#fff}
    .modal h2{margin-bottom:6px}
    .modal > p{font-size:.88rem;color:var(--muted);margin-bottom:24px}

    /* MISC */
    .divider{height:1px;background:var(--border);margin:20px 0}
    .flex{display:flex;align-items:center}
    .gap-2{gap:8px}.gap-3{gap:12px}.gap-4{gap:16px}
    .ml-auto{margin-left:auto}
    .text-muted{color:var(--muted);font-size:.83rem}
    .text-green{color:var(--green)}
    .text-red{color:var(--red)}
    .text-blue{color:var(--blue)}
    .text-gold{color:var(--gold)}
    .fw-bold{font-weight:700}
    .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
    .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
    .progress-bar{height:8px;background:var(--border);border-radius:4px;overflow:hidden}
    .progress-fill{height:100%;border-radius:4px;transition:.5s}
    .search-bar{display:flex;align-items:center;gap:8px;background:var(--grey);border:1.5px solid var(--border);border-radius:8px;padding:9px 14px}
    .search-bar input{border:none;background:transparent;outline:none;font-family:var(--font-body);font-size:.88rem;flex:1}
    .filters{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
    .filter-select{padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;font-family:var(--font-body);font-size:.83rem;outline:none;background:#fff}
    .empty-state{text-align:center;padding:60px 20px;color:var(--muted)}
    .empty-state .icon{font-size:3rem;margin-bottom:16px}
    
    /* CHART BAR */
    .chart-bar-wrap{display:flex;flex-direction:column;gap:10px}
    .chart-bar-item{display:flex;align-items:center;gap:12px}
    .chart-bar-label{font-size:.82rem;width:140px;flex-shrink:0;font-weight:500}
    .chart-bar-track{flex:1;height:10px;background:var(--border);border-radius:5px;overflow:hidden}
    .chart-bar-fill{height:100%;border-radius:5px;transition:.8s}
    .chart-bar-val{font-size:.82rem;font-weight:700;width:70px;text-align:right}

    /* SIDEBAR TOGGLE MOBILE */
    .sidebar-toggle{display:none;background:none;border:none;font-size:1.3rem;cursor:pointer;padding:4px}
    @media(max-width:960px){
      .sidebar{transform:translateX(-100%)}
      .sidebar.open{transform:translateX(0)}
      .main{margin-left:0}
      .stats-grid{grid-template-columns:repeat(2,1fr)}
      .sidebar-toggle{display:block}
      .sidebar-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:99;display:none}
      .sidebar.open ~ .main .sidebar-overlay{display:block}
    }
    @media(max-width:600px){
      .stats-grid{grid-template-columns:1fr 1fr}
      .form-row{grid-template-columns:1fr}
      .page-content{padding:18px}
    }
  `;
  document.head.appendChild(style);

  // Role-based navigation permissions
  const rolePermissions = {
    admin: ['dashboard', 'donations', 'beneficiaries', 'programs', 'volunteers', 'partners', 'finance', 'reports', 'messages', 'blog', 'impact', 'settings'],
    manager: ['dashboard', 'donations', 'beneficiaries', 'programs', 'volunteers', 'partners', 'messages', 'impact'],
    finance: ['dashboard', 'donations', 'finance', 'reports', 'beneficiaries'],
    comms: ['dashboard', 'messages', 'blog', 'impact', 'partners']
  };

  // Nav items config with role access
  const allNavItems = [
    { section: 'Overview' },
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', href: 'dashboard.html' },
    { section: 'Operations' },
    { id: 'donations', label: 'Donations', icon: '💳', href: 'donations.html', badge: WAKA.store.get('donations', []).filter(d => d.status === 'pending').length || '' },
    { id: 'beneficiaries', label: 'Beneficiaries', icon: '👥', href: 'beneficiaries.html' },
    { id: 'programs', label: 'Programs', icon: '📋', href: 'programs.html' },
    { id: 'volunteers', label: 'Volunteers', icon: '🙌', href: 'volunteers.html' },
    { id: 'partners', label: 'Partners', icon: '🤝', href: 'partners.html' },
    { section: 'Finance' },
    { id: 'finance', label: 'Finance & Budget', icon: '💰', href: 'finance.html' },
    { id: 'reports', label: 'Reports', icon: '📊', href: 'reports.html' },
    { section: 'Content' },
    { id: 'messages', label: 'Messages', icon: '✉️', href: 'messages.html', badge: WAKA.store.get('messages', []).filter(m => m.status === 'unread').length || '' },
    { id: 'blog', label: 'Blog & Updates', icon: '📝', href: 'blog.html' },
    { id: 'impact', label: 'Impact Metrics', icon: '📈', href: 'impact.html' },
    { section: 'System' },
    { id: 'settings', label: 'Settings', icon: '⚙️', href: 'settings.html' },
  ];

  // Filter nav items based on user role
  const userPermissions = rolePermissions[user.role] || rolePermissions.admin;
  const navItems = allNavItems.filter(item => {
    if (item.section) return true; // Keep section headers
    return userPermissions.includes(item.id);
  });

  const navHTML = navItems.map(item => {
    if (item.section) return `<div class="nav-section-label">${item.section}</div>`;
    const isActive = item.id === activeNav;
    const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
    return `<a href="${item.href}" class="nav-item ${isActive ? 'active' : ''}">${' '}<span class="icon">${item.icon}</span>${item.label}${badge}</a>`;
  }).join('');

  // Build HTML
  document.body.innerHTML = `
    <div class="admin-shell">
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <img src="../images/waka logo.png" alt="WAKA Foundation Logo" style="width:38px;height:38px;border-radius:10px;object-fit:contain;flex-shrink:0"/>
            <div class="logo-text">WAKA Foundation <span>Admin Control Panel</span></div>
          </div>
        </div>
        <nav class="sidebar-nav">${navHTML}</nav>
        <div class="sidebar-footer">
          <div class="user-card">
            <div class="user-avatar">${user.name.charAt(0)}</div>
            <div class="user-info">
              <strong>${user.name}</strong>
              <span>${roleLabels[user.role] || user.role}</span>
            </div>
            <button class="logout-btn" onclick="WAKA.auth.logout()" title="Logout">Logout</button>
          </div>
        </div>
      </aside>
      <main class="main" id="mainContent">
        <header class="topbar">
          <div class="flex gap-3">
            <button class="sidebar-toggle" onclick="toggleSidebar()">☰</button>
            <span class="page-title" id="pageTitle">Dashboard</span>
          </div>
          <div class="topbar-right">
            <a href="../index.html" target="_blank" class="view-site">🌐 View Site</a>
            <div class="topbar-btn" title="Notifications" onclick="WAKA.notify('No new system alerts','info')">🔔<span class="notif-dot"></span></div>
            <div class="topbar-btn" title="Help">❓</div>
          </div>
        </header>
        <div class="page-content" id="pageContent"></div>
      </main>
    </div>
    <div id="globalModal" class="modal-overlay">
      <div class="modal" id="globalModalInner">
        <button class="modal-close" onclick="closeGlobalModal()">✕</button>
        <div id="globalModalContent"></div>
      </div>
    </div>
  `;

  // Sidebar toggle for mobile
  window.toggleSidebar = function () {
    document.getElementById('sidebar').classList.toggle('open');
  };
  window.openGlobalModal = function (html) {
    document.getElementById('globalModalContent').innerHTML = html;
    document.getElementById('globalModal').classList.add('open');
  };
  window.closeGlobalModal = function () {
    document.getElementById('globalModal').classList.remove('open');
  };
  document.getElementById('globalModal').addEventListener('click', e => {
    if (e.target.id === 'globalModal') closeGlobalModal();
  });
}