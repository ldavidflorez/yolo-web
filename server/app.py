from flask import Flask, jsonify, request
from flask_cors import CORS
from YOLO.yolo import YOLO

app = Flask(__name__)
CORS(app)

@app.route('/yolo/home', methods=['GET'])
def home():
    return 'Hello YOLO!!!'


@app.route('/yolo/detect', methods=['POST'])
def detect_objects():
    response = request.json
    base64_img = response['base64_image'].split(',')[1]
    detections = YOLO(base64_img)
    return jsonify(detections)


if __name__ == '__main__':
    app.run(debug=True)