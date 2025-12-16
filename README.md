# Categorio

Categorio is a conceptual mobile-style web app that helps users **understand and organize their spending**.  
It’s built as a single–page-per-screen prototype using HTML, CSS and vanilla JavaScript, styled to look like a modern banking app on a phone.

---

## ✨ Features

### 🔐 Login
- Branded login screen with the Categorio logo.
- Username + password form with “Remember Me”.
- Google reCAPTCHA (test key) wired in.
- On successful login, user is taken to the **Dashboard (index.html)**.
- Basic “remembered user” stored in `localStorage` (`categorio_user`).

### 🏠 Dashboard (Home)
- “Good Afternoon, Alex Thomas” greeting with logo and notification badge.
- Gradient **Total Balance** card with quick actions (`+ Add Money`, `Send →`).
- **AI Insights** cards (e.g., Smart Suggestions, Reduce Food Spending, Budget Reminder).
- **Recent Activity** list showing example transactions.
- Bottom navigation bar to all main sections.

### 🧾 Transactions
- Filter pills (All, Food, Shopping, Transport, Utilities, Entertainment, Income).
- Summary cards for **Income**, **Expenses**, and **Net**.
- Grouped transaction list (Today / Yesterday) with icons, categories, times and status badges.

### ➕ Add Transaction
- Large, interactive **amount control** with up/down arrows.
- Toggle between **Expense** and **Income**.
- Merchant name input.
- Category selection grid (Food, Shopping, Transport, Income, Utilities, Entertainment).
- Quick date selection.
- Notes textarea.
- On submit, a **success modal** appears with the Categorio logo and quick actions:
  - View Transactions  
  - Add Another (resets the form)

### 📊 Insights
- Monthly **Spending Breakdown** card with a donut chart (pure HTML/CSS/SVG).
- Category legend (Shopping, Food, Transport, Utilities, Entertainment).
- Stats grid (Total Spent, Top Category, Spending vs Last Month, Upcoming Bills).
- AI Insight banner with a smart suggestion.
- CTA buttons: **Download Report** and **More Insights**.

### 👤 Profile
- User profile card (name, email, member since).
- Balance summary with spending progress bar.
- Goal achievements card.
- Recent profile-related activity.
- Quick actions (View Transactions, Upload Documents).
- **Log Out** button (clears login state and routes to login).
- Help & Support button.

### 🔻 Global Bottom Navigation
Available on all main pages (Home, Transactions, Add, Insights, Profile):

- Uses shared `navigation.js`.
- Highlights the active screen based on the current file.
- Click to navigate between pages.
- Keyboard shortcuts:
  - `Alt + H` → Home
  - `Alt + T` → Transactions
  - `Alt + A` → Add Transaction
  - `Alt + I` → Insights
  - `Alt + P` → Profile
  - `Esc` → Go back (or close modal on Add Transaction screen)

---

## 🧱 Tech Stack

- **HTML5** – semantic multi-page structure.
- **CSS3** – custom layout + styling (no frameworks).
- **Vanilla JavaScript** – navigation, simple state, interactivity.
- **LocalStorage** – lightweight “login” state and remember-me flag.
- **Google reCAPTCHA** – demo integration on the login page.

---

## 📂 Project Structure

```text
.
├── index.html             # Dashboard / Home
├── login.html             # Login screen
├── transactions.html      # Transactions list
├── add-transaction.html   # Add Transaction flow + success modal
├── insights.html          # Analytics & insights
├── profile.html           # Profile & account overview
├── app.js                 # Page-specific logic (if needed)
├── navigation.js          # Shared navigation + keyboard shortcuts
└── categorio_logo.png     # App logo used in header & login
