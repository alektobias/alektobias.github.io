# Wireframe Descriptions & Design System

This document provides a detailed blueprint for the portfolio, focusing on a premium, developer-centric aesthetic with high-performance interactions.

---

## 🎨 Visual Design Language
- **Theme**: **Deep Cyber-Violet** (Dark Navy/Black base) with **Neon Purple & Ultra-Violet** primary accents.
- **Aesthetics**: **Advanced Glassmorphism** (multi-layer translucency, "frosted" depth), **Holographic** finishes, and **Neon** inner-glow borders.
- **Micro-Animations**: **Magnetic** button pulls, **Shimmer** effects, **Pulse** attention-grabbers, and **Ripple** click feedback.

---

## 1. Home Page (`/`) - "The Complete Narrative"

**Navigation**: Sticky Top Bar (Logo, Home, Projects, Blog, Contact)

### Section 1: Presentation Hero - "The Card"
- **Layout**: Full-screen (100vh) split-screen presentation card.
- **Right Column**: 
  - **Visual**: Almost full-body professional photo of Alek Tobias.
  - **Animation**: Slips in from below with a smooth gradient mask/fade-in.
- **Left Column**:
  - **Line 1**: "Hi, I'm Alek Tobias" in prominent, premium typography.
  - **Line 2**: Dynamic, animated text flipping through roles (e.g., "Senior Full Stack Developer", "Solutions Architect", "Critical Thinker").
  - **Line 3**: Compact, rapid-access contact widget with icons for GitHub, LinkedIn, Email, and a CV download button.
- **Overlay Layer**:
  - **Tech Stack Carousel**: A sleek, horizontal marquee of tech icons (from hard skills) that passes through both columns and overlays the photo.
- **Bottom CTA**:
  - **Scroll Prompt**: A subtle, smooth animation (e.g., "Know more") inviting the user to scroll down.

### Section 2: My Journey (The Story) - "Beyond Syntax"
- **Layout**: Zig-zag / Alternating layout. Each text block takes **70% width** and sits on opposite sides (Left -> Right -> Left).
- **Visuals**: Large, subtle outline icons emerging from the background behind each paragraph (Pattern-like).
- **Themes**:
  1.  **On the Mat (Jiu-Jitsu/MMA)**: *Icon: Gi or Fist*. Focus on resilience and keeping calm under pressure (production bugs = hard fights). "It's about leverage: using the right tool for the problem."
  2.  **In the Garden & Kitchen**: *Icon: Leaf or Knife*. Focus on patience and sustainability. "Good code, like agriculture, needs constant nutrition and clean soil to scale."
  3.  **The Puzzles (Rubik's Cube)**: *Icon: Cube Grid*. Focus on pattern recognition. "Database architecture is my favorite puzzle."

### Section 3: Blog Post Showcase
- **Header**: "Latest Writing".
- **Content**: 
  - 3 most recent articles (Cards with Title, Date, Tag).
  - Terminal-style or Glassmorphism cards.
- **CTA**: "Read all articles ->" (Link to `/blog`).

### Section 4: My Skill Sets
- **Layout**: Two-column layout.
- **Left Column**: Descriptive text focusing on **Soft Skills** (Leadership, Mentoring, Communication, Problem Solving under pressure).
- **Right Column**: A "Rolldown" (Accordion or interactive list) of **Hard Skills** categorized by domain (Mobile, Web, Backend, Tools).
- **Interaction**: Clicking a category in the rolldown expands to show specific technologies and proficiency icons.

### Section 5: Projects Showcase
- **Header**: "Selected Work".
- **Content**: 
  - 3-4 Key Projects (e.g., Social Ranking App).
  - Large, high-quality visuals (videos/screenshots).
  - Hover effects showing tech stack.
- **CTA**: "View Full Project Archive ->" (Link to `/projects`).

### Section 6: Experience & Education Timeline
- **Layout**: Vertical timeline with pulsating nodes.
- **Content**: 
  - **Nodes**: Mixed Professional Roles and Educational Milestones (Reverse Chronological).
  - **Category Indicators**: Subtle icons or tags to distinguish between **Work** (Suitcase icon) and **Education** (Graduation cap icon).
  - **Details**: 
    - **Work**: Role, Company, and key achievements (e.g., "Led Expo SDK 54 Migration").
    - **Education**: Course name, Institution, and Graduation/Completion date.

### Section 7: Contact Form - "The Connection"
- **Layout**: Two-column responsive layout.
- **Left Column**: 
  - **Catching Phrase**: High-impact typography: "Let's turn coffee into **high-performance code**." or "Building the future, one puzzle at a time."
  - **Remarkable Visual**: A subtle, interactive 3D abstract shape or a glowing CSS-animated "A-T" monogram that responds to cursor movement.
  - **Social Links**: Large, aesthetic social icons (GitHub, LinkedIn, X/Twitter) aligned to the phrase's flow.
- **Right Column**: 
  - **Form**: Modern, minimalist inputs for Name, Email, and Message.
  - **Interaction**: Sleek validation animations and a "Send" button that triggers a subtle visual confirmation.

### Section 8: Footer
- **Content**: Copyright, "Built with Astro & React", Social Icons.

---

## 2. Projects Listing (`/projects`) - "The Lab"
- **Header**: "Experiments & Production Apps".
- **Dynamic Filters**:
  - Tabs: `All`, `Mobile`, `Web`, `Open Source`.
- **Project Grid (Masonry or Bento)**:
  - Each card features a high-res screenshot/video loop on hover.
  - Tags for technical highlights (e.g., `Shared Element Transitions`, `Zustand State`).

---

## 4. Project Detail (`/projects/[slug]`) - "The Deep Dive"
- **Hero Area**:
  - Video demo embedded in a clean phone frame (iOS/Android togglable).
- **Technical Brief**:
  - **The Challenge**: Why this project was built (e.g., "Designing a 3-state gesture drawer for a social feed").
  - **The Solution**: Deep dive into architecture (e.g., "Using Reanimated 3 for 60fps gesture handling").
- **Interactive Code Blocks**: 
  - Snippets of the core logic (e.g., `handleLeaveGroup` logic from the recent task) with syntax highlighting.
- **Gallery**: 
  - Screenshots of edge cases (e.g., fixed system bar padding, dark mode variants).

---

## 5. Blog (`/blog`) - "The Knowledge Base"
- **Header**: "Writing & Documentation".
- **Search & Sort**: 
  - Real-time search with "Type to filter" UX.
- **Article Cards**:
  - Focus on technical readability. Each card shows `cover image`, `Topic`, `Read Time` and `Tags`.

---

## 6. Blog Post Detail (`/blog/[slug]`)
- **Reading Experience**:
  - Centered single column, large readable font (18px-20px).
  - **Table of Contents**: Floats on the right (desktop) or sticky mini-menu (mobile).
  - **Interactive Sandboxes**: Embedded code previews or links to Expo Snacks.
- **Call to Action**: 
  - "Found this helpful? Let's discuss on X/LinkedIn."

---

## 7. Contact (`/contact`) - "The Link"
- **Minimalist Form**: 
  - Smooth label animations.
  - "Message Sent" feedback triggers a subtle haptic-like visual pulse.
- **Global Connections**: 
  - Large, high-contrast links to GitHub, LinkedIn, and email.
