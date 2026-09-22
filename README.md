# 🛡️ Aakriti - Cybersecurity & VAPT Portfolio

A modern, high-performance, dark-themed cybersecurity and ethical hacking portfolio website built for **Aakriti**.

Live Demo: [https://aakriti17.github.io/](https://aakriti17.github.io/)

---

## 🚀 Key Features

- **Interactive Cybersecurity Terminal (`aakriti@secops:~$`)**:
  - Fully interactive CLI emulator supporting commands like `whoami`, `skills`, `projects`, `certs`, `nmap -sV`, `cat resume`, `contact`, and `clear`.
  - Quick-execute command chips for rapid mobile and desktop interaction.
- **Offensive & Defensive Security Arsenal**:
  - Interactive skill matrix covering VAPT, OWASP Top 10, Recon & OSINT, API Security, Forensics, and Python Automation.
- **Projects Showcase**:
  - **CloudGuard-AI**: Automated Cloud Security Posture Management (CSPM) in AWS.
  - **DoH-C2-Tunneling**: Covert Command & Control using DNS-over-HTTPS.
  - **ShadowTrace**: OSINT intelligence gathering platform.
  - **Keylogging Lab**: Endpoint behavioral telemetry research.
  - **QuickDesk / QuickScan**: Diagnostic scanner and endpoint utility.
- **Verified Credentials**: Showcasing 5+ certifications (CCEH, WAPT, CCNA, CCFI, Skill Digital India).
- **Dual Experience Timeline**: Highlighting internships at Cryptus Cyber Security Pvt. Ltd. and Merit.
- **Live Contact Form**: Connected to Formspree endpoint with direct social links.
- **Multi-Theme Switcher**: Emerald Cyber, Neon Cyan, Cyber Violet, and Matrix Green.
- **100% Static & GitHub Pages Ready**: Zero build steps, instant loading, perfectly optimized.

---

## 📦 Project Structure

```
portfolio/
├── index.html              # Main webpage markup
├── .nojekyll               # GitHub Pages direct asset serving rule
├── README.md               # Documentation
├── deploy.bat              # One-click GitHub push & deploy batch script
├── css/
│   ├── style.css           # Core styling & cyber aesthetic design system
│   └── terminal.css        # Interactive CLI shell styling
├── js/
│   ├── main.js             # Typewriter, scroll spy, filters, and theme switcher
│   ├── terminal.js         # Command line emulator engine
│   └── matrix-canvas.js    # Cyber ambient network node animation
└── assets/
    └── Aakriti_resume.pdf  # Official downloadable PDF resume
```

---

## 🌐 How to Host on GitHub Pages (Step-by-Step)

### Option 1: User Root Domain (Recommended)
1. Create a new public repository on GitHub named: **`aakriti17.github.io`**
2. Run `deploy.bat` inside this folder or execute:
   ```bash
   git init
   git add .
   git commit -m "Deploy Aakriti Cybersecurity Portfolio"
   git branch -M main
   git remote add origin https://github.com/aakriti17/aakriti17.github.io.git
   git push -u origin main --force
   ```
3. Your site will automatically go live at **`https://aakriti17.github.io/`**!

---

### Option 2: Project Repository (`portfolio`)
1. Create a public repository named **`portfolio`** on GitHub.
2. Push your files:
   ```bash
   git init
   git add .
   git commit -m "Deploy Portfolio"
   git branch -M main
   git remote add origin https://github.com/aakriti17/portfolio.git
   git push -u origin main --force
   ```
3. Go to GitHub repo **Settings** -> **Pages** -> Source: **Deploy from a branch** -> Branch: **main** / **/(root)** -> Click **Save**.
4. Your website is live at **`https://aakriti17.github.io/portfolio/`**!

---

© 2026 Aakriti. All rights reserved.
