from scipy.optimize import linprog
import numpy as np

# 2x + y = 4

x1_bounds = (0, None)
x2_bounds = (0, None)
x3_bounds = (0, None)


# c = [-230, -10]
# A = [
#     [3245, 2556],    # Coefficients of the first constraint (x + y <= 10)
#     [2.88, 27.65],     # Coefficients of the second constraint (2x + 3y <= 15)
# ]
# b = [2750, 16.50]

# c = [230, 10]
# A = [
#     [3245, 2556],
#     [2.88, 27.65],

#     [-3245, -2556],
#     [-2.88, -27.65],
# ]
# b = [2750, 16.50,
#      -2750, -16.50]

# results = linprog(c=c, A_ub=A, b_ub=b, A_eq=[
#                   [0, 0]], b_eq=[100], bounds=[], method='highs-ds')

c = np.array([-2, -3])

A = np.array([[190,  12.556],
              [4,  27.65],
              [-190,  -12.556],
              [-4,  -27.65]
              ])
A = np.divide(A, 100)

b = np.array([100, 16.5, -100, -16.5])

results = linprog(c=c, A_ub=A, b_ub=b, bounds=[(0, 10)])

# results = linprog(c=c, A_ub=A, b_ub=b, bounds=[
# ], method='highs-ds')

# c = [-2, -1]
# A = [
#     [2, 1], [-5, 4], [-1, 4]
# ]
# b = [22, 15, 12]

# results = linprog(c=c, A_ub=A, b_ub=b, A_eq=[
#                   [-1, 4]], b_eq=[16], bounds=[(0, float('inf')), (0, float('inf'))], method='simplex')


# Construct parameters
rate = 1.06

# Objective function parameters
c_ex2 = np.array([1.30*3, 0, 0, 1.06, 1.30])

# Inequality constraints
A_ex2 = np.array([[1,  1,  0,  0,  0],
                  [1, -rate, 1, 0, 1],
                  [1, 0, -rate, 1, 0]])
b_ex2 = np.array([100000, 0, 0])

# Bounds on decision variables
bounds_ex2 = [(0,    None),
              (-20000, None),
              (-20000, None),
              (-20000, None),
              (0,   50000)]

# Solve the problem
res_ex2 = linprog(-c_ex2, A_eq=A_ex2, b_eq=b_ex2,
                  bounds=bounds_ex2)

print(str(results))
