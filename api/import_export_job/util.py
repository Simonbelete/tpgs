import pandas as pd
from .models import import_fs

def read_file(file, format="csv", sheet_name=0):
    file_open = file.open('rb')
    if (format == "csv"):
        return pd.read_csv(file_open, header=0, sheet_name=sheet_name, encoding='utf-8', engine='python')
    elif (format == "xlsx" or format == "xls"):
        return pd.read_excel(file_open, header=0, sheet_name=sheet_name)
    else:
        raise Exception("Not Valid file format try csv,xlsx, xls")
