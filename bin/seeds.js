require("../config/db.config");

const User = require("../models/user.model");
const faker = require("faker");

const userIds = [];

Promise.all([
    User.deleteMany(),
])
    .then(() => {
        console.log('empty database')

        for (let i = 0; i < 100; i++) {
            const user = new User({
                name: faker.name.findName(),
                email: faker.internet.email(),
                username: faker.internet.userName(),
                avatar: faker.image.avatar(),
                bio: faker.lorem.sentence(),
                createdAt: faker.date.past(),
            });

            user.save()
                .then(user => {
                    userIds.push(user._id);
                })
        }
    })