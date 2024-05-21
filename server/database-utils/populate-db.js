// A database utility function for populating the database with initial data during first the start-up.
// Since we assume our database should have all the standard avatars,
// If the db has no avatars, it implies the db is at its first start-up state.

const {Users_Rocks} = require("../models");

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

    // Create fake user accounts.
    await repo.addUser(
        {
            username: "BillyTheCat",
            alias: "Billy",
            password: "$2b$10$TznkfGPUvXpsDD/zEXRuGuqgIkSh8vtgx0pqnwcA0z.0QUHZe.2Za",
            salt:"$2b$10$TznkfGPUvXpsDD/zEXRuGuqgIkSh8vtgx0pqnwcA0z",
            avatar_id: 23,
            email: "fakeemail1@email.com",
            district: "Auckland City"
        }
    )
    await repo.addUser(
        {
            username: "TommyTheCat",
            alias: "TommyTheCat",
            password: "$2b$10$TznkfGPUvXpsDD/zEXRuGuqgIkSh8vtgx0pqnwcA0z.0QUHZe.2Za",
            salt:"$2b$10$TznkfGPUvXpsDD/zEXRuGuqgIkSh8vtgx0pqnwcA0z",
            avatar_id: 23,
            email: "fakeemail2@email.com",
            district: "Auckland City"
        }
    )
    // Manukau City
    await repo.addUser(
        {
            username: "Spongebob",
            alias: "Spongebob",
            password: "$2b$10$TznkfGPUvXpsDD/zEXRuGuqgIkSh8vtgx0pqnwcA0z.0QUHZe.2Za",
            salt:"$2b$10$TznkfGPUvXpsDD/zEXRuGuqgIkSh8vtgx0pqnwcA0z",
            avatar_id: 2,
            email: "fakeemail3@email.com",
            district: "Manukau City"
        }
    )
    await repo.addUser(
        {
            username: "Squidward",
            alias: "Squidward",
            password: "$2b$10$TznkfGPUvXpsDD/zEXRuGuqgIkSh8vtgx0pqnwcA0z.0QUHZe.2Za",
            salt:"$2b$10$TznkfGPUvXpsDD/zEXRuGuqgIkSh8vtgx0pqnwcA0z",
            avatar_id: 7,
            email: "fakeemail4@email.com",
            district: "Manukau City"
        }
    )
    await repo.addUser(
        {
            username: "PatrickStar",
            alias: "Patrick",
            password: "$2b$10$TznkfGPUvXpsDD/zEXRuGuqgIkSh8vtgx0pqnwcA0z.0QUHZe.2Za",
            salt:"$2b$10$TznkfGPUvXpsDD/zEXRuGuqgIkSh8vtgx0pqnwcA0z",
            avatar_id: 8,
            email: "fakeemail5@email.com",
            district: "Manukau City"
        }
    )
    // Add rocks to the fake users.
    // Add to Billy the Cat
    await Users_Rocks.create({user_id: 1, rock_id: 1, collectedAt: "2024-4-1"});
    await Users_Rocks.create({user_id: 1, rock_id: 2, collectedAt: "2024-4-1"});
    await Users_Rocks.create({user_id: 1, rock_id: 3, collectedAt: "2024-4-1"});
    await Users_Rocks.create({user_id: 1, rock_id: 4, collectedAt: "2024-4-1"});

    // Add to Tommy the Cat
    await Users_Rocks.create({user_id: 2, rock_id: 1, collectedAt: "2024-4-1"});
    await Users_Rocks.create({user_id: 2, rock_id: 2, collectedAt: "2024-4-1"});
    await Users_Rocks.create({user_id: 2, rock_id: 3, collectedAt: "2024-4-1"});
    await Users_Rocks.create({user_id: 2, rock_id: 4, collectedAt: "2024-5-1"});

    // Add to Spongebob
    await Users_Rocks.create({user_id: 3, rock_id: 1, collectedAt: "2024-4-1"});
    await Users_Rocks.create({user_id: 3, rock_id: 2, collectedAt: "2024-4-1"});
    await Users_Rocks.create({user_id: 3, rock_id: 3, collectedAt: "2024-5-1"});

    // Add to Squidward
    await Users_Rocks.create({user_id: 4, rock_id: 1, collectedAt: "2024-4-1"});
    await Users_Rocks.create({user_id: 4, rock_id: 2, collectedAt: "2024-5-1"});


    // Create initial content for about-us and privacy-policy page.
    await repo.addPage({
        page_name: "about",
        title: "about",
        content: "<h1>About Maths Rocks</h1>\n" +
            "<p>Maths Rocks is the brainchild of Dr Nicolette Rattenbury from the University of Auckland. The goal of this website is to provide Kiwi’s with an engaging educational web application that works in tandem with the real-world hobby of searching for painted rocks, making positive associations between maths, treasure hunting, fun and discovery.</p>\n" +
            "<p>Maths can seem scary to some people, but we think maths is awesome. Maths Rocks is all about sharing knowledge, getting outdoors and searching for rocks, and above all else, encouraging a love of maths. </p>\n" +
            "<h2>How it works</h2>\n" +
            "<p>There’s this cool craze that's taken off in New Zealand where people paint rocks and hide them for children to find. We have painted heaps of rocks with mathematical concepts on them and hidden them around the Auckland region. All you have to do is find a rock, scan the QR code, register an account and add the rock to your collection! </p>\n" +
            "<h2>How to earn badges</h2>\n" +
            "<p>You will automatically be awarded badges when you reach rock collecting milestones. The first badge is awarded when you collect your first rock, and then badges will be given for reaching 5, 10 and 20 rocks.</p>\n" +
            "<h2>Rock hunting tips</h2>\n" +
            "<p>We have hidden rocks around Auckland.</p>\n" +
            "<p>Share your finds with your friends, get together a group of friends and go rock hunting, and remember to hide the rocks again for someone else to find.</p>\n" +
            "<p>Happy rock hunting everyone!</p>"
        }
    )
    await repo.addPage({
            page_name: "privacy-policy",
            title: "privacy-policy",
            content: "<h1>Math Rocks Privacy Policy</h1>\n" +
                "            <h2>1. About this Privacy Policy</h2>\n" +
                "            <p>This Privacy Policy applies to your access to or use of our websites, applications, and other services.</p>\n" +
                "            <p>During the registration process for our products and services and in other registration forms, we will indicate the types of personal information you must provide and the types of personal information we request. You may choose not to submit the information we request, but that may limit or prevent Math Rocks from providing you with the Services.</p>\n" +
                "            <h2>2. Information We Collect</h2>\n" +
                "            <p>We collect information about you in three ways: directly from what you enter, from third-party sources, and with the help of automated technologies.</p>\n" +
                "            <h3>2.1 Data you provide to us</h3>\n" +
                "            <p>The types of personal information we collect directly from you, depending on how you interact with us and the Services, may include:</p>\n" +
                "            <ul>\n" +
                "              <li>Contact details, such as your provided username, email address, and region;</li>\n" +
                "              <li>Account login credentials, such as username and password, password hints, and similar security information;</li>\n" +
                "              <li>Comments, feedback, and other information that you provide to us, such as search query data and questions, or information you send to customer support;</li>\n" +
                "              <li>Interests and communication preferences.</li>\n" +
                "            </ul>\n" +
                "            <h3>2.2 Data from Other Sources</h3>\n" +
                "            <p>We may also obtain your contact details and other information about you from our affiliates and other third parties, including:</p>\n" +
                "            <ul>\n" +
                "              <li>The social network you use when you grant permission to the Service to access your data on one or more social networks;</li>\n" +
                "              <li>Service providers who can help us determine locations so that certain products can be targeted to your location;</li>\n" +
                "              <li>Businesses with whom we partner to provide co-branded services or participate in joint marketing activities.</li>\n" +
                "            </ul>\n" +
                "            <h3>3. How We Use Your Information</h3>\n" +
                "            <p>Depending on how you interact with us and the Services, we may use your personal information to:</p>\n" +
                "            <ul>\n" +
                "              <li>To provide, activate, and manage your access to and use of the Services;</li>\n" +
                "              <li>to process and fulfill requests, orders, downloads, subscriptions, or other transactions;</li>\n" +
                "              <li>To provide technical, product, and other support to help keep the Services functional, secure, and stable</li>\n" +
                "              <li>To enhance and improve the Services and our other products, activities and services, and to develop new products, services, and benefits;</li>\n" +
                "              <li>to respond to your requests, inquiries, comments, and concerns;</li>\n" +
                "              <li>To notify you of changes, updates, and other announcements related to the Service and our other products and services</li>\n" +
                "              <li>To comply with our legal obligations, resolve disputes, and enforce our agreements.</li>\n" +
                "            </ul>\n" +
                "            <h2>4. Sharing Your Information</h2>\n" +
                "            <h3>4.1 Application Licensors</h3>\n" +
                "            <p>If you access the application on the Services through a license agreement with the licensor of a third-party application, personal information associated with that third-party application may be shared with that licensor so that it can provide you with access to the application in accordance with the terms of the license agreement and privacy policy. </p>\n" +
                "            <h3>4.2 For Legal Reasons</h3>\n" +
                "            <p>We will also disclose your personal information when we believe it is reasonably necessary for the following purposes:</p>\n" +
                "            <ul>\n" +
                "              <li>to comply with any applicable law, regulation, legal process or other legal obligation;</li>\n" +
                "              <li>detect, investigate, and help prevent security, fraud, or technical issues;</li>\n" +
                "              <li>to protect the rights, property, or safety of Math Rock, our users, employees, or others;</li>\n" +
                "              <li>Completing corporate matters, such as asset transfers, acquisitions by other companies, or mergers with other companies.</li>\n" +
                "            </ul>\n" +
                "            <h2>5. Basis for processing</h2>\n" +
                "            <p>When we collect or otherwise process any personal information within the framework of applicable data protection laws, we do so in order to:</p>\n" +
                "            <ul>\n" +
                "              <li>To provide the Services, complete a transaction, perform a contract with you, or perform an action at your request prior to entering into a contract;</li>\n" +
                "              <li>To comply with applicable laws or other legal obligations;</li>\n" +
                "              <li>To carry out tasks that are in the public interest;</li>\n" +
                "              <li>To enable our customers to comply with their legal obligations;</li>\n" +
                "              <li>To do so with your consent (where applicable) and/or to enable our customers to comply with their legal obligations;</li>\n" +
                "              <li>To operate our business, to protect the security of our systems, customers, and users, to detect or prevent fraud, or to maintain other legitimate interests as described in Sections 2-4 above (except where your privacy interests are overridden).</li>\n" +
                "            </ul>\n" +
                "            <p>Where we rely on your consent to process personal information, you have the right to withdraw your consent at any time, and you may have the right to object to our processing of personal information where we are exercising our legitimate interests.</p>\n" +
                "            <h2>6. Data Retention</h2>\n" +
                "            <p>We will retain your personal information for as long as necessary to provide the Services, complete the transactions you have requested, or for other necessary purposes, such as to comply with legal obligations, maintain business and financial records, resolve disputes, maintain security, detect and prevent fraud and abuse, and enforce agreements. If you access the Services through a subscription managed or sponsored by your organization, we will retain your organization's contact information for continued communication with you after your organization terminates your subscription.</p>\n" +
                "            <h2>7. Data Security</h2>\n" +
                "            <p>We will implement a variety of technical and organisational measures to ensure a level of security appropriate to the risk to the personal information we process. These measures are designed to ensure the integrity, confidentiality, and availability of personal information.</p>\n" +
                "            <h2>8. Children's Privacy</h2>\n" +
                "            <p>We have limited the information we collect to a chosen username, email address and region.</p>\n" +
                "            <h2>9. Accessing and Updating Your Information</h2>\n" +
                "            <h3>9.1 Your Account</h3>\n" +
                "            <p>The Service may allow registered users to directly access and review their account information at any time and to make corrections or updates after logging in. It is the user's responsibility to keep such information up to date. Registered users may also close their accounts directly through the Service or by contacting the Service's customer support department.</p>\n" +
                "            <h3>9.2 Your Rights</h3>\n" +
                "            <p>In accordance with applicable privacy and data protection laws, you have the right, free of charge, to:</p>\n" +
                "            <ul>\n" +
                "              <li>Access to your personal information;</li>\n" +
                "              <li>To correct or erase your personal information;</li>\n" +
                "              <li>Restrict or object to our processing of your personal information;</li>\n" +
                "              <li>Portability of your personal information.</li>\n" +
                "            </ul>\n" +
                "            <h2>10. Changes</h2>\n" +
                "            <p>We may update this Privacy Policy from time to time. We will post any changes on this page along with the updated revision date. Once we make any material changes, we will notify you through the Service or otherwise.</p>\n" +
                "            <h2>11. Contact Information</h2>\n" +
                "            <p>If you have any questions, comments, complaints or requests about this Privacy Policy or our handling of your information, please <Link to={`/contact`}>contact us</Link>. </p>"
        }
    )

}

module.exports = populateDb;