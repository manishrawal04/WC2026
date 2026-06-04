# World Cup 2026 Prediction Game - Project Files

## 📁 File Structure

```
Worldcup Prediction/
├── index-v2.html              # Main app interface (rename to index.html)
├── app-v2.js                  # Application logic (rename to app.js)
├── styles-v2.css              # Styling (rename to styles.css)
├── config.js                  # Configuration & Supabase setup ⚙️
├── schedule.json              # All 104 match details 📅
│
├── DATABASE_SCHEMA.sql        # Supabase tables schema 🗄️
├── COMPLETE_SETUP_GUIDE.md    # Step-by-step deployment guide 📖
├── PARTICIPANTS.md            # Add 26 members 👥
├── FILES_OVERVIEW.md          # This file 📋
│
├── README.md                  # Original project info
└── [Old files: index.html, app.js, styles.css, SUPABASE_SETUP.md]
```

## 📄 File Descriptions

### Core Application Files

#### `index-v2.html`
- **Purpose:** Main user interface
- **Contains:** HTML structure for all pages
- **Pages:**
  - Login/participant selection
  - Match predictions
  - Tournament picks (winner, awards)
  - Live leaderboard
  - Results display
  - Admin panel
- **Action:** Rename to `index.html` after deploying

#### `app-v2.js`
- **Purpose:** All application logic
- **Functions:**
  - User authentication & login
  - Prediction submission & loading
  - Leaderboard calculation
  - Admin functions (add participants, enter results)
  - Scoring calculations
  - CSV export
- **Size:** ~550 lines
- **Action:** Rename to `app.js` after deploying

#### `styles-v2.css`
- **Purpose:** Professional styling & responsive design
- **Features:**
  - Mobile-friendly layout
  - Match cards & forms
  - Leaderboard tables
  - Admin panels
  - Animations & transitions
  - Dark theme with blue accents
- **Action:** Rename to `styles.css` after deploying

#### `config.js`
- **Purpose:** Configuration & Supabase initialization
- **Contains:**
  - Supabase URL & API key (UPDATE THESE!)
  - Scoring rules
  - Prize amounts
  - Admin password
  - Global variables
- **Critical:** Must update with your Supabase credentials
- **Size:** ~60 lines

### Database & Setup

#### `DATABASE_SCHEMA.sql`
- **Purpose:** Complete database setup
- **Creates 8 tables:**
  1. `participants` - 26 members
  2. `matches` - 104 World Cup matches
  3. `predictions` - Individual predictions
  4. `tournament_picks` - Winner/award predictions
  5. `tournament_results` - Actual outcomes
  6. `match_prizes` - Prize tracking
  7. `prize_ledger` - Complete prize history
  8. `admin_settings` - Configuration
- **Includes:** Row Level Security (RLS) policies
- **Action:** Copy entire content, paste in Supabase SQL Editor, run

#### `schedule.json`
- **Purpose:** All 104 World Cup 2026 matches
- **Fields per match:**
  - match_id (1-104)
  - stage (Group, Round of 16, etc.)
  - group (A-L for group stage)
  - Date/time in Nepal timezone
  - Team names
  - Venue
- **Loaded by:** `app.js` at startup
- **No changes needed** - already complete

### Documentation

#### `COMPLETE_SETUP_GUIDE.md`
- **Step-by-step instructions:**
  1. Create Supabase project
  2. Import database schema
  3. Get API credentials
  4. Configure app
  5. Add 26 participants
  6. Deploy to web
  7. Test functionality
  8. Setup match schedule
  9. During tournament tasks
  10. Post-tournament
  11. Troubleshooting
- **Read this first!**

#### `PARTICIPANTS.md`
- **Instructions for:**
  - Adding 26 members
  - Three different methods (admin panel, Supabase, CSV import)
  - Payment tracking template
  - Verification checklist
- **Use:** Create participant list with names/emails

#### `FILES_OVERVIEW.md`
- **This file** - explains all project files

## 🚀 Quick Start (TL;DR)

1. **Update `config.js`** with Supabase credentials
2. **Rename files** (`index-v2.html` → `index.html`, etc.)
3. **Add participants** using PARTICIPANTS.md
4. **Deploy** to Vercel/Netlify
5. **Share URL** with your 26 members
6. ✅ Done!

See `COMPLETE_SETUP_GUIDE.md` for detailed steps.

## 🔄 Workflow Summary

### Before Tournament Starts
- [ ] Set up Supabase database
- [ ] Update config.js credentials
- [ ] Rename files and deploy
- [ ] Add all 26 participants
- [ ] Test login and predictions
- [ ] Test admin panel
- [ ] Share app URL with members

### During Tournament
- [ ] Members make predictions before each match
- [ ] Admin enters match results
- [ ] System auto-calculates points
- [ ] Leaderboard updates in real-time
- [ ] Monitor for issues

### After Tournament
- [ ] Enter tournament final results
- [ ] Final scoring calculation
- [ ] Export final leaderboard
- [ ] Distribute prizes

## 📊 Key Features

### For Participants
- ✅ Make predictions on 104 matches
- ✅ Predict tournament winner, runner-up, awards
- ✅ See live leaderboard rankings
- ✅ Can't predict after match kickoff (locked)
- ✅ View all results
- ✅ Track personal points and prize winnings

### For Admin
- ✅ Add/manage 26 participants
- ✅ Enter match results and scores
- ✅ Auto-calculate points and prizes
- ✅ View participant list with stats
- ✅ Export data to CSV
- ✅ Manage tournament final results

### Technology
- ✅ Frontend: Vanilla JavaScript + HTML/CSS
- ✅ Database: Supabase (PostgreSQL)
- ✅ Hosting: Vercel/Netlify (or your own)
- ✅ Real-time: Supabase sync
- ✅ Mobile: Fully responsive

## 💾 Scoring System

### Group Stage (72 matches)
- Correct result: 3 points
- Exact score: 5 points
- Match prize: ₹100 (split among correct predictors)

### Knockout (32 matches)
- Correct advancing team: 5 points
- Exact score: 8 points
- Match prize: ₹300 (split among correct predictors)

### Tournament Bonus
- World Cup winner: 20 points + ₹10,000
- Runner-up: 10 points
- Golden Ball: 15 points + ₹5,000
- Golden Boot: 15 points + ₹5,000

### Prize Distribution
- Match prizes: ₹16,800 (split daily)
- Fixed prizes: ₹20,000 (fixed awards)
- **Total: ₹36,800**

## 🔐 Security Notes

- **API Key Location:** `config.js` (public key, safe to expose)
- **Admin Password:** Change from default in `config.js`
- **Database:** Supabase RLS policies prevent unauthorized access
- **Predictions:** Locked after kickoff automatically
- **Results:** Only admin can modify

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "Cannot connect to Supabase" | Check config.js credentials |
| "Participant not found" | Verify ID is exact (case-sensitive) |
| "Predictions not saving" | Check browser console, verify RLS policies |
| "Wrong timezone" | Confirm schedule.json has Nepal times |
| "Admin login fails" | Check ADMIN_PASSWORD in config.js |

See `COMPLETE_SETUP_GUIDE.md` Troubleshooting section for more.

## 📞 Support

1. Check `COMPLETE_SETUP_GUIDE.md` troubleshooting section
2. Review browser console (F12) for error messages
3. Verify Supabase tables have data
4. Test in incognito window to rule out cache issues

---

**Ready to deploy? Start with `COMPLETE_SETUP_GUIDE.md`!**

⚽ World Cup 2026 • June 11 - July 13, 2026 • 26 Participants • ₹36,800 Prize Pool
