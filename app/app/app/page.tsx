"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownLeft,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  FileBarChart,
  FileText,
  HandCoins,
  LayoutDashboard,
  Menu,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Users,
  Wallet,
  X
} from "lucide-react";

type Section =
  | "Overview"
  | "Customers"
  | "Savings Accounts"
  | "Cash Deposits"
  | "Transactions"
  | "Collectors"
  | "Cash Handovers"
  | "Reports"
  | "Staff & Permissions"
  | "Settings";

const navigation = [
  {
    title: "MAIN MENU",
    items: [
      { label: "Overview", icon: LayoutDashboard },
      { label: "Customers", icon: Users },
      { label: "Savings Accounts", icon: Wallet },
      { label: "Cash Deposits", icon: ArrowDownToLine },
      { label: "Transactions", icon: Activity }
    ]
  },
  {
    title: "OPERATIONS",
    items: [
      { label: "Collectors", icon: BriefcaseBusiness },
      { label: "Cash Handovers", icon: HandCoins },
      { label: "Reports", icon: FileBarChart }
    ]
  },
  {
    title: "ADMINISTRATION",
    items: [
      { label: "Staff & Permissions", icon: ShieldCheck },
      { label: "Settings", icon: Settings }
    ]
  }
] as const;

const customers = [
  {
    id: "CUS-0001",
    name: "Amina Sulemana",
    phone: "024 XXX XXXX",
    account: "SUS-10001",
    balance: 1250,
    status: "Active"
  },
  {
    id: "CUS-0002",
    name: "Ibrahim Yakubu",
    phone: "020 XXX XXXX",
    account: "SUS-10002",
    balance: 875,
    status: "Active"
  },
  {
    id: "CUS-0003",
    name: "Mariam Abdulai",
    phone: "055 XXX XXXX",
    account: "SUS-10003",
    balance: 640,
    status: "Pending"
  },
  {
    id: "CUS-0004",
    name: "Abdul Rahman",
    phone: "027 XXX XXXX",
    account: "SUS-10004",
    balance: 2100,
    status: "Active"
  },
  {
    id: "CUS-0005",
    name: "Safia Osman",
    phone: "059 XXX XXXX",
    account: "SUS-10005",
    balance: 420,
    status: "Inactive"
  }
];

const activityItems = [
  {
    name: "Cash deposit",
    detail: "Demo customer · SUS-10001",
    amount: "+ GHS 50.00",
    time: "Today · 10:42 AM",
    icon: ArrowDownLeft,
    color: ""
  },
  {
    name: "Cash handover",
    detail: "Demo collector · Branch A",
    amount: "GHS 320.00",
    time: "Today · 10:18 AM",
    icon: HandCoins,
    color: "gold"
  },
  {
    name: "New customer",
    detail: "Demo customer · CUS-0005",
    amount: "Registered",
    time: "Today · 9:35 AM",
    icon: Users,
    color: "blue"
  }
];

const chartBars = [
  { day: "Mon", height: 45 },
  { day: "Tue", height: 70 },
  { day: "Wed", height: 54 },
  { day: "Thu", height: 86 },
  { day: "Fri", height: 62 },
  { day: "Sat", height: 96 },
  { day: "Sun", height: 28 }
];

function money(amount: number) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2
  }).format(amount);
}

export default function HomePage() {
  const [section, setSection] = useState<Section>("Overview");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return customers;

    return customers.filter((customer) =>
      [
        customer.id,
        customer.name,
        customer.phone,
        customer.account,
        customer.status
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  function navigateTo(nextSection: Section) {
    setSection(nextSection);
    setMobileOpen(false);
    setNotice("");
    setSearch("");
  }

  function explainDemo(feature: string) {
    setNotice(
      `${feature} is part of the planned build. Database connection and secure permissions must be completed before this feature can handle real customer records or money.`
    );
  }

  const pageTitle = section;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-symbol">
            <CircleDollarSign size={25} />
          </div>
          <div>
            <div className="brand-name">
              Banking & Susu
              <br />
              Management Platform
            </div>
            <div className="brand-subtitle">Financial operations</div>
          </div>
        </div>

        {navigation.map((group) => (
          <div key={group.title} style={{ marginBottom: 25 }}>
            <div className="nav-label">{group.title}</div>
            <nav className="nav-list">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = section === item.label;

                return (
                  <button
                    key={item.label}
                    className={`nav-button ${active ? "active" : ""}`}
                    onClick={() =>
                      navigateTo(item.label as Section)
                    }
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        ))}

        <div className="sidebar-bottom">
          <div className="security-note">
            <ShieldCheck size={22} />
            <div>
              <strong>Security first</strong>
              <small>
                Authentication and access controls will be connected in a
                later stage.
              </small>
            </div>
          </div>
        </div>
      </aside>

      <button
        aria-label="Close navigation"
        className={`mobile-overlay ${mobileOpen ? "visible" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button menu-button"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={19} />
            </button>
            <div>
              <h1 className="page-heading">{pageTitle}</h1>
              <div className="breadcrumb">
                Platform <span aria-hidden="true">/</span> {pageTitle}
              </div>
            </div>
          </div>

          <div className="topbar-right">
            <label className="search-box">
              <Search size={17} />
              <input
                aria-label="Search customers"
                placeholder="Search customers..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSection("Customers");
                }}
              />
              {search && (
                <button
                  aria-label="Clear search"
                  className="icon-button"
                  style={{ height: 25, width: 25 }}
                  onClick={() => setSearch("")}
                >
                  <X size={13} />
                </button>
              )}
            </label>

            <button
              className="icon-button"
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={18} />
              <span className="notification-dot" />
            </button>

            <div className="profile-mark" aria-label="Demo profile">
              AD
            </div>
          </div>
        </header>

        <div className="content">
          {notice && (
            <div className="notice" role="status">
              {notice}
            </div>
          )}

          {showNotifications && (
            <div className="notice" role="status">
              <strong>Notifications</strong>
              <p style={{ margin: "5px 0 0" }}>
                You are viewing a demo interface. Live alerts will be added
                after the database and notification services are configured.
              </p>
              <button
                className="secondary-button"
                style={{ marginTop: 10 }}
                onClick={() => setShowNotifications(false)}
              >
                Close
              </button>
            </div>
          )}

          <div className="demo-banner">
            <BookOpen size={19} />
            <div>
              <strong>Development preview — sample data only</strong>
              <span>
                These figures and records are examples, not real customer
                balances or completed transactions. Do not use this preview
                to accept or manage real savings.
              </span>
            </div>
          </div>

          {section === "Overview" ? (
            <>
              <div className="welcome-row">
                <div>
                  <h2 className="welcome-title">
                    Financial overview
                  </h2>
                  <p className="welcome-description">
                    A central view of savings operations and daily activity.
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => navigateTo("Cash Deposits")}
                >
                  <Plus size={17} />
                  Record cash deposit
                </button>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-top">
                    <span className="stat-label">
                      Total customer savings
                    </span>
                    <div className="stat-icon">
                      <Wallet size={19} />
                    </div>
                  </div>
                  <div className="stat-value">
                    GHS 24,850.00
                  </div>
                  <div className="stat-foot">
                    <Clock3 size={13} />
                    Sample figure · not live
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-top">
                    <span className="stat-label">
                      Registered customers
                    </span>
                    <div className="stat-icon blue">
                      <Users size={19} />
                    </div>
                  </div>
                  <div className="stat-value">248</div>
                  <div className="stat-foot">
                    <Clock3 size={13} />
                    Sample figure · not live
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-top">
                    <span className="stat-label">
                      Today&apos;s collections
                    </span>
                    <div className="stat-icon gold">
                      <HandCoins size={19} />
                    </div>
                  </div>
                  <div className="stat-value">
                    GHS 1,420.00
                  </div>
                  <div className="stat-foot">
                    <Clock3 size={13} />
                    Sample figure · not live
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-top">
                    <span className="stat-label">
                      Active collectors
                    </span>
                    <div className="stat-icon purple">
                      <BriefcaseBusiness size={19} />
                    </div>
                  </div>
                  <div className="stat-value">12</div>
                  <div className="stat-foot">
                    <Clock3 size={13} />
                    Sample figure · not live
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                <section className="panel">
                  <div className="panel-header">
                    <div>
                      <h3 className="panel-title">
                        Collection activity
                      </h3>
                      <div className="panel-subtitle">
                        Illustrative weekly activity
                      </div>
                    </div>
                    <div className="chart-legend">
                      <span className="legend-dot" />
                      Collections
                    </div>
                  </div>

                  <div
                    className="chart-area"
                    role="img"
                    aria-label="Illustrative collection activity chart for Monday through Sunday"
                  >
                    <div className="y-labels">
                      <span>High</span>
                      <span>Medium</span>
                      <span>Low</span>
                      <span>0</span>
                    </div>
                    <div className="bar-chart">
                      {chartBars.map((bar) => (
                        <div className="bar-column" key={bar.day}>
                          <div className="bar-track">
                            <div
                              className="bar"
                              style={{ height: `${bar.height}%` }}
                            />
                          </div>
                          <span className="bar-label">{bar.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="panel">
                  <div className="panel-header">
                    <div>
                      <h3 className="panel-title">
                        Recent activity
                      </h3>
                      <div className="panel-subtitle">
                        Illustrative entries
                      </div>
                    </div>
                    <button
                      className="icon-button"
                      aria-label="View transactions"
                      onClick={() => navigateTo("Transactions")}
                    >
                      <ArrowRight size={17} />
                    </button>
                  </div>

                  <div className="activity-list">
                    {activityItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div className="activity-item" key={item.name}>
                          <div
                            className={`activity-icon ${item.color}`}
                          >
                            <Icon size={18} />
                          </div>
                          <div className="activity-details">
                            <div className="activity-name">
                              {item.name}
                            </div>
                            <div className="activity-time">
                              {item.detail}
                              <br />
                              {item.time}
                            </div>
                          </div>
                          <div className="activity-amount">
                            {item.amount}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              <section className="panel">
                <div className="panel-header">
                  <div>
                    <h3 className="panel-title">
                      Customer accounts
                    </h3>
                    <div className="panel-subtitle">
                      Fictional records for layout testing only
                    </div>
                  </div>
                  <button
                    className="secondary-button"
                    onClick={() => navigateTo("Customers")}
                  >
                    View customers <ArrowRight size={15} />
                  </button>
                </div>

                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Customer ID</th>
                        <th>Account</th>
                        <th>Sample balance</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.slice(0, 4).map((customer) => (
                        <tr key={customer.id}>
                          <td>
                            <div className="customer-cell">
                              <div className="customer-avatar">
                                {customer.name
                                  .split(" ")
                                  .map((part) => part[0])
                                  .join("")
                                  .slice(0, 2)}
                              </div>
                              <div className="customer-name">
                                {customer.name}
                              </div>
                            </div>
                          </td>
                          <td>{customer.id}</td>
                          <td>{customer.account}</td>
                          <td>{money(customer.balance)}</td>
                          <td>
                            <span
                              className={`status-pill ${
                                customer.status === "Pending"
                                  ? "pending"
                                  : customer.status === "Inactive"
                                    ? "inactive"
                                    : ""
                              }`}
                            >
                              {customer.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="table-footer">
                  <span>Showing 4 fictional records</span>
                  <span>Ghana cedi (GHS)</span>
                </div>
              </section>
            </>
          ) : section === "Customers" ? (
            <>
              <div className="welcome-row">
                <div>
                  <h2 className="welcome-title">Customers</h2>
                  <p className="welcome-description">
                    Search the sample customer records shown in this
                    development preview.
                  </p>
                </div>
                <button
                  className="primary-button"
                  onClick={() => explainDemo("Customer registration")}
                >
                  <Plus size={17} />
                  Add customer
                </button>
              </div>

              <section className="panel">
                <div className="panel-header">
                  <div>
                    <h3 className="panel-title">Customer directory</h3>
                    <div className="panel-subtitle">
                      {filteredCustomers.length} sample record(s)
                    </div>
                  </div>
                  <Search size={18} color="#748195" />
                </div>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Customer ID</th>
                        <th>Phone</th>
                        <th>Account</th>
                        <th>Sample balance</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id}>
                          <td>
                            <div className="customer-cell">
                              <div className="customer-avatar">
                                {customer.name
                                  .split(" ")
                                  .map((part) => part[0])
                                  .join("")
                                  .slice(0, 2)}
                              </div>
                              <div className="customer-name">
                                {customer.name}
                              </div>
                            </div>
                          </td>
                          <td>{customer.id}</td>
                          <td>{customer.phone}</td>
                          <td>{customer.account}</td>
                          <td>{money(customer.balance)}</td>
                          <td>
                            <span
                              className={`status-pill ${
                                customer.status === "Pending"
                                  ? "pending"
                                  : customer.status === "Inactive"
                                    ? "inactive"
                                    : ""
                              }`}
                            >
                              {customer.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredCustomers.length === 0 && (
                    <div className="empty-state">
                      No matching sample customers were found.
                    </div>
                  )}
                </div>
              </section>
            </>
          ) : (
            <section className="section-placeholder">
              <div className="placeholder-icon">
                {section === "Savings Accounts" && <Wallet size={28} />}
                {section === "Cash Deposits" && (
                  <ArrowDownToLine size={28} />
                )}
                {section === "Transactions" && <Activity size={28} />}
                {section === "Collectors" && (
                  <BriefcaseBusiness size={28} />
                )}
                {section === "Cash Handovers" && (
                  <HandCoins size={28} />
                )}
                {section === "Reports" && <FileText size={28} />}
                {section === "Staff & Permissions" && (
                  <ShieldCheck size={28} />
                )}
                {section === "Settings" && <Settings size={28} />}
              </div>

              <h2>{section}</h2>
              <p>
                This section is included in the application plan. We will
                connect it to the database, authentication and permission
                checks before enabling real operations.
              </p>

              {section === "Cash Deposits" && (
                <div className="notice" style={{ textAlign: "left" }}>
                  <strong>Cash deposits are not active yet.</strong>
                  <br />
                  No money has been recorded. The next development stages
                  will implement verified customer accounts, authorized
                  staff access, transaction references, a secure ledger,
                  duplicate-submission protection and receipts.
                </div>
              )}

              <button
                className="secondary-button"
                onClick={() => navigateTo("Overview")}
              >
                <LayoutDashboard size={16} />
                Return to overview
              </button>
            </section>
          )}

          <footer
            style={{
              color: "#8490a0",
              fontSize: 11,
              lineHeight: 1.7,
              marginTop: 25,
              textAlign: "center"
            }}
          >
            Banking & Susu Management Platform
            <br />
            Development preview · No real transactions are processed
          </footer>
        </div>
      </main>
    </div>
  );
}
