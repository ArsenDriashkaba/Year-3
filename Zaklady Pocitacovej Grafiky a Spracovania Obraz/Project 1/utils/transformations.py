from models import ScaleMatrix, TranslationMatrix, RotateMatrix_Y, RotateMatrix_X, RotateMatrix_Z
from constants.app import *

def scaleObj(objData, sx, sy, sz):
    for i in range(len(objData["vertices"])):
        v = objData["vertices"][i].value

        MainMatrix = TranslationMatrix(-v[0], -v[1], -v[2])
        TranslateInverse = TranslationMatrix(v[0], v[1], v[2])
        Scale = ScaleMatrix(sx, sy, sz)

        MainMatrix.multiplyByMatrix4d(Scale)
        MainMatrix.multiplyByMatrix4d(TranslateInverse)

        objData["vertices"][i].multiplyByMatrix4d(MainMatrix)


def translateObj(objData, tx, ty, tz):
    Translate = TranslationMatrix(tx, ty, tz)

    for i in range(len(objData["vertices"])):
        objData["vertices"][i].multiplyByMatrix4d(Translate)


def rotateObjX(objData, teta, vertices):
    Rotate = RotateMatrix_X(teta)

    for i in range(len(objData["vertices"])):
        v = objData["vertices"][i].value
        v2 = vertices[i].value

        l1 = v[0] - v2[0]
        l2 = v[1] - v2[1]
        l3 = v[2] - v2[2]

        print(l1, l2, l3)

        MainMatrix = TranslationMatrix(-l1, -l2, 0)
        TranslateInverse = TranslationMatrix(l1, l2, 0)

        Rotate.multiplyByMatrix4d(TranslateInverse)
        Rotate.multiplyByMatrix4d(MainMatrix)

        objData["vertices"][i].multiplyByMatrix4d(Rotate)


def rotateObjY(objData, teta):
    Rotate = RotateMatrix_Y(teta)

    for i in range(len(objData["vertices"])):
        objData["vertices"][i].multiplyByMatrix4d(Rotate)


def rotateObjZ(objData, teta):
    Rotate = RotateMatrix_Z(teta)

    for i in range(len(objData["vertices"])):
        objData["vertices"][i].multiplyByMatrix4d(Rotate)
