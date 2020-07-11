const router = require("express").Router();
const db = require("../models");

// Route for creating a workout
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body).then(dbWorkout => {
        res.send(dbWorkout);
    }).catch(err => {
        res.status(400).json(err);
    });
});

// Route for getting a specific workout
router.get("/api/workouts", (req, res) => {
    db.Workout.find().sort({ day: -1 }).limit(1)
        .then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        })
});

// Route for grabbing all workouts
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.status(400).json(err);
    })
});

// Route for updating a workout by its ID
router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { exercises: req.body }},
    ).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
})

module.exports = router;