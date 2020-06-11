import datetime
import time


def handle_time(t):
    tl = time.localtime(round(int(t) / 1000))
    date = datetime.date(tl.tm_year, tl.tm_mon, tl.tm_mday)
    return date


def handle_data(res):
    total = 0
    if res["type"] == 0:
        total += res["money"]
        return total
    elif res["type"] == 1:
        total += res["money"]
        return f"-{total}"


def handle_sum(x, y):
    return x.money + y.money




if __name__ == '__main__':
    # print(handle_time(round(time.time()) * 1000))
    # print(round(time.time()))
    # test()

    pass
