"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistRouter = exports.SongRouter = void 0;
var songs_1 = require("./songs");
Object.defineProperty(exports, "SongRouter", { enumerable: true, get: function () { return __importDefault(songs_1).default; } });
var playlists_1 = require("./playlists");
Object.defineProperty(exports, "playlistRouter", { enumerable: true, get: function () { return __importDefault(playlists_1).default; } });
