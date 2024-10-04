from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Configure CORS
CORS(app, resources={r"/api/*": {"origins": "https://freedom20.vercel.app"}})

messages = []

@app.route('/')
def home():
    return "Welcome to the Freedom Wall API! Use /api/messages to get messages."

@app.route('/api/messages', methods=['GET', 'POST'])
def handle_messages():
    if request.method == 'POST':
        try:
            message = request.json.get('message')
            if message:
                messages.append(message)
                return jsonify({'message': 'Message added!'}), 201
            return jsonify({'error': 'Message is required!'}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return jsonify(messages), 200

if __name__ == '__main__':
    app.run(debug=True)
