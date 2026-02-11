const app = express();
const PORT = process.env.PORT || 5000;
const router = require('./router/auth-router');

app.use(express.json()); // for parsing application/json

// Example routes
app.use('/api/auth', router);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

module.exports = app;
