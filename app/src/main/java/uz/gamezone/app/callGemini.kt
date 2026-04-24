package uz.gamezone.app

import android.util.Log
import com.google.ai.client.generativeai.GenerativeModel
import uz.gamezone.app.BuildConfig
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

fun callGemini(prompt: String = "Explain MCP in simple terms") {
    val model = GenerativeModel(
        modelName = "gemini-1.5-flash",
        apiKey = BuildConfig.GEMINI_API_KEY
    )

    CoroutineScope(Dispatchers.IO).launch {
        try {
            val response = model.generateContent(prompt)
            Log.d("GeminiAI", "Response: ${response.text}")
        } catch (e: Exception) {
            Log.e("GeminiAI", "Error: ${e.message}", e)
        }
    }
}
