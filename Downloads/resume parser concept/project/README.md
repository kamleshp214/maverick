# AI Resume Parser

A powerful web application that uses AI to analyze resumes and provide insights for both recruiters and job seekers. Built with React, Python Flask, and Google's Gemini AI.

## Features

### For Recruiters
- Upload multiple resumes (up to 10) in PDF or DOCX format
- Match candidates against job descriptions
- Compare candidates side-by-side
- View detailed candidate profiles with skills, experience, and education
- Export structured data for further analysis

### For Students/Job Seekers
- Get instant feedback on your resume
- Receive a detailed score breakdown
- Get actionable suggestions for improvement
- See ATS-friendly keyword recommendations
- Generate potential interview questions

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Recharts (data visualization)
- React Router (navigation)
- Axios (API calls)

### Backend
- Python Flask
- Google Gemini AI
- spaCy (NLP)
- PyPDF2 (PDF parsing)
- python-docx (DOCX parsing)

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-resume-parser
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install Python dependencies:
```bash
cd api
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

4. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000
```

5. Create a `.env` file in the `api` directory:
```env
GOOGLE_API_KEY=your_gemini_api_key_here
```

### Running the Application

1. Start the backend server:
```bash
cd api
python app.py
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
ai-resume-parser/
├── api/
│   ├── app.py              # Flask backend
│   └── requirements.txt    # Python dependencies
├── src/
│   ├── components/         # Reusable React components
│   ├── context/           # React context providers
│   ├── pages/             # Page components
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── public/                # Static assets
└── package.json          # Node.js dependencies
```

## Features in Detail

### Resume Analysis
- Extracts key information from resumes using spaCy NLP
- Uses Google's Gemini AI for intelligent analysis
- Provides match scores against job descriptions
- Identifies key skills and experience

### User Interface
- Modern, responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Interactive data visualizations with Recharts
- Drag-and-drop file upload

### Privacy & Security
- All data processing happens in memory
- No permanent storage of resume data
- Secure file handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini AI for powering the resume analysis
- The spaCy team for their excellent NLP library
- The React and Tailwind CSS communities

## Support

For support, please open an issue in the repository or contact the maintainers.