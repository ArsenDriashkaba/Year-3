from models import Vertex4D

def getDirectionVector(p1, p2):
    # if Q, P are points and we want to get dir of PQ => Q = p1 & P = p2

    x = p1.value[0] - p2.value[0]
    y = p1.value[1] - p2.value[1]
    z = p1.value[2] - p2.value[2]

    return Vertex4D(x, y, z, 1)


def dotProduct(v1, v2):
    if len(v1.value) != len(v2.value):
        return "Bad vertices :c"

    result = 0
    
    for i in range(len(v1.value) - 1):
        result += v1.value[i] * v2.value[i]

    return result


def getSurfaceNormal(p1, p2, p3):
    U = getDirectionVector(p2, p1).value
    V = getDirectionVector(p3, p2).value

    Nx = U[1] * V[2] - U[2] * V[1]
    Ny = U[2] * V[0] - U[0] * V[2]
    Nz = U[0] * V[1] - U[1] * V[0]

    return Vertex4D(Nx, Ny, Nz, 1).normalize()



def checkBackFaceCulling(v1, v2, v3):
    # v_i - are vertices of the triangle
    pointView = Vertex4D(0, 0, -1, 1)
    polygonNormal = getSurfaceNormal(v1, v2, v3)

    return dotProduct(polygonNormal, pointView.normalize()) > 0
