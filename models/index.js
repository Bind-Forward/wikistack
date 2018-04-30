//Require in SEQUELIZE
const Sequelize = require('sequelize');
//where our db lives
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false,
});

//READ DOCS
const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        unique: true

    },
    urlTitle: {
        type: Sequelize.STRING,
        allNull: false

    },
    content: {
        type: Sequelize.TEXT,
    },
    status: {
        //EXPLAIN
        type: Sequelize.ENUM('open', 'closed')
    }
}, {
    //ISNT THE GET URL FUNCTION A GETTER? OR IS THE DIFFERENCE IS THAT WE HAVE TO EXPLICITLY CALL THE HOOK?
    hooks: {},
    getterMethods: {
        route: function () {
            //whenever we use invoke this virtual, we use the urlTitle that is created before the validation
            //of this model. This virtual, like all virtuals use data within the instance to return a different Value. 
            return "/wiki/" + this.urlTitle
        }
    }
})

//HOOKS FOR PAGE
//MAKES A URL, BEFORE VALIDATING  THE ROW THAT WILL BE ADDED TO PAGES TABLE
//Validation makes sure columns follow rules we set before -  allow null or not.
Page.beforeValidate((pageInstance) => {
    getURL(pageInstance);
})

//Generate URL
function getURL(instance) {
    if (instance.title) {
        let title = instance.getDataValue('title');
        const urlTitleCreated = title.replace(/\s+/g, '_').replace(/\W/g, '');
        instance.urlTitle = urlTitleCreated;

    } else instance.urlTitle = Math.random().toString(36).substring(2, 7);

}

//USER TABLE
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


//The association we suggest using in this case is "page belongs to user". This will establish a connection that describes that a page has one user associated with it and that information will be established on the pages table rows (as opposed to on users rows).

Page.belongsTo(User, {
    as: 'author'
});

//Our new pages table (check your GUI) should have a new column authorId which will contain the id of the user associated with this page.



module.exports = {
    Page: Page,
    User: User,
    db: db,
}
