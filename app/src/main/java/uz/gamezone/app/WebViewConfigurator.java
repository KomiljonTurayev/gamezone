package uz.gamezone.app;

import android.annotation.SuppressLint;
import android.webkit.WebSettings;

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
        
        // Cache settings for better performance in games
        if (isNetworkAvailable) {
            settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        } else {
            settings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
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
