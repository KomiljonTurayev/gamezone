package uz.gamezone.app;

import static uz.gamezone.app.CallGeminiKt.callGemini;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.Configuration;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;
import android.net.NetworkInfo;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.activity.OnBackPressedCallback;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.splashscreen.SplashScreen;
import androidx.lifecycle.ViewModelProvider;
import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;
import android.widget.ProgressBar;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements AdManager.AdStatusListener {

    private WebView webView;
    private AdManager adManager;
    private ProgressBar loadingProgress;
    private static final String APP_URL = "file:///android_asset/www/index.html";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.installSplashScreen(this);
        super.onCreate(savedInstanceState);
        
        // UI Settings
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_main);
        
        loadingProgress = findViewById(R.id.loadingProgress);

        // Initialize Components
        adManager = new AdMobManager(this, findViewById(R.id.bannerContainer));
        adManager.addStatusListener(this);
        adManager.initialize();
        
        setupWebView();
        callGemini("O'yinlar haqida qiziqarli faktlar ayt");

        setupBackNavigation();
    }

    @Override
    public void onAdLoaded(String adType) {
        runOnUiThread(() -> {
            if (loadingProgress != null) loadingProgress.setVisibility(View.GONE);
            android.util.Log.d("GameZone", adType + " yuklandi va tayyor.");
        });
    }

    @Override
    public void onAdFailed(String adType, String error) {
        runOnUiThread(() -> {
            if (loadingProgress != null) loadingProgress.setVisibility(View.GONE);
            // Faqat rewarded reklama bo'lsa xatolikni ko'rsatishimiz mumkin
            if ("REWARDED".equals(adType)) {
                Toast.makeText(this, "Video yuklanishda xatolik: " + error, Toast.LENGTH_SHORT).show();
            }
        });
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void setupWebView() {
        webView = findViewById(R.id.webView);
        WebSettings settings = webView.getSettings();
        
        WebViewConfigurator.apply(settings, isNetworkAvailable());
        
        webView.addJavascriptInterface(new WebAppInterface(this, adManager, webView), "AndroidAdMob");
        webView.setWebViewClient(new AppWebViewClient());
        webView.setWebChromeClient(new WebChromeClient());
        webView.loadUrl(APP_URL);
    }

    private void hideSystemUI() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsetsController controller = getWindow().getInsetsController();
            if (controller != null) {
                controller.hide(WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars());
                controller.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            }
        } else {
            getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN);
        }
    }

    private void setupBackNavigation() {
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (webView != null && webView.canGoBack()) webView.goBack();
                else finish();
            }
        });
    }

    private boolean isNetworkAvailable() {
        return NetworkUtils.isAvailable(this);
    }

    @Override protected void onResume() {
        super.onResume();
        adManager.resume();
        hideSystemUI();
    }

    @Override public void onWindowFocusChanged(boolean hasFocus) { if (hasFocus) hideSystemUI(); }

    @Override protected void onPause() {
        adManager.pause();
        super.onPause();
    }
    @Override protected void onDestroy() {
        adManager.removeStatusListener(this);
        adManager.destroy();
        if (webView != null) {
            ((android.view.ViewGroup) webView.getParent()).removeView(webView);
            webView.stopLoading();
            webView.destroy();
        }
        super.onDestroy();
    }
}
