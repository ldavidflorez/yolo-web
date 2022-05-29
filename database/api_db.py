from flask import Flask, jsonify, request
from flask_cors import CORS
from database import Database
import io
import cv2 as cv
import base64 
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)

database = Database()

@app.route('/yolo/list', methods=['GET'])
def list_objects():
    objs = database.select_all()
    return jsonify(objs)


@app.route('/yolo/<id>', methods=['GET'])
def one_object(id):
    obj = database.select_one(id)
    return jsonify(obj)


@app.route('/yolo/save', methods=['POST'])
def save_objects():
    response = request.json
    title = response['title']
    img = response['image_result']
    imgdata = base64.b64decode(img)
    image = Image.open(io.BytesIO(imgdata))
    image = cv.cvtColor(np.array(image), cv.COLOR_BGR2RGB)
    filename = '/home/luisf/Desktop/yoloweb/database/results/' + title + '.png'
    cv.imwrite(filename, image)
    objects = response['objects']
    # print(title, objects, filename)
    database.insert(title, objects, filename)
    return jsonify({'response': 'record inserted'})


@app.route('/yolo/<id>', methods=['DELETE'])
def delete_object(id):
    database.delete(id)
    return jsonify({'response': 'record deleted'})


@app.route('/yolo/<id>', methods=['PUT'])
def update_object(id):
    response = request.json
    title = response['title']
    database.update(title, id)
    return jsonify({'response': 'record affected'})


if __name__ == '__main__':
    app.run(host='localhost', port=3000, debug=True)