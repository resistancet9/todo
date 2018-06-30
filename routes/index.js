const TodoModel = require("./../models/Todo");

module.exports = app => {
  app.post("/delete", async function(req, res) {
    const id = req.body.id;
    try {
      const results = await TodoModel.deleteOne({ _id: id });
      res.send({ message: "Success", code: 200, data: results });
    } catch (e) {
      console.log(e.message);
    }
  });

  app.post("/add", async function(req, res) {
    const text = req.body.text;
    try {
      await new TodoModel({ text: text }).save();
      const results = await TodoModel.find();
      res.json(results);
    } catch (e) {
      res.json(e);
    }
  });

  app.get("/all", async function(req, res) {
    try {
      const results = await TodoModel.find();
      res.send(results);
    } catch (e) {
      console.log(e.message);
    }
  });

  app.post("/deleteall", async function(req, res) {
    try {
      const results = await TodoModel.deleteMany();
      res.send(results);
    } catch (e) {
      console.log(e.message);
    }
  });

  app.post("/toggle", async function(req, res) {
    const id = req.body.id;
    try {
      const todoToToggle = await TodoModel.findOne({ _id: id });
      const results = await TodoModel.findOneAndUpdate(
        { _id: todoToToggle._id },
        { completed: !todoToToggle.completed }
      );
      res.send(results);
    } catch (e) {
      console.log(e.message);
    }
  });
};
