def format_input(data):
    if type(data) is list:
        return "{:,}".format(data[0]) + ' min'
    elif type(data) is int:
        return "{:,}".format(data)
    else:
        return data
