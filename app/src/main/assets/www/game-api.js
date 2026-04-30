/**
 * GameZone Professional Game API
 * Standardizes communication between mini-games and the parent app.
 */
(function(window) {
    "use strict";

    const params = new URLSearchParams(window.location.search);
    const lang = (params.get('lang') || 'uz').toLowerCase();
    const hg = parseInt(params.get('hg') || '2', 10);

    const HEALTH_PROFILES = {
        1: { speed: 1.15, timer: 0.85, penalties: true, motion: 1.1 },
        2: { speed: 1.0, timer: 1.0, penalties: true, motion: 1.0 },
        3: { speed: 0.75, timer: 1.4, penalties: false, motion: 0.7 }
    };

    const profile = HEALTH_PROFILES[hg] || HEALTH_PROFILES[2];

    window.GameAPI = {
        lang: lang,
        healthGroup: hg,
        profile: profile,

        _init: function() {
            console.log(`[GameAPI] Initialized for ${this.lang}`);
            document.documentElement.lang = this.lang;
        },

        /**
         * Vibrate device using Native Bridge
         */
        vibrate: function(ms = 50) {
            if (window.AndroidAdMob && window.AndroidAdMob.vibrate) {
                window.AndroidAdMob.vibrate(ms);
            }
        },

        /**
         * Report the final score to the parent app.
         */
        reportScore: function(gameId, score) {
            console.log(`[GameAPI] Reporting score for ${gameId}: ${score}`);
            window.parent.postMessage({
                type: 'game:score',
                id: gameId,
                score: parseInt(score, 10)
            }, '*');
        },

        /**
         * Trigger interstitial ad or other game-end logic in parent.
         */
        endGame: function() {
            console.log('[GameAPI] Game ended');
            if (window.parent && typeof window.parent.__gameEnd === 'function') {
                window.parent.__gameEnd();
            }
        },

        /**
         * Submit score to global leaderboard via Native Bridge
         */
        submitGlobalScore: function(gameId, score, combo = 0) {
            console.log(`[GameAPI] Submitting Global Stats - Score: ${score}, Combo: ${combo}`);
            if (window.AndroidAdMob && window.AndroidAdMob.submitGlobalScore) {
                window.AndroidAdMob.submitGlobalScore(gameId, parseInt(score, 10), parseInt(combo, 10));
            }
        },

        /**
         * Request a rewarded ad to revive the game.
         * @param {Function} callback - Function to call if reward is granted.
         */
        requestRevive: function(callback) {
            window.addEventListener('rewardGranted', (e) => {
                callback(e.detail.amount);
            }, { once: true });
            if (window.parent && typeof window.parent.__showRewarded === 'function') {
                window.parent.__showRewarded();
            }
        },

        fetchLeaderboard: function(gameId, period = "all") {
            if (window.AndroidAdMob && window.AndroidAdMob.getLeaderboard) {
                window.AndroidAdMob.getLeaderboard(gameId, period);
            }
        },

        /**
         * Get translation for a specific language or fallback.
         */
        t: function(translations, key) {
            const group = translations[this.lang] || translations.en || Object.values(translations)[0];
            return group[key] || key;
        },

        /**
         * Localize an object containing keys for each language.
         */
        localize: function(obj) {
            if (!obj) return "";
            return obj[this.lang] || obj.uz || obj.en || "";
        },

        /**
         * Get best score from localStorage.
         */
        getBestScore: function(gameId) {
            return parseInt(localStorage.getItem(`gz-best-${gameId}`) || '0', 10);
        },

        /**
         * Update best score in localStorage.
         */
        saveBestScore: function(gameId, score) {
            const currentBest = this.getBestScore(gameId);
            if (score > currentBest) {
                localStorage.setItem(`gz-best-${gameId}`, score);
                return true;
            }
            return false;
        },

        /**
         * Get best combo from localStorage.
         */
        getMaxCombo: function(gameId) {
            return parseInt(localStorage.getItem(`gz-max-combo-${gameId}`) || '0', 10);
        },

        /**
         * Update best combo in localStorage.
         */
        saveMaxCombo: function(gameId, combo) {
            const currentBestCombo = this.getMaxCombo(gameId);
            if (combo > currentBestCombo) {
                localStorage.setItem(`gz-max-combo-${gameId}`, combo);
                return true;
            }
            return false;
        }
    };

    // Listen for dispose message from parent to cleanup
    window.addEventListener('message', function(ev) {
        if (ev.data?.type === 'game:dispose') {
            console.log('[GameAPI] Dispose requested');
            // Custom event for games to listen to
            window.dispatchEvent(new CustomEvent('gameDispose'));
        }
    });

    window.GameAPI._init();

})(window);
