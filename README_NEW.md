# ⚽ World Cup 2026 Prediction Game

## Complete Multi-User Prediction Platform for 26 Participants

**Prize Pool: ₹36,800** | **Participants: 26** | **Matches: 104** | **Dates: June 11 - July 13, 2026**

---

## 🎯 What Is This?

A complete, production-ready **FIFA World Cup 2026 prediction game** where your organization's 26 members can:

✅ **Predict** all 104 World Cup matches  
✅ **Compete** on a live leaderboard  
✅ **Win** up to ₹36,800 in prizes  
✅ **Track** points and standings in real-time  

Built with **Supabase** (database) + **HTML/JavaScript** (frontend) + **Vercel** (hosting) = **Instant, scalable deployment!**

---

## 🚀 Quick Start (30 Minutes)

### 1. Get Supabase (5 min)
- Go to supabase.com
- Create free account
- Create new project
- Get your Project URL & API Key

### 2. Update Configuration (5 min)
- Open `config.js`
- Insert Supabase URL & API Key
- Save file

### 3. Set Up Database (5 min)
- Go to Supabase SQL Editor
- Paste `DATABASE_SCHEMA.sql`
- Click RUN

### 4. Deploy to Web (10 min)
- Push to GitHub
- Go to vercel.com
- Deploy your repo
- **Live in 2 minutes!**

### 5. Add Participants (5 min)
- Login as admin
- Add all 26 members
- Done!

👉 **See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions**

---

## 📋 Key Features

### For Participants
- 🎮 **Easy Predictions** - Predict winner, score, advancing team
- 🏅 **Live Leaderboard** - Real-time rankings by points
- 📊 **Points Tracking** - See your progress
- 💰 **Prize Visibility** - Know what you can win
- 🔒 **Locked After Kickoff** - Fair play protection
- ⏱️ **Match Times in Nepal Time** - All times in NPT

### For Admin
- 👥 **Manage Participants** - Add/edit 26 members
- ⚽ **Enter Results** - Input match scores
- 🧮 **Auto-Scoring** - Automatic point calculation
- 💰 **Prize Distribution** - Track & calculate payouts
- 📊 **Reports** - Export all data to CSV
- 🔐 **Secure** - Admin-only access

### Scoring Rules

**Group Stage (72 matches):**
- Correct result: 3 points
- Exact score: 5 points total
- Match prize: ₹100 (split equally)

**Knockout (32 matches):**
- Correct advancing team: 5 points  
- Exact score: 8 points total
- Match prize: ₹300 (split equally)

**Tournament Bonus:**
- World Cup winner: 20 points + ₹10,000
- Runner-up: 10 points
- Golden Ball: 15 points + ₹5,000
- Golden Boot: 15 points + ₹5,000

---

## 💰 Prize Distribution

```
Match Prizes:
  72 group × ₹100  = ₹7,200
  32 knockout × ₹300 = ₹9,600
  Subtotal         = ₹16,800

Fixed Prizes:
  Overall winner   = ₹10,000
  Golden Ball      = ₹5,000
  Golden Boot      = ₹5,000
  Subtotal         = ₹20,000

TOTAL PAYOUT: ₹36,800

Per Person Collection: ₹1,500
Total Collection (26×): ₹39,000
Buffer: ₹2,200
```

---

## 📁 Project Files

### Application (Ready to Deploy)
- **index-v2.html** - User interface
- **app-v2.js** - Application logic
- **styles-v2.css** - Professional styling
- **config.js** - Configuration (UPDATE REQUIRED)
- **schedule.json** - All 104 matches

### Database
- **DATABASE_SCHEMA.sql** - PostgreSQL schema

### Documentation (READ THESE!)
1. **DEPLOYMENT.md** ← Start here!
2. **COMPLETE_SETUP_GUIDE.md** - Step-by-step setup
3. **ADMIN_GUIDE.md** - Admin responsibilities
4. **PARTICIPANT_GUIDE.md** - How participants use the app
5. **PARTICIPANTS.md** - How to add 26 members
6. **FILES_OVERVIEW.md** - What each file does

---

## 🎮 How It Works

### User Flow

```
1. Participant Opens App
        ↓
2. Enters Their ID (P01-P26)
        ↓
3. Makes Predictions
   - Match result (A/D/B)
   - Match score
   - Advancing team (knockout only)
        ↓
4. Clicks "Save"
   - Stored in Supabase
   - Locked after kickoff
        ↓
5. Views Leaderboard
   - See current standings
   - See their points
   - See prize money earned
```

### Admin Flow

```
1. Admin Logins
   - Enter admin password
   - See Admin Panel
        ↓
2. Manage Participants
   - Add 26 members
   - Edit details
   - View stats
        ↓
3. Enter Match Results
   - After each match
   - Score A, Score B, Result
   - System auto-calculates points
        ↓
4. Check Leaderboard
   - Automatically updates
   - Points calculated
   - Prizes distributed
        ↓
5. Export Reports
   - CSV exports
   - Final leaderboard
   - Prize ledger
```

---

## 🏗️ Technology Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | Vanilla JS + HTML/CSS | Fast, no build needed |
| **Backend** | Supabase (PostgreSQL) | Real-time, auto-scaling |
| **Hosting** | Vercel/Netlify | Free, instant deploy |
| **Database** | PostgreSQL | Reliable, proven |
| **Security** | RLS Policies | Permission controls |

**Total Cost:** FREE for up to 100K requests/month (more than enough!)

---

## ✅ Pre-Deployment Checklist

Before launching:

- [ ] Supabase project created
- [ ] `config.js` updated with credentials
- [ ] Files renamed (no `-v2`)
- [ ] App deployed to web
- [ ] Database schema imported
- [ ] 26 participants added
- [ ] Test login as P01
- [ ] Test making predictions
- [ ] Test admin login
- [ ] Test entering results
- [ ] Leaderboard working
- [ ] Share URL with team

---

## 📚 Documentation by Role

### 👤 Participants
→ Read: [PARTICIPANT_GUIDE.md](PARTICIPANT_GUIDE.md)

**What you need to know:**
- How to login
- How to make predictions
- How scoring works
- How prizes are distributed
- Important deadlines

### 👨‍💼 Admins
→ Read: [ADMIN_GUIDE.md](ADMIN_GUIDE.md)

**What you need to do:**
- Pre-tournament setup
- Daily match management
- Result entry
- Score calculation
- Prize distribution
- Troubleshooting

### 🛠️ Developers/Deployers
→ Read: [DEPLOYMENT.md](DEPLOYMENT.md) & [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md)

**What you need to implement:**
- Supabase setup
- Configuration
- Deployment
- Database schema
- Adding participants

---

## 🐛 Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| App won't connect | Check config.js credentials |
| Can't login | Verify participant ID exists in database |
| Predictions not saving | Refresh page, check internet, verify RLS |
| Leaderboard stuck | Go to Admin → Recalculate Scoring |
| Admin login fails | Check ADMIN_PASSWORD in config.js |
| Times showing wrong | Verify schedule.json has Nepal times |

**More help:** See [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md#troubleshooting)

---

## 🌍 Deployment Options

### Option A: Vercel (Recommended ⭐)
- **Easiest**
- **Automatic updates**
- **Free custom domain**
- **Recommended for: Most users**

### Option B: Netlify
- **Simple drag & drop**
- **Free static hosting**
- **Recommended for: Beginners**

### Option C: GitHub Pages
- **Completely free**
- **GitHub URL**
- **Recommended for: Technical users**

### Option D: Self-hosted
- **Full control**
- **Your own server**
- **Recommended for: Enterprise users**

👉 **See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions**

---

## 🎯 Tournament Timeline

| Date | Event |
|------|-------|
| June 1 | Deploy app & add participants |
| June 11 | Tournament starts |
| June 12 | First match & predictions open |
| June 12-24 | Group stage (72 matches) |
| June 28-29 | Round of 16 (8 matches) |
| July 2-3 | Quarterfinals (4 matches) |
| July 6-7 | Semifinals (2 matches) |
| July 13 | Final match |
| July 14-15 | Final scoring & results |
| July 16+ | Prize distribution |

---

## 💡 Pro Tips

### For Success
1. **Test everything** before launch
2. **Back up data** weekly
3. **Communicate regularly** with participants
4. **Document decisions** (tie-breaking, etc.)
5. **Be transparent** about rules

### For Engagement
1. Send daily match reminders
2. Post leaderboard updates
3. Celebrate milestones
4. Highlight tie races
5. Announce prizes clearly

### For Fair Play
1. Lock predictions at kickoff
2. Use official scores only
3. Double-check results
4. Apply tie-breaking rules
5. Be consistent

---

## 📞 Support & Resources

**Need help?**

1. Check the documentation:
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment & quick start
   - [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md) - Detailed setup
   - [ADMIN_GUIDE.md](ADMIN_GUIDE.md) - Admin tasks
   - [PARTICIPANT_GUIDE.md](PARTICIPANT_GUIDE.md) - User guide

2. Check external resources:
   - Supabase docs: https://supabase.com/docs
   - Vercel docs: https://vercel.com/docs
   - GitHub help: https://help.github.com

3. Troubleshoot:
   - Check browser console (F12)
   - Review Supabase dashboard
   - Check deployment logs

---

## 🎉 Ready to Launch?

Your complete World Cup 2026 prediction platform is ready!

**Next steps:**
1. Read [DEPLOYMENT.md](DEPLOYMENT.md)
2. Follow the 5-step quick start
3. Test thoroughly
4. Share with your 26 participants
5. Manage the tournament
6. Distribute prizes
7. Celebrate! 🏆

---

## 📊 By The Numbers

- **26** Participants
- **104** Matches
- **31** Days of tournament
- **₹36,800** Total prizes
- **10** Features built-in
- **8** Database tables
- **0** Monthly cost
- **∞** Fun factor

---

## ⚽ Let's Get Started!

👉 **First step: Read [DEPLOYMENT.md](DEPLOYMENT.md)**

Then follow the 5-step quick start to have your app live in 30 minutes!

---

## 📄 License & Credits

This application was built specifically for World Cup 2026 predictions.

- **Build:** 2024
- **Tournament:** June 11 - July 13, 2026
- **Participants:** 26
- **Prize Pool:** ₹36,800

---

## 🏆 Good Luck!

May your prediction league be filled with exciting moments, fair competition, and happy winners!

**⚽ Let the games begin!** 🎉

---

*For questions or issues, see [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md) or contact your admin.*

*Last updated: June 2024*
