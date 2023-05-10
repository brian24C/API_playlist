"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSongFromPlaylist = exports.addSongsOnPlaylist = exports.seeSongsOnPlaylist = exports.updatePlaylisst = exports.deletePlaylist = exports.createPlaylist = exports.findOnePlaylist = exports.findPlaylist = void 0;
const client_1 = require("@prisma/client");
const responses_1 = require("../../responses");
const prisma = new client_1.PrismaClient();
const findPlaylist = async (_req, res) => {
    try {
        const playlists = await prisma.playlist.findMany({
            include: {
                songs: {
                    select: {
                        song: {
                            select: {
                                id: true,
                                name: true,
                                link: true,
                                recommendedBy: true,
                            },
                        },
                    },
                },
            },
        });
        return (0, responses_1.success)({ res, data: playlists });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findPlaylist = findPlaylist;
const findOnePlaylist = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const Playlist = await prisma.playlist.findFirst({ where: { id } });
        if (Playlist === null) {
            return (0, responses_1.failure)({ res, message: "Playlist not found" });
        }
        return (0, responses_1.success)({ res, message: "Playlist found", data: Playlist });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findOnePlaylist = findOnePlaylist;
const createPlaylist = async (req, res) => {
    try {
        const { body } = req;
        const playlist = await prisma.playlist.create({
            data: {
                ...body,
            },
        });
        return (0, responses_1.success)({
            status: 201,
            res,
            data: playlist,
            message: "Playlist created successfully",
        });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.createPlaylist = createPlaylist;
const deletePlaylist = async (_req, res) => {
    try {
        const { id } = _req.params;
        const deletePlaylist = await prisma.playlist.delete({
            where: { id: Number(id) },
        });
        return (0, responses_1.success)({
            res,
            message: `Playlist with id ${id} has been deleted.`,
            data: deletePlaylist,
        });
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.deletePlaylist = deletePlaylist;
const updatePlaylisst = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { body } = req;
        const data = await prisma.playlist.update({
            where: { id },
            data: body,
        });
        return (0, responses_1.success)({ res, message: "Playlist updated successfully", data });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.updatePlaylisst = updatePlaylisst;
//Table SongsOnPlaylist
const seeSongsOnPlaylist = async (_req, res) => {
    console.log("llego");
    try {
        console.log("llego");
        const songOnPlaylist = await prisma.songsOnPlaylist.findMany({});
        console.log(songOnPlaylist);
        return (0, responses_1.success)({ res, data: songOnPlaylist });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.seeSongsOnPlaylist = seeSongsOnPlaylist;
const addSongsOnPlaylist = async (req, res) => {
    try {
        const { body } = req;
        const songOnPlaylist = await prisma.songsOnPlaylist.create({
            data: {
                ...body,
            },
        });
        return (0, responses_1.success)({
            status: 201,
            res,
            message: "Playlist added succesfully to the playlist",
            data: songOnPlaylist,
        });
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.addSongsOnPlaylist = addSongsOnPlaylist;
const deleteSongFromPlaylist = async (req, res) => {
    try {
        const { id_song, id_playlist } = req.params;
        const deletedSongOnPlaylist = await prisma.songsOnPlaylist.deleteMany({
            where: { id_song: Number(id_song), id_playlist: Number(id_playlist) },
        });
        if (deletedSongOnPlaylist.count > 0) {
            return (0, responses_1.success)({
                res,
                message: `Song with id ${id_song} has been deleted from playlist ${id_playlist}.`,
                data: deletedSongOnPlaylist,
            });
        }
        else {
            return res.status(404).json({
                ok: false,
                message: `Song with id ${id_song} on playlist ${id_playlist} not found.`,
            });
        }
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.deleteSongFromPlaylist = deleteSongFromPlaylist;
