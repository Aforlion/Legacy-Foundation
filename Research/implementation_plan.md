# Implementation Plan - Client Observations & Website Enhancements

This plan outlines the implementation details to address the latest client observations for the Sir John Ndukwe Legacy Foundation website.

## User Review Required

> [!IMPORTANT]
> **New Section Routing and Actions:**
> - **Leadership Section**: We will add a new homepage section introducing the core leadership team with a CTA button "Meet Our Leaders" pointing to `/about#leadership`. We will also add a corresponding Leadership section on the `/about` page.
> - **Success Stories Section**: We will add a new homepage section showcasing key impact stories with a CTA button "Read Our Success Stories" pointing to `/projects` or `/news`.
> - **"Partner With Us" Button & Flow**: We will add this CTA button to the Navbar, Hero banner, homepage sections, and subpages. It will link to the `/contact?type=partner` form or the `/volunteer` page, allowing prospective partners to initiate collaboration.
> - **Statement Band Position**: We will place the client's motto statement band on the homepage, positioned directly below the main navigation/header and above the hero banner image.

---

## Proposed Changes

### 1. Typography & Global Layout
#### [MODIFY] [globals.css](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/app/globals.css)
- Increase font weight and styles for critical navigation elements.
- Define styles for the new home page sections (Leadership, Success Stories, and the Motto Statement band).

---

### 2. Header and Navigation (Navbar)
#### [MODIFY] [Navbar.tsx](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/components/Navbar/Navbar.tsx)
- Increase top utility bar font size to improve readability.
- Update social media icons to be bolder (using thicker stroke widths/sizes).
- Make the "Donate Now" button bold.
- Add a new "Partner With Us" button next to "Donate Now" in the header (or integrated cleanly for mobile/desktop responsiveness).

#### [MODIFY] [Navbar.module.css](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/components/Navbar/Navbar.module.css)
- Styling adjustments for bolder icons, larger top-bar font size, and bolder CTA buttons.

---

### 3. Subpage Reusable Component
#### [NEW] [SubpageCTA.tsx](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/components/SubpageCTA/SubpageCTA.tsx)
- Create a new reusable banner component that appears just below the page header banner on all navigation pages:
  - Contains "(2) Donate Now – Support a Life Today" (bold button).
  - Contains "(5) Partner With Us" (bold button).
- Import this component and render it on:
  - `/about/page.tsx`
  - `/programs/page.tsx`
  - `/projects/page.tsx`
  - `/gallery/page.tsx`
  - `/news/page.tsx`
  - `/volunteer/page.tsx`
  - `/contact/page.tsx`

---

### 4. Homepage Enhancements
#### [MODIFY] [page.tsx](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/app/(public)/page.tsx)
- **Motto Statement Band**: Add a new full-width highlight banner right below the navbar and above the main hero image.
- **Leadership Section**: Add a grid section displaying key leaders (e.g. Founder, Board Members) with a button leading to `/about#leadership`.
- **Success Stories Section**: Add a grid section displaying 2-3 success story cards (e.g. scholarships, community support) with a button leading to `/projects`.
- **Partner With Us**: Add a "Partner With Us" CTA next to the "Donate Now" button.

#### [MODIFY] [home.module.css](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/app/(public)/home.module.css)
- Style the Motto Statement Band with premium serif typography (`Constantia`/Georgia), gold backgrounds, or clean high-contrast text.
- Style the Leadership grid and card elements.
- Style the Success Stories cards with overlay hover effects and modern spacing.

---

### 5. About Page Updates
#### [MODIFY] [page.tsx](file:///c:/Users/aforl/Desktop/Sir%20JNF/src/app/(public)/about/page.tsx)
- Add a dedicated **Leadership Section** (matching the anchor `#leadership`) to detail the biographies and roles of the foundation's leaders.

---

## Verification Plan

### Automated Tests
- Run `npm run build` to verify Next.js compiling and TypeScript type-checking.

### Manual Verification
- Visual inspection of the navbar top-bar font size.
- Verification of bold social icons and bold "Donate Now" button.
- Confirm the new Motto Statement Band displays correctly below the logo and above the banner on the homepage.
- Verify subpage CTA bands render correctly with bold buttons on all secondary pages.
- Verify the new Homepage Leadership and Success Stories sections.
