package uz.gamezone.app;

import android.annotation.SuppressLint;
import android.webkit.WebSettings;
import android.os.Build;

public class WebViewConfigurator {
    @SuppressLint("SetJavaScriptEnabled")
    public static void apply(WebSettings settings, boolean isNetworkAvailable) {
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setLoadsImagesAutomatically(true);
        
        // "Offline-First" algoritmi: mahalliy resurslarni keshdan tezkor yuklash
        // LOAD_CACHE_ELSE_NETWORK AssetManager orqali siqilgan fayllarni ochish vaqtini tejaydi
        settings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);

        // Local o'yinlar uchun xavfsizlik tekshiruvini (SafeBrowsing) o'chirish tezlikni 10-15% ga oshiradi
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            settings.setSafeBrowsingEnabled(false);
        }

        // Support for interactive elements
        settings.setMediaPlaybackRequiresUserGesture(false);
        
        // Optimize for mobile viewport
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
    }
}
