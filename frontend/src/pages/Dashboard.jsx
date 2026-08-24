import React, { useEffect, useMemo, useState } from 'react';
import { getLoans } from '../services/api';

export default function Dashboard() {
  const [loans, setLoans] = useState([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [connected, setConnected] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let active = true;
    const refreshLoans = async (showSpinner = false) => {
      if (showSpinner) setRefreshing(true);
      try {
        const data = await getLoans();
        if (active) {
          setLoans(Array.isArray(data) ? data : []);
          setConnected(true);
          setLastUpdated(new Date());
        }
      } catch {
        if (active) setConnected(false);
      } finally {
        if (active) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    refreshLoans();
    const interval = window.setInterval(refreshLoans, 15000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const filteredLoans = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return loans.filter((loan) => {
      const matchesStatus = statusFilter === 'all' || String(loan.status || '').toLowerCase() === statusFilter;
      const searchable = `${loan.id} ${loan.loan_purpose || ''} ${loan.status || ''}`.toLowerCase();
      return matchesStatus && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [loans, query, statusFilter]);

  const totalValue = loans.reduce((sum, loan) => sum + Number(loan.loan_amount || 0), 0);
  const approvedCount = loans.filter((loan) => String(loan.status).toLowerCase() === 'approved').length;
  const pendingCount = loans.filter((loan) => ['pending', 'under_review', 'under review'].includes(String(loan.status).toLowerCase())).length;
  const averageValue = loans.length ? totalValue / loans.length : 0;
  const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  const statusLabel = (status) => String(status || 'pending').replace(/_/g, ' ');
  const dateLabel = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  const updatedLabel = lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Syncing data';

  return (
    <main className="dashboard-shell">
      <section className="welcome-row">
        <div><p className="eyebrow">{dateLabel}</p><h1>Good morning, Alex <span aria-hidden="true">✦</span></h1><p className="muted">Here&apos;s what&apos;s happening with your loan portfolio today.</p></div>
        <a className="primary-button" href="/apply"><span aria-hidden="true">＋</span> New application</a>
      </section>

      <div className="live-status"><span className={`live-dot ${connected ? '' : 'offline'}`} /> <span>{connected ? 'Live portfolio' : 'Connection interrupted'}</span><span className="live-divider" /> <span className="muted">{updatedLabel}</span><button className="refresh-button" onClick={() => window.location.reload()} disabled={refreshing} aria-label="Refresh dashboard">↻ {refreshing ? 'Refreshing' : 'Refresh'}</button></div>

      <section className="metric-grid" aria-label="Portfolio overview">
        <article className="metric-card metric-card-dark"><div className="metric-top"><span>Total applications</span><span className="metric-icon">↗</span></div><strong>{loans.length}</strong><small><b className="trend-up">↑ 12.5%</b> vs last month</small></article>
        <article className="metric-card"><div className="metric-top"><span>Portfolio value</span><span className="metric-icon pale">◈</span></div><strong>{formatCurrency(totalValue)}</strong><small><b className="trend-up">↑ 8.2%</b> vs last month</small></article>
        <article className="metric-card"><div className="metric-top"><span>Approval rate</span><span className="metric-icon pale">✓</span></div><strong>{loans.length ? Math.round((approvedCount / loans.length) * 100) : 0}%</strong><small><b className="trend-up">↑ 4.1%</b> vs last month</small></article>
        <article className="metric-card"><div className="metric-top"><span>Average loan size</span><span className="metric-icon pale">▱</span></div><strong>{formatCurrency(averageValue)}</strong><small><b className="trend-neutral">→ 0.4%</b> vs last month</small></article>
      </section>

      <section className="dashboard-grid">
        <article className="panel pipeline-panel"><div className="panel-heading"><div><p className="eyebrow">Portfolio flow</p><h2>Application pipeline</h2></div><button className="icon-button" aria-label="More pipeline options">•••</button></div><div className="pipeline-visual">{[['New', loans.filter((loan) => String(loan.status).toLowerCase() === 'new').length, 'orange'], ['In review', pendingCount, 'blue'], ['Approved', approvedCount, 'green'], ['Declined', loans.filter((loan) => String(loan.status).toLowerCase() === 'declined').length, 'red']].map(([label, count, color]) => <div className="pipeline-stage" key={label}><div className={`stage-bar ${color}`} style={{ height: `${Math.max(12, Math.min(100, loans.length ? (count / loans.length) * 100 : 12))}%` }}><span>{count}</span></div><small>{label}</small></div>)}</div><div className="pipeline-footer"><span><i className="dot green" /> {approvedCount} approved this period</span><span className="muted">{updatedLabel}</span></div></article>
        <article className="panel attention-panel"><div className="panel-heading"><div><p className="eyebrow">Action required</p><h2>Needs your attention</h2></div><span className="count-badge">{pendingCount}</span></div><div className="attention-item"><span className="attention-mark">!</span><div><strong>{pendingCount} applications awaiting review</strong><p>Review documents to keep your queue moving.</p></div><span className="arrow">›</span></div><div className="attention-item"><span className="attention-mark soft">↗</span><div><strong>Monthly volume is up</strong><p>Your portfolio is tracking 12.5% ahead.</p></div><span className="arrow">›</span></div><a className="text-link" href="/credit-assessment">Open credit assessment <span>→</span></a></article>
      </section>

      <section className="panel applications-panel"><div className="panel-heading applications-heading"><div><p className="eyebrow">Live queue</p><h2>Recent applications</h2></div><a className="text-link" href="/apply">View all <span>→</span></a></div><div className="table-tools"><label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search applications" aria-label="Search applications" /></label><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by status"><option value="all">All statuses</option><option value="new">New</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="declined">Declined</option></select></div><div className="table-wrap"><table><thead><tr><th>Application</th><th>Purpose</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead><tbody>{loading ? <tr><td className="table-empty" colSpan="5">Loading applications...</td></tr> : filteredLoans.length ? filteredLoans.slice(0, 6).map((loan) => <tr key={loan.id}><td><span className="application-avatar">{String(loan.id).slice(-2)}</span><span className="application-id">LN-{String(loan.id).padStart(5, '0')}</span></td><td>{loan.loan_purpose || 'General purpose'}</td><td className="amount">{formatCurrency(loan.loan_amount)}</td><td><span className={`status status-${String(loan.status || 'pending').toLowerCase().replace(/\s+/g, '-')}`}>{statusLabel(loan.status)}</span></td><td><button className="row-action" aria-label={`Open application LN-${loan.id}`}>↗</button></td></tr>) : <tr><td className="table-empty" colSpan="5">No applications match your filters.</td></tr>}</tbody></table></div></section>
    </main>
  );
}