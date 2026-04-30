package uz.gamezone.app;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.SoundPool;
import android.os.Vibrator;
import android.os.VibrationEffect;
import android.os.Build;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

/**
 * JavaScript va Android Native kod o'rtasidagi aloqa klassi.
 * SOLID tamoyillari asosida AdManager interfeysi bilan ishlaydi.
 */
public class WebAppInterface {
    private final Activity activity;
    private final AdManager adManager;
    private final WebView webView;
    private SoundPool soundPool;
    private int fireworkSoundId;

    public WebAppInterface(Activity activity, AdManager adManager, WebView webView) {
        this.activity = activity;
        this.adManager = adManager;
        this.webView = webView;
        initSoundPool();
    }

    private void initSoundPool() {
        AudioAttributes attrs = new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_GAME)
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .build();
        
        soundPool = new SoundPool.Builder()
                .setMaxStreams(5)
                .setAudioAttributes(attrs)
                .build();

        // res/raw/firework_pop.mp3 bo'lishi kerak
        int resId = activity.getResources().getIdentifier("firework_pop", "raw", activity.getPackageName());
        if (resId != 0) {
            fireworkSoundId = soundPool.load(activity, resId, 1);
        }
    }

    /**
     * O'yin tugaganda yoki ma'lum bir bosqichda Interstitial reklama ko'rsatish.
     */
    @JavascriptInterface
    public void showInterstitial() {
        activity.runOnUiThread(() -> {
            if (adManager != null) {
                adManager.showInterstitial();
            }
        });
    }

    /**
     * Mukofotli reklama ko'rsatish va natijani JavaScript-ga qaytarish.
     */
    @JavascriptInterface
    public void showRewarded() {
        activity.runOnUiThread(() -> {
            if (adManager != null) {
                adManager.showRewarded(this::sendRewardToJs);
            }
        });
    }

    /**
     * Global reytingga natijani yuborish.
     */
    @JavascriptInterface
    public void submitGlobalScore(String gameId, int score, int maxCombo) {
        android.util.Log.d("Leaderboard", "Global Leaderboard Submission:");
        android.util.Log.d("Leaderboard", "Game: " + gameId + " | Score: " + score + " | Max Combo: " + maxCombo);
        
        // Professional darajada bu yerda Google Play Games Services 
        // yoki Firebase Firestore-ga ma'lumot yuborish kodi yoziladi.
    }

    /**
     * Reyting jadvalini olish.
     */
    @JavascriptInterface
    public void getLeaderboard(String gameId, String period) {
        activity.runOnUiThread(() -> {
            // Simulyatsiya: Serverdan ma'lumot kelganda JS-ga qaytarish
            webView.evaluateJavascript(String.format("if(window.onLeaderboardLoaded) { window.onLeaderboardLoaded([], '%s'); }", period), null);
        });
    }

    /**
     * Mushakbozlik ovozini ijro etish.
     */
    @JavascriptInterface
    public void playFireworkSound() {
        if (soundPool != null && fireworkSoundId != 0) {
            soundPool.play(fireworkSoundId, 0.6f, 0.6f, 1, 0, 1.0f);
        }
    }

    /**
     * Matnli natijani native share sheet orqali ulashish.
     */
    @JavascriptInterface
    public void shareText(String text) {
        Intent sendIntent = new Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_TEXT, text);
        sendIntent.setType("text/plain");

        Intent shareIntent = Intent.createChooser(sendIntent, null);
        activity.startActivity(shareIntent);
    }

    /**
     * Qurilmani vibratsiya qilish. O'yinlardagi effektlar uchun.
     */
    @JavascriptInterface
    public void vibrate(int milliseconds) {
        Vibrator v = (Vibrator) activity.getSystemService(Context.VIBRATOR_SERVICE);
        if (v != null && v.hasVibrator()) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                v.vibrate(VibrationEffect.createOneShot(milliseconds, VibrationEffect.DEFAULT_AMPLITUDE));
            } else {
                v.vibrate(milliseconds);
            }
        }
    }

    /**
     * Qurilma tabletka ekanligini JS-ga bildirish.
     */
    @JavascriptInterface
    public boolean isTablet() {
        return (activity.getResources().getConfiguration().screenLayout
                & android.content.res.Configuration.SCREENLAYOUT_SIZE_MASK)
                >= android.content.res.Configuration.SCREENLAYOUT_SIZE_LARGE;
    }

    /**
     * Mukofot ballarini WebView ichidagi JS funksiyasiga uzatish.
     * Clean Code: UI operatsiyalari har doim Main Thread-da bo'lishi kerak.
     */
    private void sendRewardToJs(int amount) {
        webView.post(() -> {
            String jsCode = String.format(java.util.Locale.US, "if(window.onRewardGranted) { window.onRewardGranted(%d); }", amount);
            webView.evaluateJavascript(jsCode, null);
        });
    }
}