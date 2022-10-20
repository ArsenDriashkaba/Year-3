from tkinter import *

def drawFace(canvas, vertices, faceIds):
    id1, id2, id3 = faceIds
    v1, v2, v3 = vertices[id1-1], vertices[id2-1], vertices[id3-1] 

    canvas.create_polygon(v1[0], v1[1], v2[0], v2[1], v3[0], v3[1], outline="blue", fill="")

def drawObject(canvas, vertices, faces):
    for face in faces:
        drawFace(canvas, vertices, face)