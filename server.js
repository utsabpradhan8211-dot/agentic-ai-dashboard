// server.js
// Node.js + Express backend for Agentic AI dashboard with root-level index.html

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from root (for index.html and any other assets)
app.use(express.static(__dirname));

// In-memory demo data
let drugs = [
  {
    id: 1,
    name: "Metoprolol",
    indication: "Triple-Negative Breast Cancer",
    marketOpportunity: 680,
    timeline: "24-30 mo",
    confidence: 89,
    status: "Recommended"
  },
  {
    id: 2,
    name: "Verapamil",
    indication: "Hepatocellular Carcinoma",
    marketOpportunity: 520,
    timeline: "26-32 mo",
    confidence: 85,
    status: "Priority"
  },
  {
    id: 3,
    name: "Diltiazem",
    indication: "Melanoma Metastasis",
    marketOpportunity: 420,
    timeline: "22-28 mo",
    confidence: 78,
    status: "Monitor"
  },
  {
    id: 4,
    name: "Carvedilol",
    indication: "Ovarian Cancer",
    marketOpportunity: 350,
    timeline: "28-36 mo",
    confidence: 72,
    status: "Under Review"
  },
  {
    id: 5,
    name: "Nifedipine",
    indication: "Renal Cell Carcinoma",
    marketOpportunity: 280,
    timeline: "30-36 mo",
    confidence: 68,
    status: "Under Review"
  }
];

// GET all drugs
app.get("/api/drugs", (req, res) => {
  res.json(drugs);
});

// PATCH: update status of a drug
app.patch("/api/drugs/:id/status", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { status } = req.body;

  const allowed = [
    "Recommended",
    "Not Recommended",
    "Under Review",
    "Priority",
    "Monitor"
  ];

  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const drug = drugs.find(d => d.id === id);
  if (!drug) {
    return res.status(404).json({ error: "Drug not found" });
  }

  drug.status = status;
  return res.json(drug);
});

// Fallback: always return index.html for any unknown route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Agentic AI dashboard running at http://localhost:${PORT}`);
});
