-- =====================================================
-- World Cup 2026 Prediction Game - Database Schema
-- =====================================================

-- 1. PARTICIPANTS TABLE
CREATE TABLE participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  paid_status BOOLEAN DEFAULT FALSE,
  entry_fee DECIMAL(10,2) DEFAULT 1500.00,
  total_points INTEGER DEFAULT 0,
  total_prize DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. MATCHES TABLE
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id INTEGER UNIQUE NOT NULL,
  stage TEXT NOT NULL, -- 'Group', 'Round of 16', 'Quarterfinal', 'Semifinal', 'Final'
  group_name TEXT, -- e.g., 'A', 'B', NULL for knockout
  match_date_utc TIMESTAMP,
  match_date_nepal TIMESTAMP,
  nepal_time_npt TEXT,
  venue TEXT,
  team_a TEXT NOT NULL,
  team_b TEXT NOT NULL,
  actual_score_a INTEGER,
  actual_score_b INTEGER,
  actual_result TEXT, -- 'A', 'D', 'B', NULL if not played
  advancing_team TEXT, -- for knockout only
  prediction_lock_time TIMESTAMP,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. PREDICTIONS TABLE
CREATE TABLE predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  match_id INTEGER NOT NULL,
  predicted_score_a INTEGER,
  predicted_score_b INTEGER,
  predicted_result TEXT, -- 'A', 'D', 'B'
  predicted_advancing_team TEXT, -- for knockout only
  submitted_at TIMESTAMP DEFAULT NOW(),
  is_locked BOOLEAN DEFAULT FALSE,
  points_awarded INTEGER DEFAULT 0,
  match_prize_awarded DECIMAL(10,2) DEFAULT 0,
  UNIQUE(participant_id, match_id),
  FOREIGN KEY (match_id) REFERENCES matches(match_id)
);

-- 4. TOURNAMENT PICKS TABLE
CREATE TABLE tournament_picks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  predicted_winner TEXT,
  predicted_runner_up TEXT,
  predicted_golden_ball TEXT,
  predicted_golden_boot TEXT,
  submitted_at TIMESTAMP DEFAULT NOW(),
  bonus_points INTEGER DEFAULT 0,
  bonus_prize_awarded DECIMAL(10,2) DEFAULT 0,
  UNIQUE(participant_id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. ACTUAL TOURNAMENT RESULTS
CREATE TABLE tournament_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  result_type TEXT UNIQUE NOT NULL, -- 'winner', 'runner_up', 'golden_ball', 'golden_boot'
  team_or_player TEXT NOT NULL,
  confirmed_at TIMESTAMP DEFAULT NOW()
);

-- 6. MATCH PRIZES TABLE (tracks daily/match prizes)
CREATE TABLE match_prizes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id INTEGER NOT NULL,
  prize_amount DECIMAL(10,2) NOT NULL,
  number_of_winners INTEGER DEFAULT 0,
  prize_per_winner DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (match_id) REFERENCES matches(match_id)
);

-- 7. PRIZE LEDGER TABLE
CREATE TABLE prize_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  prize_type TEXT NOT NULL, -- 'match_result', 'exact_score', 'advancing_team', 'golden_ball', 'golden_boot', 'overall_winner'
  match_id INTEGER,
  amount DECIMAL(10,2) NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. ADMIN SETTINGS
CREATE TABLE admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_picks ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_prizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE prize_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public read, controlled write
CREATE POLICY "Allow all to view participants" ON participants FOR SELECT USING (true);
CREATE POLICY "Allow insert participant" ON participants FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update participant" ON participants FOR UPDATE USING (true);

CREATE POLICY "Allow all to view matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Allow insert match" ON matches FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update match" ON matches FOR UPDATE USING (true);

CREATE POLICY "Allow all to view predictions" ON predictions FOR SELECT USING (true);
CREATE POLICY "Allow insert prediction" ON predictions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update prediction" ON predictions FOR UPDATE USING (true);

CREATE POLICY "Allow all to view tournament picks" ON tournament_picks FOR SELECT USING (true);
CREATE POLICY "Allow insert tournament picks" ON tournament_picks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update tournament picks" ON tournament_picks FOR UPDATE USING (true);

CREATE POLICY "Allow all to view tournament results" ON tournament_results FOR SELECT USING (true);
CREATE POLICY "Allow insert results" ON tournament_results FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all to view match prizes" ON match_prizes FOR SELECT USING (true);
CREATE POLICY "Allow insert match prizes" ON match_prizes FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all to view prize ledger" ON prize_ledger FOR SELECT USING (true);
CREATE POLICY "Allow insert prize ledger" ON prize_ledger FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all to view settings" ON admin_settings FOR SELECT USING (true);
CREATE POLICY "Allow update settings" ON admin_settings FOR UPDATE USING (true);

-- Create indexes for performance
CREATE INDEX idx_predictions_participant ON predictions(participant_id);
CREATE INDEX idx_predictions_match ON predictions(match_id);
CREATE INDEX idx_tournament_picks_participant ON tournament_picks(participant_id);
CREATE INDEX idx_prize_ledger_participant ON prize_ledger(participant_id);
