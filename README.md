
HOMIES STUDIO
Website Master Prompt Document
Complete section-by-section build specification for the dev / AI tool


	Stack:       React + Vite + TypeScript + Tailwind CSS + shadcn/ui
Animations:  Framer Motion  +  GSAP  +  Three.js (crew section)
Theme:       Light — clean, minimal, white-first with sharp dark accents
Nav:         Vertical right-side fixed navbar
Unique:      Gen-Z tone, uncommon layouts, mixed animations throughout

Sections covered in this document:

1.  Global Setup & Design System
2.  Vertical Right Navbar
3.  Hero Section  (placeholder — your prompt goes here)
4.  Services Section
5.  Process / How We Work
6.  Projects / Work Section
7.  Crew / Team Section (Three.js + popup)
8.  About Section
9.  Pricing Section
10. Contact Section
11. Global Animations Reference
12. Copy & Placeholder Content

Paste each section's prompt into your AI tool or give to your developer.
 

1. GLOBAL SETUP & DESIGN SYSTEM
Fonts, colors, tokens, cursor — apply to entire site

Design Tokens
	Primary Background:   #FFFFFF  (pure white)
Surface / Card:       #F9F9F9  (off-white)
Border:               #E5E5E5  (light gray)
Text Primary:         #0A0A0A  (near black)
Text Secondary:       #6B6B6B  (mid gray)
Accent:               #111111  (black — used for CTAs, highlights)
Accent 2:             #2563EB  (electric blue — hover states, links)
Accent 3:             #10B981  (emerald — success, active states)
Error:                #EF4444

Typography
Use	Font	Weight	Notes
Display / Hero	Syne	800	Install via Google Fonts
Headings	DM Sans	600–700	Clean, modern
Body	DM Sans	400–500	Readable at small sizes
Monospace / Tags	JetBrains Mono	400	Used for labels, code, tags
Accent / Italic	Playfair Display	400i	Occasional use for contrast

@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono&family=Playfair+Display:ital@1&display=swap');

Tailwind Config Extensions
extend: { fontFamily: { display: ['Syne'], body: ['DM Sans'], mono: ['JetBrains Mono'], accent: ['Playfair Display'] }, colors: { accent: '#2563EB', emerald: '#10B981' }, borderRadius: { '4xl': '2rem', '5xl': '3rem' } }

Custom Cursor (Global)
	Implement a custom cursor that replaces the default OS cursor site-wide.
Cursor shape: small filled circle (8px), color #0A0A0A.
On hover over any interactive element (button, link, card): cursor expands to 40px circle
  with border only (no fill), with a mix-blend-mode: difference effect.
Cursor follows with a slight lag using GSAP quickTo for smooth trailing.
Cursor scales to 0 when mouse leaves the window.
Implementation: create a <CustomCursor /> React component, render in App.tsx root.

Page Layout Shell
	Layout: full-width, no max-width container on outer shell.
Content areas: max-w-[1200px] mx-auto px-6 md:px-12.
Right vertical navbar is fixed, overlays content (z-50).
Main content area has padding-right: 80px to avoid navbar overlap on desktop.
Smooth scroll: html { scroll-behavior: smooth; } — override with GSAP ScrollTrigger.
Page transitions: Framer Motion AnimatePresence wrapping each route.
 

2. VERTICAL RIGHT-SIDE NAVBAR
Fixed, vertical, right edge of screen — unique layout signature

Layout & Positioning
	Position: fixed, right: 0, top: 0, height: 100vh, width: 72px.
Background: rgba(255,255,255,0.85) with backdrop-filter: blur(12px).
Left border: 1px solid #E5E5E5.
z-index: 50.
On mobile (< 768px): collapses to a hamburger icon at top-right.
  Hamburger opens a full-screen overlay menu from the right.

Nav Items Layout
	Nav links are rotated 90deg and stacked vertically in the center of the bar.
transform: rotate(-90deg) on each nav item text.
Items: Services · Work · Crew · About · Pricing · Contact
Active item: bold, color #0A0A0A, with a small dot indicator (4px circle) beside it.
Inactive items: color #9CA3AF.
Hover: color transitions to #2563EB with a 200ms ease.

Logo Placement
	Logo sits at the BOTTOM of the navbar, also rotated.
Text logo: 'HS' in Syne font, weight 800, color #0A0A0A.
On hover: 'HS' glitches — text-scramble effect cycling random chars → back to 'HS'.

Prompt to give AI / Dev
	Build a fixed vertical right-side navbar for a React + Tailwind + Framer Motion site.
Width: 72px. Height: 100vh. Fixed right:0 top:0. Backdrop blur background.
Nav links rotated -90deg, stacked vertically in center: Services, Work, Crew, About, Pricing, Contact.
Active state: bold + 4px dot. Hover: color to #2563EB with smooth transition.
Logo 'HS' (Syne 800) at bottom rotated. On hover: GSAP text scramble glitch effect.
Mobile: hamburger icon top-right, opens full-screen slide-in overlay from right.
Framer Motion variants for overlay open/close with staggered link reveals.
On scroll: track active section via IntersectionObserver and update active nav item.
 

3. HERO SECTION
You already have this prompt — placeholder here for reference

	You already have the Hero Section prompt.
Paste your existing hero prompt here when assembling the full master prompt.
Ensure the hero section exports a <HeroSection /> component.
Hero should fill 100vh and connect seamlessly into the Services section below it.
After hero, add a subtle scroll indicator: animated down-arrow or scroll text.

Hero → Services Transition
	Add a transition divider between Hero and Services.
Use a thin horizontal line that draws itself (SVG stroke animation) on scroll entry.
Below the line: small label in JetBrains Mono — '// what we build' — fades in.
 

4. SERVICES SECTION
What Homies Studio builds — card grid with hover animations

Layout
	Section ID: #services
Full-width section, white background.
Top label (JetBrains Mono, small): '01 / services'
Section heading (Syne 800, large): 'We Build Things That Work.'
Subheading (DM Sans): 'From a microcontroller to a full AI system — end to end.'
Below heading: 8-card grid — 4 columns on desktop, 2 on tablet, 1 on mobile.

Service Cards
	Each card: white background, 1px border #E5E5E5, border-radius 1.5rem, padding 2rem.
Card contains: Icon (top left) + Service name (heading) + 1-line description + tag list.
Icon: custom minimal line icon — NOT emoji. Use lucide-react icons.
HOVER EFFECT (card tilt): on mouse move over card, apply CSS perspective transform.
  Use vanilla JS mousemove listener: rotateX and rotateY up to ±8deg based on cursor pos.
  Add subtle box-shadow that shifts with tilt direction.
  Smooth reset on mouseleave with transition: transform 0.4s ease.
HOVER EFFECT (content): on hover, card border color transitions to #2563EB.
  Service name underlines with a sliding underline animation.
SCROLL ENTRY: cards stagger-reveal using Framer Motion (delay: index * 0.08s).
  Each card: y: 40px → y: 0, opacity: 0 → 1.

Service Cards Content (8 cards)
#	Icon (lucide)	Service Name	Description	Tags
1	Cpu	IoT & Embedded	Smart devices that sense, think and act.	Arduino · RPi · ESP32 · ARM
2	Bot	Robotics & Drones	Machines that move and react to the world.	ROS · UAV · Servo · Sensors
3	Radio	Communication Systems	Connect anything, anywhere.	GSM · GPS · RF · Zigbee · BT
4	CircuitBoard	FPGA & VLSI	Hardware logic, designed from the ground up.	Verilog · VHDL · Synthesis
5	BarChart2	MATLAB & Simulation	Model it before you build it.	Simulink · Control · DSP
6	Code2	Web & Software Dev	Interfaces and systems that users love.	React · Node · Python · APIs
7	Brain	AI / ML & Vision	Models that see, predict and automate.	TF · PyTorch · OpenCV · YOLO
8	Zap	Electrical & Digital	Circuits, PCBs and digital systems.	PCB · Digital Logic · Power

Prompt to give AI / Dev
	Build a Services section (id='services') for Homies Studio website.
Stack: React + Tailwind + Framer Motion.
Section header: small mono label '01 / services', large Syne heading 'We Build Things That Work.',
  DM Sans subheading: 'From a microcontroller to a full AI system — end to end.'
8 service cards in a responsive grid (4 cols desktop / 2 tablet / 1 mobile).
Each card: white bg, 1px border, 1.5rem radius, lucide icon, name, 1-line desc, tag chips.
Card hover: 3D tilt effect (mousemove rotateX/Y ±8deg, shadow shift), border→#2563EB,
  sliding underline on name. Reset on mouseleave.
Scroll entry: Framer Motion stagger reveal (y:40→0, opacity:0→1, delay: i*0.08s).
Use the 8 cards defined in the spec table.
 

5. PROCESS / HOW WE WORK
Step-by-step horizontal timeline with scroll-triggered animations

Layout
	Section ID: #process
Background: #F9F9F9 (off-white) — contrasts with white sections around it.
Top label: '02 / process'
Heading: 'From Idea to Delivered.' (Syne 800)
Subheading: 'No ghost clients. No broken promises. Just a clean process.'
Layout: Horizontal scrolling timeline on desktop. Vertical stacked on mobile.

Timeline Steps
Step	Icon	Title	Description
01	MessageSquare	You Reach Out	Tell us what you need. WhatsApp, email, DM — whatever works for you.
02	FileSearch	We Scope It	We break your idea into a clear deliverables list, timeline, and price.
03	PenLine	Contract Signed	Simple 1-page agreement. Advance payment. Then we start — no delays.
04	Hammer	We Build	Your assigned team builds it. You get updates every few days.
05	FlaskConical	Test & Review	Internal QA first. Then we demo it to you. Revisions included.
06	PackageCheck	Delivered	All files, code, and docs handed over. Done. Clean.

Animation — Horizontal Timeline
	Desktop: Steps laid out horizontally. A connecting line runs through all steps.
On scroll (GSAP ScrollTrigger): the connecting line draws itself left→right as user scrolls.
Each step card fades + slides up (y:30→0) as the line reaches it.
Step number: large, light gray (opacity 0.08) background number — decorative.
Active step (when line reaches it): step number highlight pulses once (scale 1→1.1→1).
Mobile: vertical timeline. Line draws top→bottom on scroll.

Prompt to give AI / Dev
	Build a Process section (id='process') for Homies Studio. Bg: #F9F9F9.
Header: mono label '02 / process', Syne heading 'From Idea to Delivered.',
  subheading: 'No ghost clients. No broken promises. Just a clean process.'
6 steps in a horizontal timeline (desktop) / vertical (mobile).
Each step: step number (large decorative bg), lucide icon, title, 1-line description.
GSAP ScrollTrigger: connecting line draws itself as user scrolls through section.
Each step reveals (y:30→0, opacity:0→1) as line reaches it. Active step number pulses.
Steps: Reach Out → Scope It → Contract Signed → Build → Test & Review → Delivered.
 

6. PROJECTS / WORK SECTION
Portfolio showcase — placeholders for your real projects

Layout
	Section ID: #work
Background: white.
Top label: '03 / work'
Heading: 'Stuff We've Actually Built.' (Syne 800)
Filter tabs: All · IoT · Robotics · AI/ML · Web · FPGA · Communication
  Tabs styled as pill buttons. Active: black bg, white text. Inactive: white bg, border.
  Framer Motion layout animation on tab switch — cards rearrange smoothly.
Project grid: masonry-style, 3 cols desktop / 2 tablet / 1 mobile.

Project Card Design
	Each card: full image top (16:9 ratio, placeholder gradient), content bottom.
Image area: on hover, image scales to 1.05 with overflow hidden. Smooth 0.4s ease.
Over image on hover: a dark overlay fades in with 2 buttons — 'View Details' + 'Category tag'.
Content area: Project title (DM Sans 600) + 1-line description + tech tags (mono small).
Card border: none. Bottom border only: 2px solid #E5E5E5.
SCROLL ENTRY: Framer Motion — stagger by column. Odd cols go y:-30, even cols go y:+30.
On filter tab switch: Framer Motion AnimatePresence for card exit/enter.

Project Placeholders (add your real projects here)
#	Title	Category	Tech Tags	Description (1 line)
1	[Your Project Name]	IoT	[Tech stack]	[What it does in one line]
2	[Your Project Name]	Robotics	[Tech stack]	[What it does in one line]
3	[Your Project Name]	AI/ML	[Tech stack]	[What it does in one line]
4	[Your Project Name]	Web	[Tech stack]	[What it does in one line]
5	[Your Project Name]	FPGA	[Tech stack]	[What it does in one line]
6	[Your Project Name]	Communication	[Tech stack]	[What it does in one line]

	Replace each [placeholder] row with your real project data.
Image: use a real screenshot or a themed gradient placeholder (e.g., IoT = blue-green gradient).
Add as many cards as you have projects — layout is fluid.

Prompt to give AI / Dev
	Build a Projects section (id='work') for Homies Studio. Bg: white.
Header: mono '03 / work', Syne heading 'Stuff We've Actually Built.'
Filter pill tabs: All / IoT / Robotics / AI-ML / Web / FPGA / Communication.
  Active tab: black bg white text. Framer Motion layout animation on switch.
Masonry-style grid (3 cols desktop / 2 tablet / 1 mobile).
Each card: 16:9 image top (placeholder gradient per category) + title + desc + tech tags.
Image hover: scale 1.05 + dark overlay with 'View Details' button fades in.
Scroll entry: alternate stagger direction by column (odd cols y:-30, even cols y:+30).
AnimatePresence on filter switch for smooth card exit/enter.
Use placeholder data — client will replace with real projects.
 

7. CREW / TEAM SECTION
Three.js 3D illustrated avatars + click popup with member details

Layout
	Section ID: #crew
Background: #0A0A0A (dark — this section breaks the light theme intentionally).
Text on dark: white, grays.
Top label (mono, teal): '04 / crew'
Heading (Syne 800, white): 'The Homies.'
Subheading (DM Sans, gray): 'Small team. High output. Everyone pulls weight.'
Layout: Crew cards in a row — 4 max desktop / 2 tablet / 1 mobile.
Each card = a Three.js canvas rendering a 3D illustrated avatar.

Three.js 3D Avatar Cards
	Each crew member gets a <CrewCard /> component that renders a Three.js canvas.
Avatar style: low-poly 3D character — abstract humanoid, not realistic.
Each avatar has a unique color scheme matching their role:
  → Lead Engineer: navy + electric blue
  → Developer: emerald + white
  → Designer / Other: gold + warm white
Avatar geometry: build from Three.js primitives (SphereGeometry for head,
  BoxGeometry for body, CylinderGeometry for neck, etc.).
Ambient + directional light. OrbitControls disabled — avatar auto-rotates slowly (y-axis).
On hover over card: avatar rotation speeds up + slight bounce (scale pulse).
Canvas size: 280px × 320px per card.

Card Content (below canvas)
	Below each Three.js canvas:
  → Name: DM Sans 600, white
  → Role: JetBrains Mono, small, teal color
  → Skill tags: 2–3 pill tags, dark gray bg, white text
  → 'View Profile' link — underline hover animation
Card background: #1A1A1A. Border: 1px solid #2A2A2A. Border-radius: 1.5rem.
Hover: border color transitions to teal (#10B981).

Popup / Modal on Click
	Clicking a crew card (or 'View Profile') opens a full-screen modal overlay.
Overlay: rgba(0,0,0,0.85) backdrop. Framer Motion: opacity 0→1.
Modal panel: slides in from the right. Width: 480px. Bg: #111111.
Modal content:
  → Large version of the 3D avatar (full canvas, 320px × 400px) — still auto-rotating
  → Name (Syne 700, large, white)
  → Role (mono, teal)
  → Short bio: 2–3 sentences about what they do (placeholder text)
  → Skills list: pill tags with icons
  → Experience / Projects count: animated number counter on modal open
  → Social links (GitHub, LinkedIn) — icon buttons
  → Close button (X) top-right — Framer Motion scale animation
ESC key closes modal. Click outside panel closes modal.

Crew Member Placeholders
#	Name	Role	Skills	Bio (placeholder)
1	[Name]	[Role]	[Skill1 · Skill2 · Skill3]	Add this person's 2-line bio here.
2	[Name]	[Role]	[Skill1 · Skill2 · Skill3]	Add this person's 2-line bio here.
3	[Name]	[Role]	[Skill1 · Skill2 · Skill3]	Add this person's 2-line bio here.
4	[Name]	[Role]	[Skill1 · Skill2 · Skill3]	Add this person's 2-line bio here.

	Replace placeholders with real team member names, roles, skills and bios.
For skills: use the Skill Matrix from your Team Agreement spreadsheet.

Prompt to give AI / Dev
	Build a Crew section (id='crew') for Homies Studio. Dark bg: #0A0A0A.
Header: mono teal label '04 / crew', Syne heading 'The Homies.', DM Sans subheading.
4 crew cards in a row (responsive). Each card has a Three.js canvas (280x320).
Three.js avatar: low-poly humanoid from primitives (Sphere head, Box body, Cylinder neck).
Each avatar unique color scheme. Auto-rotates on y-axis. Speeds up + pulse on hover.
Below canvas: name (white DM Sans 600), role (mono teal), 2–3 skill tags, 'View Profile'.
Card: #1A1A1A bg, 1px #2A2A2A border, hover border→teal, border-radius 1.5rem.
On card click: Framer Motion modal slides in from right (480px panel, dark bg).
Modal: large avatar canvas still rotating, name, role, bio, skills, number counters,
  social links, close button. ESC + outside click closes.
Use placeholder data — client fills in real team details.
 

8. ABOUT SECTION
Studio story, values, and stats — editorial layout

Layout
	Section ID: #about
Background: white.
Top label: '05 / about'
Asymmetric two-column layout:
  Left col (wider): large heading + body text + CTA
  Right col (narrower): stat counters + floating visual element
The heading breaks across 2 lines with the second line in italic Playfair Display
  for typographic contrast. Example:
  'Built by engineers who' (Syne 800)
  'actually give a damn.' (Playfair Display italic)

Body Copy
	Paragraph 1:
Homies Studio is a remote team of engineers, developers, and makers.
We don't take on projects we can't deliver. We don't disappear mid-project.
We don't pad timelines. We just build what we said we would, when we said we would.

Paragraph 2:
Students, colleges, startups — if you have a technical problem,
we probably know how to solve it. And if we don't, we'll tell you upfront.

CTA Button: 'Start a Project →' — magnetic button effect (see Animations section).

Stat Counters (right column)
	4 stats displayed as large animated numbers:
  → [X]+   Projects Delivered
  → [X]+   Happy Clients
  → [X]+   Tech Domains
  → [X]    Team Members
Replace [X] with your real numbers.
Animation: GSAP CountTo — numbers count up from 0 when section enters viewport.
Each stat: large number (Syne 800, black), label below (DM Sans, gray).
Stagger: each counter starts 0.15s after the previous one.

Floating Visual Element
	A decorative floating card in the right column.
Shows a grid of tech category icons (lucide) with a subtle rotation animation.
Card: white bg, soft shadow, slight tilt (rotate(-3deg)).
On scroll entry: Framer Motion — card floats in from bottom-right with spring physics.
Parallax: card moves at 0.3x scroll speed vs rest of section (GSAP ScrollTrigger).

Prompt to give AI / Dev
	Build an About section (id='about') for Homies Studio. Bg: white.
Header: mono '05 / about'.
Asymmetric 2-col layout. Left: heading (Syne 800 line 1 + Playfair italic line 2) + body + CTA.
Right: 4 stat counters (GSAP countUp on scroll entry, stagger 0.15s) + floating card.
Heading text: 'Built by engineers who' / 'actually give a damn.'
Body: 2 short paragraphs about the studio (see copy above).
CTA: 'Start a Project →' with magnetic hover effect.
Stat values: replace [X] with real numbers. Labels: Projects / Clients / Domains / Team.
Floating card: lucide icon grid, rotate(-3deg), Framer Motion spring entry, GSAP parallax 0.3x.
 

9. PRICING SECTION
Transparent, range-based pricing — student to business

Layout
	Section ID: #pricing
Background: #F9F9F9.
Top label: '06 / pricing'
Heading: 'Priced for Every Budget.' (Syne 800)
Subheading: 'From student projects to startup systems. No hidden charges.'
Layout: 3 tier cards side by side — Student / College & Institutional / Business.
The middle card (College) is slightly elevated and has a highlight border — 'Most Popular'.

Pricing Tier Cards
Tier	Label	Price Range	Best For	Key Inclusions
Student	For students	₹2,000 – ₹15,000	Final year & academic projects	Working project + code + docs + 2 revisions
College / Inst	Most Popular	₹8,000 – ₹40,000	College depts & research labs	All above + demo video + tech support
Business	For startups & firms	₹20,000 – ₹1,00,000+	Startups and businesses	Full delivery + NDA + source files + handover

Card Design & Animations
	Card: white bg, 1px border, 2rem radius. Padding: 2.5rem.
Middle (College) card: border: 2px solid #0A0A0A. Slightly larger scale (1.02). Badge: 'Most Popular'.
HOVER: card lifts — translateY(-8px), shadow deepens. Transition: 0.3s ease.
Price range: Syne 700, large, black.
Inclusions: checkmark list (lucide Check icon, teal).
CTA per card: 'Get a Quote' button — links to #contact.
SCROLL ENTRY: 3 cards stagger in from bottom (Framer Motion, delay: i*0.1s).
Below cards: small note in mono — '* All prices are estimates. Final quote after scoping call.'

Prompt to give AI / Dev
	Build a Pricing section (id='pricing') for Homies Studio. Bg: #F9F9F9.
Header: mono '06 / pricing', heading 'Priced for Every Budget.', subheading.
3 tier cards: Student (₹2k–15k) / College (₹8k–40k, highlighted) / Business (₹20k–1L+).
Middle card: 2px black border, scale 1.02, 'Most Popular' badge.
Card hover: translateY(-8px) + shadow deepens. Framer Motion stagger entry.
Each card: tier label, price range (Syne 700 large), best-for subtitle, checklist with teal icons, 'Get a Quote' CTA.
Footer note: mono small — '* All prices are estimates. Final quote after scoping call.'
 

10. CONTACT SECTION
Get in touch — minimal form + direct channels

Layout
	Section ID: #contact
Background: #0A0A0A (dark — matching Crew section, bookends the page).
Top label (mono, teal): '07 / contact'
Heading (Syne 800, white): 'Let's Build Something.'
Subheading (gray): 'Drop a message. We reply within 24 hours.'
Two-column: Left = contact form. Right = direct contact info + social links.

Contact Form
	Fields: Name · Email · Project Type (dropdown) · Budget Range (dropdown) · Message.
Project Type dropdown: IoT / Robotics / AI-ML / Web / FPGA / Communication / Other.
Budget dropdown: Under ₹5k / ₹5k–20k / ₹20k–1L / Above ₹1L / Let's discuss.
Field style: dark input bg (#1A1A1A), white text, teal bottom border only (no full border).
  On focus: bottom border glows (box-shadow: 0 2px 0 0 #10B981).
Submit button: full-width, white bg, black text, Syne font.
  On hover: magnetic button effect + background fills black with white text invert.
  On submit: button text scrambles briefly then shows 'Message Sent ✓'.
Form validation: inline error messages in red, fade in with Framer Motion.

Right Column — Direct Contact
	Three contact method cards (dark card bg #1A1A1A):
  1. Email icon + hello@homiesstudio.in — click copies to clipboard (shows 'Copied!' toast)
  2. WhatsApp icon + +91 XXXXX XXXXX — opens wa.me link
  3. Location icon + Hyderabad, India — opens Google Maps
Below contact cards: social icon row (GitHub, LinkedIn, Instagram).
  Icons: 28px, gray (#9CA3AF). Hover: white + scale(1.15).
Bottom of section: full-width footer bar.
  Left: © 2026 Homies Studio. All rights reserved.
  Right: 'Made with intention.' (italic)

Prompt to give AI / Dev
	Build a Contact section (id='contact') + footer for Homies Studio. Bg: #0A0A0A.
Header: mono teal '07 / contact', Syne white heading 'Let's Build Something.',
  gray subheading 'Drop a message. We reply within 24 hours.'
Two-column: Left = form, Right = contact cards + socials.
Form fields: Name, Email, Project Type (dropdown), Budget (dropdown), Message.
Inputs: dark bg (#1A1A1A), white text, teal bottom border only. Focus: teal glow.
Submit: full-width white/black magnetic button. On submit: text scramble → 'Message Sent ✓'.
Right col: 3 contact cards (Email / WhatsApp / Location) in dark cards.
  Email card: click-to-copy with toast notification.
Social icons row: GitHub, LinkedIn, Instagram. Hover: white + scale.
Footer bar: '© 2026 Homies Studio' left + 'Made with intention.' italic right.
 

11. GLOBAL ANIMATIONS REFERENCE
Complete spec for every animation used across the site

1. Custom Cursor
	Library: GSAP (quickTo).
Small dot (8px, #0A0A0A) follows mouse with ~0.15s lag.
On hover (buttons, links, cards): expands to 40px ring, mix-blend-mode: difference.
Implementation: document.addEventListener('mousemove') → GSAP quickTo x, y.
Component: <CustomCursor /> — rendered in App.tsx, absolutely positioned over everything.

2. Text Scramble / Glitch
	Used on: Nav logo 'HS' hover, section headings on scroll entry.
Library: Vanilla JS class or GSAP.
Technique: on trigger, cycle through random chars (A-Z, 0-9) for each character position
  at 30ms intervals, then resolve to the real character. Duration: ~600ms total.
Use the 'TextScramble' utility class — implement once, reuse everywhere.

3. Scroll-Triggered Reveals
	Library: Framer Motion (useInView) for component reveals.
Default reveal: opacity: 0→1, y: 30→0, duration: 0.6s, ease: [0.25, 0.1, 0.25, 1].
Stagger children: use Framer Motion variants with staggerChildren: 0.08.
GSAP ScrollTrigger for: timeline line draw, parallax, counter animations.
Trigger offset: start: 'top 80%' (element enters at 80% of viewport height).

4. Parallax
	Library: GSAP ScrollTrigger.
Used on: About section floating card (0.3x speed), hero background element.
Implementation: gsap.to(element, { y: '30%', ease: 'none', scrollTrigger: { scrub: true } })
Keep parallax subtle (0.2x–0.4x) — avoid motion sickness on large elements.

5. Magnetic Buttons
	Used on: all primary CTA buttons, 'Start a Project', 'Get a Quote', submit.
Technique: on mousemove over button bounding rect, translate button toward cursor.
Max displacement: 12px on each axis.
On mouseleave: GSAP spring back to origin (elastic ease).
Implementation: useRef on button, addEventListener mousemove/mouseleave.
  Calculate: dx = (e.clientX - rect.left - rect.width/2) * 0.35
             dy = (e.clientY - rect.top  - rect.height/2) * 0.35
  GSAP to: { x: dx, y: dy, duration: 0.3 }

6. Card Tilt (3D hover)
	Used on: Service cards, Pricing cards.
Technique: CSS perspective(800px) on parent. On mousemove:
  rotateX = -(cursor Y offset / card height - 0.5) * 16
  rotateY =  (cursor X offset / card width  - 0.5) * 16
Apply via GSAP: gsap.to(card, { rotateX, rotateY, duration: 0.4 })
Shadow shift: box-shadow moves opposite to tilt direction.
On mouseleave: rotateX:0, rotateY:0, shadow:reset.

7. Number Counters
	Library: GSAP.
Used on: About section stats, Crew popup modal.
Trigger: when element enters viewport (ScrollTrigger or IntersectionObserver).
Implementation: gsap.to(obj, { val: targetNumber, duration: 1.8, ease: 'power2.out',
  onUpdate: () => element.textContent = Math.ceil(obj.val).toString() })
Add '+' suffix after animation completes.

8. Page Transitions
	Library: Framer Motion AnimatePresence.
On route change: current page fades out (opacity:1→0, y:0→-20, duration:0.25s).
New page fades in (opacity:0→1, y:20→0, duration:0.35s).
Wrap Router outlet in <AnimatePresence mode='wait'>.
 

12. COPY & PLACEHOLDER CONTENT
All text content and things you need to fill in before launch

Things to Fill In Before Launch
Location	Placeholder	What to Replace With
Navbar logo	'HS'	Keep as-is or add full logo later
Hero section	Your existing hero prompt	Your own content
Projects section	6 × [Your Project Name]	Real project titles, descriptions, images, tech tags
Crew section	4 × [Name] + [Role]	Real team member names, roles, bios, skills
About stats	[X]+ counters	Real numbers: projects delivered, clients, domains, team size
Contact	hello@homiesstudio.in	Your real email
Contact	+91 XXXXX XXXXX	Your real WhatsApp number
Crew modal	GitHub + LinkedIn links	Real profile URLs per team member
Footer	© 2026 Homies Studio	Keep — update year if needed

Complete Master Prompt Assembly
	When giving this to an AI tool (Cursor, v0, Copilot, etc.), assemble it in this order:

PROMPT 0:  Global Setup + Design Tokens + Fonts + Custom Cursor (Section 1)
PROMPT 1:  Vertical Right Navbar (Section 2)
PROMPT 2:  [Your Hero Section prompt — you already have this]
PROMPT 3:  Services Section (Section 4)
PROMPT 4:  Process Section (Section 5)
PROMPT 5:  Projects Section (Section 6)
PROMPT 6:  Crew Section — Three.js avatars + modal (Section 7)
PROMPT 7:  About Section (Section 8)
PROMPT 8:  Pricing Section (Section 9)
PROMPT 9:  Contact + Footer (Section 10)
PROMPT 10: Wire up animations — Animations Reference (Section 11)

TIP: Build and test one section at a time. Start with Global Setup + Navbar first.
TIP: Each section prompt is self-contained — paste it alone with this context:
  'I am building the Homies Studio website. Stack: React + Vite + TS + Tailwind + shadcn/ui.
   Framer Motion + GSAP for animations. Three.js for crew section. Light theme.
   Right vertical navbar. Now build: [section prompt]'

File Structure Recommendation
	src/
  components/
    layout/     → Navbar.tsx, CustomCursor.tsx, PageTransition.tsx
    sections/   → Hero.tsx, Services.tsx, Process.tsx, Projects.tsx
                  Crew.tsx, About.tsx, Pricing.tsx, Contact.tsx
    ui/         → MagneticButton.tsx, ScrambleText.tsx, CounterStat.tsx
                  CrewCard.tsx, CrewModal.tsx, ProjectCard.tsx, TiltCard.tsx
  hooks/        → useScramble.ts, useMagnet.ts, useTilt.ts, useCountUp.ts
  lib/          → three-avatar.ts (Three.js avatar factory)
  styles/       → globals.css, cursor.css
  App.tsx       → Router + AnimatePresence + CustomCursor
  main.tsx

	Document Version: 1.0   |   Homies Studio — Hyderabad, Telangana, India
Internal use only. Give individual section prompts to your dev / AI tool.

