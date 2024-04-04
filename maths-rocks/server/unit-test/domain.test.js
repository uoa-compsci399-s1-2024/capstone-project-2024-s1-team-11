const MathsTopic = require("../domain/maths-topic.js");
const MathsRock = require("../domain/maths-rock.js");
const User = require("../domain/user.js")

function createTopicsList(){
    let topic_1 = new MathsTopic(1, "number 1", "just 1");
    let topic_2 = new MathsTopic(2, "number 2", "just 2");
    let topic_3 = new MathsTopic(3, "number 3", "just 3");

    return [topic_1, topic_2, topic_3];
}

function createMathsRocks(){
    let topics = createTopicsList();
    let rocksList = [];
    let idCounter = 1;

    topics.forEach(topic => {
        let newRock = new MathsRock(idCounter, topic);
        rocksList.push(newRock);
        idCounter++;
    });

    return rocksList;
}

test('Create new maths topics', () => {
    let topicsList = createTopicsList();
    let topic = topicsList[0];
    expect(topic.getTopicId()).toBe(1);
    expect(topic.getTitle()).toBe("number 1");
    expect(topic.getDescription()).toBe("just 1");
})

test('Create new maths rocks', () => {
    let rocks = createMathsRocks();
    let rock = rocks[0];
    expect(rock.getRockId()).toBe(1);
    expect(rock.getMathsTopic().getTitle()).toBe("number 1");
})

test('Create a new user', () => {
    let user = new User(1, "Bob", "password123");
    expect(user.getUserId()).toBe(1);
    expect(user.getUsername()).toBe("Bob");
    expect(user.getPassword()).toBe("password123");
    expect(user.getRocksCollection().size).toBe(0);
})

test('Add/Remove rock to user collections', () => {
    let user = new User(1, "Bob", "password123");
    let rocks = createMathsRocks();
    rocks.forEach(rock => { user.addRockToCollection(rock); })
    console.log(rocks);
    expect(user.getRocksCollection().size).toBe(3);
    expect(user.getRocksCollection().get(1).getRockId()).toBe(1);
    expect(user.getRocksCollection().get(1).getMathsTopic().getTitle()).toBe("number 1");

    user.removeRockFromCollection(rocks[1]);
    expect(user.getRocksCollection().size).toBe(2);
    expect(user.getRocksCollection().get(2)).toBe(undefined);
})