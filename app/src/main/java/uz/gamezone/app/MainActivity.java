package uz.gamezone.app;

import static uz.gamezone.app.CallGeminiKt.callGemini;

import android.annotation.SuppressLint;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.splashscreen.SplashScreen;

public class MainActivity extends AppCompatActivity implements AdManager.AdStatusListener {

    private WebView webView;
    private AdManager adManager;
    private ProgressBar loadingProgress;
    private static final String APP_URL = "file:///android_asset/www/index.html";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.installSplashScreen(this);
        super.onCreate(savedInstanceState);
        
        // Full screen
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.R) {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        }
        setContentView(R.layout.activity_main);
        
        loadingProgress = findViewById(R.id.loadingProgress);

        // Initialize Components
        adManager = new AdMobManager(this, findViewById(R.id.bannerContainer));
        adManager.addStatusListener(this);
        adManager.initialize();
        
        setupWebView();
        
        // AI fun facts
        callGemini("O'yinlar haqida qiziqarli faktlar ayt");

        setupBackNavigation();
    }

    @Override
    public void onAdLoaded(String adType) {
        runOnUiThread(() -> {
            if (loadingProgress != null) loadingProgress.setVisibility(View.GONE);
            if ("BANNER".equals(adType)) {
                webView.evaluateJavascript("window.setBannerVisibility(true)", null);
            }
            android.util.Log.d("GameZone", adType + " yuklandi va tayyor.");
        });
    }

    @Override
    public void onAdFailed(String adType, String error) {
        runOnUiThread(() -> {
            if (loadingProgress != null) loadingProgress.setVisibility(View.GONE);
            // Faqat rewarded reklama bo'lsa xatolikni ko'rsatishimiz mumkin
            if ("BANNER".equals(adType)) {
                webView.evaluateJavascript("window.setBannerVisibility(false)", null);
            }
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

        // Planshetlar va yuqori aniqlikdagi ekranlar uchun optimallashtirish
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setOffscreenPreRaster(true);
        settings.setMediaPlaybackRequiresUserGesture(false); // O'yin ovozlari avtomatik chiqishi uchun

        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        
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
                if (webView != null) {
                    webView.evaluateJavascript("typeof currentGameId !== 'undefined' && currentGameId !== null", value -> {
                        if ("true".equals(value)) {
                            webView.evaluateJavascript("window.showGameExitConfirmationFromParent()", null);
                        } else if (webView.canGoBack()) {
                            webView.goBack();
                        } else {
                            // Asosiy ekranda dasturdan chiqishni tasdiqlash (Professional UX)
                            new AlertDialog.Builder(MainActivity.this)
                                    .setTitle("Chiqish")
                                    .setMessage("Dasturdan chiqmoqchimisiz?")
                                    .setPositiveButton("Ha", (dialog, which) -> finish())
                                    .setNegativeButton("Yo'q", null)
                                    .show();
                        }
                    });
                } else {
                    finish();
                }
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
        if (adManager != null) {
            adManager.removeStatusListener(this);
            adManager.destroy();
        }
        if (webView != null) {
            if (webView.getParent() != null) {
                ((android.view.ViewGroup) webView.getParent()).removeView(webView);
            }
            webView.stopLoading();
            webView.destroy();
        }
        super.onDestroy();
    }
}
