# 26 Participants Template

Copy this list and add your organization's members. Use this to add participants to the system.

## Format: Participant ID | Name | Email

Replace the examples below with your actual team members.

```
P01 | Team Member 1 | member1@company.com
P02 | Team Member 2 | member2@company.com
P03 | Team Member 3 | member3@company.com
P04 | Team Member 4 | member4@company.com
P05 | Team Member 5 | member5@company.com
P06 | Team Member 6 | member6@company.com
P07 | Team Member 7 | member7@company.com
P08 | Team Member 8 | member8@company.com
P09 | Team Member 9 | member9@company.com
P10 | Team Member 10 | member10@company.com
P11 | Team Member 11 | member11@company.com
P12 | Team Member 12 | member12@company.com
P13 | Team Member 13 | member13@company.com
P14 | Team Member 14 | member14@company.com
P15 | Team Member 15 | member15@company.com
P16 | Team Member 16 | member16@company.com
P17 | Team Member 17 | member17@company.com
P18 | Team Member 18 | member18@company.com
P19 | Team Member 19 | member19@company.com
P20 | Team Member 20 | member20@company.com
P21 | Team Member 21 | member21@company.com
P22 | Team Member 22 | member22@company.com
P23 | Team Member 23 | member23@company.com
P24 | Team Member 24 | member24@company.com
P25 | Team Member 25 | member25@company.com
P26 | Team Member 26 | member26@company.com
```

## Steps to Add Participants

### Method 1: Via Admin Panel (Recommended)

1. Login to app with admin credentials
2. Go to **Admin Panel** → **Participants**
3. For each member:
   - Enter **Participant ID** (P01, P02, etc.)
   - Enter **Name** (Full name)
   - Enter **Email** (Optional but recommended)
   - Click **Add Participant**

### Method 2: Via Supabase Dashboard

1. Go to your Supabase project
2. Click **Table Editor** → **participants**
3. Click **Insert** and add each row with:
   - participant_id: P01
   - name: Team Member 1
   - email: member1@company.com
   - paid_status: false
   - entry_fee: 1500

### Method 3: Import CSV (Fastest for 26 members)

1. Create `participants.csv`:
```
participant_id,name,email,paid_status,entry_fee
P01,Team Member 1,member1@company.com,false,1500
P02,Team Member 2,member2@company.com,false,1500
...
```

2. In Supabase Table Editor → participants
3. Click menu → **Import Data** → select CSV file
4. All 26 participants added instantly

## Verification

After adding all 26 participants:

1. In **Admin Panel** → **Participants**, count should show 26 rows
2. Each should have:
   - Unique participant_id (P01-P26)
   - Full name
   - Email (if provided)
   - paid_status: false initially
   - total_points: 0
   - total_prize: 0

## Collection Tracking

Once participants are added, use this to track payments:

| ID | Name | Status | Paid | Amount | Date Paid | Notes |
|---|---|---|---|---|---|---|
| P01 | | Pending | ₹0 | ₹1,500 | | |
| P02 | | Pending | ₹0 | ₹1,500 | | |
| ... | | | | | | |
| P26 | | Pending | ₹0 | ₹1,500 | | |

Update `paid_status` in admin panel or Supabase once payment is received.

**Total to collect: ₹39,000** (26 × ₹1,500)
