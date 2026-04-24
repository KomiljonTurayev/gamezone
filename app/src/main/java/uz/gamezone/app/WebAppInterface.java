package uz.gamezone.app;

import android.app.Activity;
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

    public WebAppInterface(Activity activity, AdManager adManager, WebView webView) {
        this.activity = activity;
        this.adManager = adManager;
        this.webView = webView;
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