const axios = require("axios");
const fs = require("fs");

// === KONFIGURASI ===
const apiKey = ""; // << Ganti ini dengan API KEY mu
const directiveListURL = "https://jyqzdggwqjyjjppjsjmj.supabase.co/functions/v1/get-active-directives";
const verifyURL = "https://jyqzdggwqjyjjppjsjmj.supabase.co/functions/v1/verify-directive-completion";

// === BANNER ===
function showBanner() {
  console.log(`
██╗  ██╗     █████╗     ██╗    ██╗  ██╗     ██████╗ 
██║ ██╔╝    ██╔══██╗    ██║    ██║ ██╔╝    ██╔═══██╗
█████╔╝     ███████║    ██║    █████╔╝     ██║   ██║
██╔═██╗     ██╔══██║    ██║    ██╔═██╗     ██║   ██║
██║  ██╗    ██║  ██║    ██║    ██║  ██╗    ╚██████╔╝
╚═╝  ╚═╝    ╚═╝  ╚═╝    ╚═╝    ╚═╝  ╚═╝     ╚═════╝ 
  `);
}

// === FUNGSI UNTUK KLAIM DARI 1 AKUN ===
async function processAccount(token, index) {
  const headers = {
    apikey: apiKey,
    authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  try {
    const { data: directives } = await axios.get(directiveListURL, { headers });
    const uncompleted = directives.filter((d) => !d.is_completed_by_user && d.is_active);

    console.log(`[🧑‍🚀 Akun ${index + 1}] Ditemukan ${uncompleted.length} directive belum diklaim`);

    let totalPoin = 0;

    for (const d of uncompleted) {
      const body = {
        directiveId: d.id,
        directiveType: d.type,
        targetIdentifier: d.target_url_or_id,
      };

      try {
        const res = await axios.post(verifyURL, body, { headers });
        const result = res.data;

        if (result.awarded_points > 0) {
          console.log(`[✅ Akun ${index + 1}] ${d.title} → +${result.awarded_points} pts`);
          totalPoin += result.awarded_points;
        } else {
          console.log(`[⚠️ Akun ${index + 1}] ${d.title} → Sudah diklaim`);
        }
      } catch (err) {
        const msg = err.response?.data?.error || err.message;
        console.log(`[❌ Akun ${index + 1}] ${d.title} → ${msg}`);
      }
    }

    console.log(`[🎯 Akun ${index + 1}] Total poin: ${totalPoin}`);
  } catch (err) {
    const msg = err.response?.data || err.message;
    console.error(`[💥 Akun ${index + 1}] Gagal proses akun:`, msg);
  }
}

// === MAIN ===
function run() {
  showBanner();

  const tokens = fs
    .readFileSync("token.txt", "utf-8")
    .split("\n")
    .map((t) => t.trim())
    .filter((t) => t.length > 10);

  if (tokens.length === 0) {
    console.log("❌ token.txt kosong atau tidak ditemukan.");
    return;
  }

  tokens.forEach((token, index) => {
    processAccount(token, index);
  });
}

run();
