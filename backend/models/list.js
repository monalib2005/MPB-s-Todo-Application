const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
});


const List = mongoose.model("List",listSchema);

module.exports = List;

