# coding:utf-8
arr=[1,2,3,4,5]
fo = file('./data/test.txt', 'w')
fo.write('`'.join(str(arr)))
