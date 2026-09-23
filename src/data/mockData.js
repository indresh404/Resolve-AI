export const merchantInfo = {
  name: "Sharma General Store & Kirana",
  owner: "Ramesh Sharma",
  merchantId: "MID_MUM_774920",
  soundboxId: "SB-4G-9921-MUM",
  upiId: "sharma.kirana@upi",
  city: "Andheri East, Mumbai",
  language: "Hindi / Hinglish",
  settlementAccount: "HDFC Bank •••• 4402",
  soundboxStatus: "Connected (4G Active)",
  dailyCheckTime: "09:00 AM IST",
  offlineMode: false,
};

export const recoveryStats = {
  totalRecovered: 18420,
  recoveredToday: 2340,
  pendingDisputes: 5400,
  hoursSaved: 14.2,
  mismatchExplainedPercent: 100,
  autoExecutedRate: 94.8,
  activeAlerts: 3,
};

export const sampleSettlementData = {
  settlementDate: "Yesterday, 23 Sep 2026",
  settlementId: "SET_20260923_9941",
  utrNumber: "UTR_HDFC2026092388129",
  grossAmount: 10000,
  totalTransactions: 50,
  expectedSettlement: 9800,
  actualSettlement: 7460,
  totalMismatch: 2340,
  status: "MISMATCH_RESOLVED",
  items: [
    {
      id: "DISP_01",
      title: "Refund Stuck in Pending State",
      type: "HELD_REFUND",
      amount: 1500,
      badge: "Auto-Disputed",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30",
      description: "Refund of ₹1,500 was deducted from settlement, but gateway refund status was stuck in FAILED/PENDING state.",
      ruleTriggered: "RULE_REF_04: refund_status != SUCCESS && deducted_from_settlement == true",
      actionTaken: "Dispute #DISP-99201 raised with UTR proof via n8n Settlement Adapter. Estimated credit: 24 hrs.",
      riskLevel: "LOW",
      autoExecuted: true,
      icon: "ShieldAlert",
      time: "09:00 AM"
    },
    {
      id: "DISP_02",
      title: "Payment Marked Failed (Customer Debited)",
      type: "FAILED_DEBIT",
      amount: 640,
      badge: "Auto-Claimed",
      badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-300 dark:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-500/30",
      description: "Customer was debited ₹640 on UPI QR code. POS showed failed, but NPCI Bank Ref 99482109 confirmed debit without reversal.",
      ruleTriggered: "RULE_UPI_09: txn_status == FAILED && bank_ref_exists == true && reversal == null",
      actionTaken: "Claim filed attaching NPCI bank ref. Customer SMS notification scheduled.",
      riskLevel: "LOW",
      autoExecuted: true,
      icon: "RefreshCw",
      time: "09:00 AM"
    },
    {
      id: "DISP_03",
      title: "Excess MDR Fee Charged (Card Surcharge)",
      type: "FEE_MISMATCH",
      amount: 200,
      badge: "Correction Filed",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30",
      description: "Charged 2.8% MDR on RuPay debit card instead of zero MDR / 0.8% cap agreed in merchant contract.",
      ruleTriggered: "RULE_MDR_02: fee_charged > (amount * fee_rate_cap)",
      actionTaken: "Fee adjustment claim submitted with contract appendix #CTR-8812.",
      riskLevel: "LOW",
      autoExecuted: true,
      icon: "Receipt",
      time: "09:01 AM"
    }
  ]
};

export const agentsList = [
  {
    id: "monitor",
    name: "Monitor Agent",
    role: "Proactive Daily Check & Deadlines",
    state: "breathing",
    status: "Active (9:00 AM Trigger)",
    description: "Reviews all daily transactions, checks chargeback expiry clocks, and triggers automatic morning audits.",
    icon: "Clock",
    tools: ["n8n Cron", "Postgres Ledger", "Deadline Watcher"],
    logs: [
      "09:00:00 - Cron trigger received for MID_MUM_774920",
      "09:00:02 - Loaded 50 transactions, 1 settlement, 2 refund records",
      "09:00:04 - Detected ₹2,340 discrepancy. Initiating Reconciler Agent."
    ]
  },
  {
    id: "reconciler",
    name: "Reconciler Agent",
    role: "Deterministic Money & Settlement Math",
    state: "searching",
    status: "Attributing Mismatches",
    description: "Calculates expected vs actual settlements using strict deterministic rules. Zero LLM hallucinations for money movement.",
    icon: "Calculator",
    tools: ["Deterministic Math Engine", "Settlement Parser", "Fee Matrix"],
    logs: [
      "09:00:05 - Running expected settlement formula: Gross ₹10,000 - Fees ₹200 - Legitimate Refunds ₹0 = Expected ₹9,800",
      "09:00:06 - Actual received: ₹7,460. Gap: ₹2,340.",
      "09:00:07 - Identified 3 root causes: ₹1,500 held refund + ₹640 failed debit + ₹200 fee delta = ₹2,340 (0 unexplained)."
    ]
  },
  {
    id: "fraud",
    name: "Fraud & Graph Agent",
    role: "Abuse Detection & Customer Graph",
    state: "weaving",
    status: "Pattern Analysis Live",
    description: "Inspects Cognee knowledge graph for repeat refund abuse, device sharing, and unusual chargeback velocity.",
    icon: "Network",
    tools: ["Cognee Graph DB", "Velocity Engine", "Device Fingerprint"],
    logs: [
      "09:00:08 - Querying Cognee graph for 30-day customer behavior...",
      "09:00:09 - Customer Rajesh K. flagged: 4 refunds in 30d (Threshold: 2).",
      "09:00:10 - Action classified as HIGH RISK for ₹5,400 chargeback. Pushed to Approval Queue."
    ]
  },
  {
    id: "collector",
    name: "Collector Agent",
    role: "Autonomous UPI Reminders & Claims",
    state: "composing",
    status: "Drafting 1-Tap Links",
    description: "Creates smart WhatsApp payment links with dynamic UPI QR strings and auto-files disputes to Settlement API.",
    icon: "Send",
    tools: ["WhatsApp Cloud API", "Dispute Gateway API", "Dynamic UPI Generator"],
    logs: [
      "09:00:11 - Generated dynamic UPI link: upi://pay?pa=sharma.kirana@upi&am=1200",
      "09:00:12 - Formatted polite Hindi WhatsApp reminder for overdue udhaar",
      "09:00:13 - Prepared dispute packet #DISP-99201 with bank UTR proof"
    ]
  },
  {
    id: "critic",
    name: "Critic Agent",
    role: "Guardrail Validator & Safety Filter",
    state: "shaping",
    status: "Screening Actions",
    description: "Acts as a second pair of eyes. Verifies arithmetic, validates prompt-injection safety, and enforces human-in-the-loop limits.",
    icon: "CheckCircle2",
    tools: ["Guardrail Policy Engine", "Prompt Injection Scanner", "Risk Scorer"],
    logs: [
      "09:00:14 - Screening low-risk disputes (₹1,500, ₹640, ₹200) -> Safe for auto-execution",
      "09:00:15 - Screening high-risk refund ₹5,400 -> Exceeds ₹5,000 threshold -> Paused for merchant review",
      "09:00:16 - Passed 3 low-risk actions to n8n executor"
    ]
  }
];

export const approvalTasks = [
  {
    id: "TASK-8841",
    title: "High-Value Chargeback Response Approval",
    customer: "Rajesh Kumar (+91 98201 55432)",
    amount: 5400,
    risk: "HIGH",
    riskScore: "88/100",
    reason: "Amount > ₹5,000 threshold & customer has 4 refund requests in past 30 days.",
    deadline: "Tomorrow, 5:00 PM (18 hrs remaining)",
    proposedAction: "Submit CCTV evidence and signed invoice #INV-773 to contest bank chargeback.",
    status: "WAITING_APPROVAL",
    badge: "Paused for Merchant Approval",
    graphNote: "Cognee Memory: Shared device fingerprint with 2 other flagged phone numbers."
  },
  {
    id: "TASK-8842",
    title: "Overdue Udhaar WhatsApp Reminder",
    customer: "Suresh Verma (+91 97654 22190)",
    amount: 1200,
    risk: "MEDIUM",
    riskScore: "42/100",
    reason: "Payment overdue by 8 days (merchant credit policy: 5 days).",
    deadline: "Today, 6:00 PM",
    proposedAction: "Send WhatsApp message with 1-tap UPI payment link (upi://pay?pa=sharma.kirana@upi&am=1200).",
    status: "READY",
    badge: "Critic Approved",
    graphNote: "Cognee Memory: Customer usually clears dues upon 1st polite reminder."
  },
  {
    id: "TASK-8843",
    title: "Dispute Credit Confirmation",
    customer: "Settlement Operations Team",
    amount: 1500,
    risk: "LOW",
    riskScore: "12/100",
    reason: "Held refund auto-dispute validated by deterministic rule RULE_REF_04.",
    deadline: "Completed",
    proposedAction: "Auto-disputed. Awaiting bank settlement credit into HDFC Bank.",
    status: "AUTO_RESOLVED",
    badge: "Auto Executed",
    graphNote: "System Memory: 99.2% dispute success rate on RULE_REF_04."
  }
];

export const voiceScenarios = [
  {
    id: "v1",
    lang: "Hindi",
    flag: "🇮🇳",
    query: "आज का सेटलमेंट कम क्यों आया?",
    transcription: "Aaj ka settlement kam kyun aaya?",
    orbState: "searching",
    responseAudioText: "नमस्ते शर्मा जी, कल कुल ₹10,000 के 50 पेमेंट्स आए थे। ₹9,800 की जगह ₹7,460 जमा हुए। ₹2,340 का अंतर है: ₹1,500 का अटका हुआ रिफंड (क्लेम दर्ज कर दिया है), ₹640 का फेल्ड पेमेंट (क्लेम दर्ज है), और ₹200 का एक्स्ट्रा चार्ज। आपका ₹2,140 जल्दी क्रेडिट हो जाएगा!",
    audioDuration: "14s",
    soundboxChime: "Recovery claim safaltapoorvak darj hui: 2,140 rupaye!"
  },
  {
    id: "v2",
    lang: "Marathi",
    flag: "🇮🇳",
    query: "कालचे अडकलेले पैसे कधी जमा होणार?",
    transcription: "Kalche adaklele paise kadhi jama honar?",
    orbState: "solving",
    responseAudioText: "नमस्कार शर्मा जी, कालचे ₹1,500 चे अडकलेले रिफंड आणि ₹640 चे फेल्ड पेमेंट क्लेम आम्ही n8n द्वारे दाखल केले आहेत. पुढील 24 तासात आपल्या HDFC बँक खात्यात जमा होतील.",
    audioDuration: "11s",
    soundboxChime: "1,500 rupaye claim request patavli aahe!"
  },
  {
    id: "v3",
    lang: "Hinglish",
    flag: "💬",
    query: "Ramesh aur Suresh ka udhaar remind karao WhatsApp pe",
    transcription: "Ramesh aur Suresh ka udhaar remind karao WhatsApp pe",
    orbState: "composing",
    responseAudioText: "Bilkul! Suresh Verma ka ₹1,200 overdue hai. 1-tap UPI link ke sath WhatsApp message ready hai. Send karne ke liye Approve karein.",
    audioDuration: "9s",
    soundboxChime: "WhatsApp reminder link generated!"
  },
  {
    id: "v4",
    lang: "English",
    flag: "🌐",
    query: "Explain why ₹200 extra fee was deducted yesterday",
    transcription: "Explain why ₹200 extra fee was deducted yesterday",
    orbState: "weaving",
    responseAudioText: "Your RuPay card transactions were billed at 2.8% instead of the 0.8% cap in your contract #CTR-8812. Reconciler Agent has auto-drafted a fee refund claim for ₹200.",
    audioDuration: "10s",
    soundboxChime: "Fee correction claim logged successfully!"
  }
];

export const cogneeGraphNodes = [
  { id: "M1", label: "Sharma Kirana (Merchant)", type: "merchant", risk: "safe", x: 250, y: 140 },
  { id: "C1", label: "Rajesh Kumar", type: "customer", risk: "high", details: "4 refunds in 30 days (High Risk)", x: 100, y: 70 },
  { id: "C2", label: "Suresh Verma", type: "customer", risk: "medium", details: "₹1,200 Udhaar (8 days late)", x: 400, y: 70 },
  { id: "C3", label: "Pooja Singh", type: "customer", risk: "safe", details: "Frequent loyal buyer (Zero disputes)", x: 130, y: 230 },
  { id: "D1", label: "Device #DEV-9842 (Shared)", type: "device", risk: "high", details: "Linked to 2 different phone numbers", x: 60, y: 150 },
  { id: "T1", label: "Settlement Mismatch (₹2,340)", type: "issue", risk: "resolved", details: "100% Attributed & Disputed", x: 370, y: 220 }
];
