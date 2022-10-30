from models import Vertex4D
from utils.backFaceCulling import getSurfaceNormal, dotProduct
from constants.model import *

def getHalfVertex(view, light):
    M = view.add(light).normalize()
    lengthM = M.euclidian()

    return M.multiplyByScalar(1/lengthM).normalize()


def getSpecularIntensity(half, normal, shininess):
    return k_specular * (dotProduct(half, normal) ** shininess)


def getDiffuseIntensity(normal, light):
    return k_diffuse * dotProduct(normal, light)


def getIntensity(lightDir, v1, v2, v3):
    N = getSurfaceNormal(v1, v2, v3)
    H = getHalfVertex(pointView, lightDir)
    Ia = 0.6

    return k_ambient * Ia + getDiffuseIntensity(N, lightDir) + getSpecularIntensity(H, N, shininess)