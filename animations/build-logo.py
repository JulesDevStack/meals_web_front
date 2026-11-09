import json
import re
from pathlib import Path
import xml.etree.ElementTree as ET

directory = Path(__file__).resolve().parent
source = ET.parse(directory / 'logo-source.svg').getroot()


def paths(data):
    tokens = re.findall(r'[MLCVZ]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?', data)
    result = []
    vertices, incoming, outgoing = [], [], []
    index = 0
    command = None

    def point():
        nonlocal index
        value = [float(tokens[index]), float(tokens[index + 1])]
        index += 2
        return value

    def append(value):
        vertices.append(value)
        incoming.append([0, 0])
        outgoing.append([0, 0])

    while index < len(tokens):
        if tokens[index] in ('M', 'L', 'C', 'V', 'Z'):
            command = tokens[index]
            index += 1
        if command == 'M':
            assert not vertices
            append(point())
            command = 'L'
        elif command == 'L':
            append(point())
        elif command == 'V':
            append([vertices[-1][0], float(tokens[index])])
            index += 1
        elif command == 'C':
            control1, control2, end = point(), point(), point()
            outgoing[-1] = [control1[n] - vertices[-1][n] for n in (0, 1)]
            append(end)
            incoming[-1] = [control2[n] - end[n] for n in (0, 1)]
        elif command == 'Z':
            result.append({'i': incoming, 'o': outgoing, 'v': vertices, 'c': True})
            vertices, incoming, outgoing = [], [], []
            command = None
        else:
            raise ValueError(command)
    assert not vertices
    return result


def fixed(value):
    return {'a': 0, 'k': value}


def animated(values):
    frames = []
    for frame, value in values[:-1]:
        frames.append({'t': frame, 's': value, 'o': {'x': 0.33, 'y': 0}, 'i': {'x': 0.67, 'y': 1}})
    frames.append({'t': values[-1][0], 's': values[-1][1]})
    return {'a': 1, 'k': frames}


groups = []
for index, element in enumerate(source):
    assert element.tag.endswith('path')
    color = element.attrib['fill']
    rgb = [1, 1, 1] if color == 'white' else [int(color[n:n + 2], 16) / 255 for n in (1, 3, 5)]
    shapes = [{'ty': 'sh', 'ks': fixed(path), 'nm': 'Contour'} for path in paths(element.attrib['d'])]
    shapes.append({'ty': 'fl', 'c': fixed(rgb + [1]), 'o': fixed(100), 'r': 1})
    shapes.append({'ty': 'tr', 'p': fixed([0, 0]), 'a': fixed([0, 0]), 's': fixed([100, 100]), 'r': fixed(0), 'o': fixed(100), 'sk': fixed(0), 'sa': fixed(0)})
    groups.append({'ty': 'gr', 'nm': f'Logo path {index + 1}', 'it': shapes})

animation = {
    'v': '5.12.2', 'fr': 60, 'ip': 0, 'op': 300, 'w': 1000, 'h': 760,
    'nm': 'Meals Festival — logo', 'ddd': 0, 'assets': [],
    'markers': [{'tm': 0, 'cm': 'Entrance', 'dr': 72}, {'tm': 72, 'cm': 'Hold', 'dr': 168}, {'tm': 240, 'cm': 'Exit', 'dr': 60}],
    'layers': [{
        'ddd': 0, 'ind': 1, 'ty': 4, 'nm': 'Meals Festival', 'sr': 1,
        'ks': {
            'a': fixed([433.5, 289, 0]),
            'p': animated([(0, [500, 440, 0]), (42, [500, 367, 0]), (66, [500, 380, 0]), (138, [500, 372, 0]), (210, [500, 380, 0]), (240, [500, 380, 0]), (288, [500, 345, 0]), (300, [500, 345, 0])]),
            's': animated([(0, [76, 76, 100]), (42, [104, 104, 100]), (66, [100, 100, 100]), (240, [100, 100, 100]), (288, [96, 96, 100]), (300, [96, 96, 100])]),
            'r': animated([(0, [-5]), (42, [1]), (66, [0]), (240, [0]), (288, [0]), (300, [0])]),
            'o': animated([(0, [0]), (24, [100]), (252, [100]), (288, [0]), (300, [0])])
        },
        'ao': 0, 'shapes': list(reversed(groups)), 'ip': 0, 'op': 300, 'st': 0, 'bm': 0
    }]
}
(directory / 'meals-festival-logo.json').write_text(json.dumps(animation, separators=(',', ':')))
print(f'Built {len(groups)} vector groups, 5 seconds at 60 fps')
