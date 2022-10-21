from models import ScaleMatrix, TranslationMatrix, RotateMatrix_Y
from constants.app import *

def scaleObj(objData, sx, sy, sz):
    tm = TranslationMatrix(CANVAS_CENTER_X, CANVAS_CENTER_Y, 0)
    tm2 = TranslationMatrix(-CANVAS_CENTER_X, -CANVAS_CENTER_Y, 0)
    sm = ScaleMatrix(sx, sy, sz)

    tm.multiplyByMatrix4d(sm)
    tm.multiplyByMatrix4d(tm2)

    for i in range(len(objData["vertices"])):
        objData["vertices"][i].multiplyByMatrix4d(tm)

def translateObj(objData, tx, ty, tz):
    tm = TranslationMatrix(tx, ty, tz)

    for i in range(len(objData["vertices"])):
        objData["vertices"][i].multiplyByMatrix4d(tm)

def rotateObj(objData, teta):
    tm = TranslationMatrix(CANVAS_CENTER_X, CANVAS_CENTER_Y, 0)
    tm2 = TranslationMatrix(-CANVAS_CENTER_X, -CANVAS_CENTER_Y, 0)
    rm = RotateMatrix_Y(teta)

    tm.multiplyByMatrix4d(rm)
    tm.multiplyByMatrix4d(tm2)

    for i in range(len(objData["vertices"])):
        objData["vertices"][i].multiplyByMatrix4d(tm)