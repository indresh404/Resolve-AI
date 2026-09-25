// Mock data for Resolve-AI - Autonomous Payment-Operations Teammate for Paytm Merchants

export const merchantInfo = {
  name: "Sharma General Store & Kirana",
  owner: "Ramesh Sharma",
  merchantId: "MID_MUM_774920",
  soundboxId: "SB-4G-9921-MUM",
  upiId: "sharma.kirana@paytm",
  city: "Andheri East, Mumbai",
  language: "Hindi / Hinglish",
  settlementAccount: "HDFC Bank •••• 4402",
  soundboxStatus: "Connected (4G Active)",
  dailyCheckTime: "09:00 AM IST"
};

export const recoveryStats = {
  totalRecovered: 18420,
  recoveredToday: 640,
  inRecoveryPipeline: 1700, // ₹1,500 dispute + ₹200 fee claim
  unexplainedRemainder: 200,
  hoursSaved: 14.2,
  mismatchExplainedPercent: 91.4, // 2,140 out of 2,340 explained with exact txns; 200 fee discrepancy honestly reported
  autoExecutedRate: 94.8,
  activeAlerts: 2,
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
  status: "ACTION_IN_PROGRESS",
  momentPitch: "You're missing ₹2,340 from yesterday's settlement. I found three causes. I've already submitted a ₹640 claim. ₹1,500 requires your approval. ₹200 is still unexplained. I'll keep monitoring the open cases and notify you when the money is recovered.",
  items: [
    {
      id: "DISP_01",
      txnId: "TXN_MUM_20260923_8841",
      orderId: "ORD_KIRANA_9941",
      title: "Refund Deducted but Stuck in Gateway (Pending)",
      type: "HELD_REFUND",
      amount: 1500,
      badge: "Needs Approval",
      badgeColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
      description: "Refund of ₹1,500 was deducted from merchant settlement, but refund status on gateway is stuck in FAILED/PENDING.",
      ruleTriggered: "RULE_REF_04: refund.status IN (PENDING, FAILED) && deducted_in_settlement_items == true",
      evidence: "Settlement Item #S-8812 deducted ₹1,500. Gateway Refund Ref #REF-9921 shows state 'PENDING_BANK_ACK' for > 24 hours.",
      actionTaken: "Dispute packet drafted with UTR & gateway logs. Paused for merchant 1-tap authorization (> ₹1,000 threshold).",
      riskLevel: "MEDIUM",
      riskScore: 55,
      riskBand: "🟡 ASK MERCHANT",
      autoExecuted: false,
      state: "DISPUTE_FILED", // DISPUTE_FILED -> CLAIM_SUBMITTED -> RECOVERED
      customerName: "Rohan Mehra",
      customerPhone: "+91 98201 44892",
      icon: "ShieldAlert",
      time: "09:00 AM"
    },
    {
      id: "DISP_02",
      txnId: "TXN_MUM_20260923_4491",
      orderId: "ORD_KIRANA_9920",
      title: "Failed at POS, Debited from Customer Bank",
      type: "FAILED_DEBIT",
      amount: 640,
      badge: "Auto-Claimed (🟢)",
      badgeColor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      description: "Customer was charged ₹640 on Paytm Dynamic QR. POS showed failed, but NPCI Bank Ref confirmed debit with no reversal.",
      ruleTriggered: "RULE_UPI_09: txn.status IN (FAILED, PENDING) && bank_ref_no IS NOT NULL && reversal == NULL",
      evidence: "NPCI RRN #99482109283 confirmed debit from SBI •••• 1092 at 14:22 IST. No automated refund initiated within T+1 window.",
      actionTaken: "Claim submitted automatically to Paytm Settlement Gateway (Amount ₹640 < ₹1,000 threshold). Monitoring recovery.",
      riskLevel: "LOW",
      riskScore: 20,
      riskBand: "🟢 AUTO-EXECUTE",
      autoExecuted: true,
      state: "CLAIM_SUBMITTED", // Ready to simulate transition to RECOVERED
      customerName: "Vikram Malhotra",
      customerPhone: "+91 97654 11209",
      icon: "RefreshCw",
      time: "09:00 AM"
    },
    {
      id: "DISP_03",
      txnId: "TXN_MUM_20260923_1102",
      orderId: "ORD_KIRANA_9890",
      title: "Fee Mismatch / Unexplained Remainder",
      type: "FEE_MISMATCH",
      amount: 200,
      badge: "Honestly Surfaced",
      badgeColor: "bg-neutral-500/15 text-neutral-600 dark:text-neutral-400 border-neutral-500/30",
      description: "MDR fee charged exceeded expected contract rate by ₹200. Surfaced honestly as unexplained delta until itemized invoice arrives.",
      ruleTriggered: "RULE_MDR_02: settlement_items.fee_charged != (txn.amount * fee_rules.expected_fee_percent)",
      evidence: "Charged 2.8% on RuPay Debit batch instead of agreed 0.8% cap in Merchant Agreement #CTR-8812. Delta = ₹200.",
      actionTaken: "Fee adjustment claim queued for billing cycle review. Displayed honestly as pending explanation.",
      riskLevel: "LOW",
      riskScore: 15,
      riskBand: "🟢 AUTO-EXECUTE",
      autoExecuted: true,
      state: "DISPUTE_FILED",
      customerName: "Batch Aggregated",
      customerPhone: "Paytm Settlement Desk",
      icon: "Receipt",
      time: "09:01 AM"
    }
  ]
};

export const criticChecklistItems = [
  {
    id: "CHK_01",
    question: "Does the referenced transaction exist in settlement ledger?",
    passed: true,
    detail: "TXN_MUM_20260923_4491 validated against Postgres database."
  },
  {
    id: "CHK_02",
    question: "Does the action amount match the exact transaction delta?",
    passed: true,
    detail: "Claim amount ₹640 matches NPCI debit log exactly (no rounding)."
  },
  {
    id: "CHK_03",
    question: "Is customer/payee authorized for this dispute type?",
    passed: true,
    detail: "Merchant MID_MUM_774920 is verified beneficiary on UTR."
  },
  {
    id: "CHK_04",
    question: "Is duplicate action for same transaction already pending?",
    passed: true,
    detail: "Zero duplicate claims in actions_queue table for past 30 days."
  },
  {
    id: "CHK_05",
    question: "Does risk score match policy permission tier?",
    passed: true,
    detail: "Risk score 20 < 30 (🟢 LOW). Auto-execute policy permitted."
  },
  {
    id: "CHK_06",
    question: "Is supporting evidence (UTR / NPCI RRN) attached?",
    passed: true,
    detail: "Attached NPCI RRN #99482109283 and POS error receipt."
  }
];

export const agentsList = [
  {
    id: "monitor",
    name: "Monitor Agent",
    role: "Proactive Daily Check & Standing Job",
    state: "breathing",
    status: "Standing Job (9:00 AM)",
    description: "Reviews daily settlements at 9:00 AM, checks chargeback deadlines, and continuously monitors open cases until funds land.",
    icon: "Clock",
    tools: ["n8n Cron Scheduler", "Postgres Ledger", "Deadline Watcher"],
    logs: [
      "09:00:00 - Scheduled cron trigger fired for MID_MUM_774920",
      "09:00:02 - Fetched 50 transactions, 1 settlement, 3 refund records",
      "09:00:04 - Detected ₹2,340 discrepancy. Initiated Reconciler Agent."
    ]
  },
  {
    id: "reconciler",
    name: "Reconciler Agent",
    role: "Deterministic Money & Rule Math",
    state: "searching",
    status: "Zero-LLM Math Verification",
    description: "Calculates expected vs actual settlements using strict deterministic accounting rules. Zero LLM hallucinations on money movement.",
    icon: "Calculator",
    tools: ["Deterministic Math Engine", "Settlement Items Parser", "Fee Matrix"],
    logs: [
      "09:00:05 - Gross ₹10,000 - Fees ₹200 - Legitimate Refunds ₹0 = Expected ₹9,800",
      "09:00:06 - Actual received: ₹7,460. Net Gap: ₹2,340.",
      "09:00:07 - Attributed: ₹1,500 held refund + ₹640 failed debit + ₹200 fee delta = ₹2,340."
    ]
  },
  {
    id: "fraud",
    name: "Fraud & Graph Agent",
    role: "Abuse Patterns & Cognee Memory",
    state: "weaving",
    status: "30-Day Velocity Analysis",
    description: "Inspects Cognee knowledge graph for repeat refund abusers, shared device fingerprints, and suspicious payment velocities.",
    icon: "Network",
    tools: ["Cognee Graph DB", "Velocity Engine", "Device Fingerprint"],
    logs: [
      "09:00:08 - Querying Cognee graph for rolling 30-day customer behavior...",
      "09:00:09 - Customer Rajesh K. flagged: 4 refund attempts in 30d (Threshold: 2).",
      "09:00:10 - Classified as HIGH RISK (₹5,400). Passed to Critic Guardrail."
    ]
  },
  {
    id: "collector",
    name: "Collector Agent",
    role: "Autonomous UPI Reminders & Claims",
    state: "composing",
    status: "Drafting Evidence Packets",
    description: "Generates smart WhatsApp reminders with dynamic 1-tap UPI payment links and packages dispute evidence for gateway submission.",
    icon: "Send",
    tools: ["WhatsApp Cloud API", "Paytm Dispute Adapter", "Dynamic UPI Generator"],
    logs: [
      "09:00:11 - Packaged dispute #DISP-99201 with bank UTR proof for ₹1,500",
      "09:00:12 - Formatted polite Hindi WhatsApp reminder for Suresh Verma (₹1,200)",
      "09:00:13 - Dispatched ₹640 auto-claim to Settlement Gateway API"
    ]
  },
  {
    id: "critic",
    name: "Critic Agent",
    role: "Deterministic Guardrail & Safety Gate",
    state: "shaping",
    status: "Screening Checklist Live",
    description: "Deterministic 6-point checklist. Verifies transaction existence, checks duplicate prevention, scans prompt injection, and enforces human-in-the-loop limits.",
    icon: "CheckCircle2",
    tools: ["Guardrail Policy Engine", "Prompt Injection Scanner", "Risk Scorer"],
    logs: [
      "09:00:14 - Screening ₹640 claim -> Score 20 (🟢 Low) -> Auto-execution permitted",
      "09:00:15 - Screening ₹1,500 refund dispute -> Score 55 (🟡 Medium) -> Paused for merchant review",
      "09:00:16 - Passed 6/6 Critic checklist tests. All actions logged in audit table."
    ]
  }
];

export const approvalTasks = [
  {
    id: "TASK-8841",
    title: "Held Refund Dispute Approval",
    customer: "Rohan Mehra (+91 98201 44892)",
    amount: 1500,
    risk: "MEDIUM",
    riskScore: "55/100",
    riskBand: "🟡 ASK MERCHANT",
    reason: "Refund ₹1,500 was deducted in settlement, but stuck in gateway pending state for > 24 hours.",
    deadline: "Today, 6:00 PM",
    proposedAction: "Submit formal dispute #DISP-99201 to Paytm Settlement Ops attaching HDFC UTR evidence.",
    status: "WAITING_APPROVAL",
    badge: "Paused for Merchant Approval",
    graphNote: "Cognee Memory: Normal customer profile. First time refund issue."
  },
  {
    id: "TASK-8842",
    title: "High-Value Chargeback Contest Approval",
    customer: "Rajesh Kumar (+91 98201 55432)",
    amount: 5400,
    risk: "HIGH",
    riskScore: "88/100",
    riskBand: "🟡 ASK MERCHANT (HIGH)",
    reason: "Amount > ₹5,000 threshold & customer has 4 refund requests in past 30 days.",
    deadline: "Tomorrow, 5:00 PM (18 hrs remaining)",
    proposedAction: "Submit CCTV footage & signed invoice #INV-773 to contest bank chargeback.",
    status: "WAITING_APPROVAL",
    badge: "Paused for Merchant Approval",
    graphNote: "Cognee Memory: Shared device fingerprint with 2 other flagged phone numbers."
  },
  {
    id: "TASK-8843",
    title: "Overdue Udhaar WhatsApp Reminder",
    customer: "Suresh Verma (+91 97654 22190)",
    amount: 1200,
    risk: "MEDIUM",
    riskScore: "42/100",
    riskBand: "🟡 MEDIUM RISK",
    reason: "Credit overdue by 8 days (merchant credit policy: 5 days).",
    deadline: "Today, 8:00 PM",
    proposedAction: "Send WhatsApp message with 1-tap UPI payment link (upi://pay?pa=sharma.kirana@paytm&am=1200).",
    status: "READY",
    badge: "Critic Approved",
    graphNote: "Cognee Memory: Customer usually clears dues upon 1st polite reminder."
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
    responseAudioText: "नमस्ते शर्मा जी, कल के ₹10,000 के सेटलमेंट में ₹2,340 कम आए हैं। मैंने तीन कारण ढूंढे हैं: ₹640 का फेल्ड क्लेम मैंने अपने आप दर्ज कर दिया है, ₹1,500 का अटका हुआ रिफंड आपकी मंजूरी मांग रहा है, और ₹200 का फीस अंतर अभी जांच में है। मैं इन केसों पर नजर रखूंगा और पैसे वापस आते ही आपको सूचित करूंगा।",
    audioDuration: "16s",
    soundboxChime: "Recovery claim safaltapoorvak darj hui: 640 rupaye!"
  },
  {
    id: "v2",
    lang: "Marathi",
    flag: "🇮🇳",
    query: "कालचे अडकलेले पैसे कधी जमा होणार?",
    transcription: "Kalche adaklele paise kadhi jama honar?",
    orbState: "solving",
    responseAudioText: "नमस्कार शर्मा जी, कालचे ₹640 चे फेल्ड पेमेंट क्लेम आम्ही परस्पर दाखल केले आहे. ₹1,500 चे अडकलेले रिफंड आपल्या मान्यतेनंतर लगेच पाठवले जाईल. पैसे जमा होताच साउंडबॉक्सवर घोषणा होईल.",
    audioDuration: "14s",
    soundboxChime: "640 rupaye claim request patavli aahe!"
  },
  {
    id: "v3",
    lang: "Hinglish",
    flag: "💬",
    query: "Sharma ji ke dukaan ka gap explain karo aur status batao",
    transcription: "Sharma ji ke dukaan ka gap explain karo aur status batao",
    orbState: "weaving",
    responseAudioText: "Total gap ₹2,340 hai. ₹640 auto-claimed hai, ₹1,500 dispute pending merchant approval hai, aur ₹200 fee discrepancy honestly report ki gayi hai. ₹640 ka recovery verification ongoing hai.",
    audioDuration: "12s",
    soundboxChime: "Settlement audit complete: ₹2,340 analyzed!"
  },
  {
    id: "v4",
    lang: "English",
    flag: "🌐",
    query: "Explain why ₹2,340 is missing from yesterday's settlement",
    transcription: "Explain why ₹2,340 is missing from yesterday's settlement",
    orbState: "working",
    responseAudioText: "You are missing ₹2,340 from yesterday's settlement. I found three causes: I've already submitted a ₹640 claim automatically. ₹1,500 requires your approval. ₹200 is fee discrepancy currently in review. I'll monitor until funds land in your HDFC account.",
    audioDuration: "14s",
    soundboxChime: "Autonomous recovery pipeline active!"
  }
];

export const cogneeGraphNodes = [
  { id: "M1", label: "Sharma Kirana (Merchant MID_774920)", type: "merchant", risk: "safe", x: 250, y: 140, details: "Central merchant store profile with 50 daily transactions and Soundbox 4G linked." },
  { id: "C1", label: "Rajesh Kumar (+91 98201 55432)", type: "customer", risk: "high", details: "Cognee Alert: 4 refund claims in 30 days. Shared device fingerprint detected.", x: 100, y: 70 },
  { id: "C2", label: "Suresh Verma (+91 97654 22190)", type: "customer", risk: "medium", details: "₹1,200 Udhaar pending (8 days overdue). Clears on 1st polite reminder.", x: 400, y: 70 },
  { id: "C3", label: "Pooja Singh (+91 99881 12345)", type: "customer", risk: "safe", details: "Loyal customer (42 transactions, 0 disputes, 100% on-time settlement).", x: 130, y: 230 },
  { id: "D1", label: "Device #DEV-9842 (Shared Hardware)", type: "device", risk: "high", details: "Linked to 2 different phone numbers claiming refunds across 3 merchants.", x: 60, y: 150 },
  { id: "T1", label: "Settlement Gap #SET_9941 (₹2,340)", type: "issue", risk: "resolved", details: "₹1,500 stuck refund + ₹640 failed debit + ₹200 fee discrepancy honestly traced.", x: 370, y: 220 }
];

export const demoTourSteps = [
  {
    step: 1,
    title: "1. 9:00 AM Morning Check",
    tag: "Autonomous Standing Job",
    desc: "Simulates the daily 9:00 AM scheduled trigger where Reconciler, Fraud, and Monitor agents audit transactions without merchant intervention.",
    targetId: "morning-check",
    actionName: "Trigger Morning Check"
  },
  {
    step: 2,
    title: "2. Sarvam Indic Voice Briefing",
    tag: "Voice Interface (Hindi/Marathi)",
    desc: "Delivers the pitch moment in spoken Hindi: explains the ₹2,340 gap, the auto-filed ₹640 claim, and asks approval for the ₹1,500 dispute.",
    targetId: "voice",
    actionName: "Play Voice Briefing"
  },
  {
    step: 3,
    title: "3. ₹2,340 Gap Attribution",
    tag: "Deterministic Accounting Rules",
    desc: "Itemizes the gap with transaction-level evidence: ₹1,500 held refund, ₹640 failed-but-debited, and ₹200 fee mismatch.",
    targetId: "settlement",
    actionName: "Inspect Settlement Math"
  },
  {
    step: 4,
    title: "4. Guardrails & 1-Tap Approval",
    tag: "Bounded Autonomy (🟢 / 🟡 / 🔴)",
    desc: "Auto-executes the ₹640 low-risk claim; pauses the ₹1,500 dispute for 1-tap merchant authorization.",
    targetId: "guardrails",
    actionName: "Review & Approve Dispute"
  },
  {
    step: 5,
    title: "5. Status Polling & Soundbox Chime",
    tag: "Tracking to 'RECOVERED'",
    desc: "A standing job polls gateway status. When status transitions from CLAIM_SUBMITTED to RECOVERED, the Soundbox announces recovered money!",
    targetId: "settlement",
    actionName: "Simulate Recovery & Soundbox"
  },
  {
    step: 6,
    title: "6. Cognee Memory & Fraud Graph",
    tag: "Long-Term Merchant Memory",
    desc: "Visualizes customer relationship graphs, 30-day velocity checks, and device fingerprints for fraud mitigation.",
    targetId: "memory",
    actionName: "Explore Memory Graph"
  }
];

export const teamMembers = [
  { name: "Indresh Suresh", role: "AI Systems & Full-Stack", badge: "Team Lead" },
  { name: "Divya Sharma", role: "Product Architecture & AI Workflows", badge: "Core Contributor" }
];
