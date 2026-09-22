/* ==========================================================================
   Interactive Terminal Emulator Engine (aakriti@secops:~$)
   ========================================================================== */

(function () {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const chipButtons = document.querySelectorAll('.chip-btn');

  if (!terminalBody || !terminalInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: `
<span class="term-bold term-green">AVAILABLE COMMANDS:</span>
  <span class="term-cyan">whoami</span>        : Summary of role, objective & security focus
  <span class="term-cyan">skills</span>        : Technical skills breakdown (VAPT, Tools, OSINT, API)
  <span class="term-cyan">projects</span>      : Featured security tools & repositories
  <span class="term-cyan">certs</span>         : Certifications & training credentials
  <span class="term-cyan">experience</span>    : Industry internships & hands-on history
  <span class="term-cyan">education</span>     : Academic degree & school qualifications
  <span class="term-cyan">nmap -sV</span>      : Simulated network vulnerability service scan
  <span class="term-cyan">cat resume</span>    : Open/download official PDF resume
  <span class="term-cyan">contact</span>       : Direct email, phone, LinkedIn & GitHub links
  <span class="term-cyan">clear</span>         : Clear terminal console
`,

    whoami: `
<span class="term-bold term-green">[IDENTITY CARD]</span>
  <span class="term-muted">Name:</span>       <span class="term-bold">Aakriti</span>
  <span class="term-muted">Role:</span>       VAPT Specialist | Web App Security | Cloud Security Automation
  <span class="term-muted">Location:</span>   Ghaziabad, Uttar Pradesh, India
  <span class="term-muted">Status:</span>     <span class="term-green">🟢 Active (Open to Roles & Security Engagements)</span>
  <span class="term-muted">Philosophy:</span> Hands-on offensive mindset paired with defensive engineering empathy.
`,

    skills: `
<span class="term-bold term-green">[TECHNICAL SKILLS MATRIX]</span>
  <span class="term-cyan">🛡️ Cybersecurity:</span>  VAPT, OWASP Top 10, Web Security, Bug Bounty Basics
  <span class="term-cyan">🧰 Security Tools:</span> Burp Suite, OWASP ZAP, Acunetix, Nessus, Metasploit, Nmap, Wireshark, Hydra, SQLMap
  <span class="term-cyan">🔎 Recon & OSINT:</span>  Subfinder, Subzy, Maltego, theHarvester, SpiderFoot, Shodan, Gobuster
  <span class="term-cyan">🌐 Networking:</span>     TCP/IP, DNS, HTTP/S, CCNA-level Routing/Switching, VLANs, OSPF
  <span class="term-cyan">🐍 Programming:</span>    Python (Boto3, Automation), C, C++, MySQL, React, JavaScript
  <span class="term-cyan">🔐 Forensics & API:</span> Digital Forensics, Autopsy, FTK Imager, Postman, OWASP API Top 10
`,

    projects: `
<span class="term-bold term-green">[FEATURED REPOSITORIES & SECURITY TOOLS]</span>
  1. <span class="term-cyan term-bold">CloudGuard-AI (CSPM)</span>
     • Python, AWS IAM, Boto3 automated security auditor & misconfiguration detector.
     • GitHub: <a href="https://github.com/aakriti17/CloudGuard-AI" target="_blank" class="term-green">github.com/aakriti17/CloudGuard-AI</a>

  2. <span class="term-cyan term-bold">DoH-C2-Tunneling</span>
     • Stealthy Command & Control framework using DNS-over-HTTPS with TLS evasion.
     • GitHub: <a href="https://github.com/aakriti17/DoH-C2-Tunneling" target="_blank" class="term-green">github.com/aakriti17/DoH-C2-Tunneling</a>

  3. <span class="term-cyan term-bold">ShadowTrace OSINT Platform</span>
     • Advanced OSINT reconnaissance & asset intelligence aggregator.
     • GitHub: <a href="https://github.com/aakriti17/shadowtrace" target="_blank" class="term-green">github.com/aakriti17/shadowtrace</a>

  4. <span class="term-cyan term-bold">Keylogging Endpoint Lab</span>
     • Controlled research keylogger exploring keystroke telemetry & security defenses.
`,

    certs: `
<span class="term-bold term-green">[CERTIFICATIONS & CREDENTIALS]</span>
  • <span class="term-cyan">6-Month Diploma in Cyber Security & Ethical Hacking</span> — Cryptus Cyber Security
  • <span class="term-cyan">CCEH</span> (Cryptus Certified Ethical Hacker)
  • <span class="term-cyan">WAPT</span> (Web Application Penetration Tester)
  • <span class="term-cyan">CCNA</span> (Cryptus Certified Network Administrator)
  • <span class="term-cyan">CCFI</span> (Cryptus Certified Forensics Investigator)
  • <span class="term-cyan">Cryptus Certified API Testing Specialist</span>
  • <span class="term-cyan">State-Level Qualification</span> — Skill Digital India 2025-26
`,

    experience: `
<span class="term-bold term-green">[WORK EXPERIENCE]</span>
  • <span class="term-cyan term-bold">Cybersecurity Intern</span> | Cryptus Cyber Security Pvt. Ltd. (Dec 2025 – Present)
    - Performed VAPT on live applications, subdomain takeovers, OWASP Top 10 vulnerabilities (XSS, SQLi).
  • <span class="term-cyan term-bold">Frontend Developer Intern</span> | Merit (Moaisus) (Dec 2023 – Jul 2024)
    - Built responsive web apps using React, HTML5, CSS3 & JavaScript with optimized UX.
`,

    education: `
<span class="term-bold term-green">[EDUCATION]</span>
  • <span class="term-cyan">B.Voc in Cyber Security</span> — Guru Nanak College, Mansa (2026)
  • <span class="term-cyan">12th Senior Secondary</span> — J.N.V. Mansa (2023)
  • <span class="term-cyan">10th Secondary</span> — J.N.V. Mansa (2021)
`,

    nmap: `
<span class="term-muted">Starting Nmap 7.94 ( https://nmap.org ) at secops-target.lab</span>
<span class="term-muted">Initiating SYN Stealth Scan at 16:45:10...</span>
<span class="term-green">Nmap scan report for secops-target.lab (192.168.1.105)</span>
Host is up (0.00042s latency).
Not shown: 994 closed tcp ports (reset)
PORT     STATE SERVICE     VERSION
<span class="term-cyan">22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu (Auth: Public Key)</span>
<span class="term-cyan">80/tcp   open  http        nginx 1.18.0 (Security Hardened)</span>
<span class="term-cyan">443/tcp  open  ssl/https   nginx 1.18.0 (TLSv1.3 HSTS Enabled)</span>
<span class="term-amber">8080/tcp open  http-proxy  Burp Suite Enterprise Collaborator</span>
<span class="term-purple">8443/tcp open  custom-c2   DoH Listener (Active Encrypted Tunnel)</span>

<span class="term-green">Security Audit Assessment:</span> Target hardening verified. Zero unauthorized ports.
`,

    contact: `
<span class="term-bold term-green">[CONTACT CHANNELS]</span>
  • <span class="term-muted">Email:</span>    <a href="mailto:aakriti.4779@gmail.com" class="term-green">aakriti.4779@gmail.com</a>
  • <span class="term-muted">Phone:</span>    <a href="tel:+919877132112" class="term-green">+91 98771-32112</a>
  • <span class="term-muted">LinkedIn:</span> <a href="https://linkedin.com/in/aakriti-singh-0395602a3" target="_blank" class="term-cyan">linkedin.com/in/aakriti-singh-0395602a3</a>
  • <span class="term-muted">GitHub:</span>   <a href="https://github.com/aakriti17" target="_blank" class="term-cyan">github.com/aakriti17</a>
`
  };

  function appendOutput(cmd, responseHtml) {
    const cmdRow = document.createElement('div');
    cmdRow.className = 'command-output';
    cmdRow.innerHTML = `
      <div class="terminal-prompt-line">
        <span class="prompt-user">aakriti@secops</span><span class="prompt-symbol">:~$</span>
        <span>${escapeHtml(cmd)}</span>
      </div>
      <div>${responseHtml}</div>
    `;
    terminalBody.appendChild(cmdRow);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function handleCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    commandHistory.push(rawCmd);
    historyIndex = commandHistory.length;

    if (cmd === 'clear' || cmd === 'cls') {
      const children = Array.from(terminalBody.querySelectorAll('.command-output'));
      children.forEach(c => c.remove());
      return;
    }

    if (cmd === 'cat resume' || cmd === 'resume' || cmd === 'download resume') {
      window.open('assets/Aakriti_resume.pdf', '_blank');
      appendOutput(rawCmd, '<span class="term-green">📄 Opening Aakriti_resume.pdf in viewer...</span>');
      return;
    }

    if (cmd.startsWith('nmap')) {
      appendOutput(rawCmd, commands.nmap);
      return;
    }

    if (commands[cmd]) {
      appendOutput(rawCmd, commands[cmd]);
    } else {
      appendOutput(rawCmd, `<span class="term-red">Command not found: "${escapeHtml(rawCmd)}".</span> Type <span class="term-green">'help'</span> for available commands.`);
    }
  }

  terminalInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        terminalInput.value = '';
        handleCommand(cmd);
      }
    });
  });

  // Keep terminal focused when clicking inside terminal wrapper
  const wrapper = document.querySelector('.terminal-wrapper');
  if (wrapper) {
    wrapper.addEventListener('click', () => {
      terminalInput.focus();
    });
  }
})();
