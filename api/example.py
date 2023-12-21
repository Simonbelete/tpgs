from scipy.optimize import linprog, LinearConstraint, milp

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

c = -np.array([230, 10])
A = np.array([[32.45, 25.56],
              [0.0288, 0.2765],])
b_u = np.array([27.50, 0.165])
b_l = np.full_like(b_u, -np.inf)

constraints = LinearConstraint(A, b_l, b_u)
integrality = np.ones_like(c)

results = milp(c=c, constraints=constraints, integrality=integrality)


# # Solve the problem
# res_ex2 = linprog(-c_ex2, A_eq=A_ex2, b_eq=b_ex2,
#                   bounds=bounds_ex2)

print(str(results))
