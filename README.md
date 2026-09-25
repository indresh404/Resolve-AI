# Resolve AI

> **Find it. Explain it. Recover it.**

An autonomous payment-operations teammate for Paytm merchants. Resolve AI detects settlement issues, explains them with transaction-level evidence, takes permitted recovery actions, asks for approval when required, and tracks cases until money is actually recovered.

**Built for:** Paytm Build for India AI Hackathon, Mumbai Edition  
**Track:** Track 3 — Autonomous AI Teammates  
**Partners' Technology:** n8n • Sarvam AI • Cognee

> **Prototype:** Uses a synthetic/mock transaction dataset. It does **not** connect to live Paytm production systems.

---

## 🚨 Problem

Merchants often struggle to understand where money gets stuck after a payment.

- Settlement gaps and fee mismatches are difficult to identify.
- Refunds and failed-but-debited payments can remain unresolved.
- Recovery requires manual investigation and follow-ups.
- Merchants cannot easily see whether a claim was actually recovered.

---

## 💡 Idea

Resolve AI creates a continuous **Detect → Explain → Decide → Act → Verify → Recover** loop.

It doesn't stop at identifying a problem. It investigates the cause, prepares evidence, performs permitted actions, requests approval for risky actions, and keeps monitoring until the case reaches **RECOVERED**.

### Example

```text
₹2,340 settlement gap detected

₹1,500  → Stuck refund
₹640    → Failed-but-debited
₹200    → Fee mismatch

↓
₹640 claim → Auto-submitted
₹1,500    → Merchant approval required
₹200      → Remains unexplained

↓
System keeps monitoring

₹640 → RECOVERED
```

---

## ✨ Key Features

### 1. Smart Reconciliation

Detects settlement gaps, stuck refunds, failed-but-debited payments, and fee mismatches.

### 2. Transaction-Level Evidence

Links every detected issue to the underlying transaction and supporting data.

### 3. Autonomous Recovery

Creates and executes permitted claims, disputes, reminders, and recovery workflows.

### 4. Human-in-the-Loop Safety

Low-risk actions can run automatically; risky actions wait for merchant approval.

### 5. Continuous Recovery Tracking

Tracks cases from `FILED → SUBMITTED → RECOVERED` instead of treating a filed claim as recovered money.

### 6. Multilingual Voice

Uses Sarvam AI for Hindi, Marathi, and English voice interactions and notifications.

---

## 🤖 AI Agents

| Agent                | Responsibility                                                      |
| -------------------- | ------------------------------------------------------------------- |
| **Reconciler Agent** | Finds settlement gaps and identifies their causes.                  |
| **Fraud Agent**      | Detects unusual refund and payment patterns.                        |
| **Collector Agent**  | Prepares claims, disputes, and reminders.                           |
| **Critic Agent**     | Validates actions against deterministic safety rules.               |
| **Monitor Agent**    | Runs checks, creates tasks, and tracks open cases until resolution. |

### Core Principle

> **LLM understands, explains, and drafts. Deterministic code makes money-related decisions.**

---

## 🏗️ Architecture

```text
                 ┌─────────────────────┐
                 │    Merchant / PWA   │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    FastAPI Backend  │
                 └──────────┬──────────┘
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
   │ AI Agents   │   │     n8n     │   │  Sarvam AI  │
   │             │   │ Workflows   │   │ Voice/LLM   │
   └──────┬──────┘   └──────┬──────┘   └─────────────┘
          │                 │
          └────────┬────────┘
                   ▼
          ┌──────────────────┐
          │ Guardrails/Critic│
          └────────┬─────────┘
                   ▼
       ┌─────────────────────────┐
       │ PostgreSQL + Cognee     │
       │ Data + Memory + Cases   │
       └───────────┬─────────────┘
                   │
                   ▼
       ┌─────────────────────────┐
       │ Paytm-Compatible Adapter│
       │ Mock / Synthetic Data   │
       └───────────┘
```

### Autonomy States

```text
🟢 AUTO-EXECUTE
Low-risk permitted action

🟡 ASK MERCHANT
Approval required

🔴 BLOCK
Policy violation / suspected injection
```

---

## 🛠️ Tech Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Frontend       | React + Tailwind CSS + PWA     |
| Backend        | FastAPI + Python               |
| AI / Voice     | Sarvam AI                      |
| Agents         | LangGraph / n8n AI Agent Nodes |
| Workflow       | n8n                            |
| Memory         | Cognee                         |
| Database       | PostgreSQL                     |
| Messaging      | WhatsApp / Twilio Sandbox      |
| Data           | Synthetic Transaction Dataset  |
| Adapter        | Paytm-Compatible Mock Adapter  |
| Infrastructure | Docker Compose                 |

---

## 🔄 Workflow

```text
Transaction Data
      ↓
Detect
      ↓
Explain with Evidence
      ↓
Risk / Policy Check
      ↓
┌────────────┬──────────────┬─────────────┐
│ Auto       │ Ask Merchant │ Block       │
└─────┬──────┴──────┬───────┴─────────────┘
      │             │
      └──────┬──────┘
             ↓
       Recovery Action
             ↓
          Verify
             ↓
      Money Recovered?
        ↓           ↓
       NO          YES
        │           │
        └── Monitor └→ RECOVERED
```

---

## 🚀 Setup

### Prerequisites

* Docker
* Docker Compose
* Node.js 18+
* Python 3.11+
* Sarvam AI API key

### Installation

```bash
git clone <repository-url>
cd <repository-folder>

cp .env.example .env
```

Add the required environment variables to `.env`.

```bash
docker compose up --build
```

### Services

```text
Web App   → http://localhost:3000
API       → http://localhost:8000
n8n       → http://localhost:5678
Postgres  → localhost:5432
```

### Seed Demo Data

```bash
docker compose exec api python scripts/seed_mock_data.py
```

This loads the synthetic demo scenario containing the **₹2,340 settlement gap**.

---

## 📁 Project Structure

```text
.
├── frontend/              # React PWA
├── api/                   # FastAPI backend
│   ├── agents/            # AI agents
│   ├── guardrails/        # Risk & safety checks
│   ├── adapters/          # Paytm-compatible mock adapter
│   └── scripts/           # Seed/utilities
├── n8n/                   # Workflow definitions
├── db/                    # Database schema/migrations
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🎬 Demo Flow

1. Run **Morning Check**.
2. Resolve AI detects the settlement mismatch.
3. System explains the gap using transaction-level evidence.
4. Low-risk recovery action is automatically submitted.
5. Higher-risk action waits for merchant approval.
6. n8n continues monitoring the open cases.
7. Recovered amount moves to **RECOVERED**.
8. Merchant receives the recovery update through the dashboard/voice experience.

---

## 🔐 Safety & Reliability

* Deterministic rules for money calculations.
* Human approval for risky actions.
* Duplicate-action checks.
* Transaction and evidence validation.
* Prompt-injection checks.
* Audit logging for actions and approvals.
* `RECOVERED` is only counted after recovery is confirmed.
* Unexplained amounts remain explicitly visible.

---

## ⚠️ Prototype Limitations

* Uses **synthetic/mock transaction data**.
* No live Paytm production API or credentials are used.
* Payment and dispute actions are simulated through the adapter.
* WhatsApp functionality may use a sandbox.
* Production integration would require approved Paytm APIs/sandbox access.
* Fraud detection currently focuses on demonstrated refund/amount patterns.

---

## 🔮 Roadmap

* Paytm sandbox/API integration
* More merchant languages
* Soundbox integration
* Advanced fraud signals
* Chargeback evidence automation
* Multi-store merchant support
* Cash-flow insights and forecasting


---

## 🙏 Acknowledgements

Built for the **Paytm Build for India AI Hackathon — Mumbai Edition**.

Technology used from:

* **n8n** — workflow automation
* **Sarvam AI** — Indic language and voice capabilities
* **Cognee** — memory and knowledge graph capabilities

---

> **Resolve AI — Find it. Explain it. Recover it.**
