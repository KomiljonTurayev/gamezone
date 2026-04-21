package uz.gamezone.app;

/**
 * Reklama tizimlari uchun umumiy interfeys.
 * Bu orqali kelajakda AdMob ni UnityAds yoki boshqa tizimga osongina almashtirish mumkin.
 */
public interface AdManager {
    void initialize();
    void showInterstitial();
    void showRewarded(OnRewardListener listener);
    void resume();
    void pause();
    void destroy();

    void addStatusListener(AdStatusListener listener);
    void removeStatusListener(AdStatusListener listener);

    /** Mukofotni qaytarish uchun callback */
    interface OnRewardListener {
        void onRewardEarned(int amount);
    }

    /** Reklama holatini kuzatish uchun observer interfeysi */
    interface AdStatusListener {
        void onAdLoaded(String adType);
        void onAdFailed(String adType, String error);
    }
}