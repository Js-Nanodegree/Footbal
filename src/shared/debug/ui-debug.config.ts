// Универсальный debug-конфиг для эмуляции UI-состояний (empty, error, loading)
// Меняй значения true/true для нужных секций и экранов

export const uiDebugConfig = {
  emptyState: {
    all: true, // глобальный флаг для всего UI
    matchHistory: {
      all: true,
      players: true,
      stats: true,
      card: true,
      matches: true,
    },
    home: {
      all: true,
      todayMatches: true,
      finishedMatches: true,
      teams: true,
      competitions: true,
    },
  },
  errorState: {
    all: true,
    matchHistory: {
      all: true,
      players: true,
      stats: true,
      card: true,
      matches: true,
    },
    home: {
      all: true,
      todayMatches: true,
      finishedMatches: true,
      teams: true,
      competitions: true,
    },
  },
  loadingState: {
    all: true,
    matchHistory: {
      all: true,
      players: true,
      stats: true,
      card: true,
      matches: true,
    },
    home: {
      all: true,
      todayMatches: true,
      finishedMatches: true,
      teams: true,
      competitions: true,
    },
  },
}; 