import math

def copyMatrix4d(mat):
    newMat = []

    for row in mat:
        newMat.append(row.copy())
    
    return newMat

def copyObjData(objData):
    copyOfVertices = objData["vertices"].copy()
    copyOfFaces = objData["faces"].copy()
    
    return {"name":  objData["name"], "vertices": copyOfVertices, "faces": copyOfFaces}

def toRadians(degree):
    return degree * math.pi / 180