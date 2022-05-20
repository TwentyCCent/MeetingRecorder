const NoteService = require('../services/noteServices')

class NoteController{

    async createNote(request, response) {
        const data = request.body;
        console.log("DATA");
        console.table(data);
        const note = await NoteService.createNote(data);
        response.status(200).send("Your notes are created");
    }
}

module.exports = new NoteController();