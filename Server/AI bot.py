from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import json
from transformers import AutoTokenizer, AutoModelForCausalLM

app = Flask(__name__)
CORS(app)

# betöltjük a tokenizer-t és a model-t


model_name = "T4"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)



def chatbot_response(message):
    input_ids = tokenizer.encode(message, return_tensors='pt')
    output = model.generate(input_ids, max_length=50, do_sample=True)
    response = tokenizer.decode(output[0], skip_special_tokens=True)
    return response

@app.route('/message', methods=['POST'])
def handle_message():
    message = request.get_json()['message']
    response = chatbot_response(message)
    response = {'message': response}
    return jsonify(response)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
