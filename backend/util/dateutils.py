from datetime import datetime

MONTHS_PT_BR = [
    'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
    'jul', 'ago', 'set', 'out', 'nov', 'dez'
]


def str_short_date(date):
    if isinstance(date, str):
        try:
            date = datetime.strptime(date, '%Y-%m-%d')
        except ValueError:
            return date
    today = datetime.today()
    d1, d2 = date.day, today.day
    m1, m2 = date.month, today.month
    y1, y2 = date.year, today. year
    if d1 == d2 and m1 == m2 and y1 == y2:
        return f'{date.hour}:{date.minute}'
    month_name = MONTHS_PT_BR[date.month-1]
    if y1 != y2:
        return f'{month_name}/{y1}'
    return f'{d1} {month_name}'

def parse_yymmdd(s):
    v = s.split('/')
    today = datetime.today()
    dd, mm, yy = today.day, today.month, today.year
    found = False
    index = 0
    while index < len(v):
        if v[index].isalpha():
            mm = MONTHS_PT_BR.index(v[index])+1
            if len(v) > index + 1:
                yy = int(v[index+1])
            elif mm > today.month:
                yy -= 1
            if index == 0:
                dd = 1
            else:
                dd = int(v[0])
            found = True
            break
        index += 1
    if not found:
        if len(v) == 1:
            dd = int(v[0])
        else:
            today = datetime.strptime(s, '%d/%m/%Y')
            dd, mm, yy = today.day, today.month, today.year
    result = datetime(yy, mm, dd).strftime('%Y-%m-%d')
    return f"'{result}'"

def run_tests():
    values = [
        ('23/set', '2019-09-23'),
        ('fev/2020', '2020-02-01'),
        ('25/04/2018', '2018-04-25'),
        ('3/out/1966', '1966-10-03'),
        ('mar', '2020-03-01'),
        ('10', '2020-08-10'),
    ]
    print('*** Testando parse_yymmdd =>')
    for v in values:
        arg, expected = v
        print('\t', arg.ljust(12), '\t', end='')
        result = parse_yymmdd(arg)
        ok = result == expected
        print(result, '\t', ok)

if __name__ == '__main__':
    run_tests()
