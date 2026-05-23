# Long-Term Memory (MEMORY.md)

## Project Context
- **Project Name:** Kafaah Industrial Solutions (Multi-page Next.js web application).
- **Core Focus:** Commissioning, startup, troubleshooting, and optimization consultancy for inorganic chemical and fertilizer plants (H₂SO₄, H₃PO₄, K₂SO₄, NPK, MgSO₄, SSP).
- **Inspirations:** Modeled after `fertilizer.services` layout, messaging, and tone (independent, professional, engineering-first, "no hype" copy).

## Technical Preferences & Configurations
- **LLM / Chatbot Provider:** Switched from Google Gemini (`gemini-2.0-flash`) to Groq (`llama-3.3-70b-versatile`) as requested by the user.
- **Key Environment Variables:**
  - `GROQ_API_KEY`: Configured in `.env.local` to authenticate with Groq API.

## Recent Changes & Visual Updates (May 2026)
- **High-Contrast Glassmorphism Upgrade (Cards & Form)**:
  - Addressed contrast issues on the dark navy backdrop by increasing the background and border opacity of cards across all homepage sections:
    - **Contact Form Card (`ContactCTA.tsx`)**: Darkened background to `bg-navy-card/45 backdrop-blur-xl border-white/[0.12]` and enhanced hover states to `group-hover:border-gold/35 group-hover:bg-navy-card-hover/60`.
      - **Watermark & Spacing**: Resolved the clipping issue of the background watermark "Kafaah" by increasing the section's padding to `pt-28 pb-40` and shifting the watermark down to `-bottom-24`. Switched the watermark font to the premium, professional `DM Sans` (`var(--font-body)`) with `font-medium` weight and elegant `tracking-[0.25em]` uppercase styling.
    - **Service Cards (`Services.tsx`)**: Upgraded to `bg-navy-card/40 backdrop-blur-md border-white/[0.12]`.
    - **Pillars / Why Kafaah Cards (`WhyKafaah.tsx`, `FounderBio.tsx`)**: Darkened to `bg-navy-card/40` and `bg-navy-card/45` respectively with `border-white/[0.12]`.
    - **Track Record & Technologies Section (`TrackRecord.tsx`, `Technologies.tsx`)**: Upgraded to `bg-navy-card/40 backdrop-blur-md border-white/[0.12]`.
    - **Problem/Challenge Cards (`Problem.tsx`)**: Upgraded to `bg-navy-card/40 backdrop-blur-md border-white/[0.12]`.
  - Implemented dynamic hover states for cards: elevation (`hover:-translate-y-1.5`), fine gold glow border (`hover:border-gold/35 hover:bg-navy-card-hover/55`), and warm gold shadows (`hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)]`).
  - Added an interactive vertical gold accent bar on service cards: expands and brightens on hover (`top-6 bottom-6 group-hover:top-4 group-hover:bottom-4 transition-all duration-500`).
  - Upgraded bottom badges on the contact form into gold capsule tags with customized padding and hover backgrounds matching active project tags.
  - Styled `CustomSelect` dropdown menus with high-blur z-50 glass panels for improved elegance and readability.
- **Founder Brand Update**:
  - Replaced founder name globally inside `i18n.ts` translation dictionary from "Karim Hisham" to "Eng. Mostafa Abdel Ghaffar" (م. مصطفى عبد الغفار / 莫斯塔法·阿卜杜勒·加法尔 工程师) across English, Arabic, and Chinese locales.
  - Updated the biography photo path in `FounderBio.tsx` to point directly to the user-uploaded high-fidelity asset `/FOUNDER & MANAGING DIRECTOR.webp`.
  - Fixed mobile layout alignment in `FounderBio.tsx` by setting founder details container to `self-start` instead of `self-center` so that the photo, name, role, quote, and bio are all vertically aligned on mobile screens.
- **Footer Visual & Translation Upgrades (May 2026)**:
  - Translated all sub-headings and entries dynamically: mapped service categories using `footer.forOwners[locale]`, `footer.sharedServices[locale]`, and `footer.forEpc[locale]`, and translated specific service and technology names using central i18n dictionaries.
  - Redesigned the long vertical technology links list into a compact, responsive grid (`grid grid-cols-2 md:grid-cols-1`) to dramatically reduce vertical scrolling on mobile views.
  - Upgraded technology buttons with premium high-contrast glassmorphism styling (`bg-navy-card/40 backdrop-blur-md border-white/[0.12]`) and hover effects (`hover:border-gold/35 hover:bg-navy-card-hover/55 hover:-translate-y-0.5`).
  - Added subtle hover enhancements to social media icons (WhatsApp, LinkedIn, Twitter) with customized colors, micro-animations (`hover:-translate-y-1 hover:scale-105`), shadow, and high-blur backdrops.
- **Multilingual Services Page Implementation (May 2026)**:
  - Created a new fully responsive and localized Services page under `/services`.
  - Added comprehensive translation dictionaries in `src/lib/i18n.ts` supporting English, Arabic, and Chinese locales for the hero text, project lifecycle, founder quotes, staffing categories, and closing CTAs.
  - Implemented the client-side rendering shell `ServicesClient.tsx` matching the brand's premium dark/navy/gold glassmorphism design:
    - **Interactive Project Lifecycle Timeline**: Replaced static SVGs with a dynamic, translatable HTML/CSS timeline utilizing relative positioning, custom vertical text rotation (`[writing-mode:vertical-lr]`), RTL-sensitive directions, and hover-triggered glowing bullet points.
    - **Phase-by-Phase Services Grid**: Created interactive card groups for the 4 project phases, with high-contrast borders (`border-white/[0.08]`), audience labels (Owner, EPC, Both), hover elevation, gold border glows, and clickable internal links leading to individual service sub-pages (`/services/[slug]`).
    - **Founder Biography Section**: Integrated a mini founder quote block with official image (`/FOUNDER & MANAGING DIRECTOR.webp`) and grayscale hover transitions.
    - **"How We Staff" Process Grid**: Showcased staffing categories with a stagger animated border highlighting.
    - **Production Build Integration**: Successfully compiled all routes, including static generation (SSG) for 11 dynamic paths (`/services/[slug]`) and automatic XML sitemap verification via `next-sitemap`.
- **Multilingual "Who We Are" Page Redesign (May 2026)**:
  - Created a new fully responsive and localized Who We Are page under `/who-we-are` using the exact layout style and premium dark/navy/gold glassmorphism of the services page.
  - Added comprehensive translation dictionaries in `src/lib/i18n.ts` supporting English, Arabic, and Chinese locales for the hero text, founder biography, statistics, core pillars, conflict policy, domain processes, and closing CTAs.
  - Implemented the client-side rendering shell `WhoWeAreClient.tsx`:
    - **Hero Section**: Responsive split layout with letters hover scaling (`HoverWords` & `HoverSubcopy`), a quote highlighting the Arabic meaning of "Competence" (كفاءة), and a structured sidebar showing the founder's photo `/FOUNDER & MANAGING DIRECTOR.webp` and process technologies.
    - **Founder Section**: Showcases Eng. Mostafa Abdel Ghaffar's hands-on profile, processes quote, bio, and a responsive grid of 4 stats cards with custom border glows on hover.
    - Core Pillars (What Makes Us Different): Interactive grid of 4 cards detailing structural independence, operational background, chemical specialization, and documented results with left glowing border indicator highlights.
    - How We Work (Independence & Conflict Policy): Dedicated split section demonstrating zero conflicts of interest with styled card capsules for project owners and EPC contractors.
    - Our Domain (Inorganic Processes): Interactive grid of 6 inorganic chemical process cards (H₂SO₄, H₃PO₄, K₂SO₄, NPK, MgSO₄, SSP) with formula headers and dynamic process icons.
    - CTA Section: Styled CTA with circular gold glow gradient and interactive buttons with animated light sweeps.
  - Simplified the server entry point `src/app/who-we-are/page.tsx` to delegating entire rendering structure to `WhoWeAreClient` for seamless scroll/header overlay integration.
- **Technologies Page, Unified Mega Menu & Visual Refinements (May 2026)**:
  - Created a high-fidelity, photorealistic Technologies page (`/technologies`) showcasing the 6 core industrial plants (`H₂SO₄`, `H₃PO₄`, `K₂SO₄`, `NPK`, `MgSO₄`, `SSP`) with responsive WebP image assets and fallback support.
  - Re-engineered the Services mega menu in `Navbar.tsx` into a unified, category-free 2-column grid with a wider footprint (`w-[820px]`) to ensure all service labels fit perfectly on single lines.
  - Refined dropdown font styling across Technologies and Services dropdowns, decreasing font size slightly from `text-[11.5px]` to `text-[10.5px]` and subtext size to `text-[9.5px]` to maximize premium layout density and design appeal.
