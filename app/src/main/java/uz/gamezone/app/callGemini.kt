package uz.gamezone.app

import com.google.ai.client.generativeai.GenerativeModel
import uz.gamezone.app.BuildConfig
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

fun callGemini(prompt: String = "Explain MCP in simple terms") {
    val model = GenerativeModel(
        modelName = "gemini-2.5-flash-preview",
        apiKey = BuildConfig.GEMINI_API_KEY
    )

    CoroutineScope(Dispatchers.IO).launch {
        try {
            val response = model.generateContent(prompt)
            println(response.text)
        } catch (e: Exception) {
            println("Error: ${e.message}")
        }
    }
}
