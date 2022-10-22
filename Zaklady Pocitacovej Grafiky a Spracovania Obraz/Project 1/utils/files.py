from tkinter import filedialog
import os
from utils.geometryUi import drawObject
from constants.app import *
from models import Vertex4D
from utils.transformations import *

INITIAL_OBJ_DIR = os.getcwd();

def handleOpenExplorer():
    return filedialog.askopenfilename(initialdir=INITIAL_OBJ_DIR)


def writeLineData(lineData, parsedData, isVertexData=True):
    arrOfData = []
    dataKey = "vertices" if isVertexData else "faces"

    for i in range(1, 4):
        elem = 0

        if (isVertexData):
            elem = -(float(lineData[i]))
        else:
            elem = int(lineData[i])

        arrOfData.append(elem)

    if isVertexData:
        newVertex = Vertex4D(*tuple(arrOfData), 1)
        arrOfData = newVertex

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
    
    scaleObj(objData, 100, 100, 100)

    drawObject(canvas, objData)

    return objData

