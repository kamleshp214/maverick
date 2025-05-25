import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Static file serving for production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the client build directory
  const clientDistPath = path.join(process.cwd(), 'dist');
  app.use(express.static(clientDistPath));
  
  // Serve index.html for all non-API routes (SPA fallback)
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    }
  });
}

// Error handling
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

// Start server if not running on Vercel
if (process.env.VERCEL !== '1') {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
