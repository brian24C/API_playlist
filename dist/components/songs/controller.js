"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSongs = exports.addSongs = exports.updateSong = exports.findOneSong = exports.findAllSongs = void 0;
const responses_1 = require("../../responses");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const findAllSongs = async (req, res) => {
    try {
        //const Songs = await supabase.from("songs").select("*");
        const Songs = await prisma.song.findMany({});
        return (0, responses_1.success)({ res, data: Songs });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findAllSongs = findAllSongs;
const findOneSong = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        //const Song = await supabase.from("Songs").select("*").eq("id", id);
        const Song = await prisma.song.findFirst({ where: { id } });
        if (Song === null) {
            return (0, responses_1.failure)({ res, message: "Song not found" });
        }
        return (0, responses_1.success)({ res, message: "Song found", data: Song });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findOneSong = findOneSong;
const updateSong = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { body } = req;
        // const { data } = await supabase
        //   .from("Songs")
        //   .update({ ...body })
        //   .match({ id })
        //   .select();
        const data = await prisma.song.update({
            where: { id },
            data: body,
        });
        //No necessary because when data is not founded then the throw an error.
        // if (data === null) {
        //   return failure({ res, message: "Song not exist" });
        // }
        return (0, responses_1.success)({ res, message: "Song updated successfully", data });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.updateSong = updateSong;
const addSongs = async (req, res) => {
    try {
        const { body } = req;
        //const addSong = await supabase.from("songs").insert(body).select();
        const data = await prisma.song.create({
            data: body,
        });
        return (0, responses_1.success)({
            status: 201,
            res,
            message: "Song added succesfully",
            data: data,
        });
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.addSongs = addSongs;
const deleteSongs = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        //const deleteSong = await supabase.from("Songs").delete().match({ id: id });
        const deleteSong = await prisma.song.delete({
            where: {
                id,
            },
        });
        return (0, responses_1.success)({
            res,
            message: "Song deleted succesfully",
            data: deleteSong,
        });
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.deleteSongs = deleteSongs;
