const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
];

/* app.get('/', (req, res) => {
    res.send("Hello World!!!");
}); */
app.get('/', (req, res) => {
    res.send(courses);
});
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === +req.params.id);
    if (course) {
        res.send(course);
    } else {
        res.status(404).send("No data found!!!");
    }
});
app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const found = courses.find(c => c.id === +req.params.id);
    if (!found) return res.status(404).send("No course found with this ID!!!");

    // const result = ValidateCourse(req.body);
    const { error } = ValidateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    found.name = req.body.name;
    res.send(courses);
});

app.delete('/api/courses/:id', (req, res) => {
    const find = courses.find(c => c.id === +req.params.id);
    if (!find) return res.status(404).send("No course found with this id");

    const index = courses.indexOf(find);
    courses.splice(index, 1);

    res.send(find);
});

function ValidateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
/* app.get('/api/params/:years/:months', (req, res) => {
    // res.send(req.params);
    res.send(req.query);
});
 */
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Port ${port} is activated!!!`));