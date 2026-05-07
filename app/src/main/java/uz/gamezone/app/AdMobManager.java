package uz.gamezone.app;

import android.app.Activity;
import android.content.res.Configuration;
import android.util.Log;
import android.view.ViewGroup;
import androidx.annotation.NonNull;
import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.RequestConfiguration;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;
import java.util.ArrayList;
import java.util.List;

/**
 * Google AdMob implementatsiyasi.
 * Clean Code tamoyillari asosida yozilgan.
 */
public class AdMobManager implements AdManager {
    private static final String TAG = "AdMobManager";
    
    // Production ID-lar o'rnatildi
    private static final String BANNER_ID = "ca-app-pub-3428867455074987/5333621419";
    private static final String INTERSTITIAL_ID = "ca-app-pub-3428867455074987/4609809001";
    private static final String REWARDED_ID = "ca-app-pub-3428867455074987/1880572836";

    private final Activity activity;
    private final ViewGroup bannerContainer;
    
    private AdView adView;
    private InterstitialAd interstitialAd;
    private RewardedAd rewardedAd;
    private final List<AdStatusListener> listeners = new ArrayList<>();

    // Frequency capping variables
    private long lastInterstitialTime = 0;
    private int interstitialCounter = 0;
    private static final long MIN_AD_INTERVAL_MS = 180000; // 3 minutes
    private static final int AD_EVERY_N_TIMES = 3;

    public AdMobManager(Activity activity, ViewGroup bannerContainer) {
        this.activity = activity;
        this.bannerContainer = bannerContainer;
    }

    @Override
    public void addStatusListener(AdStatusListener listener) {
        if (listener != null && !listeners.contains(listener)) {
            listeners.add(listener);
        }
    }

    @Override
    public void removeStatusListener(AdStatusListener listener) {
        listeners.remove(listener);
    }

    @Override
    public void initialize() {
        // Families Policy & COPPA Compliance: Barcha so'rovlar bolalarga xavfsiz bo'lishi kerak
        RequestConfiguration requestConfiguration = MobileAds.getRequestConfiguration().toBuilder()
                .setTagForChildDirectedTreatment(RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE)
                .setTagForUnderAgeOfConsent(RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_TRUE)
                .setMaxAdContentRating(RequestConfiguration.MAX_AD_CONTENT_RATING_G)
                .build();
        MobileAds.setRequestConfiguration(requestConfiguration);

        MobileAds.initialize(activity, status -> {
            Log.i(TAG, "AdMob Initialized: Production IDs + Families Policy Applied");
            loadBanner();
            loadInterstitial();
            loadRewarded();
        });
    }

    private void loadBanner() {
        adView = new AdView(activity);
        adView.setAdUnitId(BANNER_ID);
        adView.setAdSize(isTablet() ? AdSize.LEADERBOARD : AdSize.BANNER);
        
        adView.setAdListener(new AdListener() {
            @Override
            public void onAdLoaded() {
                if (bannerContainer != null) {
                    bannerContainer.removeAllViews();
                    bannerContainer.addView(adView);
                }
                notifyLoaded("BANNER");
            }
            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError error) {
                Log.e(TAG, "Banner load failed: " + error.getMessage());
                notifyFailed("BANNER", error.getMessage());
            }
        });

        adView.loadAd(createAdRequest());
    }

    private void loadInterstitial() {
        InterstitialAd.load(activity, INTERSTITIAL_ID, createAdRequest(),
            new InterstitialAdLoadCallback() {
                @Override
                public void onAdLoaded(@NonNull InterstitialAd ad) {
                    interstitialAd = ad;
                    notifyLoaded("INTERSTITIAL");
                }
                @Override
                public void onAdFailedToLoad(@NonNull LoadAdError error) {
                    interstitialAd = null;
                    notifyFailed("INTERSTITIAL", error.getMessage());
                }
            });
    }

    private void loadRewarded() {
        RewardedAd.load(activity, REWARDED_ID, createAdRequest(),
            new RewardedAdLoadCallback() {
                @Override
                public void onAdLoaded(@NonNull RewardedAd ad) {
                    rewardedAd = ad;
                    notifyLoaded("REWARDED");
                }
                @Override
                public void onAdFailedToLoad(@NonNull LoadAdError error) {
                    rewardedAd = null;
                    notifyFailed("REWARDED", error.getMessage());
                }
            });
    }

    @Override
    public void showInterstitial() {
        if (activity == null || activity.isFinishing()) return;

        long currentTime = System.currentTimeMillis();
        interstitialCounter++;

        if (interstitialAd != null && 
            (currentTime - lastInterstitialTime >= MIN_AD_INTERVAL_MS) && 
            (interstitialCounter % AD_EVERY_N_TIMES == 0)) {
            
            Log.d(TAG, "Showing Interstitial (Freq Cap passed)");
            interstitialAd.show(activity);
            lastInterstitialTime = currentTime;
            loadInterstitial(); // Reload for next time
        } else {
            String reason = interstitialAd == null ? "Not loaded" : 
                           (currentTime - lastInterstitialTime < MIN_AD_INTERVAL_MS) ? "Too soon" : 
                           "Counter not reached (" + (interstitialCounter % AD_EVERY_N_TIMES) + "/" + AD_EVERY_N_TIMES + ")";
            Log.d(TAG, "Interstitial skip: " + reason);
        }
    }

    @Override
    public void showRewarded(OnRewardListener listener) {
        if (rewardedAd != null) {
            rewardedAd.show(activity, rewardItem -> {
                if (listener != null) listener.onRewardEarned(rewardItem.getAmount());
                loadRewarded(); // Qayta yuklash
            });
        } else {
            Log.w(TAG, "Rewarded ad not ready yet");
        }
    }

    @Override
    public void showBanner() {
        activity.runOnUiThread(() -> {
            if (bannerContainer != null) {
                bannerContainer.setVisibility(android.view.View.VISIBLE);
                if (adView == null) loadBanner();
            }
        });
    }

    @Override
    public void hideBanner() {
        activity.runOnUiThread(() -> {
            if (bannerContainer != null) {
                bannerContainer.setVisibility(android.view.View.GONE);
            }
        });
    }

    @Override
    public void resume() {
        if (adView != null) adView.resume();
    }

    @Override
    public void pause() {
        if (adView != null) adView.pause();
    }

    @Override
    public void destroy() {
        listeners.clear();
        if (adView != null) adView.destroy();
    }

    private void notifyLoaded(String type) {
        for (AdStatusListener listener : listeners) {
            listener.onAdLoaded(type);
        }
    }

    private void notifyFailed(String type, String error) {
        for (AdStatusListener listener : listeners) {
            listener.onAdFailed(type, error);
        }
    }

    private AdRequest createAdRequest() {
        return new AdRequest.Builder().build();
    }

    /** 
     * Qurilma tabletka yoki smartfon ekanligini aniqlash. 
     * Clean Code: Metod nomlanishi tushunarli bo'lishi kerak.
     */
    private boolean isTablet() {
        return (activity.getResources().getConfiguration().screenLayout
                & Configuration.SCREENLAYOUT_SIZE_MASK)
                >= Configuration.SCREENLAYOUT_SIZE_LARGE;
    }
}