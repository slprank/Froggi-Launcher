export const COL = 512;
export const ROW = Math.floor((COL * 9) / 16);
export const MIN = Math.floor(COL / 100);

export const WEBSOCKET_PORT = 3100;

export const SCENE_TRANSITION_DELAY = 1000


interface CharacterMap {
    [key: string | number]: string | number
}
export const CHARACTERS: CharacterMap = {
    "captain falcon": 0,
    0: "Captain Falcon",
    "donkey kong": 1,
    1: "Donkey Kong",
    "fox": 2,
    2: "Fox",
    "game and watch": 3,
    3: "Game And Watch",
    "kirby": 4,
    4: "Kirby",
    "bowser": 5,
    5: "Bowser",
    "link": 6,
    6: "Link",
    "luigi": 7,
    7: "Luigi",
    "mario": 8,
    8: "Mario",
    "marth": 9,
    9: "Marth",
    "mewtwo": 10,
    10: "Mewtwo",
    "ness": 11,
    11: "Ness",
    "peach": 12,
    12: "Peach",
    "pikachu": 13,
    13: "Pikachu",
    "ice climbers": 14,
    14: "Ice Climbers",
    "jigglypuff": 15,
    15: "Jigglypuff",
    "samus": 16,
    16: "Samus",
    "yoshi": 17,
    17: "Yoshi",
    "zelda": 18,
    18: "Zelda",
    "sheik": 19,
    19: "Sheik",
    "falco": 20,
    20: "Falco",
    "young link": 21,
    21: "Young Link",
    "dr mario": 22,
    22: "Dr Mario",
    "roy": 23,
    23: "Roy",
    "pichu": 24,
    24: "Pichu",
    "ganondorf": 25,
    25: "Ganondorf"
}