# Admin Quick Reference Guide

## 🎯 Admin Responsibilities

Your role as admin is to manage the prediction league, ensure fair play, calculate scores, and distribute prizes.

---

## 📋 Pre-Tournament Checklist

### Week Before Tournament

- [ ] **Deploy Application**
  - Verify all files deployed correctly
  - Test login with P01/P02 accounts
  - Check leaderboard loads

- [ ] **Verify Participants (26 total)**
  - Go to Admin Panel → Participants
  - Confirm all 26 members listed
  - Each has correct name & email

- [ ] **Test Admin Functions**
  - Login with admin password
  - Add a test participant
  - Verify database updates

- [ ] **Communicate with Members**
  - Share app URL
  - Send login instructions
  - Remind deadline for predictions (June 11, 2026)

### 48 Hours Before First Match

- [ ] **Lock Setup**
  - Verify first match prediction close time set
  - First match: Mexico vs South Africa
  - Kickoff: June 12, 2026, 00:45 NPT
  - Predictions must close 15 minutes before

- [ ] **Final Test**
  - Make test prediction
  - Verify can't edit after lock time
  - Test result entry process

---

## 🎮 During Tournament

### For Each Match

**Before Match Kickoff:**
1. Remind members in group chat
2. Monitor prediction submissions
3. Note any late predictions
4. Lock predictions 15 min before kickoff

**Immediately After Match:**
1. Get official final score
2. Go to **Admin Panel** → **Results**
3. Enter:
   - `actual_score_a` - Team A goals
   - `actual_score_b` - Team B goals
   - `actual_result` - A (Team A won) / D (Draw) / B (Team B won)
   - For knockout: `advancing_team` - which team advanced
4. Click Save
5. System auto-calculates points

**Verify Results Entered:**
- Check leaderboard updated
- Spot-check a few participant points
- Confirm match prize calculated

### Daily Tasks

**Morning (Start of Play Day):**
- Check how many members have predicted (aim for 100%)
- Note any members who haven't logged in
- Send reminder to those who are behind

**After Last Match:**
- Enter all results for the day
- Verify leaderboard updated
- Check for any calculation errors
- Note any controversies for resolution

---

## 🏆 Special Matches

### Knockout Matches (32 games)

**Extra fields to fill:**
- `advancing_team` - Which team advanced to next round?
  - Enter team name exactly as in schedule
  - Format: "Argentina" or "France"
  - Not "Argentina won", just the team name

**Scoring difference:**
- Group: 3 points for correct result
- Knockout: 5 points for correct advancing team (worth more!)

### Final Match

**Most Important Match:**
- Highest points available
- Highest match prize (₹300)
- Record carefully
- Double-check before entering

---

## 📊 Mid-Tournament Admin Tasks

### Weekly Check-in (Every Saturday)

1. **Backup Data**
   - Export predictions CSV
   - Export leaderboard CSV
   - Save locally

2. **Verify Data Integrity**
   - Go to Supabase → Table Editor
   - Check predictions table
   - Spot-check 5 random predictions are correct

3. **Review Leaderboard**
   - Check top 3 standings (no tie issues?)
   - Check bottom (anyone with 0 points?)
   - Any anomalies to investigate?

4. **Recalculate Scoring**
   - Go to Admin Panel → Scoring
   - Click "Recalculate Scoring"
   - Verify totals match manual check

### If Discrepancies Found

1. **Check Supabase Directly**
   - Table Editor → predictions
   - Filter for problematic match
   - Verify data is correct

2. **Manually Recalculate**
   - Group stage: 3 points for correct result, 5 total for exact score
   - Knockout: 5 points for advancing team, 8 total for exact score
   - Compare to database

3. **Correct if Needed**
   - Update participant.total_points in database
   - Update predictions.points_awarded
   - Test leaderboard recalculation

---

## 🏅 End of Tournament

### When Tournament Ends (July 13, 2026)

**Day 1 (July 14):**
- [ ] Enter final match result
- [ ] Enter tournament finals:
  - Go to tournament_results table
  - Add World Cup winner
  - Add runner-up
  - Add Golden Ball winner
  - Add Golden Boot winner

**Day 2 (July 15):**
- [ ] Verify all results entered
- [ ] Recalculate final scoring
- [ ] Export final leaderboard

**Day 3 (July 16):**
- [ ] Review final standings
- [ ] Check for tie-breaking scenarios
- [ ] Calculate prize payouts
- [ ] Prepare prize distribution

---

## 💰 Prize Distribution Process

### Step 1: Verify Final Standings

1. Go to **Leaderboard**
2. Screenshot final standings (proof)
3. Note top 3 finishers
4. Identify special award winners

### Step 2: Calculate Payouts

**Top Finisher (1st Place):**
- Base prize: ₹10,000
- Plus: Any match prizes earned
- Plus: Any special awards (if applicable)

**Special Awards:**
- Golden Ball predictor: ₹5,000
- Golden Boot predictor: ₹5,000
- (If multiple correct: split equally)

**Match Prizes Earned:**
- Each participant earned during tournament
- Already tracked in leaderboard

### Step 3: Export Prize Report

1. Go to Admin Panel → Reports
2. Export → "Prize Ledger (CSV)"
3. Review all entries
4. Create summary spreadsheet

### Step 4: Distribute Prizes

**For Each Winner:**
1. Verify identity
2. Confirm bank details
3. Process payment
4. Get signed receipt
5. Mark in admin panel

### Example Payout

```
Position | Name | Prize Breakdown | Total
---------|------|-----------------|------
1st      | John | 10,000 (1st) + 500 (matches) | ₹10,500
2nd      | Jane | 200 (matches) | ₹200
3rd      | Bob  | 100 (matches) | ₹100
...      |      |         |
Golden Ball | Ali| 5,000 (award) | ₹5,000
Golden Boot | Max| 5,000 (award) | ₹5,000
```

---

## ⚙️ Admin Panel Functions

### Users Tab
- View all 26 participants
- See participant IDs, names, emails
- View total points and prizes for each
- Add new participants (shouldn't need to, but available)

### Results Tab
- Enter match results after completion
- Fields: score_a, score_b, result (A/D/B), advancing_team
- Auto-saves and triggers scoring

### Scoring Tab
- Manual recalculate button (if auto calc fails)
- View prize distribution breakdown
- Shows budget (₹36,800 total)

### Reports Tab
- Export all data (CSV)
- Export predictions only
- Export leaderboard
- Export prize ledger

---

## 🚨 Troubleshooting for Admins

### "Points not updating after entering result"

**Fix:**
1. Refresh the page
2. Go to Admin → Scoring → "Recalculate Scoring"
3. Wait 30 seconds
4. Check if leaderboard updated

### "Participant has wrong points"

**Fix:**
1. Go to Supabase → Table Editor
2. Find the participant in `participants` table
3. Check their `total_points` value
4. Manually correct if needed
5. Run Admin → Recalculate Scoring

### "Can't enter result for a match"

**Fix:**
1. Verify match exists in schedule.json
2. Confirm match_id is correct (1-104)
3. Check match hasn't been entered already
4. Try in different browser/incognito

### "Leaderboard shows wrong participant order"

**Fix:**
1. Go to Admin → Scoring
2. Click "Recalculate Scoring"
3. Wait 30 seconds
4. Refresh leaderboard
5. Should reorder by total_points (DESC)

---

## 📱 Communication Template

### Pre-Tournament Email

```
Subject: World Cup 2026 Prediction League - Get Started Now!

Hi Team,

The World Cup 2026 Prediction League is live! 🎉

Predict every match, earn points, and compete for ₹36,800 in prizes.

📱 JOIN HERE: [Your App URL]
🔐 LOGIN: Use your Participant ID (e.g., P01)
📅 ENTRY FEE: ₹1,500 per person

Key Dates:
- First match: June 12, 2026
- Final match: July 13, 2026
- Predictions close 15 minutes before each match

Get Your Predictions In Now!
```

### Match Day Reminder

```
Subject: Match Today - Make Your Predictions! ⚽

Hi [Name],

Match #[X] is TODAY!

[Team A] vs [Team B]
Kickoff: [Date/Time Nepal Time]

🎯 Make your prediction now (closes 15 min before kickoff):
[App URL]

Good luck! 🍀
```

### Results Posted

```
Subject: Match Results & Leaderboard Updated 

Match #[X] Final Score:
[Team A] [Score A] - [Score B] [Team B]

Leaderboard Standings:
1. [Name] - [Points] points
2. [Name] - [Points] points
3. [Name] - [Points] points

Check the app for full standings: [App URL]
```

---

## ✅ Final Checklist

**Before Declaring Winner:**
- [ ] All 104 matches completed and results entered
- [ ] Tournament finals entered (winner, runner-up, awards)
- [ ] Final scoring calculated and verified
- [ ] Tie-breaking applied if needed
- [ ] Leaderboard exported and reviewed
- [ ] Prize calculation verified
- [ ] Communication plan ready

**Before Distributing Prizes:**
- [ ] Winner identities verified
- [ ] Bank details confirmed for all prize winners
- [ ] Tax/legal documentation completed
- [ ] Payment method decided (bank transfer/check)
- [ ] Receipt process planned

---

## 📞 Contact List

**Admin Contact:**
- Name: [Your Name]
- Email: [Your Email]
- Phone: [Your Phone]
- Available: [Your Availability]

**Escalation (if issues):**
1. Check database in Supabase
2. Review browser console for errors
3. Contact Supabase support if database issue
4. Check app deployment (Vercel/Netlify)

---

**Good luck managing the tournament! Remember: Accuracy and fairness are key.** ⚽🏆

See `COMPLETE_SETUP_GUIDE.md` for detailed technical instructions.
