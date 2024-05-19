// A database utility function for populating the database with initial data during first the start-up.
// Since we assume our database should have all the standard avatars,
// If the db has no avatars, it implies the db is at its first start-up state.

async function populateDb(repo){

    if (await repo.getAllAvatarCount() !== 0){
        return;
    }

    // Create initial avatars.
    for (let i=0; i<10; i++){
        await repo.addAvatar("avatar-0" + i + ".jpg");
    }
    for (let i=10; i<24; i++){
        await repo.addAvatar("avatar-" + i + ".jpg");
    }


    // Create initial topics
    await repo.addTopic({
            topic_id: 1,
            title: "Number Zero",
            description: "Number 0 is the smallest natural number.",
            imageUri: "TopicNumberZero.jpg",
            metaTitle: null,
            metaDescription: null
        }
    );
    await repo.addTopic({
            topic_id: 2,
            title: "Number One",
            description: "Number 1 is the smallest positive integer that can divide any number.",
            imageUri: "TopicNumberOne.jpg",
            metaTitle: null,
            metaDescription: null
        }
    );
    await repo.addTopic({
            topic_id: 3,
            title: "Number Two",
            description: "Number 2 is the only even prime number.",
            imageUri: "TopicNumberTwo.jpg",
            metaTitle: null,
            metaDescription: null
        }
    );
    await repo.addTopic({
            topic_id: 4,
            title: "Number Three",
            description: "Number 3 is the smallest odd prime number.",
            imageUri: "TopicNumberThree.jpg",
            metaTitle: null,
            metaDescription: null
        }
    );


    // Create initial rocks
    await repo.addRock({
        rock_id: 1,
        rock_name: "Rock Zero",
        product_key: "keyForRockZero",
        topic_id: 1,
        imageUri: "maths-rocks-zero.jpg"
    });
    await repo.addRock({
        rock_id: 2,
        rock_name: "Rock One",
        product_key: "keyForRockOne",
        topic_id: 2,
        imageUri: "maths-rocks-one.jpg"
    });
    await repo.addRock({
        rock_id: 3,
        rock_name: "Rock Two",
        product_key: "keyForRockTwo",
        topic_id: 3,
        imageUri: "maths-rocks-two.jpg"
    });
    await repo.addRock({
        rock_id: 4,
        rock_name: "Rock Three",
        product_key: "keyForRockThree",
        topic_id: 4,
        imageUri: "maths-rocks-three.jpg"
    });


    // Create initial badges
    await repo.addBadge({
            badge_title: "First Rock!",
            badge_description: "Congratulation! You have found your very first rock!",
            badge_imageUri: "badge-1.png"
        }
    )
    await repo.addBadge({
            badge_title: "Fifth Rock!",
            badge_description: "Wow! You have collected five rocks already, nice!",
            badge_imageUri: "badge-5.png"
        }
    )
    await repo.addBadge({
            badge_title: "Make It 10!",
            badge_description: "Unbelievable! How is that even possible to get 10 rocks?",
            badge_imageUri: "badge-1.png"
        }
    )
    await repo.addBadge({
            badge_title: "Legendary Rock Hunter Certificate",
            badge_description: "This is the proof that you have become a legendary rock hunter, brave adventurer!",
            badge_imageUri: "badge-20.png"
        }
    )
}

module.exports = populateDb;