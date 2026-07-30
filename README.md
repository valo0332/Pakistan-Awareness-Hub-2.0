<div align="center">

# 🇵🇰 Pakistan Awareness Hub

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

A modern, AI-powered public awareness platform engineered to educate citizens on road safety, disaster management protocols, emergency contacts, medical first aid, and critical public safety guidelines across Pakistan.

[🌍 My Website (Click Here)](https://pakistan-awareness-hub.bolt.host) 


• [🐛 Report Bug](https://github.com/MAnsar/pakistan-awareness-hub/issues) 


• [✨ Request Feature](https://github.com/MAnsar/pakistan-awareness-hub/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Development Workflow & Tools](#-development-workflow--tools)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Application Usage](#-application-usage)
- [System Screens Overview](#-system-screens-overview)
- [Roadmap & Future Improvements](#-roadmap--future-improvements)
- [Disclaimer](#-disclaimer)
- [License](#-license)
- [Author](#-author)

---

## 🚀 About The Project

**Pakistan Awareness Hub** is a centralized, digital repository and interactive learning ecosystem designed to address critical informational gaps in public safety. Built with a responsive, high-performance web architecture, the platform equips users with accurate Pakistani traffic regulations, standardized fine schedules, disaster preparation frameworks, emergency triage procedures, and real-time AI safety support.

---

## 🌟 Key Features

### 🤖 Intelligent Assistant
* **Contextual AI Chatbot:** Built-in conversational assistant capable of answering user inquiries regarding road laws, safety protocols, and emergency guidance.
* **Natural Language Processing:** Translates plain-language user queries into direct, actionable safety instructions.

### 🚦 Traffic Awareness Directory
* **Signage Categorization:** Comprehensive breakdowns of **Regulatory/Mandatory**, **Cautionary/Warning**, and **Informatory** traffic signs.
* **Granular Filtering:** Instant text search and dynamic category filtration for swift lookups.
* **Educational Metadata:** Clear explanations of legal implications, driver expectations, and sign design standards.

### 📋 Traffic Fine Codes
* **Official Schedule Reference:** Structured index tracking traffic violation codes, section references, and fine amounts.
* **Optimized Tabular Data:** Fully responsive data tables optimized for quick roadside or desktop lookup.

### 🧠 Interactive Traffic Quiz
* **Dynamic Question Bank:** Randomized testing modules drawing from official local driving rules.
* **Skill Tiers:** Multiple difficulty levels catering to novice drivers and experienced motorists alike.
* **Real-Time Analytics:** Immediate score tracking, progress visualization, performance badging, and integrated learning explanations.

### 🌪️ Disaster Preparedness Modules
* **Hazard Specific Guides:** Tailored response procedures for natural crises prevalent in the region (Earthquakes, Floods, Landslides, Heatwaves, and Urban Fires).
* **Preparedness Lifecycles:** Pre-crisis planning checklists, active crisis management steps, and post-crisis recovery protocols.

### 🩹 Medical First Aid Guides
* **Emergency Triage Support:** Step-by-step stabilization instructions for common trauma scenarios (bleeding, burns, fractures, choking, and CPR).
* **Actionable Layouts:** Clear, easy-to-read hierarchies designed for rapid comprehension under stress.

### 📞 Emergency Services Directory
* **One-Tap Access:** Quick-reference telephone numbers and direct hotlines for primary Pakistani emergency agencies (Rescue 1122, Police, Fire, Edhi, Highway Patrol).

---

## 🛠️ Technology Stack

* **Core Framework:** React 18 (Functional components, Hooks, Virtual DOM optimization)
* **Type System:** TypeScript (Strict typing for robust component safety and maintenance)
* **Styling Engine:** Tailwind CSS (Utility-first styling for responsive, modern UI design)
* **Build System:** Vite (Lightning-fast module bundling and Hot Module Replacement)
* **Iconography:** Lucide React (Clean, scalable vector UI icons)
* **AI Integration:** Google Gemini API (Conversational safety context engine)

---

## 🧰 Development Workflow & Tools

This application was conceptualized and engineered using a cutting-edge, AI-assisted development framework:

| Phase | Tool / Resource | Purpose |
| :--- | :--- | :--- |
| **Planning & Scoping** | ChatGPT & Gemini | Architectural mapping, feature definitions, and complex prompt engineering |
| **UI Prototyping** | Google Stitch | Wireframing initial layout concepts and visual exploration |
| **Implementation** | Bolt | Primary UI design scaffolding and rapid component development |
| **Data Research** | Government Portals | Data gathering for traffic laws, fine schedules, and safety guidelines |

---

## 📁 Project Architecture

```text
pakistan-awareness-hub/
├── public/                 # Static assets, vector badges, and favicons
├── src/
│   ├── components/         # Reusable structural components (Navigation, Modals, Footers)
│   ├── data/               # Structured local state datasets (Signs, Fines, Quizzes, First Aid)
│   ├── pages/              # Route-level view components
│   ├── services/           # External API integration clients (Gemini AI service)
│   ├── types/              # Global TypeScript interfaces and definitions
│   ├── App.tsx             # Root application component and view router
│   ├── main.tsx            # DOM mounting entry point
│   └── index.css           # Global Tailwind directives and custom utility styles
├── package.json            # Project manifest, dependencies, and build scripts
├── tsconfig.json           # Compiler configuration rules
└── vite.config.ts          # Bundler optimization settings
