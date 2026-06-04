# World Cup 2026 Prediction Game - Complete Setup Guide

## 🎯 Overview

This is a comprehensive multi-user prediction platform for 26 participants to make predictions on all 104 FIFA World Cup 2026 matches, plus tournament-wide picks. Includes automatic scoring, live leaderboard, admin controls, and prize management.

**Features:**
- ⚽ 104 match predictions (72 group + 32 knockout)
- 🏆 Tournament bonus predictions (winner, runner-up, awards)
- 🏅 Live leaderboard with real-time scoring
- 💰 Automatic prize calculation
- 📊 Admin panel with result entry & scoring
- 📥 CSV export functionality
- 🔒 Prediction locking after kickoff
- 📱 Mobile-friendly interface

---

## 📋 Step 1: Prerequisites

- Supabase account (free tier is sufficient)
- Match schedule JSON (already provided in `schedule.json`)
- 26 participants list (names, email, IDs)
- Text editor to update configuration

---

## 🚀 Step 2: Set Up Supabase Project

### 2.1 Create Project
1. Go to https://supabase.com
2. Click **"New Project"**
3. Enter project name: `wc2026-predictions`
4. Create a strong database password (save it!)
5. Select region closest to Nepal (preferably Asia/Singapore)
6. Click **"Create New Project"** and wait 2-3 minutes

### 2.2 Set Up Database Schema

Once your project is created:

1. Go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. **Copy the entire contents** of `DATABASE_SCHEMA.sql`
4. Paste into the SQL editor
5. Click **"RUN"** button
6. Wait for completion (should see ✓ messages)

This creates 8 tables:
- `participants` - 26 users
- `matches` - 104 World Cup matches
- `predictions` - User match predictions
- `tournament_picks` - Winner/award predictions
- `tournament_results` - Actual tournament outcomes
- `match_prizes` - Prize distribution tracking
- `prize_ledger` - Complete prize history
- `admin_settings` - Configuration

### 2.3 Get Your API Credentials

1. Go to **Settings** (gear icon, bottom left)
2. Click **"API"**
3. Under "Project API keys" find:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** (long key starting with `eyJ...`)
4. Copy both values (you'll need them soon)

---

## ⚙️ Step 3: Configure the Application

### 3.1 Update `config.js`

Open `config.js` in your text editor:

Find this section at the top:
```javascript
const CONFIG = {
  SUPABASE_URL: 'YOUR_SUPABASE_PROJECT_URL',
  SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY',
  ORGANIZATION_NAME: 'World Cup 2026 Prediction League',
  TOTAL_PARTICIPANTS: 26,
  ENTRY_FEE: 1500,
  ADMIN_PASSWORD: 'admin123',
};
```

Replace with your actual values:
```javascript
const CONFIG = {
  SUPABASE_URL: 'https://abcdefgh.supabase.co',  // Your Project URL
  SUPABASE_ANON_KEY: 'eyJhbGc...your_full_key...', // Your anon key
  ORGANIZATION_NAME: 'World Cup 2026 Prediction League',
  TOTAL_PARTICIPANTS: 26,
  ENTRY_FEE: 1500,
  ADMIN_PASSWORD: 'YourSecurePassword', // Change this!
};
```

**IMPORTANT:** 
- Keep ADMIN_PASSWORD private or change it after setup
- These credentials are public-key only (safe to expose in frontend)

### 3.2 Rename Files (Choose One Option)

**Option A: Replace originals (recommended)**
- Delete old `index.html`, `app.js`, `styles.css`
- Rename `index-v2.html` → `index.html`
- Rename `app-v2.js` → `app.js`
- Rename `styles-v2.css` → `styles.css`

**Option B: Use new files directly**
- Update `index-v2.html` script references to point to `app-v2.js` and `styles-v2.css`
- Deploy with `-v2` files as-is

---

## 👥 Step 4: Add Participants

### 4.1 Using Admin Panel (Easy)

1. Open `index.html` in browser
2. Click **Login** tab
3. Scroll down to **Admin Access**
4. Enter your admin password
5. Click **Admin Login**
6. Go to **Admin Panel** → **Participants**
7. Add each of 26 members:
   - **Participant ID:** P01, P02, P03... P26
   - **Name:** Their full name
   - **Email:** Their email (optional)
8. Click **Add Participant** for each

### 4.2 Bulk Add via Supabase Dashboard (Faster)

1. In Supabase, go to **Table Editor**
2. Click **participants** table
3. Click **Insert** → **Insert Row**
4. Fill in participant details:
   - participant_id: P01
   - name: John Doe
   - email: john@org.com
   - paid_status: FALSE
   - entry_fee: 1500

Or use this CSV import approach:
1. Go to Table Editor → participants
2. Click three-dots menu → **Import Data**
3. Create CSV with columns: participant_id, name, email, entry_fee
4. Save as `participants.csv` and import

---

## 📅 Step 5: Update Match Schedule

Your `schedule.json` already has all 104 matches with:
- Match ID (1-104)
- Stage (Group, Round of 16, etc.)
- Group (A-L for group stage)
- Date & Time (Nepal Time - NPT)
- Team names
- Venue

**To verify:** Open `schedule.json` and confirm:
- First match: Mexico vs South Africa (Match #1)
- Last match: Scheduled for July 13, 2026
- All 104 matches included
- Nepal times correctly converted

---

## 🌍 Step 6: Deploy to Web

### Option A: Vercel (Recommended - Free, 1 minute)

**Best for:** Easy automatic updates, custom domain

1. Push your code to **GitHub**:
   ```bash
   git add .
   git commit -m "WC 2026 Prediction Game"
   git push
   ```

2. Go to https://vercel.com
3. Click **Add New** → **Project**
4. Select your GitHub repo
5. Click **Deploy**
6. Get live URL (e.g., `https://wc2026.vercel.app`)
7. Share with your 26 participants!

### Option B: Netlify (Free, Simple)

1. Go to https://netlify.com
2. Drag & drop your project folder
3. Site deployed instantly
4. Customize domain if desired

### Option C: GitHub Pages (Free, No backend)

1. Go to repo **Settings** → **Pages**
2. Select "Deploy from a branch" → **main** folder
3. Site available at `username.github.io/repo-name`

### Option D: Your Own Web Server

If hosting on your own server:
1. Upload all files via FTP/SFTP
2. Configure HTTPS (Supabase requires it)
3. Access via your domain

---

## 🎮 Step 7: Test the Application

### 7.1 User Flow Test

1. **Open the app** in browser (your deployed URL)
2. **Login as P01** (first participant):
   - Click **Login** tab
   - Enter Participant ID: `P01`
   - Click **Sign In**

3. **Make predictions**:
   - You should see all 104 matches
   - Make predictions on a few matches
   - Click **Save All Predictions**
   - Confirm in Supabase table that data was saved

4. **Tournament picks**:
   - Go to **Tournament Picks** tab
   - Enter your predictions for winner, runner-up, etc.
   - Save

5. **View leaderboard**:
   - Go to **Leaderboard** tab
   - Should show all participants (even if no predictions yet)

### 7.2 Admin Test

1. **Login as Admin**:
   - Click **Login** tab
   - Scroll to Admin Access
   - Enter your ADMIN_PASSWORD
   - Click **Admin Login**

2. **Admin Panel**:
   - Should see all tabs: Participants, Results, Scoring, Reports
   - Check Participants tab shows all 26 members
   - Test adding a new participant

3. **Enter Results** (when matches complete):
   - Go to **Results** tab
   - Enter actual scores
   - System auto-calculates points

---

## ⚽ Step 8: Match Setup (Before Tournament Starts)

### 8.1 Set Prediction Lock Times

For each match, set when predictions must close (kickoff time):

In Supabase **Table Editor** → **matches** table:
- For each match, set `prediction_lock_time` to match kickoff
- Format: `2026-06-12 00:45:00` (UTC)
- After this time, users cannot modify predictions

**Or do it via app (if match scheduling feature added)**

### 8.2 Populate Match Data

Your `schedule.json` is already loaded. Verify in Supabase:
1. Table Editor → matches
2. Should see all 104 matches with times in Nepal timezone
3. Confirm no missing matches

---

## 💰 Step 9: Understand Scoring & Prizes

### Scoring Rules

**Group Stage (72 matches):**
- Correct result (A/D/B): **3 points**
- Exact score: **5 points total**
- Match winner prize: **₹100 split** among correct predictors

**Knockout Stage (32 matches):**
- Correct advancing team: **5 points**
- Exact score: **8 points total**
- Match winner prize: **₹300 split** among correct predictors

**Tournament Bonuses:**
- Correct World Cup winner: **20 points**
- Correct runner-up: **10 points**
- Correct Golden Ball: **15 points + ₹5,000**
- Correct Golden Boot: **15 points + ₹5,000**

### Prize Pool (₹36,800)

```
Match Prizes:
  Group Stage:   72 matches × ₹100 = ₹7,200
  Knockout:      32 matches × ₹300 = ₹9,600
  Subtotal:                        = ₹16,800

Fixed Prizes:
  Overall winner:    ₹10,000
  Golden Ball:       ₹5,000
  Golden Boot:       ₹5,000
  Subtotal:          ₹20,000

TOTAL PAYOUT: ₹36,800
```

### Collection & Budget

```
Per participant: ₹1,500
Total members:   26
Total collected: ₹39,000

Minus payouts:   ₹36,800
Remaining buffer: ₹2,200
```

---

## 🔄 Step 10: During Tournament

### Week 1-3: Matches & Predictions

1. **Participant responsibilities:**
   - Make predictions before each kickoff
   - Check leaderboard for standings
   - Can't change predictions after match starts

2. **Admin responsibilities:**
   - After each match, enter actual results
   - System auto-calculates points & prizes
   - Monitor for any discrepancies

### Admin Tasks

**For each completed match:**

1. Go to **Admin Panel** → **Results**
2. Enter actual score:
   - `actual_score_a`: Goals by team A
   - `actual_score_b`: Goals by team B
   - `actual_result`: A / D / B
   - `advancing_team`: (knockout only)
3. Click **Save Result**
4. System automatically:
   - Calculates points for each predictor
   - Updates leaderboard
   - Distributes match prizes

**Periodically:**
1. Go to **Admin Panel** → **Scoring**
2. Click **Recalculate Scoring**
3. Verifies all points and prizes are correct

---

## 🏆 Step 11: Post-Tournament

### Award Tournament Results

1. When tournament ends, enter final results:
   - Go to Admin → Results
   - Set tournament_results:
     - World Cup winner
     - Runner-up
     - Golden Ball recipient
     - Golden Boot recipient

2. System auto-awards:
   - 20/10 points to correct predictors
   - ₹5,000 prizes split among winners

### Calculate Final Standings

1. Go to **Admin Panel** → **Scoring**
2. Click **Recalculate Scoring**
3. Review leaderboard (should be final)
4. Apply tie-breaking rules if needed

### Export & Distribute

1. Go to **Admin Panel** → **Reports**
2. Export:
   - **Leaderboard** (final standings)
   - **Prize Ledger** (detailed breakdown)
   - **Predictions** (record keeping)
3. Use for verification & prize distribution

---

## 🐛 Troubleshooting

### "Cannot connect to Supabase"

**Solution:**
- Verify SUPABASE_URL & SUPABASE_ANON_KEY in `config.js`
- Check browser console (F12) for specific error
- Confirm Supabase project is active

### "Participant not found"

**Solution:**
- Check participant_id is exact (case-sensitive)
- Verify participant was added to database
- Try refreshing page and re-entering

### "Predictions not saving"

**Solution:**
- Check browser console for errors
- Verify Supabase connection
- Confirm RLS policies are correct (should be in SQL schema)
- Try in incognito/private browsing

### "Leaderboard not updating"

**Solution:**
- Go to Admin → Recalculate Scoring
- Refresh page after clicking
- Check Supabase table for recent updates

### "Match times showing wrong timezone"

**Solution:**
- Verify `schedule.json` has `nepal_time_npt` field
- Times should be in `2026-06-12T00:45:00` format
- Recheck `formatNPTDate()` function in `app.js`

---

## 📞 Support & Updates

**For bugs or questions:**
- Check browser console (F12) for error messages
- Verify configuration in `config.js`
- Review Supabase dashboard for data integrity
- Check RLS policies in SQL Editor

**To add features later:**
- Export your Supabase data first
- Update tables/policies via SQL
- Test thoroughly before tournament

---

## 🎉 You're Ready!

Your complete World Cup 2026 prediction platform is set up. 

**Quick checklist:**
- ✅ Supabase project created
- ✅ Database schema imported
- ✅ API credentials in config.js
- ✅ All 26 participants added
- ✅ App deployed to web
- ✅ All admin tested
- ✅ Ready for predictions!

**Share this URL with your 26 members:**
```
https://your-deployed-url.com
```

**Tournament dates:** June 11 - July 13, 2026

Good luck with the tournament! ⚽🏆
