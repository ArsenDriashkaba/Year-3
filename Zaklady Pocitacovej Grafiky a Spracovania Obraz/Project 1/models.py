from utils.math import copyMatrix4d, toRadians
from math import cos, sin

class Vertex4D:
    def __init__(self, x, y, z, w) -> list:

        self.value = [x, y, z, w]


    def __str__(self) -> str:
        return f'[{self.value[0]}, {self.value[1]}, {self.value[2]}, {self.value[3]}]'


    def multiplyByMatrix4d(self, mat):
        matrix = mat.value
        selfCopy = self.value.copy()

        if (len(matrix) != 4):
            return 'Bad input matrix bro :c'

        for i in range(len(matrix)):
            newVertexValue = 0

            for j in range(len(matrix[i])):
                newVertexValue += matrix[i][j] * selfCopy[j]

            self.value[i] = newVertexValue


    def multiplyByTransponedMatrix4d(self, mat):
        matrix = mat.value
        selfCopy = self.value.copy()

        if (len(matrix) != 4):
            return 'Bad input matrix bro :c'

        for i in range(len(matrix)):
            newVertexValue = 0

            for j in range(len(matrix[i])):
                newVertexValue += matrix[j][i] * selfCopy[j]

            self.value[i] = newVertexValue

    
    def euclidian(self):
        v = self.value

        return (v[0]**2 + v[1]**2 + v[2]**2) ** 0.5


    def normalize(self):
        length = self.euclidian()
        v = self.value

        return Vertex4D(v[0]/length, v[1]/length, v[2]/length, 1)


    def add(self, vec):
        v1 = self.value
        v2 = vec.value

        return Vertex4D(v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2], 1)

    
    def multiplyByScalar(self, s):
        v = self.value

        return Vertex4D(v[0] * s, v[1] * s, v[2] * s, 1)
        

    
class Matrix4D:
    def __init__(self, 
                        a11, a12, a13, a14,  
                        a21, a22, a23, a24,
                        a31, a32, a33, a34,
                        a41, a42, a43, a44) -> list:

        self.value = [  [a11, a12, a13, a14],
                        [a21, a22, a23, a24],
                        [a31, a32, a33, a34],
                        [a41, a42, a43, a44]]

    
    def __str__(self) -> str:
        valueStr = ''

        for row in self.value:
            rowStr = '['

            for val in row:
                rowStr += f'{val} '

            rowStr = rowStr.strip() + ']'
            valueStr += f'{rowStr}\n'
        
        return valueStr


    def multiplyByMatrix4d(self, mat):
        matrix = mat.value
        selfCopy = copyMatrix4d(self.value)

        if (len(matrix) != 4 or len(matrix[0]) != 4):
            return 'Bad input matrix bro :c'

        for i in range(len(selfCopy)):

            for j in range(len(selfCopy[i])):
                newValue = 0

                for w in range(len(matrix)):
                    newValue += selfCopy[i][w] * matrix[w][j]

                self.value[i][j] = newValue


    def transposeMatrix(self):
        self.value = [[self.value[j][i] for j in range(len(self.value))] for i in range(len(self.value[0]))]


class ScaleMatrix(Matrix4D):

    def __init__(self, sx, sy, sz) -> list:
        super().__init__(
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        )


class TranslationMatrix(Matrix4D):

    def __init__(self, tx, ty, tz) -> list:
        super().__init__(
            1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
            0, 0, 0, 1
        )


class RotateMatrix_X(Matrix4D):

    def __init__(self, angle) -> list:
        T = toRadians(angle)            # teta angle
        cosT, sinT = cos(T), sin(T)

        super().__init__(
            1, 0, 0, 0,
            0, cosT, -sinT, 0,
            0, sinT, cosT, 0,
            0, 0, 0, 1    
        )


class RotateMatrix_Y(Matrix4D):

    def __init__(self, angle) -> list:
        T = toRadians(angle)            # teta angle
        cosT, sinT = cos(T), sin(T)

        super().__init__(
            cosT, 0, sinT, 0,
            0, 1, 0, 0,
            -sinT, 0, cosT, 0,
            0, 0, 0, 1    
        )


class RotateMatrix_Z(Matrix4D):

    def __init__(self, angle) -> list:
        T = toRadians(angle)            # teta angle
        cosT, sinT = cos(T), sin(T)

        super().__init__(
            cosT, -sinT, 0, 0,
            sinT, cosT, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1    
        )


if __name__ == "__main__":

    v1 = Vertex4D(4, 1, 3, 1)
    v2 = Vertex4D(-5, 2, 3, 1)
    