/**
 * admob.js — AdMob bridge stub
 * Android WebView da JavascriptInterface orqali
 * window.AndroidAdMob ob'ekti Java tomonidan avtomatik qo'shiladi.
 * Browser muhitida (test/preview) stub ishlaydi.
 */
(function () {
  if (typeof window.AndroidAdMob === 'undefined') {
    window.AndroidAdMob = {
      showInterstitial: function () {
        console.log('[AdMob stub] showInterstitial chaqirildi');
      },
      showRewarded: function () {
        console.log('[AdMob stub] showRewarded chaqirildi');
        // Browser da mukofotni to'g'ridan-to'g'ri beramiz (test uchun)
        if (typeof window.onRewardGranted === 'function') {
          window.onRewardGranted(1);
        }
      },
      isTablet: function () {
        return window.screen.width >= 768;
      }
    };
    console.log('[AdMob stub] Browser muhiti — stub faollashtirildi');
  }
})();

