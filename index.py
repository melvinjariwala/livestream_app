from flask import Flask, render_template, request, jsonify
from flask_pymongo import pymongo
from bson import json_util, ObjectId
import json

app = Flask(__name__, static_url_path = '', static_folder = './frontend/build', template_folder = './frontend/build')
CONNECTION_STRING="mongodb+srv://melvin:melvin@livestream.uss05xu.mongodb.net/?retryWrites=true&w=majority"
db = pymongo.MongoClient(CONNECTION_STRING, connect=False).get_database('db')
user_collection = db['overlays']
print(user_collection)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/overlays', methods = ["POST"])
def create_overlay():
    data = request.json
    user_collection.insert_one(data)
    return jsonify({'overlays': "Overlay created successfully!"})

@app.route('/overlays', methods = ["GET"])
def get_overlay():
    # overlays = list(user_collection.find({}, {'_id': 0}))
    overlays = json.loads(json_util.dumps(user_collection.find({})))
    return jsonify({'overlays' : overlays})

@app.route('/overlays/<id>', methods = ["PUT"])
def update_overlay(id):
    data = request.json
    user_collection.update_one({'_id': ObjectId(id)}, {'$set': data})
    return jsonify({'message': "Overlay updated successfully!"})

@app.route('/overlays/<id>', methods = ["DELETE"])
def delete_overlay(id):
    user_collection.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': "Overlay deleted successfully!"})

if __name__ == '__main__':
    from waitress import serve
    serve(app, host= "0.0.0.0", port=10000)
    # app.run(debug=True)