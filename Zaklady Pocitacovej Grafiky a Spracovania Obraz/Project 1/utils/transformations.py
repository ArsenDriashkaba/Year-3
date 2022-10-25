from models import ScaleMatrix, TranslationMatrix, RotateMatrix_Y, RotateMatrix_X, RotateMatrix_Z
from constants.app import *

def scaleObj(objData, sx, sy, sz):
    for i in range(len(objData["vertices"])):
        v = objData["vertices"][i].value

        MainMatrix = TranslationMatrix(-v[0], -v[1], -v[2])
        TranslateInverse = TranslationMatrix(v[0], v[1], v[2])
        Scale = ScaleMatrix(sx, sy, sz)

        MainMatrix.transposeMatrix()
        TranslateInverse.transposeMatrix()
        Scale.transposeMatrix()

        MainMatrix.multiplyByMatrix4d(Scale)
        MainMatrix.multiplyByMatrix4d(TranslateInverse)

        objData["vertices"][i].multiplyByMatrix4d(MainMatrix)
        objData["vertices"][i].value[3] = 1


def translateObj(objData, tx, ty, tz):
    Translate = TranslationMatrix(tx, ty, tz)

    Translate.transposeMatrix()

    for i in range(len(objData["vertices"])):
        print(objData["vertices"][i])
        objData["vertices"][i].multiplyByTransponedMatrix4d(Translate)


def rotateVertex(vertex, defaultVertex, rotateMatrix):
    v1, v2 = vertex.value, defaultVertex.value

    l1 = v1[0] + v2[0]
    l2 = v1[1] + v2[1]

    MainMatrix = TranslationMatrix(-l1, -l2, 0)
    TranslateInverse = TranslationMatrix(l1, l2, 0)

    rotateMatrix.multiplyByMatrix4d(MainMatrix)
    rotateMatrix.multiplyByMatrix4d(TranslateInverse)

    vertex.multiplyByMatrix4d(rotateMatrix)


def rotateObjX(objData, teta, vertices):
    Rotate = RotateMatrix_X(teta)

    for i in range(len(objData["vertices"])):
        rotateVertex(objData["vertices"][i], vertices[i], Rotate)


def rotateObjY(objData, teta, vertices):
    Rotate = RotateMatrix_Y(teta)

    for i in range(len(objData["vertices"])):
        rotateVertex(objData["vertices"][i], vertices[i], Rotate)


def rotateObjZ(objData, teta, vertices):
    Rotate = RotateMatrix_Z(teta)

    for i in range(len(objData["vertices"])):
        rotateVertex(objData["vertices"][i], vertices[i], Rotate)


def rotateObj(objData, vertices, xTeta, yTeta, zTeta):
    if (xTeta != 0):
        rotateObjX(objData, xTeta, vertices)
    if (yTeta != 0):
        rotateObjY(objData, yTeta, vertices)
    if (zTeta != 0):
        rotateObjZ(objData, zTeta, vertices)

