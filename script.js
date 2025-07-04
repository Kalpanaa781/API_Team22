async function translateText() {
  const inputText = document.getElementById("inputText").value.trim();
  const sourceLang = document.getElementById("sourceLang").value;
  const targetLang = document.getElementById("targetLang").value;
  const output = document.getElementById("outputText");

  if (!inputText) {
    output.innerText = "❗ Please enter text to translate.";
    return;
  }

  output.innerText = "⏳ Translating...";

  // Encode text for URL
  const encodedText = encodeURIComponent(inputText);

  // Construct the Google Translate URL
  const googleURL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodedText}`;

  // Use CORS proxy
  const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(googleURL);

  try {
    const res = await fetch(proxyUrl);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const data = await res.json();
    const translatedText = data[0][0][0];

    output.innerText = `✅ ${translatedText}`;
  } catch (err) {
    console.error("❌ Error:", err);
    output.innerText = "❌ Translation failed. Try again later.";
  }
}
