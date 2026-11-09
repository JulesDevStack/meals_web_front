import json
import math
from pathlib import Path

directory = Path(__file__).resolve().parent
base = json.loads((directory / 'meals-festival-logo.json').read_text())
duration = 540


def fixed(value):
    return {'a': 0, 'k': value}


def motion(values):
    return {'a': 1, 'k': [
        dict(t=t, s=v, o={'x': .22, 'y': 0}, i={'x': .65, 'y': 1})
        if index < len(values) - 1 else dict(t=t, s=v)
        for index, (t, v) in enumerate(values)
    ]}


def mask(points, mode='a'):
    return {'inv': False, 'mode': mode, 'pt': fixed({
        'v': points, 'i': [[0, 0] for _ in points],
        'o': [[0, 0] for _ in points], 'c': True
    }), 'o': fixed(100), 'x': fixed(0)}


top = [
    ('S', [691, 150], [[532, 0], [790, 0], [790, 280], [671, 310], [641, 292], [641, 247], [585, 215], [585, 130], [533, 99]]),
    ('L', [548, 210], [[430, 60], [479, 60], [585, 130], [585, 256], [630, 281], [630, 314], [542, 354], [522, 330], [490, 175], [433, 140]]),
    ('A', [448, 276], [[338, 137], [388, 112], [491, 175], [528, 357], [488, 375], [481, 336], [445, 350], [431, 391], [388, 407], [338, 380]]),
    ('E', [322, 280], [[268, 180], [315, 153], [394, 201], [394, 234], [351, 259], [341, 255], [304, 276], [338, 296], [375, 275], [375, 307], [338, 328], [304, 309], [304, 351], [339, 333], [383, 357], [348, 376], [348, 406], [268, 363]]),
    ('M', [195, 205], [[107, 102], [241, 22], [284, 45], [291, 94], [333, 68], [375, 91], [376, 118], [342, 137], [338, 162], [315, 153], [268, 180], [268, 336], [240, 352], [206, 336], [206, 233], [187, 324], [162, 311], [139, 201], [139, 301], [107, 284]])
]

borders = [
    [[0, 0], [0, 760]],
    [[176, 0], [176, 760]],
    [[246, 0], [246, 760]],
    [[328, 0], [328, 431], [353, 445], [353, 760]],
    [[437, 0], [437, 392], [451, 404], [451, 760]],
    [[481, 0], [481, 760]],
    [[597, 0], [597, 329], [612, 339], [580, 496], [580, 760]],
    [[630, 0], [630, 312], [647, 324], [673, 435], [690, 444], [690, 760]],
    [[867, 0], [867, 760]]
]

letters = []
for index, (letter, anchor, polygon) in enumerate(top):
    masks = [mask(polygon)] + [mask(previous[2], 's') for previous in top[:index]]
    letters.append((letter, anchor, masks, (4 - index) * 10, 4 - index))
for index, (letter, anchor) in enumerate(zip('FESTIVAL', [[137, 370], [205, 421], [281, 460], [382, 489], [464, 463], [539, 437], [629, 407], [711, 367]])):
    polygon = borders[index] + list(reversed(borders[index + 1]))
    masks = [mask(polygon)] + [mask(item[2], 's') for item in top]
    letters.append((letter, anchor, masks, 58 + index * 8, index + 5))

layers = []
for letter, anchor, masks, delay, order in letters:
    x, y = anchor
    px, py = x + 66.5, y + 91
    direction = -1 if order % 2 == 0 else 1
    wave = 232 + order * 5
    exit_frame = 426 + order * 4
    landing = delay + 38
    layer = {
        'ddd': 0, 'ind': order + 1, 'ty': 0, 'nm': f'{order + 1:02d} · {letter}',
        'refId': 'original-logo', 'w': 867, 'h': 578,
        'sr': 1, 'st': 0, 'ip': 0, 'op': duration, 'bm': 0,
        'hasMask': True, 'masksProperties': masks,
        'ks': {
            'a': fixed([x, y, 0]),
            'p': motion([(0, [px + direction * 65, py - 110, 0]), (delay, [px + direction * 65, py - 110, 0])] [:(1 if delay == 0 else 2)] + [
                (landing, [px, py + 14, 0]), (landing + 11, [px, py - 7, 0]),
                (landing + 22, [px, py, 0]), (wave, [px, py, 0]),
                (wave + 15, [px, py - 25, 0]), (wave + 30, [px, py + 5, 0]),
                (wave + 43, [px, py, 0]), (exit_frame, [px, py, 0]),
                (exit_frame + 38, [px + direction * 80, py + 100, 0]), (duration, [px + direction * 80, py + 100, 0])]),
            's': motion([(0, [40, 40, 100]), (landing, [112, 88, 100]), (landing + 11, [96, 105, 100]), (landing + 22, [100, 100, 100]),
                (wave, [100, 100, 100]), (wave + 15, [103, 103, 100]), (wave + 43, [100, 100, 100]),
                (exit_frame, [100, 100, 100]), (exit_frame + 38, [65, 65, 100]), (duration, [65, 65, 100])]),
            'r': motion([(0, [direction * 18]), (landing, [-direction * 4]), (landing + 22, [0]),
                (wave, [0]), (wave + 15, [direction * 5]), (wave + 43, [0]),
                (exit_frame, [0]), (exit_frame + 38, [-direction * 18]), (duration, [-direction * 18])]),
            'o': motion([(0, [0])] + ([(delay, [0])] if delay else []) + [(delay + 15, [100]),
                (exit_frame + 4, [100]), (exit_frame + 32, [0]), (duration, [0])])
        }
    }
    layers.append(layer)

source_layer = base['layers'][0]
source_layer['ks'] = {'a': fixed([0, 0, 0]), 'p': fixed([0, 0, 0]), 's': fixed([100, 100, 100]), 'r': fixed(0), 'o': fixed(100)}
source_layer['op'] = duration

for index, (x, y, size) in enumerate([(111, 206, 14), (830, 204, 18), (827, 545, 12), (183, 638, 13), (508, 56, 12), (605, 684, 10)]):
    points = [[0, -size], [size * .22, -size * .22], [size, 0], [size * .22, size * .22],
              [0, size], [-size * .22, size * .22], [-size, 0], [-size * .22, -size * .22]]
    start = 152 + index * 4
    second = 318 + index * 3
    color = [186 / 255, 29 / 255, 29 / 255, 1] if index % 2 else [26 / 255, 159 / 255, 99 / 255, 1]
    layers.insert(0, {
        'ddd': 0, 'ind': 30 + index, 'ty': 4, 'nm': f'Spark {index + 1}', 'sr': 1, 'st': 0, 'ip': 0, 'op': duration, 'bm': 0,
        'ks': {'a': fixed([0, 0, 0]), 'p': fixed([x, y, 0]),
            's': motion([(0, [0, 0, 100]), (start, [0, 0, 100]), (start + 12, [100, 100, 100]), (start + 32, [0, 0, 100]),
                (second, [0, 0, 100]), (second + 12, [80, 80, 100]), (second + 32, [0, 0, 100]), (duration, [0, 0, 100])]),
            'r': motion([(0, [0]), (start, [0]), (start + 32, [90]), (second, [90]), (second + 32, [180]), (duration, [180])]), 'o': fixed(100)},
        'shapes': [{'ty': 'sh', 'ks': fixed({'v': points, 'i': [[0, 0]] * 8, 'o': [[0, 0]] * 8, 'c': True})},
                   {'ty': 'fl', 'c': fixed(color), 'o': fixed(100), 'r': 1}]
    })

animation = {key: base[key] for key in ('v', 'fr', 'w', 'h', 'ddd')}
animation.update({
    'nm': 'Meals Festival · Letter choreography', 'ip': 0, 'op': duration,
    'assets': [{'id': 'original-logo', 'w': 867, 'h': 578, 'layers': [source_layer]}],
    'layers': layers,
    'markers': [{'tm': 0, 'cm': 'Letter entrance', 'dr': 180}, {'tm': 190, 'cm': 'Assembled logo', 'dr': 40},
        {'tm': 232, 'cm': 'Letter wave', 'dr': 108}, {'tm': 350, 'cm': 'Assembled logo', 'dr': 76}, {'tm': 426, 'cm': 'Scatter', 'dr': 114}]
})
(directory / 'meals-festival-letters.json').write_text(json.dumps(animation, separators=(',', ':')))
print('Built 13 independently animated vector cutouts, 9 seconds at 60 fps.')
