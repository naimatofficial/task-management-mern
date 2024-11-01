import app from "./backend/app.js";
import keys from "./backend/config/keys.js";

const port = keys.port || 3000;

app.listen(port, () => {
	console.log(`
  🚀 Server is up and running!
  🌐 URL: http://localhost:${port}
  🛠️  Environment: ${keys.nodeENV || "development"}
  📅  Started at: ${new Date().toLocaleString()}
  `);
});
