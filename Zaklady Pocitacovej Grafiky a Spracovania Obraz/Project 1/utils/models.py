import math

def copyMatrix4d(mat):
    newMat = []

    for row in mat:
        newMat.append(row.copy())
    
    return newMat

def toRadians(degree):
    return degree * math.pi / 180