const Sequelize = require('sequelize');
//where our db lives
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false,
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
    },
    urlTitle: {
        type: Sequelize.STRING,
        allNull: false

    },
    content: {
        type: Sequelize.TEXT,
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
    },
    route: {
        type: Sequelize.STRING,
        //        allowNull: false,        
        // this defines the ‘getter’
        // ‘this’ refers to the instance (same as an instance method)
        // in a ‘getter’, you should not refer to the names of the columns directly
        // as this will recursively call the getter and result in a stack overflow,
        // instead, use the `this.getDataValue` method
        get() {
            const url = this.getDataValue('urlTitle');
            // 'this' allows you to access attributes of the instance
            return '/wiki/' + url;
        },
    },
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
});

//MAKES A URL, BEFORE VALIDATING THE THE ROW THAT WILL BE ADDED TO PAGES TABLE
Page.beforeValidate((pageInstance) => {
    getURL(pageInstance);
})

function getURL(instance) {
    if (instance.title) {
        let title = instance.getDataValue('title');
        title = title.split(" ").join("_")
        const urlTitleCreated = title.replace(/\W/g, '');
        instance.urlTitle = urlTitleCreated;

    } else instance.urlTitle = Math.random().toString(36).substring(2, 7);

}

module.exports = {
    Page: Page,
    User: User,
    db: db,
}
