# Implementation Plan - Sir John Ndukwe Legacy Foundation Website Feedback

This implementation plan addresses the observations and feedback provided by the client regarding the Sir John Ndukwe Legacy Foundation (SJN-LF) website, including brand assets, logo placement, and header animations.

## User Review Required

> [!IMPORTANT]
> **Observation 4 - Custom Email Activation:**
> The client asked: *"Is this custom Email active? >>> donate@sirjohnndukwelegacyfoundation.org"*.
> We will configure the custom email address on the contact pages and footer, but we need the client to confirm if they have configured the mail server/routing for this custom domain so it successfully receives emails. Until confirmed, the primary contact email remains `sirjohnfoundation@gmail.com`.
> We will update the display and hyperlinks to use `donate@sirjohnndukwelegacyfoundation.org` for donation-related contexts.

> [!NOTE]
> **Observation 8 - Program Sublinks & New Contact Page:**
> - To avoid 404 errors on the "Our Programs" sublinks in the Navbar, we will link them directly to the corresponding anchor sections on the `/programs` page (e.g. `/programs#ecd`, `/programs#women`, `/programs#poverty`).
> - We will create a new dedicated **Contact Us** page at `/contact` to resolve the broken "Contact Us" footer link, complete with a functional inquiry form and beautiful styling.

---

## Proposed Changes

### 1. Logo and Header Assets Integration

#### [NEW] [logo.jpg](file:///c:/Users/aforl/Desktop/Sir%20JNF/public/logo.jpg) & [header.jpg](file:///c:/Users/aforl/Desktop/Sir%20JNF/public/header.jpg)
- Copy the logo `SJNLF logo.jpeg` and header banner image `SJBLF header.jpeg` from the `Artifacts` folder to the `public/` directory as `logo.jpg` and `header.jpg`.
- The logo will replace the generic text badge in both the navbar and the footer.
- The header image will serve as the rich custom background for the homepage hero section.

---

### 2. Common Components & Icons

#### [NEW] [Icons.tsx](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/components/Icons.tsx)
- Create a clean reusable component library containing sharp, bold SVG icons for:
  - Social media: Facebook, Instagram, YouTube, X/Twitter, TikTok, Threads.
  - Contact details: MapPin (📍), Phone (📞), Mail (✉).
  - This ensures all icons are pixel-perfect SVGs that can be dynamically sized and colored (satisfying **Observation 1** and **Observation 7**).

---

### 3. Header & Navigation (Navbar)

#### [MODIFY] [Navbar.tsx](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/components/Navbar/Navbar.tsx)
- Import the new SVG social icons (**Observation 1**).
- Remove the "Address, Phone number, and Email" texts from the top bar utility line (**Observation 5**).
- Add a new custom CSS class for the centralized welcome text (**Observation 5**).
- Replace the text-based circle badge with the actual client logo image `/logo.jpg` using Next.js `Image` (**New Requirement**).
- Update the Facebook and TikTok links to be properly URL-encoded and hyperlinked (**Observation 3**).
- Change the dropdown links under "Our Programs" to point to the actual sections (`/programs#ecd`, `/programs#women`, `/programs#poverty`) so there are no 404 links (**Observation 8**).

#### [MODIFY] [Navbar.module.css](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/components/Navbar/Navbar.module.css)
- Center the welcome text in the top bar using flex positioning.
- Style the welcome text with `font-family: 'Constantia', Georgia, serif` (**Observation 5**).
- Position the social icons on the right of the top bar (**Observation 5**).
- Style the new logo image wrapper to fit cleanly within the navbar height.

---

### 4. Homepage Hero (Animated Header Section) & Banner Buttons

#### [MODIFY] [page.tsx](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/app/(public)/page.tsx)
- Replace the Unsplash hero background image with the newly imported client banner `header.jpg`.
- Wrap the hero content elements (badge, heading, subtitle, button group) in animated classes to support staggered entry on load.
- Correct the class names for the hero button links:
  - "Become a Volunteer" -> `btn btn--primary btn--lg`
  - "Donate Now" -> `btn btn--ghost btn--lg`
- Correct the class names for the CTA banner button links at the bottom:
  - "Join as Volunteer" -> `btn btn--white btn--lg`
  - "Support Financially" -> `btn btn--ghost btn--lg`
- This ensures they render as styled buttons as per the design system (**Observation 6**).

#### [MODIFY] [home.module.css](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/app/(public)/home.module.css)
- Implement **Ken Burns animation** on the background image wrapper:
  - Define keyframes that slowly scale (`scale(1)` to `scale(1.08)`) and slightly shift the image over a 20-second loop.
- Implement **staggered slide-fade animations** for hero content:
  - Stagger delays for `.badge` (0.1s), `.heroTitle` (0.3s), `.heroSubtitle` (0.5s), and `.heroButtons` (0.7s) to make the header entry feel premium and animated (**New Requirement**).

---

### 5. Footer

#### [MODIFY] [Footer.tsx](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/components/Footer/Footer.tsx)
- Replace the text-based circle badge with the actual client logo image `/logo.jpg` (**New Requirement**).
- Correct the phone numbers list to only show `+2348065166127` and remove `+2348069099337` (**Observation 2**).
- Correct the Facebook and Threads URLs, ensuring no raw spaces exist in the href attributes (**Observation 3**).
- Replace the emoji icons for contact details with our new SVG icons (**Observation 7**).
- Replace the plain-text/unicode social icons with the new SVG social icons (**Observation 1**).

#### [MODIFY] [Footer.module.css](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/components/Footer/Footer.module.css)
- Add styling for the new contact SVGs under `.contactIcon` to make them larger (approx. `20px` width/height) and color them sharp **Yellow** (`#fbbf24` or `#f59e0b` using `var(--color-gold)`) (**Observation 7**).
- Style the logo image wrapper to scale nicely in the footer brand section.
- Adjust the layout and spacing of the social row and contact list.

---

### 6. New Contact Page

#### [NEW] [page.tsx](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/app/(public)/contact/page.tsx)
- Implement a complete, modern contact page.
- Layout:
  - Page header with breadcrumbs.
  - Left column: Contact Info (address, phone, email, working hours) with large yellow icons.
  - Right column: Clean interactive contact form (Name, Email, Subject, Message) styled according to the design system.
  - Footer/Bottom: Embedded Google Map placeholder or beautiful decorative map graphic.
- This ensures the "Contact Us" link in the footer routes to a high-quality page instead of a 404 (**Observation 8**).

#### [NEW] [contact.module.css](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/app/(public)/contact/contact.module.css)
- Accompanying styling for the contact page, layout grid, and contact details cards.

---

## Verification Plan

### Automated Verification
- Run `npm run build` to verify there are no compilation, TypeScript, or Next.js build errors.
- Run `npm run lint` to check for code quality and layout standards.

### Manual Verification
- Launch the development server and verify the layout visually in the browser:
  - Verify that the Navbar top bar has centralized text in "Constantia" and that address/phone/email are removed.
  - Check the social icons in both Navbar and Footer: ensure they are bold SVG brand logos and that Facebook/TikTok open correctly.
  - Check the Hero and CTA banner buttons on the homepage and verify they render as styled buttons.
  - Click on the Quick Links and confirm `/contact` is no longer a 404 and loads a fully styled page.
  - Verify the contact icons in the footer are sharp Yellow and clearly visible.
