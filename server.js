import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server start error:", err);
});
