"""Shared helpers for the demo-overlay generators (gen-*-demo.py): build overlay items in the same
JSON shape the editor saves, with visibility conditions and payload fields."""
import json, copy, random, string

def nid(prefix='ss'):
    return prefix + ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(7))

ANIM_NONE = {"options": {"delay": 0, "duration": 0, "easing": "", "start": 0, "x": 0, "y": 0}, "type": "none"}
FADE_IN = {"options": {"delay": 0, "duration": 150, "easing": "sineOut", "start": 0, "x": 0, "y": 0}, "type": "fade"}
FADE_OUT = {"options": {"delay": 0, "duration": 150, "easing": "sineIn", "start": 0, "x": 0, "y": 0}, "type": "fade"}
# State colour boxes "jump" in: scale from 80% with a slight overshoot (backOut) while fading in.
POP_IN = {"options": {"delay": 0, "duration": 260, "easing": "backOut", "start": 0.8, "x": 0, "y": 0}, "type": "scale"}

def item(element_id, x, y, w, h, *, string='', vis=None, background='#00000000', color='#ffffffff',
         border=None, rounded='rounded-md', fit='cover', align='justify-center', stroke=0, vis_in=None, data=None, opacity=1):
    i = nid()
    bw = f"{border[0]}rem solid" if border else "0rem solid"
    return {
        "512": {"fixed": True, "resizable": True, "draggable": True, "customDragger": False, "customResizer": True,
                "min": {"w": 1, "h": 1}, "max": {"y": 511, "h": 513}, "w": w, "h": h, "x": x, "y": y, "id": i},
        "elementId": element_id, "id": i,
        "data": {
            "advancedStyling": False,
            "animationTrigger": {"in": ANIM_NONE, "out": ANIM_NONE, "selectedOptions": {}},
            "class": {"rounded": rounded, "alignment": align},
            "css": {"background": background, "borderLeft": bw, "borderRight": bw, "borderTop": bw, "borderBottom": bw,
                    "borderColor": border[1] if border else "#ffffffff", "color": color, "opacity": opacity,
                    "fill": "#ff000000", "stroke": "#ff000000", "strokeWidth": 3, "fillOpacity": 1},
            "description": "", "percent": {"startColor": "#ffffff", "endColor": "#6f1622"}, "font": {"family": "default"},
            "image": {"objectFit": fit},
            "visibility": {"in": vis_in or FADE_IN, "out": FADE_OUT, "selectedOptions": vis or []},
            "shadow": {"x": 0, "y": 0, "spread": 0, "color": "#000000ff"},
            "string": string,
            "textStroke": {"size": stroke, "color": "#000000ff"},
            "transform": {"rotate": 0, "scale": "1, 1", "translate": {"x": 0, "y": 0}},
            **(data or {}),
        },
    }

def on(*options):            # one group: any of these true
    return [{o: 1 for o in options}]

