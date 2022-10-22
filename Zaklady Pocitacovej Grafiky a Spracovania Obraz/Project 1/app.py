from tkinter import *
from utils.files import *
from utils.geometryUi import *
from utils.transformations import *
from constants.app import *
import copy

root = Tk()
root.title("Renderer")
root.geometry(f"{WINDOW_WIDTH}x{WINDOW_HEIGHT}")

appCanvas = Canvas(root, width=CANVAS_WIDTH, height=CANVAS_HEIGHT, bg="white") #center = (450, 360)
appCanvas.pack(side="left", padx=10, pady=10)

appCanvas.configure(scrollregion=(-CANVAS_CENTER_X, -CANVAS_CENTER_Y, CANVAS_CENTER_X, CANVAS_CENTER_Y))


OBJ_DATA = None
OBJ_COPY = None
vertices = None


def showObj():
    global OBJ_DATA, vertices
    appCanvas.delete("all")
    OBJ_DATA = loadObjFile(appCanvas)
    vertices = copy.deepcopy(OBJ_DATA["vertices"])


def testScale():
    appCanvas.delete("all")
    scaleObj(OBJ_DATA, 1.1, 1.1, 1.1)
    drawObject(appCanvas, OBJ_DATA)


def testTranslate():
    appCanvas.delete("all")
    translateObj(OBJ_DATA, 25, 0, 0)
    drawObject(appCanvas, OBJ_DATA)


def testRotate():
    appCanvas.delete("all")
    rotateObjX(OBJ_DATA, 45, vertices)
    drawObject(appCanvas, OBJ_DATA)


def testReset():
    appCanvas.delete("all")
    OBJ_DATA["vertices"] = copy.deepcopy(vertices)
    drawObject(appCanvas, OBJ_DATA)


openExplorerBtn = Button(root, text='Open File', command=showObj)
openExplorerBtn.pack(side="right", padx=10)

openExplorerBtn1 = Button(root, text='Scale', command=testScale)
openExplorerBtn1.pack(side="right", padx=10)

openExplorerBtn2 = Button(root, text='Translate', command=testTranslate)
openExplorerBtn2.pack(side="right", padx=10)

openExplorerBtn3 = Button(root, text='Rotate', command=testRotate)
openExplorerBtn3.pack(side="right", padx=10)

openExplorerBtn4 = Button(root, text='Reset', command=testReset)
openExplorerBtn4.pack(side="right", padx=10)

root.mainloop()