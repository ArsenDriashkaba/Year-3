from tkinter import filedialog
import os
from utils.geometryUi import drawObject
from constants.app import *

INITIAL_OBJ_DIR = os.getcwd();

def handleOpenExplorer():
    return filedialog.askopenfilename(initialdir=INITIAL_OBJ_DIR)

def writeLineData(lineData, parsedData, isVertexData=True):
    arrOfData = []
    dataKey = "vertices" if isVertexData else "faces"

    for i in range(1, 4):
        elem = 0

        if (isVertexData):
            # As transformations are not implemented(future task) we will use this mock approach to translate and scale vectors
            translationToCenter = 0

            if (i == 1): translationToCenter = CANVAS_CENTER_X
            elif (i == 2): translationToCenter = CANVAS_CENTER_Y

            elem = (float(lineData[i])) * -1 * DEFAULT_SCALING + translationToCenter
        else:
            elem = int(lineData[i])

        arrOfData.append(elem)

    parsedData[dataKey].append(arrOfData)

def handleParsingLine(line, parsedData):
    lineData = line.strip().split(" ");

    nameCase = lineData[0] == "o"
    vertexCase = lineData[0] == "v"
    faceCase = lineData[0] == "f"

    if (nameCase):
        parsedData["name"] = lineData[1]

    if (vertexCase):
        writeLineData(lineData, parsedData)

    if (faceCase):
        writeLineData(lineData, parsedData, False)

def parseObjFile(fileName):
    parsedData = {'name':"", "vertices": [], "faces": []}

    with open(fileName, "r", encoding="utf8") as file:
        for line in file:
            handleParsingLine(line, parsedData)

    return parsedData

def loadObjFile(canvas):
    fileName = handleOpenExplorer()
    objData = parseObjFile(fileName)
    
    name, vertices, faces = objData["name"], objData["vertices"], objData["faces"]
    
    drawObject(canvas, vertices, faces)

