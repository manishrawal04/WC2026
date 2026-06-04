// =====================================================
// Configuration and Supabase Setup
// =====================================================

// UPDATE THESE WITH YOUR SUPABASE CREDENTIALS
const CONFIG = {
  SUPABASE_URL: 'https://hxhygdhmkmwkjhwtcxub.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_64cnHu-mlHwaPgalyUGDYQ_6iWSNFAM',
  ORGANIZATION_NAME: 'World Cup 2026 Prediction League',
  TOTAL_PARTICIPANTS: 26,
  ENTRY_FEE: 1500, // in INR
  ADMIN_PASSWORD: 'admin123', // Change this!
};

// SCORING RULES
const SCORING = {
  GROUP_STAGE: {
    CORRECT_RESULT: 3,
    EXACT_SCORE: 5,
    MATCH_PRIZE: 100,
  },
  KNOCKOUT_STAGE: {
    CORRECT_ADVANCING: 5,
    EXACT_SCORE: 8,
    MATCH_PRIZE: 300,
  },
  TOURNAMENT_BONUS: {
    WINNER: 20,
    RUNNER_UP: 10,
    GOLDEN_BALL: 15,
    GOLDEN_BOOT: 15,
  },
};

// PRIZES
const PRIZES = {
  OVERALL_WINNER: 10000,
  GOLDEN_BALL_WINNER: 5000,
  GOLDEN_BOOT_WINNER: 5000,
  GROUP_STAGE_POOL: 7200, // 72 matches × 100
  KNOCKOUT_STAGE_POOL: 9600, // 32 matches × 300
  TOTAL_ESTIMATED: 36800,
  COLLECTION_PER_MEMBER: 1500,
  TOTAL_COLLECTION: 39000, // 26 × 1500
  BUFFER: 2200,
};

// Initialize Supabase
const { createClient } = window.supabase;
const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

// Global state
let CURRENT_USER = null;
let SCHEDULE = [];
let ALL_PARTICIPANTS = [];
let IS_ADMIN = false;
let ALL_PREDICTIONS = [];
let TOURNAMENT_PICKS_DATA = [];

// Utility Functions
const formatNPTDate = (date) => {
  if (!date) return 'TBD';
  return new Date(date).toLocaleString('en-US', { 
    timeZone: 'Asia/Kathmandu',
    month: 'short', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR',
    maximumFractionDigits: 0 
  }).format(amount);
};

const isAfterKickoff = (match) => {
  return match.prediction_lock_time && new Date() > new Date(match.prediction_lock_time);
};

// Validation
const validateConfig = () => {
  if (CONFIG.SUPABASE_URL === 'YOUR_SUPABASE_PROJECT_URL') {
    alert('ERROR: Update your Supabase credentials in config.js');
    return false;
  }
  return true;
};
