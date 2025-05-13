from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv
import PyPDF2
from docx import Document
import spacy
from werkzeug.utils import secure_filename
import json

# Load environment variables
load_dotenv()

# Configure Google Gemini API
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

ALLOWED_EXTENSIONS = {'pdf', 'docx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file):
    pdf_reader = PyPDF2.PdfReader(file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def extract_text_from_docx(file):
    doc = Document(file)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text

def analyze_resume(text, job_description=None):
    # Prepare prompt for Gemini
    if job_description:
        prompt = f"""Analyze this resume and job description. Provide:
        1. Match score (0-100)
        2. Key skills extracted
        3. Experience summary
        4. Education details
        5. Strengths and weaknesses
        
        Resume:
        {text}
        
        Job Description:
        {job_description}
        
        Format response as JSON with these keys:
        matchScore, skills, experience, education, strengths, weaknesses
        """
    else:
        prompt = f"""Analyze this resume. Provide:
        1. Key skills extracted
        2. Experience summary
        3. Education details
        4. Strengths and weaknesses
        5. Improvement suggestions
        
        Resume:
        {text}
        
        Format response as JSON with these keys:
        skills, experience, education, strengths, weaknesses, suggestions
        """

    # Get response from Gemini
    response = model.generate_content(prompt)
    
    try:
        # Parse the response as JSON
        result = json.loads(response.text)
        return result
    except json.JSONDecodeError:
        # Fallback if response is not valid JSON
        return {"error": "Failed to parse AI response"}

@app.route('/api/parse', methods=['POST'])
def parse_resume():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    files = request.files.getlist('file')
    job_description = request.form.get('jobDescription', '')
    results = []
    
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            
            # Extract text based on file type
            if filename.endswith('.pdf'):
                text = extract_text_from_pdf(file)
            else:  # docx
                text = extract_text_from_docx(file)
            
            # Analyze the resume
            analysis = analyze_resume(text, job_description if job_description else None)
            
            # Add filename to results
            analysis['fileName'] = filename
            results.append(analysis)
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=5000)