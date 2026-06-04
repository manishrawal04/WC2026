// =====================================================
// World Cup 2026 Prediction Game - Main Application
// =====================================================

if (!validateConfig()) {
  document.body.innerHTML = '<h1 style="color:red; padding:20px;">ERROR: Configuration not set. Update config.js with your Supabase credentials.</h1>';
}

// ==================== INITIALIZATION ====================

window.addEventListener('DOMContentLoaded', async () => {
  await loadSchedule();
  await checkExistingLogin();
});

// ==================== LOGIN FUNCTIONS ====================

async function checkExistingLogin() {
  const savedParticipantId = localStorage.getItem('currentParticipant');
  if (savedParticipantId) {
    const { data } = await supabase
      .from('participants')
      .select('*')
      .eq('participant_id', savedParticipantId)
      .single();
    
    if (data) {
      CURRENT_USER = data;
      showLoggedInUI();
      showPage('predictions');
    }
  }
}

async function loginParticipant() {
  const pid = document.getElementById('participantId').value.trim();
  
  if (!pid) {
    alert('Please enter a participant ID');
    return;
  }

  try {
    const { data } = await supabase
      .from('participants')
      .select('*')
      .eq('participant_id', pid)
      .single();

    if (!data) {
      alert('Participant not found. Please check your ID.');
      return;
    }

    CURRENT_USER = data;
    localStorage.setItem('currentParticipant', pid);
    showLoggedInUI();
    showPage('predictions');
  } catch (error) {
    alert('Error logging in: ' + error.message);
  }
}

async function loginAdmin() {
  const password = document.getElementById('adminPassword').value;
  
  if (password !== CONFIG.ADMIN_PASSWORD) {
    alert('Incorrect admin password');
    return;
  }

  IS_ADMIN = true;
  CURRENT_USER = { name: 'Admin', participant_id: 'ADMIN', id: 'admin' };
  localStorage.setItem('isAdmin', 'true');
  showLoggedInUI();
  showPage('admin');
}

function logout() {
  CURRENT_USER = null;
  IS_ADMIN = false;
  localStorage.removeItem('currentParticipant');
  localStorage.removeItem('isAdmin');
  showPage('login');
  document.getElementById('userSection').style.display = 'none';
}

function adminToggle() {
  if (IS_ADMIN) {
    showPage('admin');
  }
}

function showLoggedInUI() {
  document.getElementById('userSection').style.display = 'flex';
  document.getElementById('userDisplay').textContent = `Hello, ${CURRENT_USER.name}!`;
  
  // Show navigation buttons
  document.getElementById('navPredictions').style.display = 'block';
  document.getElementById('navTournament').style.display = 'block';
  document.getElementById('navLeaderboard').style.display = 'block';
  document.getElementById('navResults').style.display = 'block';
  
  if (IS_ADMIN) {
    document.getElementById('navAdmin').style.display = 'block';
    document.getElementById('adminBtn').style.display = 'block';
  }
}

// ==================== PAGE NAVIGATION ====================

function showPage(pageName) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageName).classList.add('active');
  
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  event.target?.classList.add('active');

  // Load page-specific content
  if (pageName === 'leaderboard') {
    loadLeaderboard();
  } else if (pageName === 'results') {
    loadResults();
  } else if (pageName === 'admin') {
    loadAdminPanel();
  }
}

// ==================== SCHEDULE LOADING ====================

async function loadSchedule() {
  try {
    const response = await fetch('schedule.json');
    SCHEDULE = await response.json();
  } catch (error) {
    console.error('Error loading schedule:', error);
    alert('Error loading match schedule');
  }
}

// ==================== PREDICTIONS PAGE ====================

let currentFilterStage = 'all';

function filterMatches(stage) {
  currentFilterStage = stage;
  renderMatches();
  
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target?.classList.add('active');
}

function renderMatches() {
  const container = document.getElementById('matchesContainer');
  container.innerHTML = '';

  const filtered = currentFilterStage === 'all' 
    ? SCHEDULE 
    : SCHEDULE.filter(m => m.stage === currentFilterStage);

  filtered.forEach(match => {
    const matchDiv = document.createElement('div');
    matchDiv.className = 'match-card';
    
    const isLocked = isAfterKickoff(match);
    const lockClass = isLocked ? 'match-locked' : '';
    
    matchDiv.innerHTML = `
      <div class="match-header ${lockClass}">
        <span class="match-number">Match #${match.match_id}</span>
        <span class="match-stage">${match.stage} ${match.group ? 'Group ' + match.group : ''}</span>
        ${isLocked ? '<span class="lock-badge">🔒 Locked</span>' : ''}
      </div>
      <div class="match-info">
        <div class="match-time">${formatNPTDate(match.match_date_nepal)} NPT</div>
        <div class="match-venue">${match.venue}</div>
      </div>
      <div class="match-teams">
        <div class="team">${match.team_a}</div>
        <div class="vs">VS</div>
        <div class="team">${match.team_b}</div>
      </div>
      <div class="prediction-form ${isLocked ? 'disabled' : ''}">
        <div class="form-row">
          <label>Result</label>
          <select id="result_${match.match_id}" ${isLocked ? 'disabled' : ''}>
            <option value="">-</option>
            <option value="A">${match.team_a} Wins</option>
            <option value="D">Draw</option>
            <option value="B">${match.team_b} Wins</option>
          </select>
        </div>
        <div class="form-row">
          <label>Score</label>
          <input type="number" id="score_a_${match.match_id}" min="0" max="99" placeholder="A" ${isLocked ? 'disabled' : ''}>
          <span class="score-sep">-</span>
          <input type="number" id="score_b_${match.match_id}" min="0" max="99" placeholder="B" ${isLocked ? 'disabled' : ''}>
        </div>
        ${match.stage !== 'Group' ? `
          <div class="form-row">
            <label>Advancing Team</label>
            <select id="advancing_${match.match_id}" ${isLocked ? 'disabled' : ''}>
              <option value="">-</option>
              <option value="${match.team_a}">${match.team_a}</option>
              <option value="${match.team_b}">${match.team_b}</option>
            </select>
          </div>
        ` : ''}
      </div>
    `;
    
    container.appendChild(matchDiv);
  });

  loadUserPredictions();
}

async function loadUserPredictions() {
  if (!CURRENT_USER) return;

  try {
    const { data } = await supabase
      .from('predictions')
      .select('*')
      .eq('participant_id', CURRENT_USER.id);

    if (data) {
      data.forEach(pred => {
        const resultEl = document.getElementById(`result_${pred.match_id}`);
        const scoreAEl = document.getElementById(`score_a_${pred.match_id}`);
        const scoreBEl = document.getElementById(`score_b_${pred.match_id}`);
        const advancingEl = document.getElementById(`advancing_${pred.match_id}`);

        if (resultEl) resultEl.value = pred.predicted_result || '';
        if (scoreAEl) scoreAEl.value = pred.predicted_score_a || '';
        if (scoreBEl) scoreBEl.value = pred.predicted_score_b || '';
        if (advancingEl) advancingEl.value = pred.predicted_advancing_team || '';
      });
    }
  } catch (error) {
    console.error('Error loading predictions:', error);
  }
}

async function savePredictions() {
  if (!CURRENT_USER) {
    alert('Please login first');
    return;
  }

  const predictions = [];

  SCHEDULE.forEach(match => {
    const result = document.getElementById(`result_${match.match_id}`)?.value || '';
    const scoreA = document.getElementById(`score_a_${match.match_id}`)?.value;
    const scoreB = document.getElementById(`score_b_${match.match_id}`)?.value;
    const advancing = document.getElementById(`advancing_${match.match_id}`)?.value || '';

    if (result || scoreA || scoreB || advancing) {
      predictions.push({
        participant_id: CURRENT_USER.id,
        match_id: match.match_id,
        predicted_result: result || null,
        predicted_score_a: scoreA ? parseInt(scoreA) : null,
        predicted_score_b: scoreB ? parseInt(scoreB) : null,
        predicted_advancing_team: advancing || null,
      });
    }
  });

  try {
    // Delete existing predictions for this user
    await supabase
      .from('predictions')
      .delete()
      .eq('participant_id', CURRENT_USER.id);

    // Insert new predictions
    if (predictions.length > 0) {
      const { error } = await supabase
        .from('predictions')
        .insert(predictions);

      if (error) throw error;
    }

    alert(`✓ Saved ${predictions.length} predictions!`);
  } catch (error) {
    alert('Error saving predictions: ' + error.message);
  }
}

function clearPredictions() {
  if (confirm('Clear all predictions on this form?')) {
    SCHEDULE.forEach(match => {
      const resultEl = document.getElementById(`result_${match.match_id}`);
      const scoreAEl = document.getElementById(`score_a_${match.match_id}`);
      const scoreBEl = document.getElementById(`score_b_${match.match_id}`);
      const advancingEl = document.getElementById(`advancing_${match.match_id}`);

      if (resultEl) resultEl.value = '';
      if (scoreAEl) scoreAEl.value = '';
      if (scoreBEl) scoreBEl.value = '';
      if (advancingEl) advancingEl.value = '';
    });
  }
}

// ==================== TOURNAMENT PICKS ====================

async function saveTournamentPicks() {
  if (!CURRENT_USER) {
    alert('Please login first');
    return;
  }

  const picks = {
    participant_id: CURRENT_USER.id,
    predicted_winner: document.getElementById('tournamentWinner').value.trim(),
    predicted_runner_up: document.getElementById('tournamentRunnerUp').value.trim(),
    predicted_golden_ball: document.getElementById('tournamentGoldenBall').value.trim(),
    predicted_golden_boot: document.getElementById('tournamentGoldenBoot').value.trim(),
  };

  try {
    const { error } = await supabase
      .from('tournament_picks')
      .upsert(picks, { onConflict: 'participant_id' });

    if (error) throw error;
    alert('✓ Tournament picks saved!');
  } catch (error) {
    alert('Error saving tournament picks: ' + error.message);
  }
}

async function loadTournamentPicks() {
  if (!CURRENT_USER) return;

  try {
    const { data } = await supabase
      .from('tournament_picks')
      .select('*')
      .eq('participant_id', CURRENT_USER.id)
      .single();

    if (data) {
      document.getElementById('tournamentWinner').value = data.predicted_winner || '';
      document.getElementById('tournamentRunnerUp').value = data.predicted_runner_up || '';
      document.getElementById('tournamentGoldenBall').value = data.predicted_golden_ball || '';
      document.getElementById('tournamentGoldenBoot').value = data.predicted_golden_boot || '';
    }
  } catch (error) {
    console.error('Error loading tournament picks:', error);
  }
}

// ==================== LEADERBOARD ====================

async function loadLeaderboard() {
  try {
    const { data: participants } = await supabase
      .from('participants')
      .select('*')
      .order('total_points', { ascending: false });

    const { data: predictions } = await supabase
      .from('predictions')
      .select('*');

    const leaderboardTable = document.getElementById('leaderboardTable');
    leaderboardTable.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Participant</th>
            <th>Points</th>
            <th>Prize Earned (₹)</th>
            <th>Predictions</th>
          </tr>
        </thead>
        <tbody>
          ${participants.map((p, idx) => {
            const userPreds = predictions?.filter(pr => pr.participant_id === p.id).length || 0;
            return `
              <tr>
                <td class="rank-cell">${idx + 1}${idx === 0 ? ' 🏆' : ''}</td>
                <td>${p.name}</td>
                <td class="points-cell">${p.total_points || 0}</td>
                <td class="prize-cell">${formatCurrency(p.total_prize || 0)}</td>
                <td>${userPreds}/104</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;

    // Update stats
    document.getElementById('participantCount').textContent = `${participants?.length || 0}/26`;
    document.getElementById('submissionCount').textContent = predictions?.length || 0;
  } catch (error) {
    console.error('Error loading leaderboard:', error);
  }
}

// ==================== RESULTS PAGE ====================

function filterResults(status) {
  // Implementation for filtering results
}

async function loadResults() {
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = '';

  SCHEDULE.filter(m => m.actual_result).forEach(match => {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-card';
    resultDiv.innerHTML = `
      <div class="result-header">
        <span>Match #${match.match_id}</span>
        <span>${match.stage} ${match.group ? 'Group ' + match.group : ''}</span>
      </div>
      <div class="result-teams">
        <div class="result-team">${match.team_a} <span class="result-score">${match.actual_score_a}</span></div>
        <div class="result-team">${match.team_b} <span class="result-score">${match.actual_score_b}</span></div>
      </div>
      <div class="result-info">
        <p>Result: ${match.actual_result === 'A' ? match.team_a + ' won' : match.actual_result === 'D' ? 'Draw' : match.team_b + ' won'}</p>
        ${match.advancing_team ? `<p>Advanced: ${match.advancing_team}</p>` : ''}
      </div>
    `;
    resultsContainer.appendChild(resultDiv);
  });
}

// ==================== ADMIN PANEL ====================

function showAdminTab(tabName) {
  document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById('admin' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).classList.add('active');
  
  document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target?.classList.add('active');
}

async function loadAdminPanel() {
  if (!IS_ADMIN) return;

  // Load participants
  const { data: participants } = await supabase
    .from('participants')
    .select('*')
    .order('participant_id');

  const tbody = document.getElementById('participantTableBody');
  tbody.innerHTML = '';

  participants.forEach(p => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${p.participant_id}</td>
      <td>${p.name}</td>
      <td>${p.email || '-'}</td>
      <td>${p.paid_status ? '✓' : '✗'}</td>
      <td>${p.total_points || 0}</td>
      <td>${formatCurrency(p.total_prize || 0)}</td>
    `;
    tbody.appendChild(row);
  });
}

async function addParticipant() {
  const pid = document.getElementById('newParticipantId').value.trim();
  const name = document.getElementById('newParticipantName').value.trim();
  const email = document.getElementById('newParticipantEmail').value.trim();

  if (!pid || !name) {
    alert('Please enter participant ID and name');
    return;
  }

  try {
    const { error } = await supabase
      .from('participants')
      .insert({
        participant_id: pid,
        name: name,
        email: email || null,
      });

    if (error) throw error;

    alert(`✓ Added ${name} (${pid})`);
    document.getElementById('newParticipantId').value = '';
    document.getElementById('newParticipantName').value = '';
    document.getElementById('newParticipantEmail').value = '';
    loadAdminPanel();
  } catch (error) {
    alert('Error adding participant: ' + error.message);
  }
}

async function recalculateScoring() {
  const status = document.getElementById('scoringStatus');
  status.innerHTML = '⏳ Calculating...';

  try {
    const { data: participants } = await supabase.from('participants').select('*');
    const { data: predictions } = await supabase.from('predictions').select('*');

    let totalProcessed = 0;

    for (const participant of participants) {
      let totalPoints = 0;
      let totalPrize = 0;

      const userPredictions = predictions.filter(p => p.participant_id === participant.id);

      userPredictions.forEach(pred => {
        const match = SCHEDULE.find(m => m.match_id === pred.match_id);
        if (!match || !match.actual_result) return;

        // Calculate points
        if (pred.predicted_result === match.actual_result) {
          totalPoints += match.stage === 'Group' ? SCORING.GROUP_STAGE.CORRECT_RESULT : SCORING.KNOCKOUT_STAGE.CORRECT_ADVANCING;

          if (pred.predicted_score_a === match.actual_score_a && pred.predicted_score_b === match.actual_score_b) {
            totalPoints += match.stage === 'Group' ? SCORING.GROUP_STAGE.EXACT_SCORE : SCORING.KNOCKOUT_STAGE.EXACT_SCORE;
          }
        }
      });

      await supabase
        .from('participants')
        .update({ total_points: totalPoints })
        .eq('id', participant.id);

      totalProcessed++;
    }

    status.innerHTML = `✓ Scoring calculated for ${totalProcessed} participants`;
  } catch (error) {
    status.innerHTML = `✗ Error: ${error.message}`;
  }
}

// ==================== EXPORTS ====================

async function exportToCSV(type) {
  const { data: participants } = await supabase.from('participants').select('*');
  const { data: predictions } = await supabase.from('predictions').select('*');
  
  let csv = '';

  if (type === 'leaderboard') {
    csv = 'Rank,Participant ID,Name,Points,Prize Earned,Predictions Submitted\n';
    participants.forEach((p, idx) => {
      const userPreds = predictions.filter(pr => pr.participant_id === p.id).length;
      csv += `${idx + 1},${p.participant_id},"${p.name}",${p.total_points},${p.total_prize},${userPreds}\n`;
    });
  } else if (type === 'predictions') {
    csv = 'Participant,Match,Predicted Result,Score A,Score B,Advancing Team\n';
    predictions.forEach(p => {
      const participant = participants.find(pt => pt.id === p.participant_id);
      csv += `"${participant?.name}",${p.match_id},${p.predicted_result},${p.predicted_score_a},${p.predicted_score_b},"${p.predicted_advancing_team || ''}"\n`;
    });
  }

  downloadCSV(csv, `wc2026_${type}_${new Date().toISOString().split('T')[0]}.csv`);
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
