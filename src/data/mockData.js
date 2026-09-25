// Mock data for Resolve-AI - Autonomous Payment-Operations Teammate for Paytm Merchants

export const merchantInfo = {
  name: "Divya Stores & Kirana",
  owner: "Divya Sharma",
  merchantId: "MID_MUM_774920",
  soundboxId: "SB-4G-9921-MUM",
  upiId: "divya.stores@paytm",
  city: "Andheri East, Mumbai",
  language: "English / Hindi",
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
      customerName: "Indresh Suresh",
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
    customer: "Indresh Suresh (+91 98201 44892)",
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
    proposedAction: "Send WhatsApp message with 1-tap UPI payment link (upi://pay?pa=divya.stores@paytm&am=1200).",
    status: "READY",
    badge: "Critic Approved",
    graphNote: "Cognee Memory: Customer usually clears dues upon 1st polite reminder."
  }
];

export const multilingualVoiceScenarios = {
  'hi-IN': [
    {
      id: "v1_hi",
      lang: "हिन्दी",
      flag: "🇮🇳",
      title: "1. सेटलमेंट अंतर विश्लेषण",
      query: "कल के सेटलमेंट में ₹2,340 क्यों कम आए हैं?",
      transcription: "कल के सेटलमेंट में ₹2,340 क्यों कम आए हैं?",
      orbState: "searching",
      responseAudioText: "नमस्ते दिव्या जी। कल के ₹10,000 के सेटलमेंट में से ₹2,340 का अंतर पाया गया है। हमने ₹640 का क्लेम स्वतः दर्ज कर दिया है। इंद्रेश सुरेश के ₹1,500 के रिफंड विवाद के लिए आपकी एक-टैप स्वीकृति चाहिए, और ₹200 का शुल्क जांच के अधीन है।",
      audioDuration: "14s"
    },
    {
      id: "v2_hi",
      lang: "हिन्दी",
      flag: "🇮🇳",
      title: "2. ऑटो-क्लेम स्थिति",
      query: "₹640 के विफल डेबिट ऑटो-क्लेम की स्थिति क्या है?",
      transcription: "₹640 के विफल डेबिट ऑटो-क्लेम की स्थिति क्या है?",
      orbState: "solving",
      responseAudioText: "ग्राहक के बैंक खाते से ₹640 कट गए थे लेकिन पीओएस टर्मिनल पर भुगतान विफल रहा। ₹1,000 की नीति सीमा के तहत, क्रिटिक गार्डरेल ने इसे स्वतः दर्ज कर दिया है। क्लेम नंबर CLM-640 पेटीएम डेस्क पर सक्रिय है।",
      audioDuration: "13s"
    },
    {
      id: "v3_hi",
      lang: "हिन्दी",
      flag: "🇮🇳",
      title: "3. रिफंड विवाद स्वीकृति",
      query: "इंद्रेश सुरेश के ₹1,500 के रुके हुए रिफंड की क्या स्थिति है?",
      transcription: "इंद्रेश सुरेश के ₹1,500 के रुके हुए रिफंड की क्या स्थिति है?",
      orbState: "weaving",
      responseAudioText: "इंद्रेश सुरेश का ₹1,500 का रिफंड मर्चेंट खाते से कट गया था लेकिन बैंक गेटवे में 24 घंटे से लंबित है। बैंक यूटीआर साक्ष्य के साथ विवाद पैकेट तैयार है और आपकी एक-टैप स्वीकृति की प्रतीक्षा कर रहा है।",
      audioDuration: "13s"
    },
    {
      id: "v4_hi",
      lang: "हिन्दी",
      flag: "🇮🇳",
      title: "4. बहीखाता सत्यापन",
      query: "कल के बहीखाते और शुल्क विवरण का सत्यापन करें",
      transcription: "कल के बहीखाते और शुल्क विवरण का सत्यापन करें",
      orbState: "working",
      responseAudioText: "कल 50 ऑर्डरों में कुल ₹10,000 की बिक्री हुई थी। ₹9,800 का शुद्ध सेटलमेंट अपेक्षित था। ₹7,460 बैंक में जमा हुए। ₹2,340 का अंतर शत-प्रतिशत प्रमाणित है।",
      audioDuration: "14s"
    }
  ],
  'en-IN': [
    {
      id: "v1_en",
      lang: "English",
      flag: "🇬🇧",
      title: "1. Settlement Gap Analysis",
      query: "Why is ₹2,340 missing from yesterday's settlement?",
      transcription: "Why is ₹2,340 missing from yesterday's settlement?",
      orbState: "searching",
      responseAudioText: "Good morning Divya ji. You are missing ₹2,340 from yesterday's ₹10,000 settlement. I found three causes: I have already submitted a ₹640 claim automatically. ₹1,500 for customer Indresh Suresh requires your 1-tap approval, and ₹200 fee delta is under review. I will monitor until funds credit your HDFC account.",
      audioDuration: "14s"
    },
    {
      id: "v2_en",
      lang: "English",
      flag: "🇬🇧",
      title: "2. Auto-Claim Recovery Status",
      query: "Explain the ₹640 failed debit auto-claim status",
      transcription: "Explain the ₹640 failed debit auto-claim status",
      orbState: "solving",
      responseAudioText: "The ₹640 payment was debited from the customer's bank but failed at the POS terminal. Because it is below our ₹1,000 policy threshold, Critic auto-executed the dispute. Claim #CLM-640 is active on Paytm Settlement Desk.",
      audioDuration: "13s"
    },
    {
      id: "v3_en",
      lang: "English",
      flag: "🇬🇧",
      title: "3. Held Refund Approval",
      query: "What is the status of the ₹1,500 held refund dispute for Indresh Suresh?",
      transcription: "What is the status of the ₹1,500 held refund dispute for Indresh Suresh?",
      orbState: "weaving",
      responseAudioText: "The ₹1,500 refund for customer Indresh Suresh was deducted from merchant ledger but stuck in gateway pending state for over 24 hours. The dispute packet with bank UTR proof is ready and paused for your 1-tap authorization.",
      audioDuration: "13s"
    },
    {
      id: "v4_en",
      lang: "English",
      flag: "🇬🇧",
      title: "4. Ledger Math Verification",
      query: "Verify yesterday's accounting math and fee breakdown",
      transcription: "Verify yesterday's accounting math and fee breakdown",
      orbState: "working",
      responseAudioText: "Gross transactions were ₹10,000 across 50 orders. Expected settlement was ₹9,800 after agreed fees. Actual bank credit was ₹7,460. The ₹2,340 delta is 100% traced with deterministic accounting rules.",
      audioDuration: "14s"
    }
  ],
  'mr-IN': [
    {
      id: "v1_mr",
      lang: "मराठी",
      flag: "🇮🇳",
      title: "1. सेटलमेंट तफावत विश्लेषण",
      query: "कालच्या सेटलमेंटमधून ₹2,340 का कमी आले आहेत?",
      transcription: "कालच्या सेटलमेंटमधून ₹2,340 का कमी आले आहेत?",
      orbState: "searching",
      responseAudioText: "शुभ सकाळ दिव्या जी. कालच्या ₹10,000 सेटलमेंटमधून ₹2,340 ची तफावत आढळली आहे. आम्ही ₹640 चा क्लेम आपोआप दाखल केला आहे. इंद्रेश सुरेश यांच्या ₹1,500 च्या परताव्यासाठी तुमची एका टॅपची संमती आवश्यक आहे.",
      audioDuration: "14s"
    },
    {
      id: "v2_mr",
      lang: "मराठी",
      flag: "🇮🇳",
      title: "2. ऑटो-क्लेम स्थिती",
      query: "₹640 च्या अयशस्वी डेबिट क्लेमची स्थिती काय आहे?",
      transcription: "₹640 च्या अयशस्वी डेबिट क्लेमची स्थिती काय आहे?",
      orbState: "solving",
      responseAudioText: "ग्राहकाच्या बँक खात्यातून ₹640 कापले गेले होते पण टर्मिनलवर व्यवहार अयशस्वी झाला. ₹1,000 च्या मर्यादेखाली असल्याने याचा क्लेम आपोआप सबमिट करण्यात आला आहे.",
      audioDuration: "13s"
    },
    {
      id: "v3_mr",
      lang: "मराठी",
      flag: "🇮🇳",
      title: "3. रिफंड वाद मंजुरी",
      query: "इंद्रेश सुरेश यांच्या ₹1,500 च्या रिफंडची काय स्थिती आहे?",
      transcription: "इंद्रेश सुरेश यांच्या ₹1,500 च्या रिफंडची काय स्थिती आहे?",
      orbState: "weaving",
      responseAudioText: "इंद्रेश सुरेश यांचा ₹1,500 चा रिफंड गेटवेमध्ये अडकला आहे. बँक पुरावा तयार असून तुमच्या एका टॅपच्या संमतीची वाट पाहत आहे.",
      audioDuration: "13s"
    },
    {
      id: "v4_mr",
      lang: "मराठी",
      flag: "🇮🇳",
      title: "4. हिशोब पडताळणी",
      query: "कालच्या हिशोबाची खात्री करा",
      transcription: "कालच्या हिशोबाची खात्री करा",
      orbState: "working",
      responseAudioText: "काल 50 ऑर्डर्समध्ये ₹10,000 चा व्यवहार झाला. ₹9,800 येणे अपेक्षित होते. ₹2,340 चा फरक पूर्णपणे स्पष्ट झाला आहे.",
      audioDuration: "14s"
    }
  ],
  'gu-IN': [
    {
      id: "v1_gu",
      lang: "ગુજરાતી",
      flag: "🇮🇳",
      title: "1. સેટલમેન્ટ ગેપ વિશ્લેષણ",
      query: "ગઈકાલના સેટલમેન્ટમાંથી ₹2,340 કેમ ઓછા મળ્યા?",
      transcription: "ગઈકાલના સેટલમેન્ટમાંથી ₹2,340 કેમ ઓછા મળ્યા?",
      orbState: "searching",
      responseAudioText: "સુપ્રભાત દિવ્યા જી. ગઈકાલના ₹10,000 સેટલમેન્ટમાંથી ₹2,340 નો તફાવત મળ્યો છે. અમે ₹640 નો ક્લેમ આપમેળે દાખલ કર્યો છે. ઇન્દ્રેશ સુરેશના ₹1,500 ના રિફંડ માટે તમારી 1-ટેપ મંજૂરી જરૂરી છે.",
      audioDuration: "14s"
    },
    {
      id: "v2_gu",
      lang: "ગુજરાતી",
      flag: "🇮🇳",
      title: "2. ઓટો-ક્લેમ સ્થિતિ",
      query: "₹640 ના ફેલ ડેબિટ ક્લેમની સ્થિતિ જણાવો",
      transcription: "₹640 ના ફેલ ડેબિટ ક્લેમની સ્થિતિ જણાવો",
      orbState: "solving",
      responseAudioText: "ગ્રાહકના ખાતામાંથી ₹640 કપાયા હતા પરંતુ વ્યવહાર ફેલ થયો હતો. સિસ્ટમે પેટીએમ ડેસ્ક પર આપમેળે ક્લેમ દાખલ કરી દીધો છે.",
      audioDuration: "13s"
    },
    {
      id: "v3_gu",
      lang: "ગુજરાતી",
      flag: "🇮🇳",
      title: "3. રિફંડ વિવાદ મંજૂરી",
      query: "ઇન્દ્રેશ સુરેશના ₹1,500 રિફંડ વિવાદની સ્થિતિ શું છે?",
      transcription: "ઇન્દ્રેશ સુરેશના ₹1,500 રિફંડ વિવાદની સ્થિતિ શું છે?",
      orbState: "weaving",
      responseAudioText: "ઇન્દ્રેશ સુરેશનું ₹1,500 નું રિફંડ 24 કલાકથી પેન્ડિંગ છે. બેંક પુરાવા સાથે ફાઇલ તૈયાર છે અને તમારી મંજૂરીની રાહ જુએ છે.",
      audioDuration: "13s"
    },
    {
      id: "v4_gu",
      lang: "ગુજરાતી",
      flag: "🇮🇳",
      title: "4. હિસાબ ચકાસણી",
      query: "ગઈકાલના ખાતાવહી અને હિસાબની ચકાસણી કરો",
      transcription: "ગઈકાલના ખાતાવહી અને હિસાબની ચકાસણી કરો",
      orbState: "working",
      responseAudioText: "ગઈકાલે 50 ઓર્ડરમાં ₹10,000 નું કુલ વેચાણ થયું હતું. ₹2,340 નો તફાવત સંપૂર્ણ રીતે ચકાસવામાં આવ્યો છે.",
      audioDuration: "14s"
    }
  ],
  'ta-IN': [
    {
      id: "v1_ta",
      lang: "தமிழ்",
      flag: "🇮🇳",
      title: "1. செட்டில்மெண்ட் இடைவெளி",
      query: "நேற்றைய செட்டில்மெண்டில் ₹2,340 ஏன் குறைகிறது?",
      transcription: "நேற்றைய செட்டில்மெண்டில் ₹2,340 ஏன் குறைகிறது?",
      orbState: "searching",
      responseAudioText: "காலை வணக்கம் திவ்யா ஜி. நேற்றைய ₹10,000 செட்டில்மெண்டில் ₹2,340 குறைந்துள்ளது. ₹640 கோரிக்கையை தானாகவே தாக்கல் செய்துள்ளோம். இந்திரேஷ் சுரேஷின் ₹1,500 ரீஃபண்டிற்கு உங்கள் ஒரு-தட்டல் ஒப்புதல் தேவை.",
      audioDuration: "14s"
    },
    {
      id: "v2_ta",
      lang: "தமிழ்",
      flag: "🇮🇳",
      title: "2. தானியங்கி கோரிக்கை நிலை",
      query: "₹640 தோல்வியுற்ற டெபிட் கோரிக்கையின் நிலை என்ன?",
      transcription: "₹640 தோல்வியுற்ற டெபிட் கோரிக்கையின் நிலை என்ன?",
      orbState: "solving",
      responseAudioText: "வாடிக்கையாளரிடம் இருந்து ₹640 கழிக்கப்பட்டது ஆனால் பிஓஎஸ்ஸில் தோல்வியடைந்தது. ₹1,000 வரம்பிற்குள் உள்ளதால் தானாகவே கோரப்பட்டுள்ளது.",
      audioDuration: "13s"
    },
    {
      id: "v3_ta",
      lang: "தமிழ்",
      flag: "🇮🇳",
      title: "3. ரீஃபண்ட் தகராறு ஒப்புதல்",
      query: "இந்திரேஷ் சுரேஷின் ₹1,500 ரீஃபண்ட் நிலை என்ன?",
      transcription: "இந்திரேஷ் சுரேஷின் ₹1,500 ரீஃபண்ட் நிலை என்ன?",
      orbState: "weaving",
      responseAudioText: "இந்திரேஷ் சுரேஷின் ₹1,500 ரீஃபண்ட் வங்கியில் நிலுவையில் உள்ளது. வங்கி சான்றுடன் உங்கள் ஒப்புதலுக்காக காத்திருக்கிறது.",
      audioDuration: "13s"
    },
    {
      id: "v4_ta",
      lang: "தமிழ்",
      flag: "🇮🇳",
      title: "4. கணக்கு சரிபார்ப்பு",
      query: "நேற்றைய கணக்கு மற்றும் கட்டண விவரங்களை சரிபார்க்கவும்",
      transcription: "நேற்றைய கணக்கு மற்றும் கட்டண விவரங்களை சரிபார்க்கவும்",
      orbState: "working",
      responseAudioText: "நேற்று ₹10,000 மொத்த பரிவர்த்தனை நடந்தது. ₹2,340 வித்தியாசம் முழுமையாக கண்டறியப்பட்டு சரிபார்க்கப்பட்டது.",
      audioDuration: "14s"
    }
  ],
  'te-IN': [
    {
      id: "v1_te",
      lang: "తెలుగు",
      flag: "🇮🇳",
      title: "1. సెటిల్మెంట్ అంతరం విశ్లేషణ",
      query: "నిన్నటి సెటిల్మెంట్లో ₹2,340 ఎందుకు తగ్గింది?",
      transcription: "నిన్నటి సెటిల్మెంట్లో ₹2,340 ఎందుకు తగ్గింది?",
      orbState: "searching",
      responseAudioText: "శుభోదయం దివ్య గారు. నిన్నటి ₹10,000 సెటిల్మెంట్లో ₹2,340 వ్యత్యాసం ఉంది. మేము ₹640 క్లెయిమ్ను స్వయంచాలకంగా దాఖలు చేసాము. ఇంద్రేష్ సురేష్ ₹1,500 రీఫండ్ కోసం మీ అనుమతి కావాలి.",
      audioDuration: "14s"
    },
    {
      id: "v2_te",
      lang: "తెలుగు",
      flag: "🇮🇳",
      title: "2. ఆటో-క్లెయిమ్ స్థితి",
      query: "₹640 ఫెయిల్డ్ డెబిట్ క్లెయిమ్ పరిస్థితి ఏమిటి?",
      transcription: "₹640 ఫెయిల్డ్ డెబిట్ క్లెయిమ్ పరిస్థితి ఏమిటి?",
      orbState: "solving",
      responseAudioText: "కస్టమర్ ఖాతా నుండి ₹640 డెబిట్ అయింది కానీ లావాదేవీ ఫెయిల్ అయింది. సిస్టమ్ దీనిని ఆటోమేటిక్గా క్లెయిమ్ చేసింది.",
      audioDuration: "13s"
    },
    {
      id: "v3_te",
      lang: "తెలుగు",
      flag: "🇮🇳",
      title: "3. రీఫండ్ వివాదం ఆమోదం",
      query: "ఇంద్రేష్ సురేష్ ₹1,500 రీఫండ్ వివాదం పరిస్థితి ఏమిటి?",
      transcription: "ఇంద్రేష్ సురేష్ ₹1,500 రీఫండ్ వివాదం పరిస్థితి ఏమిటి?",
      orbState: "weaving",
      responseAudioText: "ఇంద్రేష్ సురేష్ ₹1,500 రీఫండ్ గేట్వేలో నిలిచిపోయింది. మీ ఒక-ట్యాప్ ఆమోదం కోసం వేచి ఉంది.",
      audioDuration: "13s"
    },
    {
      id: "v4_te",
      lang: "తెలుగు",
      flag: "🇮🇳",
      title: "4. లెక్కల ధృవీకరణ",
      query: "నిన్నటి ఖాతా లెక్కలను ధృవీకరించండి",
      transcription: "నిన్నటి ఖాతా లెక్కలను ధృవీకరించండి",
      orbState: "working",
      responseAudioText: "నిన్న 50 ఆర్డర్లలో ₹10,000 వ్యాపారం జరిగింది. ₹2,340 వ్యత్యాసం పూర్తిగా ధృవీకరించబడింది.",
      audioDuration: "14s"
    }
  ],
  'kn-IN': [
    {
      id: "v1_kn",
      lang: "ಕನ್ನಡ",
      flag: "🇮🇳",
      title: "1. ಸೆಟ್ಲ್‌ಮೆಂಟ್ ಅಂತರ ವಿಶ್ಲೇಷಣೆ",
      query: "ನಿನ್ನೆಯ ಸೆಟ್ಲ್‌ಮೆಂಟ್‌ನಲ್ಲಿ ₹2,340 ಏಕೆ ಕಡಿಮೆಯಾಗಿದೆ?",
      transcription: "ನಿನ್ನೆಯ ಸೆಟ್ಲ್‌ಮೆಂಟ್‌ನಲ್ಲಿ ₹2,340 ಏಕೆ ಕಡಿಮೆಯಾಗಿದೆ?",
      orbState: "searching",
      responseAudioText: "ಶುಭೋದಯ ದಿವ್ಯಾ ಅವರೇ. ನಿನ್ನೆಯ ₹10,000 ಸೆಟ್ಲ್‌ಮೆಂಟ್‌ನಲ್ಲಿ ₹2,340 ವ್ಯತ್ಯಾಸವಿದೆ. ನಾವು ₹640 ಕ್ಲೈಮ್ ಅನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಲ್ಲಿಸಿದ್ದೇವೆ. ಇಂದ್ರೇಶ್ ಸುರೇಶ್ ಅವರ ₹1,500 ಮರುಪಾವತಿಗೆ ನಿಮ್ಮ ಅನುಮೋದನೆ ಅಗತ್ಯವಿದೆ.",
      audioDuration: "14s"
    },
    {
      id: "v2_kn",
      lang: "ಕನ್ನಡ",
      flag: "🇮🇳",
      title: "2. ಆಟೋ-ಕ್ಲೈಮ್ ಸ್ಥಿತಿ",
      query: "₹640 ವಿಫಲ ಡೆಬಿಟ್ ಕ್ಲೈಮ್ ಸ್ಥಿತಿ ತಿಳಿಸಿ",
      transcription: "₹640 ವಿಫಲ ಡೆಬಿಟ್ ಕ್ಲೈಮ್ ಸ್ಥಿತಿ ತಿಳಿಸಿ",
      orbState: "solving",
      responseAudioText: "ಗ್ರಾಹಕರ ಖಾತೆಯಿಂದ ₹640 ಕಡಿತಗೊಂಡಿದೆ ಆದರೆ ಪಿಒಎಸ್‌ನಲ್ಲಿ ವಿಫಲವಾಗಿದೆ. ಇದನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕ್ಲೈಮ್ ಮಾಡಲಾಗಿದೆ.",
      audioDuration: "13s"
    },
    {
      id: "v3_kn",
      lang: "ಕನ್ನಡ",
      flag: "🇮🇳",
      title: "3. ಮರುಪಾವತಿ ಅನುಮೋದನೆ",
      query: "ಇಂದ್ರೇಶ್ ಸುರೇಶ್ ₹1,500 ಮರುಪಾವತಿ ಸ್ಥಿತಿ ಏನು?",
      transcription: "ಇಂದ್ರೇಶ್ ಸುರೇಶ್ ₹1,500 ಮರುಪಾವತಿ ಸ್ಥಿತಿ ಏನು?",
      orbState: "weaving",
      responseAudioText: "ಇಂದ್ರೇಶ್ ಸುರೇಶ್ ಅವರ ₹1,500 ಮರುಪಾವತಿ ಬ್ಯಾಂಕ್ ಗೇಟ್‌ವೇಯಲ್ಲಿ ಬಾಕಿ ಉಳಿದಿದೆ. ನಿಮ್ಮ ಅನುಮೋದನೆಗಾಗಿ ಕಾಯುತ್ತಿದೆ.",
      audioDuration: "13s"
    },
    {
      id: "v4_kn",
      lang: "ಕನ್ನಡ",
      flag: "🇮🇳",
      title: "4. ಲೆಕ್ಕಪತ್ರ ಪರಿಶೀಲನೆ",
      query: "ನಿನ್ನೆಯ ಲೆಕ್ಕ ಪರಿಶೀಲಿಸಿ",
      transcription: "ನಿನ್ನೆಯ ಲೆಕ್ಕ ಪರಿಶೀಲಿಸಿ",
      orbState: "working",
      responseAudioText: "ನಿನ್ನೆ ₹10,000 ಒಟ್ಟು ವಹಿವಾಟು ನಡೆದಿದೆ. ₹2,340 ವ್ಯತ್ಯಾಸವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಪತ್ತೆಹಚ್ಚಲಾಗಿದೆ.",
      audioDuration: "14s"
    }
  ],
  'bn-IN': [
    {
      id: "v1_bn",
      lang: "বাংলা",
      flag: "🇮🇳",
      title: "1. সেটেলমেন্ট ব্যবধান বিশ্লেষণ",
      query: "গতকালের সেটেলমেন্টে ₹2,340 কেন কম এসেছে?",
      transcription: "গতকালের সেটেলমেন্টে ₹2,340 কেন কম এসেছে?",
      orbState: "searching",
      responseAudioText: "সুপ্রভাত দিব্যা জি। গতকালের ₹10,000 সেটেলমেন্ট থেকে ₹2,340 অমিল পাওয়া গেছে। আমরা ₹640 এর দাবি স্বয়ংক্রিয়ভাবে জমা দিয়েছি। ইন্দ্রেশ সুরেশের ₹1,500 রিফান্ডের জন্য আপনার অনুমোদন প্রয়োজন।",
      audioDuration: "14s"
    },
    {
      id: "v2_bn",
      lang: "বাংলা",
      flag: "🇮🇳",
      title: "2. অটো-দাবি স্থিতি",
      query: "₹640 ব্যর্থ ডেবিট দাবির স্থিতি কী?",
      transcription: "₹640 ব্যর্থ ডেবিট দাবির স্থিতি কী?",
      orbState: "solving",
      responseAudioText: "গ্রাহকের অ্যাকাউন্ট থেকে ₹640 কাটা হয়েছিল কিন্তু লেনদেন ব্যর্থ হয়েছিল। সিস্টেম স্বয়ংক্রিয়ভাবে দাবিটি দায়ের করেছে।",
      audioDuration: "13s"
    },
    {
      id: "v3_bn",
      lang: "বাংলা",
      flag: "🇮🇳",
      title: "3. রিফান্ড অনুমোদন",
      query: "ইন্দ্রেশ সুরেশের ₹1,500 রিফান্ডের স্থিতি কী?",
      transcription: "ইন্দ্রেশ সুরেশের ₹1,500 রিফান্ডের স্থিতি কী?",
      orbState: "weaving",
      responseAudioText: "ইন্দ্রেশ সুরেশের ₹1,500 রিফান্ড গেটওয়েতে আটকে আছে। আপনার এক-ট্যাপ অনুমোদনের জন্য অপেক্ষা করছে।",
      audioDuration: "13s"
    },
    {
      id: "v4_bn",
      lang: "বাংলা",
      flag: "🇮🇳",
      title: "4. হিসাব যাচাইকরণ",
      query: "গতকালের হিসাব এবং ফি বিবরণ যাচাই করুন",
      transcription: "গতকালের হিসাব এবং ফি বিবরণ যাচাই করুন",
      orbState: "working",
      responseAudioText: "গতকাল 50টি অর্ডারে মোট ₹10,000 লেনদেন হয়েছে। ₹2,340 অমিল সম্পূর্ণ যাচাই করা হয়েছে।",
      audioDuration: "14s"
    }
  ],
  'ml-IN': [
    {
      id: "v1_ml",
      lang: "മലയാളം",
      flag: "🇮🇳",
      title: "1. സെറ്റിൽമെന്റ് വിടവ് വിശകലനം",
      query: "ഇന്നലത്തെ സെറ്റിൽമെന്റിൽ ₹2,340 കുറഞ്ഞത് എന്തുകൊണ്ട്?",
      transcription: "ഇന്നലത്തെ സെറ്റിൽമെന്റിൽ ₹2,340 കുറഞ്ഞത് എന്തുകൊണ്ട്?",
      orbState: "searching",
      responseAudioText: "സുപ്രഭാതം ദിവ്യാ ജി. ഇന്നലത്തെ ₹10,000 സെറ്റിൽമെന്റിൽ ₹2,340 കുറവുണ്ട്. ₹640 ക്ലെയിം ഞങ്ങൾ സ്വയമേവ സമർപ്പിച്ചു. ഇന്ദ്രേഷ് സുരേഷിന്റെ ₹1,500 റീഫണ്ടിന് നിങ്ങളുടെ അനുമതി ആവശ്യമാണ്.",
      audioDuration: "14s"
    },
    {
      id: "v2_ml",
      lang: "മലയാളം",
      flag: "🇮🇳",
      title: "2. ഓട്ടോ ക്ലെയിം നില",
      query: "₹640 പരാജയപ്പെട്ട ഡെബിറ്റ് ക്ലെയിം നില എന്താണ്?",
      transcription: "₹640 പരാജയപ്പെട്ട ഡെബിറ്റ് ക്ലെയിം നില എന്താണ്?",
      orbState: "solving",
      responseAudioText: "ഉപഭോക്താവിന്റെ അക്കൗണ്ടിൽ നിന്ന് ₹640 ഈടാക്കിയെങ്കിലും ഇടപാട് പരാജയപ്പെട്ടു. സിസ്റ്റം സ്വയമേവ ക്ലെയിം ചെയ്തു.",
      audioDuration: "13s"
    },
    {
      id: "v3_ml",
      lang: "മലയാളം",
      flag: "🇮🇳",
      title: "3. റീഫണ്ട് തർക്ക അനുമതി",
      query: "ഇന്ദ്രേഷ് സുരേഷിന്റെ ₹1,500 റീഫണ്ട് നില എന്താണ്?",
      transcription: "ഇന്ദ്രേഷ് സുരേഷിന്റെ ₹1,500 റീഫണ്ട് നില എന്താണ്?",
      orbState: "weaving",
      responseAudioText: "ഇന്ദ്രേഷ് സുരേഷിന്റെ ₹1,500 റീഫണ്ട് ഗേറ്റ്‌വേയിൽ കുടുങ്ങിക്കിടക്കുകയാണ്. നിങ്ങളുടെ അനുമതിക്കായി കാത്തിരിക്കുന്നു.",
      audioDuration: "13s"
    },
    {
      id: "v4_ml",
      lang: "മലയാളം",
      flag: "🇮🇳",
      title: "4. അക്കൗണ്ട് പരിശോധന",
      query: "ഇന്നലത്തെ കണക്കുകൾ പരിശോധിക്കുക",
      transcription: "ഇന്നലത്തെ കണക്കുകൾ പരിശോധിക്കുക",
      orbState: "working",
      responseAudioText: "ഇന്നലെ ₹10,000 ന്റെ ഇടപാട് നടന്നു. ₹2,340 വ്യത്യാസം പൂർണ്ണമായി സ്ഥിരീകരിച്ചു.",
      audioDuration: "14s"
    }
  ],
  'pa-IN': [
    {
      id: "v1_pa",
      lang: "ਪੰਜਾਬੀ",
      flag: "🇮🇳",
      title: "1. ਸੈਟਲਮੈਂਟ ਅੰਤਰ ਵਿਸ਼ਲੇਸ਼ਣ",
      query: "ਕੱਲ੍ਹ ਦੇ ਸੈਟਲਮੈਂਟ ਵਿੱਚੋਂ ₹2,340 ਕਿਉਂ ਘੱਟ ਆਏ ਹਨ?",
      transcription: "ਕੱਲ੍ਹ ਦੇ ਸੈਟਲਮੈਂਟ ਵਿੱਚੋਂ ₹2,340 ਕਿਉਂ ਘੱਟ ਆਏ ਹਨ?",
      orbState: "searching",
      responseAudioText: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਦਿਵਿਆ ਜੀ। ਕੱਲ੍ਹ ਦੇ ₹10,000 ਸੈਟਲਮੈਂਟ ਵਿੱਚੋਂ ₹2,340 ਦਾ ਅੰਤਰ ਮਿਲਿਆ ਹੈ। ਅਸੀਂ ₹640 ਦਾ ਕਲੇਮ ਆਟੋਮੈਟਿਕ ਦਰਜ ਕਰ ਦਿੱਤਾ ਹੈ। ਇੰਦਰੇਸ਼ ਸੁਰੇਸ਼ ਦੇ ₹1,500 ਰਿਫੰਡ ਲਈ ਤੁਹਾਡੀ ਮਨਜ਼ੂਰੀ ਚਾਹੀਦੀ ਹੈ।",
      audioDuration: "14s"
    },
    {
      id: "v2_pa",
      lang: "ਪੰਜਾਬੀ",
      flag: "🇮🇳",
      title: "2. ਆਟੋ ਕਲੇਮ ਸਥਿਤੀ",
      query: "₹640 ਅਸਫਲ ਡੈਬਿਟ ਕਲੇਮ ਦੀ ਸਥਿਤੀ ਕੀ ਹੈ?",
      transcription: "₹640 ਅਸਫਲ ਡੈਬਿਟ ਕਲੇਮ ਦੀ ਸਥਿਤੀ ਕੀ ਹੈ?",
      orbState: "solving",
      responseAudioText: "ਗਾਹਕ ਦੇ ਖਾਤੇ ਵਿੱਚੋਂ ₹640 ਕੱਟੇ ਗਏ ਸਨ ਪਰ ਲੈਣ-ਦੇਣ ਅਸਫਲ ਰਿਹਾ। ਸਿਸਟਮ ਨੇ ਇਸ ਨੂੰ ਆਟੋਮੈਟਿਕ ਕਲੇਮ ਕਰ ਦਿੱਤਾ ਹੈ।",
      audioDuration: "13s"
    },
    {
      id: "v3_pa",
      lang: "ਪੰਜਾਬੀ",
      flag: "🇮🇳",
      title: "3. ਰਿਫੰਡ ਝਗੜਾ ਮਨਜ਼ੂਰੀ",
      query: "ਇੰਦਰੇਸ਼ ਸੁਰੇਸ਼ ਦੇ ₹1,500 ਰਿਫੰਡ ਦੀ ਸਥਿਤੀ ਕੀ ਹੈ?",
      transcription: "ਇੰਦਰੇਸ਼ ਸੁਰੇਸ਼ ਦੇ ₹1,500 ਰਿਫੰਡ ਦੀ ਸਥਿਤੀ ਕੀ ਹੈ?",
      orbState: "weaving",
      responseAudioText: "ਇੰਦਰੇਸ਼ ਸੁਰੇਸ਼ ਦਾ ₹1,500 ਰਿਫੰਡ ਬੈਂਕ ਗੇਟਵੇ ਵਿੱਚ ਲੰਬਿਤ ਹੈ। ਤੁਹਾਡੀ ਮਨਜ਼ੂਰੀ ਦੀ ਉਡੀਕ ਕਰ ਰਿਹਾ ਹੈ।",
      audioDuration: "13s"
    },
    {
      id: "v4_pa",
      lang: "ਪੰਜਾਬੀ",
      flag: "🇮🇳",
      title: "4. ਖਾਤਾ ਪੜਤਾਲ",
      query: "ਕੱਲ੍ਹ ਦੇ ਖਾਤੇ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
      transcription: "ਕੱਲ੍ਹ ਦੇ ਖਾਤੇ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
      orbState: "working",
      responseAudioText: "ਕੱਲ੍ਹ 50 ਆਰਡਰਾਂ ਵਿੱਚ ₹10,000 ਦਾ ਕੁੱਲ ਵਪਾਰ ਹੋਇਆ ਸੀ। ₹2,340 ਦਾ ਅੰਤਰ ਪੂਰੀ ਤਰ੍ਹਾਂ ਸਪੱਸ਼ਟ ਹੈ।",
      audioDuration: "14s"
    }
  ],
  'od-IN': [
    {
      id: "v1_od",
      lang: "ଓଡ଼ିଆ",
      flag: "🇮🇳",
      title: "1. ସେଟଲମେଣ୍ଟ ପାର୍ଥକ୍ୟ ବିଶ୍ଳେଷଣ",
      query: "ଗତକାଲିର ସେଟଲମେଣ୍ଟରେ ₹2,340 କାହିଁକି କମ ଆସିଛି?",
      transcription: "ଗତକାଲିର ସେଟଲମେଣ୍ଟରେ ₹2,340 କାହିଁକି କମ ଆସିଛି?",
      orbState: "searching",
      responseAudioText: "ନମସ୍କାର ଦିବ୍ୟା ଜୀ। ଗତକାଲିର ₹10,000 ସେଟଲମେଣ୍ଟରୁ ₹2,340 ର ପାର୍ଥକ୍ୟ ମିଳିଛି। ଆମେ ₹640 ର ଦାବି ସ୍ୱୟଂଚାଳିତ ଭାବେ ଦାଖଲ କରିଛୁ। ଇନ୍ଦ୍ରେଶ ସୁରେଶଙ୍କ ₹1,500 ରିଫଣ୍ଡ ପାଇଁ ଆପଣଙ୍କ ଅନୁମୋଦନ ଆବଶ୍ୟକ।",
      audioDuration: "14s"
    },
    {
      id: "v2_od",
      lang: "ଓଡ଼ିଆ",
      flag: "🇮🇳",
      title: "2. ଅଟୋ-କ୍ଲେମ ସ୍ଥିତି",
      query: "₹640 ବିଫଳ ଡେବିଟ କ୍ଲେମର ସ୍ଥିତି କଣ?",
      transcription: "₹640 ବିଫଳ ଡେବିଟ କ୍ଲେମର ସ୍ଥିତି କଣ?",
      orbState: "solving",
      responseAudioText: "ଗ୍ରାହକଙ୍କ ଖାତାରୁ ₹640 କଟିଥିଲା କିନ୍ତୁ କାରବାର ବିଫଳ ହୋଇଥିଲା। ସିଷ୍ଟମ ଏହାକୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ କ୍ଲେମ କରିଛି।",
      audioDuration: "13s"
    },
    {
      id: "v3_od",
      lang: "ଓଡ଼ିଆ",
      flag: "🇮🇳",
      title: "3. ରିଫଣ୍ଡ ବିବାଦ ଅନୁମୋଦନ",
      query: "ଇନ୍ଦ୍ରେଶ ସୁରେଶଙ୍କ ₹1,500 ରିଫଣ୍ଡ ସ୍ଥିତି କଣ?",
      transcription: "ଇନ୍ଦ୍ରେଶ ସୁରେଶଙ୍କ ₹1,500 ରିଫଣ୍ଡ ସ୍ଥିତି କଣ?",
      orbState: "weaving",
      responseAudioText: "ଇନ୍ଦ୍ରେଶ ସୁରେଶଙ୍କ ₹1,500 ରିଫଣ୍ଡ ବ୍ୟାଙ୍କ ଗେଟୱେରେ ଅଟକି ରହିଛି। ଆପଣଙ୍କ ଅନୁମୋଦନ ପାଇଁ ଅପେକ୍ଷା କରୁଛି।",
      audioDuration: "13s"
    },
    {
      id: "v4_od",
      lang: "ଓଡ଼ିଆ",
      flag: "🇮🇳",
      title: "4. ହିସାବ ଯାଞ୍ଚ",
      query: "ଗତକାଲିର ହିସାବ ଯାଞ୍ଚ କରନ୍ତୁ",
      transcription: "ଗତକାଲିର ହିସାବ ଯାଞ୍ଚ କରନ୍ତୁ",
      orbState: "working",
      responseAudioText: "ଗତକାଲି ₹10,000 ର କାରବାର ହୋଇଥିଲା। ₹2,340 ର ପାର୍ଥକ୍ୟ ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରମାଣିତ ହୋଇଛି।",
      audioDuration: "14s"
    }
  ]
};

export const voiceScenarios = multilingualVoiceScenarios['en-IN'];

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
    title: "5. Multi-Agent Orchestration",
    tag: "n8n Webhook Pipeline",
    desc: "Demonstrates the 5 specialized AI teammates (Monitor, Reconciler, Fraud, Collector, Critic) coordinating autonomous payment actions.",
    targetId: "agents",
    actionName: "Execute Agent Pipeline"
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
