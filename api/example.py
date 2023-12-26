from scipy.optimize import linprog, LinearConstraint, milp
import numpy as np
from numpy.linalg import multi_dot as dot
import pandas as pd

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

# c = np.array([-230, -10])

# A = np.array([
#     [32.45, 25.56],
#     [0.0288, 0.2765],
# ])
# # A = np.divide(A, 100)

# b = np.array([27.50, 0.165])

# results = linprog(c=c, A_ub=A, b_ub=b, A_eq=[[1, 1]], b_eq=[1000])

# results = linprog(c=c, A_ub=A, b_ub=b, bounds=[
# ], method='highs-ds')

# c = [-50, -18]
# A = [
#     [2, 1],
#     [1, 1],
# ]
# b = [
#     100, 80
# ]

# A_eq = [[1, 1]]
# b_eq = [100]

# x0_bounds = (None, None)
# x1_bounds = (None, None)

# results = linprog(c, A_ub=A, b_ub=b, bounds=[
#     (0, None),
#     (0, None)
# ], )

# c = -np.array([-45, -39, -66, -6.5, -12, -27, -
#               145, -23, -10.5, -700, -650, -450, -20])
# A = np.array([[-0.025, -0.15, 1, 0, 0],
#               [-0.018, -0.005, 0, 1, 0],
#               [1, 1, 0, 0, 1]
#               ])
# b = np.array([1.5, 0.75, 100])

c = -np.array([44.5, 39, 66, 6.5, 12, 27, 145, 23, 10.5, 700, 650, 5, 20])

A = np.array([
    -np.array([0.1, 0.48, 0.42, 0.118,  0.18,
              0.8,  0.65, 0, 0, 0.6, 0.6, 0, 0]),
    [0.04, 0.06, 0.035, 0.125, 0.06, 0.01, 0.045, 0, 0, 0, 0, 0, 0],
    [0.02, 0.05, 0.065, 0.125,  0.2,  0.01, 0.01, 0, 0, 0, 0, 0, 0],
    [0.0001, 0.002, 0.002, 0.0004, 0.002, 0.0028,
        0.0061, 0.37, 0.35, 0, 0, 0, 0],
    -np.array([0.0001, 0.002, 0.002, 0.0004, 0.002, 0.0028,
               0.0061, 0.37, 0.35, 0, 0, 0, 0]),
    -np.array([0.0009, 0.002, 0.002, 0.0046, 0.0016,
              0.0009, 0.03, 0.15, 0.1, 0, 0, 0, 0]),
    -np.array([0.0018, 0.0048, 0.0059, 0.0024,
              0.004, 0.01, 0.018, 0, 0, 1, 0, 0, 0]),

    -np.array([0.0025, 0.016, 0.028, 0.005, 0.009,
              0.069, 0.045, 1, 0, 0, 0, 0, 0]),
    -np.array([3.432, 2.64, 2.42, 2.86, 1.98, 3.08, 2.86, 0, 0, 0, 0, 0, 0]),
    -np.array([3.432, 2.64, 2.42, 2.86, 1.98, 3.08, 2.86, 0, 0, 0, 0, 0, 0]),
])

b = np.array([-280, 54.3, 27.3, 12, -10, -6.0, -5.5, -16, -2750, 2950])

A_eq = [np.ones(13)]
b_eq = [1000]

results = linprog(c, A_ub=A, b_ub=b, A_eq=A_eq, b_eq=b_eq, bounds=[
], )


print(str(results))
