from tkinter import *
from utils.files import *
from utils.geometryUi import *
from utils.transformations import *
from constants.app import *
import copy

root = Tk()
root.title("Renderer")
root.geometry(f"{WINDOW_WIDTH}x{WINDOW_HEIGHT}")

appCanvas = Canvas(root, width=CANVAS_WIDTH, height=CANVAS_HEIGHT, bg="black") #center = (450, 360)
appCanvas.pack(side="left", padx=10, pady=10)

appCanvas.configure(scrollregion=(-CANVAS_CENTER_X, -CANVAS_CENTER_Y, CANVAS_CENTER_X, CANVAS_CENTER_Y))


OBJ_DATA = None
OBJ_COPY = None
vertices = None


lightDir = Vertex4D(0, -5, -10, 1).normalize()


def showObj():
    global OBJ_DATA, vertices
    appCanvas.delete("all")
    OBJ_DATA = loadObjFile(appCanvas)
    vertices = copy.deepcopy(OBJ_DATA["vertices"])


def handleScale():
    appCanvas.delete("all")

    x = scaleX_input.get()
    y = scaleY_input.get()
    z = scaleZ_input.get()

    scaleObj(OBJ_DATA, x, y, z)
    drawObject(appCanvas, OBJ_DATA)


def handleTranslate():
    appCanvas.delete("all")

    x = translateX_input.get()
    y = translateY_input.get()
    z = translateZ_input.get()

    translateObj(OBJ_DATA, x, y, z)
    drawObject(appCanvas, OBJ_DATA)


def handleRotate():
    appCanvas.delete("all")

    x = rotateX_input.get()
    y = rotateY_input.get()
    z = rotateZ_input.get()

    rotateObj(OBJ_DATA, vertices, x, y, z)
    drawObject(appCanvas, OBJ_DATA)


def handleReset():
    appCanvas.delete("all")

    scaleX_input.initialize(float(1))
    scaleY_input.initialize(float(1))
    scaleZ_input.initialize(float(1))

    translateX_input.initialize(0)
    translateY_input.initialize(0)
    translateZ_input.initialize(0)

    rotateX_input.initialize(0)
    rotateY_input.initialize(0)
    rotateZ_input.initialize(0)

    OBJ_DATA["vertices"] = copy.deepcopy(vertices)
    drawObject(appCanvas, OBJ_DATA)


def setLight():
    global lightDir
    appCanvas.delete("all")

    x = lightX_input.get()
    y = lightY_input.get()
    z = lightZ_input.get()

    lightDir = Vertex4D(x, y, z, 1).normalize()


openExplorerBtn = Button(root, text='Open File', width=10, command=showObj)
openExplorerBtn.place(x=1050, y=600)

resetBtn = Button(root, text='Reset', width=10, command=handleReset)
resetBtn.place(x=1150, y=600)

#_______________________________Translation UI

translateX_input=IntVar(value=0)
translateX_increment = Spinbox(root, from_= 0, to = 5000, width=5, increment=10,
    textvariable=translateX_input,)

translateY_input=IntVar(value=0)
translateY_increment = Spinbox(root, from_= 0, to = 5000, width=5, increment=10,
    textvariable=translateY_input,)

translateZ_input=IntVar(value=0)
translateZ_increment = Spinbox(root, from_= 0, to = 5000, width=5, increment=10,
    textvariable=translateZ_input,)

translateBtn = Button(root, text='Translate', width=8, command=handleTranslate)

translateX_increment.place(x=1000, y=100)
translateY_increment.place(x=1100, y=100)
translateZ_increment.place(x=1200, y=100)
translateBtn.place(x=1092, y=125)

#_______________________________Scale UI

scaleX_input=DoubleVar(value=1)
scaleX_increment = Spinbox(root, from_= 0.1, to = 100, width=5, increment=0.1,
    textvariable=scaleX_input,)

scaleY_input=DoubleVar(value=1)
scaleY_increment = Spinbox(root, from_= 0.1, to = 100, width=5, increment=0.1,
    textvariable=scaleY_input,)

scaleZ_input=DoubleVar(value=1)
scaleZ_increment = Spinbox(root, from_= 0.1, to = 100, width=5, increment=0.1,
    textvariable=scaleZ_input,)

scaleBtn = Button(root, text='Scale', width=8, command=handleScale)

scaleX_increment.place(x=1000, y=200)
scaleY_increment.place(x=1100, y=200)
scaleZ_increment.place(x=1200, y=200)
scaleBtn.place(x=1092, y=225)

#_______________________________Rotate UI

rotateX_input=IntVar(value=0)
rotateX_increment = Spinbox(root, from_= 0, to = 359, width=5, increment=1,
    textvariable=rotateX_input,)

rotateY_input=IntVar(value=0)
rotateY_increment = Spinbox(root, from_= 0, to = 359, width=5, increment=1,
    textvariable=rotateY_input,)

rotateZ_input=IntVar(value=0)
rotateZ_increment = Spinbox(root, from_= 0, to = 359, width=5, increment=1,
    textvariable=rotateZ_input,)

rotateBtn = Button(root, text='Rotate', width=8, command=handleRotate)

rotateX_increment.place(x=1000, y=300)
rotateY_increment.place(x=1100, y=300)
rotateZ_increment.place(x=1200, y=300)
rotateBtn.place(x=1092, y=325)

#_______________________________Light Direction

lightX_input=IntVar(value=0)
lightX_increment = Spinbox(root, from_= -5000, to = 5000, width=5, increment=5,
    textvariable=lightX_input,)

lightY_input=IntVar(value=-5)
lightY_increment = Spinbox(root, from_= -5000, to = 5000, width=5, increment=5,
    textvariable=lightY_input,)

lightZ_input=IntVar(value=-10)
lightZ_increment = Spinbox(root, from_= -5000, to = 5000, width=5, increment=5,
    textvariable=lightZ_input,)

lightBtn = Button(root, text='Set Light', width=8, command=setLight)

lightX_increment.place(x=1000, y=400)
lightY_increment.place(x=1100, y=400)
lightZ_increment.place(x=1200, y=400)
lightBtn.place(x=1092, y=425)

root.mainloop()