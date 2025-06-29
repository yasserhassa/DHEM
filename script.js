   async function getMp3() {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      const videoUrl = document.getElementById("ytLink").value;
      const videoId = extractVideoID(videoUrl);
      if (!videoId) {
        resultDiv.innerHTML = `<p class="error">❌ الرابط غير صالح.</p>`;
        return;
      }

      const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '657dffe2c9msh731ddcc5213b219p132745jsnb511065fed9d',
          'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!data.link || data.status === "fail") {
          resultDiv.innerHTML = `<p class="error">⚠️ فشل التحميل. تأكد من الرابط أو حاول لاحقًا.</p>`;
        } else {
          resultDiv.innerHTML = `
            <h3>${data.title}</h3>
            <a href="${data.link}" target="_blank">⬇️ اضغط هنا لتحميل MP3</a>
          `;
        }
      } catch (error) {
        console.error(error);
        resultDiv.innerHTML = `<p class="error">⚠️ فشل التحميل. تأكد من الرابط أو حاول لاحقًا.</p>`;
      }
    }

    function extractVideoID(url) {
      try {
        const urlObj = new URL(url);
        return urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
      } catch {
        return null;
      }
    }