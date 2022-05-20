# YOLO object detection
import io
import cv2 as cv
import base64 
import numpy as np
from PIL import Image
import time

# Load names of classes and get random colors
classes = open('./YOLO/coco.names').read().strip().split('\n')
np.random.seed(42)
colors = np.random.randint(0, 255, size=(len(classes), 3), dtype='uint8')

# Give the configuration and weight files for the model and load the network.
net = cv.dnn.readNetFromDarknet('./YOLO/yolov3.cfg', './YOLO/yolov3.weights')
net.setPreferableBackend(cv.dnn.DNN_BACKEND_OPENCV)

# determine the output layer
ln = net.getLayerNames()
ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]


# Take in base64 string and return image
def base64_to_image(base64_string):
    imgdata = base64.b64decode(base64_string)
    image = Image.open(io.BytesIO(imgdata))
    return cv.cvtColor(np.array(image), cv.COLOR_BGR2RGB)


def YOLO(base64_image):
    # load original image
    img = base64_to_image(base64_image)
    # construct a blob from the image
    blob = cv.dnn.blobFromImage(img, 1/255.0, (416, 416), swapRB=True, crop=False)

    net.setInput(blob)
    t0 = time.time()
    outputs = net.forward(ln)
    t = time.time()

    boxes = []
    confidences = []
    classIDs = []
    h, w = img.shape[:2]

    for output in outputs:
        for detection in output:
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]
            if confidence > 0.5:
                box = detection[:4] * np.array([w, h, w, h])
                (centerX, centerY, width, height) = box.astype("int")
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))
                box = [x, y, int(width), int(height)]
                boxes.append(box)
                confidences.append(float(confidence))
                classIDs.append(classID)

    indices = cv.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
    results = []

    if len(indices) > 0:
        for i in indices.flatten():
            result = {}
            (x, y) = (boxes[i][0], boxes[i][1])
            (w, h) = (boxes[i][2], boxes[i][3])
            color = [int(c) for c in colors[classIDs[i]]]
            cv.rectangle(img, (x, y), (x + w, y + h), color, 2)
            text = "{}: {:.4f}".format(classes[classIDs[i]], confidences[i])
            cv.putText(img, text, (x, y - 5), cv.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)
            result['object'] = classes[classIDs[i]]
            result['confidence'] = np.round(confidences[i], 2)
            result['position'] = [(x, y), (x + w, y + h)]
            result['color'] = color
            results.append(result)

    _, buffer = cv.imencode('.png', img)

    response = {'data': results, 'time': np.round(t - t0, 2), \
        'img': base64.b64encode(buffer).decode('ascii')}
        
    # cv.imwrite('results.png', img)
    return response


if __name__ == "__main__":
    path_to_image = 'images/horse.jpg'
    results = YOLO(path_to_image)
    print(results)
