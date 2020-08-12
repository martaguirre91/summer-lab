require("../config/db.config");

const User = require("../models/user.model");
const Project = require("../models/project.model");
const Comment = require("../models/comment.model");

const userIds = [];

const faker = require("faker")
const path = require('path')


function filesUrls() {
    var filesNumb = Math.random() * 5
    var files = []
    for (let a = 0; a < filesNumb; a++) {
        files.push(path.format({ base: faker.fake("{{random.words}}").replace(/ /g, path.sep).toLowerCase() })+'.html')
    }
    return files
}


Promise.all([
    User.deleteMany(),
    Project.deleteMany(),
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

                    for (let j = 0; j < 5; j++) {
                        const project = new Project({
                            user: user._id,
                            projectName: faker.lorem.word(),
                            body: faker.lorem.paragraph(),
                            file: filesUrls(),

                        })
                        project.save()
                        .then(pr => {
                            for (let k = 0; k < Math.floor(Math.random()*7); k++){
                                const comment = new Comment({
                                    user: userIds[Math.floor(Math.random()*userIds.length)],
                                    project: pr._id,
                                    text: faker.lorem.sentence(),
                                })
                                comment.save();
                            }
                        })
                    }
                })
        }
    })