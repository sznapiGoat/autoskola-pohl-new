# Autoškola POHL — Complete Site Inventory

Scraped via Playwright on 2026-05-07. Source: https://www.autoskola-pohl.cz

---

## 1. Business Identity

**Name:** Autoškola POHL  
**Tagline:** Akreditované školící středisko řidičů PZ  
**Location:** Komenského 687, Dobruška 518 01  
**Contact:**
- Email: autoskola.pohl@seznam.cz
- Mobile: +420 602 441 636

---

## 2. Services

### 2.1 Řidičský průkaz (Driver's License Training)

Groups offered: AM, A1, A2, A, B, BE, B96, C, CE

**Enrollment:**
- Email: autoskola.pohl@seznam.cz
- Mobile: +420 602 441 636
- In person at the driving school (by appointment)

**Documents required:**
- Application form for driver's license
- Confirmed medical health certificate (stamp, signature, date from GP)

**Additional notes:**
- Accept transfers from other driving schools
- License group B automatically includes AM (scooter up to 125cc automatic) + B1 (quad) per law 247/2000 Sb.
- School transfer fee: 500 Kč (excl. VAT)

### 2.2 Vrácení ŘP (License Return / Re-examination)

**Three scenarios:**

#### Driving ban (Zákaz řízení)
Required when driving ban exceeded 1 year. Documents: court ruling, driving record from Municipal Office, application, medical certificate.

#### 12 Points
Required when reaching 12 points. Training can start the day after the 1-year ban ends.
Documents: driving record from Municipal Office, application.

#### Health reasons (Zdravotní důvody)
Required when license was revoked for health reasons and more than 3 years have passed.
Documents: driving record, application, medical certificate.

**Exam structure (3 parts):**
1. PPV - Traffic rules test (1 test)
2. NKU - Vehicle maintenance/operation (only for groups C,CE,D,DE)
3. PJ - Practical driving (min. 30 min for A1,A,B,BE; min. 45 min for C,CE,D,DE,T)

**Exam fees (City Hall, per law 247/2000 Sb., from 01.07.2006):**
- First exam: 700 Kc
- AM, A1, A2, A, B, BE: PPV 100 Kc / OUV 0 Kc / PJ 400 Kc
- C, CE, D, DE, T: PPV 100 Kc / OUV 200 Kc / PJ 500 Kc
- Repeat exam: PPV 100 Kc / OUV 200 Kc / PJ 400 Kc
- Prices excl. VAT. Psychological assessment available (mediated by the school).

### 2.3 Kondicni jizdy (Conditioning Rides)

Practical driving refresher for licensed drivers who:
- Have not driven for a long time and want to regain confidence
- Don't drive regularly and want to maintain skills
- Want to improve driving skills

Offerings: personalized skill improvement, simulator driving available.

### 2.4 Skoleni ridicu (Driver Training Programs)

#### 2.4.1 Profesni skoleni (Professional / CPC Training)
For professional drivers — trucks and buses. Mandatory periodic training.
Groups: C, C1, CE, C1E, D, D1, DE, D1E

Training must be completed within each 12-month window, at latest by anniversary date.
If 5th-year training is missed, all previous sessions become void and 35 hours must be repeated in full.

**2026 Schedule:**
- Saturday 14.03., 07:00 — 15 seats
- Saturday 18.04., 07:00 — 25 seats
- Saturday 23.05., 07:00 — TBD
- Saturday 03.10., 07:00 — TBD

Location: Komenského 687, Dobruška 518 01
Note: Online registration currently disabled — register via email.

#### 2.4.2 Referentske skoleni (Company Drivers / Non-professional Training)
For employees who drive company vehicles but are NOT subject to CPC professional training.
Groups: A, B, BE, T, N1

Legal basis: Labor Code section 103(2) — employer must provide traffic regulation training for employees driving vehicles during work.

Training locations: at your company premises OR at the school.
Price per person: 169-194 Kc (excl. VAT)

---

## 3. Pricing

### 3.1 Driver's License Courses (Basic Training)

| Category | Vehicle type | Price |
|----------|-------------|-------|
| AM | Moped/scooter (min. age 15) | 26 000 Kc |
| A1 | Motorcycle up to 125cc (min. age 16) | 26 000 Kc |
| A2 | Motorcycle up to 35kW (min. age 18) | 26 000 Kc |
| A | Motorcycle, unlimited (min. age 24) | 26 000 Kc |
| B | Passenger car (min. age 18) | 28 000 Kc |
| BE | Passenger car + trailer (min. age 18) | 10 000 Kc |
| B96 | Passenger car + trailer up to 4250kg (min. age 18) | 5 199 Kc |
| C | Truck (min. age 21) | 26 000 Kc |
| CE | Truck + trailer (min. age 21) | 18 000 Kc |

### 3.2 Motorcycle License Extensions (Rozsiruji vycvik)

| From to | With 2 years practice | Without 2 years practice |
|---------|----------------------|--------------------------|
| A1 to A2 | 8 700 Kc | 10 000 Kc |
| A2 to A | 8 700 Kc | 10 000 Kc |

### 3.3 Training Hours (Rozsah vyuky)

| Group | Min. age | Practice | Theory |
|-------|----------|---------|--------|
| AM | 15 | 13 h | 9 h |
| A1 | 16 | 13 h | 9 h |
| A2 | 18 | 13 h | 9 h |
| A | 24 | 13 h | 9 h |
| B | 18 | 28 h | 11 h |
| BE | 18 | 8 h | 6 h |
| B96 | 18 | 2 h | 0 h |
| C | 21 | 18 h | 11 h |
| CE | 21 | 8 h | 6 h |

---

## 4. Navigation Structure (Old Site)

| Label | URL |
|-------|-----|
| Uvod (Home) | / |
| Ridicsky prukaz (Driver's License) | /vycvik-zaku |
| Vraceni RP (License Return) | /vraceni-ridicskeho-prukazu |
| Kondicni jizdy (Conditioning Rides) | /kondicni-jizdy |
| Skoleni ridicu (Driver Training) | /skoleni-ridicu |
| Cenik (Pricing) | /cenik-1 |
| Zadosti (Applications) | /zadosti |
| Kontakt (Contact) | /kontakt |

---

## 5. Old Site Technical Notes

- Built: ~2010 era, XHTML 1.0 Transitional
- Framework: Custom PHP CMS by Acceler.cz
- The "cenik" homepage widget linked to /cenik (wrong page) — actual pricing is at /cenik-1
- Interactive "skupiny" tiles on homepage navigate to /cenik#A anchors that deliver no pricing content
- Site is not mobile-optimized
- Uses jQuery 1.4.2, FancyBox for galleries

---

## 6. UX Observations & Redesign Opportunities

**Broken UX patterns:**
- Homepage group tiles (A, B, C, CE, D1, D, T) click to /cenik#A etc. which have no actual pricing content
- Actual pricing is buried at /cenik-1 — a separate, hard-to-find page
- Referee training price (169-194 Kc) appears only in a small homepage widget, not on the pricing page
- Professional training price not listed anywhere
- Online registration is broken ("Momentalne se nejde prihlaovat, prosime pres e-mail")

**Missing data (not found on old site):**
- D, D1, DE prices not listed (bus categories — probably available but omitted)
- Professional training (CPC) price per person
- Conditioning rides price

**Strengths worth keeping:**
- Accreditation as "skolici stredisko ridicu PZ" — strong trust signal to lead with
- Wide category coverage: AM through CE plus professional programs
- Local Dobruska address (Kralovehradecky kraj)
- Clear 2026 professional training schedule with seat counts

**Redesign ideas:**
1. Pricing organized by use-case (New Driver, Returning Driver, Company/Fleet)
2. Single interactive selector: pick group => see hours + price + enroll CTA
3. "License Return" as a dedicated featured card — specialized service, strong differentiator
4. Surface upcoming course dates on the homepage (the 2026 schedule is buried 3 levels deep)
5. Replace broken online form with a simple mailto or inquiry form
