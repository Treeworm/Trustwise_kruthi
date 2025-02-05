from flask import Flask, request, jsonify
from flask_cors import CORS
from models.vectara import VectaraModel  # Removed the dot
from models.toxicity import ToxicityModel  # Removed the dot
from database import Database  # Removed the dot
from datetime import datetime

app = Flask(__name__)
CORS(app)
# Initialize models and database
vectara_model = VectaraModel()
toxicity_model = ToxicityModel()
db = Database()

@app.route('/api/analyze', methods=['POST'])
def analyze_text():
    try:
        data = request.get_json()
        text = data.get('text')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Get scores from models
        scores = {
            'vectara': vectara_model.get_score(text),
            'toxicity': toxicity_model.get_score(text)
        }
        
        # Save to database
        db.insert_score(text, scores)
        
        return jsonify(scores), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    try:
        history = db.get_all_scores()
        return jsonify(history), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)