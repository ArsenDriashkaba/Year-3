from tkinter import *
from utils.transformations import *
from utils.backFaceCulling import checkBackFaceCulling


def drawFace(canvas, vertices, faceIds):
    id1, id2, id3 = faceIds
    v1, v2, v3 = vertices[id1-1], vertices[id2-1], vertices[id3-1]
    p1, p2, p3 = v1.value, v2.value, v3.value 

    if checkBackFaceCulling(v1, v2, v3):
        return
    
    canvas.create_polygon(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], outline="white", fill="")

def drawObject(canvas, objData):
    vertices, faces = objData["vertices"], objData["faces"]
    
    for face in faces:
        drawFace(canvas, vertices, face)