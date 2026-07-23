const STORAGE_KEY = 'quizProgress'
const STAGE_STORAGE_KEY = 'quizStageProgress'
export const PASS_THRESHOLD = 95

export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function loadStageProgress() {
  try {
    return JSON.parse(localStorage.getItem(STAGE_STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export function saveStageProgress(stageProgress) {
  localStorage.setItem(STAGE_STORAGE_KEY, JSON.stringify(stageProgress))
}

export function groupPct(groupKey, groups, progress) {
  const items = groups[groupKey]?.items || []
  if (items.length === 0) return 0
  const sum = items.reduce((s, k) => s + (progress[k] || 0), 0)
  return Math.round(sum / items.length)
}

export function groupPassed(groupKey, groups, progress, threshold = PASS_THRESHOLD) {
  const items = groups[groupKey]?.items || []
  return items.length > 0 && items.every(k => (progress[k] || 0) >= threshold)
}

export function isLevelUnlocked(idx, levelOrder, groups, progress) {
  return idx === 0 || groupPassed(levelOrder[idx - 1], groups, progress)
}
