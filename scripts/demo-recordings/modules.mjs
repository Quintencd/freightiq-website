export const moduleDemos = [
  {
    id: 'dashboardiq',
    title: 'DashboardIQ Command View',
    group: 'Executive',
    url: '/dashboard',
    asset: 'dashboardiq-real-clickthrough-v1',
    durationMs: 72000,
    chapters: ['Live KPI command view', 'Current-year filters', 'Performance drill-down'],
    benefits: [
      'Shows owners the health of the company without waiting for reports.',
      'Keeps sales, stock, imports, receivables and payables visible in one place.',
      'Turns daily management into exception handling instead of manual checking.'
    ],
    callouts: [
      { at: 0, title: 'Command KPIs', body: 'Live cards surface the metrics that need attention today.', x: 6, y: 14, w: 88, h: 18 },
      { at: 24, title: 'Period controls', body: 'Managers can filter by period and warehouse without rebuilding spreadsheets.', x: 5, y: 34, w: 42, h: 24 },
      { at: 48, title: 'Current-year performance', body: 'Financial-year progress gives prospects a practical management rhythm.', x: 48, y: 48, w: 45, h: 32 }
    ],
    actions: [
      { type: 'wait', ms: 4500 },
      { type: 'clickText', text: 'Report', optional: true, ms: 2500 },
      { type: 'scroll', y: 620, ms: 4000 },
      { type: 'scroll', y: 720, ms: 4000 },
      { type: 'scroll', y: -900, ms: 4000 }
    ]
  },
  {
    id: 'companiesiq',
    title: 'CompaniesIQ Customers and Suppliers',
    group: 'Core Records',
    url: '/companiesiq',
    asset: 'companiesiq-real-clickthrough-v1',
    durationMs: 82000,
    chapters: ['Search trading partners', 'Open a company record', 'Review tabs and history'],
    benefits: [
      'Centralizes customer and supplier master data.',
      'Gives sales, purchasing and finance one shared record of the relationship.',
      'Reduces handoffs by putting contacts, documents and transactions in one workspace.'
    ],
    callouts: [
      { at: 0, title: 'Single source of truth', body: 'Customers and suppliers are managed from one searchable register.', x: 5, y: 22, w: 90, h: 26 },
      { at: 28, title: 'Open the record', body: 'The demo drills into a company so prospects see what sits behind the list.', x: 6, y: 48, w: 24, h: 32 },
      { at: 56, title: 'Relationship tabs', body: 'Tabs expose activity, documents and transactions without asking another department.', x: 9, y: 16, w: 82, h: 14 }
    ],
    actions: [
      { type: 'wait', ms: 3500 },
      { type: 'clickText', text: 'All companies', optional: true, ms: 1300 },
      { type: 'press', key: 'Escape', ms: 800 },
      { type: 'clickFirst', selectors: ['text=VIEW', 'button:has-text("VIEW")'], ms: 3500 },
      { type: 'clickText', text: 'Details', optional: true, ms: 2300 },
      { type: 'clickText', text: 'Activity Timeline', optional: true, ms: 2600 },
      { type: 'clickText', text: 'Documents', optional: true, ms: 2600 },
      { type: 'clickText', text: 'PO transactions', optional: true, ms: 2600 },
      { type: 'scroll', y: 520, ms: 3000 }
    ]
  },
  {
    id: 'salesiq',
    title: 'SalesIQ Pipeline and Orders',
    group: 'Sales',
    url: '/salesiq',
    asset: 'salesiq-real-clickthrough-v1',
    durationMs: 62000,
    chapters: ['Sales workspace', 'Open order context', 'Margin and customer link'],
    benefits: ['Shows quote/order control from the same operating system.', 'Connects sales work to customer records, stock and margin.', 'Helps teams move from enquiry to order without scattered follow-ups.']
  },
  {
    id: 'invoiceiq',
    title: 'InvoiceIQ Billing Control',
    group: 'Sales',
    url: '/invoiceiq',
    asset: 'invoiceiq-real-clickthrough-v1',
    durationMs: 62000,
    chapters: ['Billing list', 'Open invoice detail', 'Finance readiness'],
    benefits: ['Turns invoices into controlled operational records, not isolated documents.', 'Keeps billing, tax and payment context visible.', 'Shortens the gap between completed work and clean finance output.']
  },
  {
    id: 'purchaseiq',
    title: 'PurchaseIQ Procurement Control',
    group: 'Purchasing',
    url: '/purchaseiq',
    asset: 'purchaseiq-real-clickthrough-v1',
    durationMs: 62000,
    chapters: ['Purchase order control', 'Open supplier document', 'Inbound stock context'],
    benefits: ['Shows buyers what is ordered, expected and still outstanding.', 'Connects supplier commitments to imports, stock and finance.', 'Reduces purchasing blind spots before stock arrives.']
  },
  {
    id: 'importiq',
    title: 'ImportIQ Landed Cost Workflow',
    group: 'Imports',
    url: '/importiq',
    asset: 'importiq-real-clickthrough-v1',
    durationMs: 70000,
    chapters: ['Shipment list', 'Landed-cost inputs', 'Receiving and closure'],
    benefits: ['Makes freight, duty, FX and supplier cost visible before margin is damaged.', 'Tracks shipment status from order to received stock.', 'Connects import costing directly to inventory and accounting.'],
    callouts: [
      { at: 0, title: 'Shipment control', body: 'Prospects see all active imports and where each shipment stands.', x: 5, y: 20, w: 90, h: 24 },
      { at: 24, title: 'Cost capture', body: 'Freight, duty, taxes and FX are kept with the shipment.', x: 52, y: 24, w: 40, h: 42 },
      { at: 48, title: 'Receive to stock', body: 'The same workflow updates stock value and availability.', x: 8, y: 52, w: 84, h: 30 }
    ],
    actions: [
      { type: 'wait', ms: 3500 },
      { type: 'clickFirst', selectors: ['text=VIEW', 'text=Open', 'text=Edit'], optional: true, ms: 3600 },
      { type: 'clickText', text: 'Received', optional: true, ms: 2500 },
      { type: 'scroll', y: 650, ms: 3600 },
      { type: 'scroll', y: -500, ms: 2600 }
    ]
  },
  {
    id: 'inventoryiq',
    title: 'InventoryIQ Stock Control',
    group: 'Stock',
    url: '/inventoryiq',
    asset: 'inventoryiq-real-clickthrough-v1',
    durationMs: 62000,
    chapters: ['Stock list', 'Open SKU detail', 'Warehouse availability'],
    benefits: ['Gives stock teams live visibility by SKU and warehouse.', 'Makes valuation and movement easier to inspect.', 'Supports better purchasing and selling decisions from the same data.']
  },
  {
    id: 'forecastiq',
    title: 'ForecastIQ Planning View',
    group: 'Planning',
    url: '/forecastiq',
    asset: 'forecastiq-real-clickthrough-v1',
    durationMs: 66000,
    chapters: ['Planning overview', 'SKU dashboard', 'Supplier trends'],
    benefits: ['Shows stock planning from actual demand signals.', 'Highlights dead stock, fast movers and replenishment pressure.', 'Helps buyers protect cash while avoiding stockouts.'],
    actions: [
      { type: 'wait', ms: 4500 },
      { type: 'clickText', text: 'SKU Dashboard', optional: true, ms: 3000 },
      { type: 'clickText', text: 'Supplier Trends', optional: true, ms: 3000 },
      { type: 'scroll', y: 650, ms: 3600 }
    ]
  },
  {
    id: 'priceiq',
    title: 'PriceIQ Margin Control',
    group: 'Margin',
    url: '/priceiq',
    asset: 'priceiq-real-clickthrough-v1',
    durationMs: 62000,
    chapters: ['Pricing workspace', 'Open price context', 'Margin protection'],
    benefits: ['Connects pricing decisions to cost and customer context.', 'Helps protect margin when freight, duty or supplier prices move.', 'Gives teams a controlled place to manage commercial rules.']
  },
  {
    id: 'accountingiq',
    title: 'AccountingIQ Finance Workspace',
    group: 'Finance',
    url: '/accountingiq',
    asset: 'accountingiq-real-clickthrough-v1',
    durationMs: 62000,
    chapters: ['Finance workspace', 'Review controls', 'Connected close'],
    benefits: ['Keeps operational activity connected to finance.', 'Supports VAT, journals, receivables, payables and close control.', 'Reduces month-end chasing by preserving source context.']
  },
  {
    id: 'reportsiq',
    title: 'ReportsIQ Management Reporting',
    group: 'Reporting',
    url: '/reportsiq',
    asset: 'reportsiq-real-clickthrough-v1',
    durationMs: 62000,
    chapters: ['Reporting centre', 'Business answers', 'Executive review'],
    benefits: ['Turns operational data into management reporting.', 'Lets leaders review customers, suppliers, sales and finance from one source.', 'Reduces manual report preparation before meetings.']
  },
  {
    id: 'payrolliq',
    title: 'PayrollIQ People and Payroll',
    group: 'People',
    url: '/payrolliq',
    asset: 'payrolliq-real-clickthrough-v1',
    durationMs: 62000,
    chapters: ['People records', 'Payroll workflow', 'Finance connection'],
    benefits: ['Connects payroll activity into the wider business system.', 'Keeps people, commission and payroll context easier to audit.', 'Supports better handoff between HR, payroll and accounting.']
  },
  {
    id: 'taskiq-workiq-timeiq',
    title: 'TaskIQ, WorkIQ and TimeIQ Control',
    group: 'Work Control',
    url: '/taskiq',
    asset: 'taskiq-workiq-timeiq-real-clickthrough-v1',
    durationMs: 62000,
    chapters: ['Open work', 'Ownership and dates', 'Time and performance'],
    benefits: ['Shows how FlowIQ reduces manual chasing.', 'Connects work ownership, dates and operational follow-up.', 'Gives managers a clearer view of bottlenecks and accountability.']
  },
  {
    id: 'operationsiq',
    title: 'ProjectsIQ and Delivery Operations',
    group: 'Operations',
    url: '/projectsiq',
    asset: 'operationsiq-real-clickthrough-v1',
    durationMs: 62000,
    chapters: ['Execution workspace', 'Project context', 'Delivery control'],
    benefits: ['Shows operational execution beyond finance and stock.', 'Helps teams manage project or delivery work with evidence.', 'Keeps field activity connected to commercial outcomes.']
  },
  {
    id: 'specialist-flows',
    title: 'EcomIQ, ExportIQ and WarrantyIQ',
    group: 'Specialist',
    url: '/ecomiq',
    asset: 'specialist-flows-real-clickthrough-v1',
    durationMs: 62000,
    chapters: ['Specialist workflows', 'Channel control', 'After-sale handling'],
    benefits: ['Shows that FlowIQ can expand into specialist operating flows.', 'Connects ecommerce, export and after-sale work to core records.', 'Gives prospects confidence the platform can grow with them.']
  },
  {
    id: 'settings-admin',
    title: 'Settings and Admin Controls',
    group: 'Admin',
    url: '/settings',
    asset: 'settings-admin-real-clickthrough-v1',
    durationMs: 66000,
    chapters: ['Admin readiness', 'Permissions and modules', 'Governance guardrails'],
    benefits: ['Shows prospects that setup, permissions and controls are part of the product.', 'Gives admins confidence that users and modules can be managed centrally.', 'Supports a more controlled rollout across teams.'],
    actions: [
      { type: 'wait', ms: 3500 },
      { type: 'clickText', text: 'Module Settings', optional: true, ms: 3000 },
      { type: 'clickText', text: 'User Permissions', optional: true, ms: 3000 },
      { type: 'scroll', y: 650, ms: 3600 }
    ]
  }
];

export const blockedModuleDemos = [
  {
    id: 'cashiq',
    title: 'CashIQ Bank and Cash Visibility',
    reason: 'The current FlowIQ Demo Org is blocked by the app allowlist; CashIQ must be recorded from the Biomek-enabled org.'
  }
];

const defaultCallouts = [
  { at: 0, title: 'Module workspace', body: 'Start with the live list or dashboard so prospects understand the daily operating view.', x: 5, y: 20, w: 90, h: 24 },
  { at: 20, title: 'Open the detail', body: 'The walkthrough drills into records instead of only showing a static landing screen.', x: 6, y: 44, w: 26, h: 34 },
  { at: 40, title: 'Connected context', body: 'Tabs, filters and related data show how teams avoid disconnected spreadsheets.', x: 42, y: 50, w: 52, h: 30 }
];

const defaultActions = [
  { type: 'wait', ms: 3500 },
  { type: 'clickFirst', selectors: ['text=VIEW', 'button:has-text("VIEW")', 'text=Open', 'text=Edit'], optional: true, ms: 3600 },
  { type: 'scroll', y: 650, ms: 3600 },
  { type: 'scroll', y: -500, ms: 2600 }
];

export function getModuleDemo(id) {
  const demo = moduleDemos.find((entry) => entry.id === id || entry.asset === id);
  if (!demo) return null;
  return {
    ...demo,
    actions: demo.actions || defaultActions,
    callouts: demo.callouts || defaultCallouts
  };
}
