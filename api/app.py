from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import json_util
from flask_cors import CORS
from bson import ObjectId
import json
import markdown

client = MongoClient("mongodb+srv://vitor:HGaPxICYFnhXPxKq@cluster0-zejls.mongodb.net/test?retryWrites=true")
db = client.Quizzy
col = db.Quizes

app = Flask(__name__)
CORS(app)

@app.route('/quiz/<quizId>', methods=["GET"])
def get_quiz(quizId):
        quiz = {"_id":ObjectId(quizId)}
        x = col.find_one(quiz)
        output = {'name': x['name'], 'questions': x['questions']}
        return jsonify(output)
          
@app.route('/quiz', methods=["POST"])
def add_note():
        note = (request.json['note'])
        insertNote = col.insert({'note':note})
        returnNote = col.find_one({'_id': insertNote})
        output = {'_id': str(returnNote['_id']), 'note': returnNote['note']}
        return jsonify(output)
