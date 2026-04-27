(function () {
  'use strict';

  var stories = {
    importiq: {
      title: 'ImportIQ',
      eyebrow: 'Landed Cost Story',
      description: 'Turn every shipment into a clear cost story before stock is received, priced, and sold.',
      image: '/assets/img/generated/importiq-story.webp',
      imageAlt: 'ImportIQ landed cost story with containers, supplier invoice, freight, duty, FX, and stock receiving cards',
      screen: '/assets/img/modules/thumb-importiq.png',
      icon: 'ship',
      lead: 'ImportIQ keeps freight, customs, FX, and true landed cost visible without making the workflow feel heavy.',
	      relatedModules: ['PurchaseIQ', 'ForecastIQ', 'InventoryIQ', 'PriceIQ', 'DashboardIQ', 'AccountingIQ'],
      valueHeadline: 'See true landed cost before stock is sold.',
      valueCopy: 'Supplier cost, freight, duty, FX, landed cost, receiving, and margin stay connected from the start. Your team sees the cost story early enough to protect price and profit.',
      nodes: [
        ['Purchase order', 'Supplier cost and expected quantities start the chain.', 'clipboard-list'],
        ['Freight and duty', 'Freight, customs duty, VAT, FX, and other charges stay attached.', 'ship'],
        ['Landed cost', 'Costs are allocated before stock changes value.', 'calculator'],
        ['Receive stock', 'Inventory lands with the cost story already in place.', 'package-check'],
        ['Margin signal', 'Sales teams see margin with the right cost base.', 'line-chart']
      ],
      outcomes: ['True landed cost per shipment', 'Cleaner stock receiving', 'Earlier margin protection'],
      next: [['InventoryIQ', '/modules/inventoryiq'], ['DashboardIQ', '/modules/dashboardiq']]
    },
    inventoryiq: {
      title: 'InventoryIQ',
      eyebrow: 'Stock Control Story',
      description: 'Know what is on hand, where it sits, what it cost, and what needs attention next.',
      image: '/assets/img/generated/inventory-forecast-story.webp',
      imageAlt: 'InventoryIQ warehouse planning scene with stock health, FIFO layers, branch transfers, and reorder recommendations',
      screen: '/assets/img/modules/thumb-inventoryiq.png',
      icon: 'package',
      lead: 'InventoryIQ connects landed cost, branches, FIFO, transfers, and warehouse decisions in one stock control layer.',
	      relatedModules: ['ImportIQ', 'ForecastIQ', 'Manufacturing', 'WarrantyIQ', 'InvoiceIQ', 'AccountingIQ', 'DashboardIQ'],
      valueHeadline: 'Stock control becomes a visible operating system.',
      valueCopy: 'FlowIQ does more than record stock. It shows where stock sits, what it cost, what is aging, and what action your team should take next.',
      nodes: [
        ['Receive', 'Stock arrives with cost layers intact.', 'package-check'],
        ['Store', 'Branch and warehouse positions stay clear.', 'warehouse'],
        ['Move', 'Transfers and adjustments keep an audit trail.', 'route'],
        ['Cost', 'FIFO layers protect stock value and margin truth.', 'layers'],
        ['Act', 'Low stock, slow movers, and exceptions surface early.', 'badge-alert']
      ],
      outcomes: ['Multi-warehouse visibility', 'FIFO cost discipline', 'Cleaner transfers and adjustments'],
      next: [['ForecastIQ', '/modules/forecastiq'], ['ImportIQ', '/modules/importiq']]
    },
    forecastiq: {
      title: 'ForecastIQ',
      eyebrow: 'Planning Story',
      description: 'Turn inventory history into replenishment decisions before stockouts and overbuying hurt cash.',
      image: '/assets/img/generated/inventory-forecast-story.webp',
      imageAlt: 'ForecastIQ demand forecast and replenishment recommendation scene in a warehouse',
      screen: '/assets/img/modules/thumb-forecastiq.png',
      icon: 'trending-up',
      lead: 'ForecastIQ turns operational history into forward-looking signals for purchasing, manufacturing, replenishment, and stock planning.',
	      relatedModules: ['InventoryIQ', 'PurchaseIQ', 'Manufacturing', 'PriceIQ', 'DashboardIQ', 'ReportsIQ'],
      valueHeadline: 'Planning feels practical instead of abstract.',
      valueCopy: 'Forecasting is tied to real movement, branch demand, seasonal trends, manufacturing alerts, reorder decisions, dead stock, and cash control.',
      nodes: [
        ['History', 'Sales and stock movement become planning input.', 'history'],
        ['Demand', 'Forecast curves expose pressure before it arrives.', 'trending-up'],
        ['Reorder', 'Recommended quantities support buyer decisions.', 'shopping-cart'],
        ['Branch signal', 'Stock can move before new purchasing is needed.', 'git-branch'],
        ['Cash control', 'Reduce overbuying and protect availability.', 'wallet']
      ],
      outcomes: ['Earlier replenishment signals', 'Better stock availability', 'Less cash trapped in slow stock'],
      next: [['PurchaseIQ', '/modules/purchaseiq'], ['InventoryIQ', '/modules/inventoryiq']]
    },
    dashboardiq: {
      title: 'DashboardIQ',
      eyebrow: 'Performance Story',
      description: 'See sales, margin, stock, branch health, and operational exceptions in one executive surface.',
      image: '/assets/img/generated/business-command-story.webp',
      imageAlt: 'DashboardIQ cross-industry business command center with branch performance, stock health, tasks, customer activity, and reporting cards',
      screen: '/assets/img/modules/thumb-dashboardiq.png',
      icon: 'layout-dashboard',
      lead: 'DashboardIQ gives owners and managers a clear operating picture without waiting for exported spreadsheets.',
	      relatedModules: ['ImportIQ', 'InventoryIQ', 'InvoiceIQ', 'PurchaseIQ', 'AccountingIQ', 'ReportsIQ'],
      valueHeadline: 'The owner sees control, not another report.',
      valueCopy: 'Sales, margin, branch health, stock pressure, and exceptions stay visible while there is still time to act.',
      nodes: [
        ['Collect', 'Operational events feed one performance layer.', 'database'],
        ['Compare', 'Branches, product groups, and customers become comparable.', 'bar-chart-3'],
        ['Expose', 'Margin leaks and bottlenecks rise to the surface.', 'radar'],
        ['Review', 'Reports and dashboards stay aligned.', 'file-bar-chart'],
        ['Decide', 'Teams act while the signal is still current.', 'mouse-pointer-click']
      ],
      outcomes: ['Executive visibility', 'Branch and margin comparison', 'Faster exception review'],
      next: [['ReportsIQ', '/modules/reportsiq'], ['AccountingIQ', '/modules/accountingiq']]
    },
    companiesiq: {
      title: 'CompaniesIQ',
      eyebrow: 'Relationship Story',
      description: 'Keep customers, suppliers, parent groups, terms, and history connected to the operational workflow.',
      image: '/assets/img/generated/finance-relationship-story.webp',
      imageAlt: 'CompaniesIQ customer and supplier relationship workspace connected to invoices, payments, finance, and reports',
      screen: '/assets/img/modules/thumb-companiesiq.png',
      icon: 'building-2',
      lead: 'CompaniesIQ gives every transaction a proper business context so customer, supplier, and branch relationships do not disappear into disconnected records.',
	      relatedModules: ['SalesIQ', 'InvoiceIQ', 'PurchaseIQ', 'AccountingIQ', 'DashboardIQ', 'ReportsIQ'],
      valueHeadline: 'Relationships become operational context.',
      valueCopy: 'Customer and supplier records become useful operating context. Terms, history, groups, credit context, and trading behavior move into daily work.',
      nodes: [
        ['Identify', 'Customers and suppliers live in one clean record base.', 'building-2'],
        ['Group', 'Parent accounts and branches stay connected.', 'network'],
        ['Trade', 'Terms and limits travel into documents.', 'handshake'],
        ['Review', 'History stays visible across sales, purchases, and payments.', 'scroll-text'],
        ['Support', 'Teams answer faster with context in reach.', 'headphones']
      ],
      outcomes: ['Cleaner customer and supplier records', 'Better account context', 'Less duplicate admin'],
      next: [['InvoiceIQ', '/modules/invoiceiq'], ['AccountingIQ', '/modules/accountingiq']]
    },
    accountingiq: {
      title: 'AccountingIQ',
      eyebrow: 'Finance Control Story',
      description: 'Connect operational transactions to GL, VAT, reconciliation, reports, and close control.',
      image: '/assets/img/generated/finance-relationship-story.webp',
      imageAlt: 'AccountingIQ finance control workspace with VAT, reconciliations, journals, cash position, customer and supplier account cards',
      screen: '/assets/img/modules/accountingiq-real-positive.png',
      icon: 'calculator',
      lead: 'AccountingIQ positions FlowIQ as more than operations software. It closes the loop from stock and invoices into financial truth.',
	      relatedModules: ['InvoiceIQ', 'PurchaseIQ', 'PayrollIQ', 'JournalIQ', 'DashboardIQ', 'ReportsIQ'],
      valueHeadline: 'Finance is part of the workflow, not a disconnected handoff.',
      valueCopy: 'Operational events turn into journals, VAT, reconciliation, reporting, and month-end confidence inside the same FlowIQ ecosystem.',
      nodes: [
        ['Post', 'Operational events become accounting entries.', 'receipt-text'],
        ['Reconcile', 'Bank, VAT, AR, AP, and GL checks stay organized.', 'list-checks'],
        ['Close', 'Month-end becomes reviewable instead of reactive.', 'calendar-check'],
        ['Report', 'Financial statements and management packs stay connected.', 'file-bar-chart'],
        ['Control', 'Audit trails protect trust in the numbers.', 'shield-check']
      ],
      outcomes: ['Native accounting core', 'Cleaner audit trail', 'Better month-end confidence'],
      next: [['DashboardIQ', '/modules/dashboardiq'], ['ReportsIQ', '/modules/reportsiq']]
    },
    ecomiq: {
      title: 'EcomIQ',
      eyebrow: 'Order Flow Story',
      description: 'Pull ecommerce demand into the same stock, invoice, and fulfillment story as the rest of the business.',
      image: '/assets/img/generated/ecommerce-retail-story.webp',
      imageAlt: 'EcomIQ ecommerce and retail operations workspace with orders, price lists, customer activity, reservations, fulfillment tasks, and dashboards',
      screen: '/assets/img/modules/ecomiq-real.png',
      icon: 'shopping-bag',
      lead: 'EcomIQ helps online orders stop feeling like a separate island. Orders, stock pressure, fulfillment, and margin can move through the same FlowIQ surface.',
	      relatedModules: ['InventoryIQ', 'InvoiceIQ', 'CompaniesIQ', 'AccountingIQ', 'DashboardIQ', 'ReportsIQ'],
      valueHeadline: 'Online demand becomes part of the operating rhythm.',
      valueCopy: 'Ecommerce connects to stock availability, dispatch, customer history, invoicing, finance, and management visibility instead of living in another silo.',
      nodes: [
        ['Capture', 'Online orders enter the operating workflow.', 'shopping-bag'],
        ['Reserve', 'Stock availability and branch context stay visible.', 'package-check'],
        ['Fulfil', 'Picking and dispatch signals keep teams aligned.', 'truck'],
        ['Invoice', 'Orders carry into billing and accounting context.', 'file-text'],
        ['Review', 'Ecommerce demand informs stock and margin decisions.', 'bar-chart-3']
      ],
      outcomes: ['Connected online order flow', 'Better stock reservation', 'Cleaner dispatch and invoice handoff'],
      next: [['InventoryIQ', '/modules/inventoryiq'], ['InvoiceIQ', '/modules/invoiceiq']]
    },
    purchaseiq: {
      title: 'PurchaseIQ',
      eyebrow: 'Buying Story',
      description: 'Bring supplier planning, purchase orders, and receiving discipline into the same operating trail.',
      image: '/assets/img/generated/business-command-story.webp',
      imageAlt: 'PurchaseIQ supplier purchasing and branch operations workspace with stock health, tasks, purchasing, and customer activity',
      screen: '/assets/img/modules/thumb-purchaseiq.png',
      icon: 'shopping-cart',
      lead: 'PurchaseIQ is where buying decisions start becoming operational truth: supplier choices, expected costs, and follow-through into imports or local receiving.',
	      relatedModules: ['ForecastIQ', 'CompaniesIQ', 'ImportIQ', 'InventoryIQ', 'AccountingIQ', 'ReportsIQ'],
      valueHeadline: 'Purchasing becomes the start of control.',
      valueCopy: 'Purchasing is not just order capture. Supplier planning, expected cost, receiving discipline, and future margin start here.',
      nodes: [
        ['Plan', 'Buyer demand turns into supplier action.', 'clipboard-list'],
        ['Order', 'Purchase orders carry cost and quantity context.', 'shopping-cart'],
        ['Track', 'Expected arrivals stay visible to operations.', 'route'],
        ['Receive', 'Goods arrive into stock with fewer handoff gaps.', 'package-check'],
        ['Review', 'Supplier performance feeds the next decision.', 'bar-chart-3']
      ],
      outcomes: ['Cleaner purchase order control', 'Supplier planning context', 'Better receiving handoff'],
      next: [['ImportIQ', '/modules/importiq'], ['InventoryIQ', '/modules/inventoryiq']]
    },
    invoiceiq: {
      title: 'InvoiceIQ',
      eyebrow: 'Revenue Story',
      description: 'Move from quote to invoice to payment while keeping stock, margin, and customer context in view.',
      image: '/assets/img/generated/finance-relationship-story.webp',
      imageAlt: 'InvoiceIQ finance and customer workspace with invoices, payments, customer accounts, supplier accounts, and dashboards',
      screen: '/assets/img/modules/thumb-invoiceiq.png',
      icon: 'file-text',
      lead: 'InvoiceIQ shows the revenue side of the FlowIQ story: documents, credits, collections, and margin should all read from the same operational truth.',
	      relatedModules: ['CompaniesIQ', 'InventoryIQ', 'PriceIQ', 'AccountingIQ', 'DashboardIQ', 'ReportsIQ'],
      valueHeadline: 'Revenue documents carry the margin story.',
      valueCopy: 'Quotes, invoices, credits, and payments stay connected to inventory cost, customer context, finance, and management reporting.',
      nodes: [
        ['Quote', 'Customer pricing starts with cost context.', 'file-pen-line'],
        ['Invoice', 'Sales documents carry stock and margin logic.', 'file-text'],
        ['Credit', 'Returns and credits stay auditable.', 'undo-2'],
        ['Collect', 'Payments and outstanding balances remain visible.', 'wallet'],
        ['Report', 'Sales and margin roll into dashboards.', 'bar-chart-3']
      ],
      outcomes: ['Quote-to-invoice clarity', 'Cleaner credit note control', 'Margin-aware revenue reporting'],
      next: [['CompaniesIQ', '/modules/companiesiq'], ['AccountingIQ', '/modules/accountingiq']]
    },
    reportsiq: {
      title: 'ReportsIQ',
      eyebrow: 'Reporting Story',
      description: 'Turn operating data into management packs, statements, and decision-ready reporting.',
      image: '/assets/img/generated/business-command-story.webp',
      imageAlt: 'ReportsIQ cross-industry reporting and dashboard workspace with branch performance, stock health, tasks, and management reports',
      screen: '/assets/img/modules/thumb-reportsiq.png',
      icon: 'file-bar-chart',
      lead: 'ReportsIQ gives teams the confidence that the data they worked on all month can become the reports they actually need.',
	      relatedModules: ['DashboardIQ', 'AccountingIQ', 'InvoiceIQ', 'CompaniesIQ', 'PayrollIQ', 'InventoryIQ'],
      valueHeadline: 'Reporting becomes the natural end of the workflow.',
      valueCopy: 'FlowIQ does more than capture work. Daily operational data becomes reports, management packs, statements, and better decisions.',
      nodes: [
        ['Select', 'Choose the operational or financial lens.', 'list-filter'],
        ['Prepare', 'Statements and management packs pull from one source.', 'file-bar-chart'],
        ['Compare', 'Periods, branches, customers, and products stay comparable.', 'bar-chart-3'],
        ['Share', 'Reports are easier to review and distribute.', 'send'],
        ['Improve', 'Insights feed the next operational action.', 'sparkles']
      ],
      outcomes: ['Cleaner management reporting', 'Better statements and packs', 'Less spreadsheet rework'],
      next: [['DashboardIQ', '/modules/dashboardiq'], ['AccountingIQ', '/modules/accountingiq']]
    }
	  };

  var moduleLinks = {
    AccountingIQ: '/modules/accountingiq',
    CompaniesIQ: '/modules/companiesiq',
    DashboardIQ: '/modules/dashboardiq',
    EcomIQ: '/modules/ecomiq',
    ForecastIQ: '/modules/forecastiq',
    ImportIQ: '/modules/importiq',
    InventoryIQ: '/modules/inventoryiq',
    InvoiceIQ: '/modules/invoiceiq',
    JournalIQ: '/modules/journaliq',
    Manufacturing: '/manufacturing-inventory-software',
    PayrollIQ: '/payroll-software',
    PriceIQ: '/pricing',
    PurchaseIQ: '/modules/purchaseiq',
    ReportsIQ: '/modules/reportsiq',
    SalesIQ: '/modules/invoiceiq',
    TaskIQ: '/modules/taskiq',
    WarrantyIQ: '/modules/warrantyiq'
  };

  var moduleIcons = {
    AccountingIQ: 'calculator',
    CompaniesIQ: 'building-2',
    DashboardIQ: 'layout-dashboard',
    EcomIQ: 'shopping-bag',
    ForecastIQ: 'trending-up',
    ImportIQ: 'ship',
    InventoryIQ: 'package',
    InvoiceIQ: 'file-text',
    JournalIQ: 'book-open-check',
    Manufacturing: 'factory',
    PayrollIQ: 'badge-dollar-sign',
    PriceIQ: 'tag',
    PurchaseIQ: 'shopping-cart',
    ReportsIQ: 'file-bar-chart',
    SalesIQ: 'hand-coins',
    TaskIQ: 'list-checks',
    WarrantyIQ: 'shield-check'
  };

  var flowSets = {
    importiq: [
      ['ForecastIQ', 'Demand, seasonal trends, and stock pressure tell buyers what should be imported next.', ['PurchaseIQ']],
      ['PurchaseIQ', 'Supplier orders create the import requirement with expected quantities and costs.', ['ImportIQ']],
      ['ImportIQ', 'Freight, duty, FX, VAT, and landed costs are allocated before receipt.', ['InventoryIQ', 'AccountingIQ']],
      ['InventoryIQ', 'Stock is received with the true cost base and branch position.', ['PriceIQ', 'DashboardIQ']],
      ['PriceIQ', 'Selling prices and margins use landed-cost truth.', ['InvoiceIQ']],
      ['AccountingIQ', 'VAT, creditors, journals, and landed-cost postings stay connected.', ['ReportsIQ']]
    ],
    inventoryiq: [
      ['ImportIQ', 'Imported goods land with freight, duty, FX, VAT, and true landed cost already attached.', ['InventoryIQ']],
      ['Manufacturing', 'Raw materials, components, finished goods, and production usage move through stock cleanly.', ['InventoryIQ', 'AccountingIQ']],
      ['InventoryIQ', 'FIFO layers, branches, bins, transfers, and adjustments become one stock truth.', ['ForecastIQ', 'InvoiceIQ']],
      ['WarrantyIQ', 'Returns, claims, replacements, and damaged goods keep cost and stock context.', ['InventoryIQ', 'AccountingIQ']],
      ['ForecastIQ', 'Low stock, dead stock, seasonal pressure, and reorder signals turn stock into action.', ['PurchaseIQ', 'DashboardIQ']],
      ['InvoiceIQ', 'Available stock, reserved stock, and margin cost flow into quotes and invoices.', ['AccountingIQ', 'ReportsIQ']],
      ['DashboardIQ', 'Stock health, warehouse risk, branch pressure, and exceptions surface for managers.', ['ReportsIQ']]
    ],
    forecastiq: [
      ['InventoryIQ', 'Sales history, stock movement, branch demand, and aging stock become planning input.', ['ForecastIQ']],
      ['ForecastIQ', 'Seasonal trends expose demand peaks before purchasing is already late.', ['PurchaseIQ']],
      ['Manufacturing', 'Manufacturing alerts show component pressure, finished goods gaps, and production risk.', ['InventoryIQ', 'PurchaseIQ']],
      ['InventoryIQ', 'Dead stock and slow movers flag cash tied up before teams keep reordering.', ['PriceIQ', 'DashboardIQ']],
      ['PurchaseIQ', 'Buyers act from forecast, manufacturing, and dead-stock signals instead of guesswork.', ['ImportIQ', 'InventoryIQ']],
      ['ReportsIQ', 'Forecast accuracy, stock risk, and planning decisions become reviewable.', ['DashboardIQ']]
    ],
    dashboardiq: [
      ['ImportIQ', 'Landed-cost, shipment status, and import risk feed the control room.', ['DashboardIQ']],
      ['InventoryIQ', 'Stock health, branches, transfers, slow movers, and warehouse risk feed live visibility.', ['DashboardIQ']],
      ['PurchaseIQ', 'Buying pressure, supplier activity, and expected receipts show what is coming.', ['InventoryIQ', 'DashboardIQ']],
      ['InvoiceIQ', 'Sales, margin, debtor pressure, and customer activity feed performance.', ['AccountingIQ', 'DashboardIQ']],
      ['AccountingIQ', 'Cash, VAT, AR, AP, profit, and close status feed executive control.', ['DashboardIQ']],
      ['ReportsIQ', 'Dashboards and management packs stay aligned for board-level review.', ['DashboardIQ']]
    ],
    companiesiq: [
      ['CompaniesIQ', 'Customers, suppliers, terms, parent groups, contacts, and branch history stay clean.', ['SalesIQ', 'PurchaseIQ']],
      ['SalesIQ', 'Customer context moves into quotes, orders, pricing, and follow-ups.', ['InvoiceIQ', 'DashboardIQ']],
      ['PurchaseIQ', 'Supplier terms, limits, and trading history guide buying decisions.', ['ImportIQ', 'InventoryIQ']],
      ['InvoiceIQ', 'Invoices, credits, payments, and statements inherit the correct account context.', ['AccountingIQ']],
      ['AccountingIQ', 'Receivables, payables, credit control, and allocations use the same records.', ['ReportsIQ']],
      ['ReportsIQ', 'Customer and supplier dimensions make reports easier to trust.', ['DashboardIQ']]
    ],
    accountingiq: [
      ['InvoiceIQ', 'Sales invoices, credits, AR, revenue, and output VAT flow into finance.', ['AccountingIQ']],
      ['PurchaseIQ', 'Supplier bills, landed costs, AP, and input VAT stay connected.', ['AccountingIQ']],
      ['PayrollIQ', 'Payroll journals, statutory controls, and salary costs post into finance.', ['AccountingIQ', 'ReportsIQ']],
      ['JournalIQ', 'Accruals, allocations, corrections, and month-end journals complete the ledger.', ['AccountingIQ']],
      ['DashboardIQ', 'Cash, profit, VAT, debtors, creditors, and close risk become visible to management.', ['AccountingIQ', 'ReportsIQ']],
      ['ReportsIQ', 'Statements, VAT summaries, management packs, and audit trails come from the same ledger.', ['DashboardIQ']]
    ],
    ecomiq: [
      ['EcomIQ', 'Online orders, customer demand, channel activity, and payment context enter the same system.', ['InventoryIQ', 'InvoiceIQ']],
      ['InventoryIQ', 'Availability, reservations, branch stock, and dispatch pressure protect fulfillment.', ['InvoiceIQ']],
      ['CompaniesIQ', 'Customer records, account history, and communication stay connected.', ['InvoiceIQ', 'DashboardIQ']],
      ['InvoiceIQ', 'Orders become invoices, credits, collections, and revenue documents.', ['AccountingIQ']],
      ['AccountingIQ', 'VAT, payments, revenue, refunds, and debtor balances move into finance.', ['ReportsIQ']],
      ['DashboardIQ', 'Ecommerce demand, dispatch, stock risk, and margin become visible.', ['ReportsIQ']]
    ],
    purchaseiq: [
      ['ForecastIQ', 'Demand signals, seasonal trends, and low-stock pressure guide what needs buying.', ['PurchaseIQ']],
      ['CompaniesIQ', 'Supplier terms, limits, lead times, and trading history support buyer decisions.', ['PurchaseIQ']],
      ['PurchaseIQ', 'Orders carry expected cost, quantity, ETA, supplier context, and approval history.', ['ImportIQ', 'InventoryIQ']],
      ['ImportIQ', 'Imported purchase orders collect freight, duty, FX, VAT, and landed-cost detail.', ['InventoryIQ', 'AccountingIQ']],
      ['InventoryIQ', 'Receiving updates stock, branch position, FIFO layers, and availability.', ['DashboardIQ']],
      ['AccountingIQ', 'Supplier, VAT, creditor, accrual, and journal impact stays controlled.', ['ReportsIQ']]
    ],
    invoiceiq: [
      ['CompaniesIQ', 'Customer terms, groups, credit context, and history carry into every document.', ['InvoiceIQ']],
      ['InventoryIQ', 'Available stock, reservations, FIFO cost, and branch position protect invoice margin.', ['InvoiceIQ']],
      ['PriceIQ', 'Price lists, landed-cost margin, and discount control support quote decisions.', ['InvoiceIQ']],
      ['InvoiceIQ', 'Quotes, invoices, credits, collections, and debtor activity become revenue truth.', ['AccountingIQ']],
      ['AccountingIQ', 'Revenue, VAT, AR, payment allocation, and credit notes post into finance.', ['ReportsIQ']],
      ['DashboardIQ', 'Sales activity, margin, customer pressure, and overdue debtors become visible.', ['ReportsIQ']]
    ],
    reportsiq: [
      ['DashboardIQ', 'Live operational signals become reviewable management packs.', ['ReportsIQ']],
      ['AccountingIQ', 'GL, VAT, AR, AP, bank, profit, and close status feed financial reports.', ['ReportsIQ']],
      ['InvoiceIQ', 'Sales, credits, collections, margin, and debtor history become commercial reporting.', ['ReportsIQ']],
      ['InventoryIQ', 'Stock valuation, dead stock, branch movement, and availability become operational reports.', ['ReportsIQ']],
      ['CompaniesIQ', 'Customer and supplier dimensions make reports practical and searchable.', ['ReportsIQ']],
      ['PayrollIQ', 'Payroll cost, statutory signals, and staff cost trends complete the business view.', ['DashboardIQ']]
    ]
  };

	  function nodeCard(node) {
	    return '<article class="motion-node live-card">' +
	      '<i data-lucide="' + node[2] + '" class="w-6 h-6"></i>' +
      '<strong>' + node[0] + '</strong>' +
      '<span class="text-sm text-slate-600">' + node[1] + '</span>' +
      '</article>';
  }

  function modulePills(story) {
    return (story.relatedModules || []).map(function (name) {
      return '<span class="module-name-pill"><i data-lucide="circle-dot" class="w-4 h-4 text-freight-orange"></i>' + name + '</span>';
    }).join('');
  }

	  function brochureOutcomeCards(story) {
	    return story.outcomes.map(function (item) {
	      return '<div class="brochure-proof-chip"><i data-lucide="badge-check" class="w-4 h-4"></i><span>' + item + '</span></div>';
	    }).join('');
	  }

  function moduleTitle(moduleName) {
    var href = moduleLinks[moduleName];
    var content = '<i data-lucide="' + (moduleIcons[moduleName] || 'circle-dot') + '" class="w-5 h-5"></i><span>' + moduleName + '</span>';
    if (!href) return '<strong class="system-module-card__title">' + content + '</strong>';
    return '<a class="system-module-card__title" href="' + href + '">' + content + '</a>';
  }

  function feedTags(items) {
    return items.map(function (item) {
      return '<span><i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>' + item + '</span>';
    }).join('');
  }

  function connectedModuleCard(item, index) {
    return '<article class="system-module-card live-card" style="--step:' + index + '">' +
      moduleTitle(item[0]) +
      '<p>' + item[1] + '</p>' +
      '<div class="system-feed-tags">' + feedTags(item[2]) + '</div>' +
    '</article>';
  }

  function renderSystemFlow(storyKey, story) {
    var flows = flowSets[storyKey] || story.relatedModules.map(function (name) {
      return [name, name + ' stays connected to the ' + story.title + ' workflow.', [story.title]];
    });

    return '<section class="story-reveal">' +
      '<div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">' +
        '<div><span class="section-kicker">System Flow</span><h2 class="mt-5 text-2xl md:text-3xl font-black text-slate-900">Smart business flow in action.</h2><p class="mt-3 max-w-3xl text-base md:text-lg text-slate-600 leading-relaxed">Follow the working process across the top lane, then see how the same data moves through connected FlowIQ modules below. Your team gets one simple operating system instead of separate screens and repeated admin.</p></div>' +
      '</div>' +
      '<div class="motion-scene system-flow-scene">' +
        '<div class="motion-lane">' + story.nodes.map(nodeCard).join('') + '</div>' +
        '<div class="system-flow-bridge" aria-hidden="true"><span></span><span></span><span></span></div>' +
        '<div class="system-module-grid">' + flows.map(connectedModuleCard).join('') + '</div>' +
      '</div>' +
    '</section>';
  }

  function renderStory(root, story) {
    document.title = story.title + ' | FlowIQ Module Story';
    root.innerHTML =
      '<section class="solution-story-visual module-story-split story-reveal">' +
        '<div class="grid lg:grid-cols-[0.88fr_1.12fr]">' +
          '<div class="p-6 sm:p-8 md:p-10 module-story-intro__copy">' +
            '<span class="section-kicker">' + story.eyebrow + '</span>' +
            '<h1 class="mt-5 text-4xl md:text-5xl font-black text-slate-900">' + story.title + '</h1>' +
            '<p class="mt-4 max-w-xl text-base md:text-lg text-slate-700 leading-relaxed">' + story.description + '</p>' +
            '<div class="module-name-strip">' + modulePills(story) + '</div>' +
          '</div>' +
          '<div class="solution-story-visual__image module-story-split__image"><img src="' + story.image + '" alt="' + story.imageAlt + '" width="1536" height="864" fetchpriority="high" decoding="async"></div>' +
        '</div>' +
      '</section>' +
      '<section class="story-card p-8 md:p-10 story-reveal">' +
        '<div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-6">' +
          '<div>' +
          '<span class="section-kicker">Real FlowIQ UI</span>' +
          '<h2 class="mt-5 text-2xl md:text-3xl font-black text-slate-900">' + story.title + ' inside FlowIQ.</h2>' +
          '<p class="mt-3 max-w-3xl text-base md:text-lg text-slate-600 leading-relaxed">The story visual explains the workflow. The product screen below shows the real FlowIQ surface your team works in.</p>' +
          '</div>' +
        '</div>' +
        '<div class="flowiq-screen-proof module-story-intro__screen" aria-label="FlowIQ product screen">' +
          '<div class="flowiq-screen-proof__bar"><span>Real FlowIQ UI</span><span>' + story.title + '</span></div>' +
          '<img src="' + story.screen + '" alt="' + story.title + ' FlowIQ dashboard screen" loading="eager" decoding="async">' +
        '</div>' +
      '</section>' +
      '<section class="story-card p-8 md:p-10 story-reveal">' +
        '<div class="module-story-intro__copy">' +
          '<span class="section-kicker">' + story.eyebrow + '</span>' +
          '<h2 class="mt-5 text-2xl md:text-3xl font-black text-slate-900">' + story.valueHeadline + '</h2>' +
        '</div>' +
        '<div class="mt-5 grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-8 items-start">' +
          '<div><p class="text-base md:text-lg text-slate-600 leading-relaxed">' + story.valueCopy + '</p><p class="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">' + story.lead + '</p></div>' +
          '<div class="brochure-proof-chip-row">' + brochureOutcomeCards(story) + '</div>' +
        '</div>' +
      '</section>' +
      renderSystemFlow(root.getAttribute('data-module'), story);
	  }

  function init() {
    var root = document.getElementById('moduleStory');
    if (!root) return;
    var key = root.getAttribute('data-module');
    var story = stories[key] || stories.importiq;
    renderStory(root, story);
    if (window.lucide) window.lucide.createIcons();
    if (window.FlowIQStoryReveal) window.FlowIQStoryReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
