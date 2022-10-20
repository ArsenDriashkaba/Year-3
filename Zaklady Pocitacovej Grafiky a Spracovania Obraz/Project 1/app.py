from tkinter import *
from utils.files import *
from utils.geometryUi import *
from constants.app import *

root = Tk()
root.title("Renderer")
root.geometry(f"{WINDOW_WIDTH}x{WINDOW_HEIGHT}")

appCanvas = Canvas(root, width=CANVAS_WIDTH, height=CANVAS_HEIGHT, bg="white") #center = (450, 360)
appCanvas.pack(side="left", padx=10, pady=10)

def showObj():
    appCanvas.delete("all")
    loadObjFile(appCanvas)

openExplorerBtn = Button(root, text='Open File', command=showObj)
openExplorerBtn.pack(side="right", padx=10)

root.mainloop()