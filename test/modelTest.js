var expect = require('chai').expect;
const spies = require('chai-spies');
const chai = require('chai');
const models = require('../models');
const Page = models.Page;
var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});
chai.use(spies);
describe('tests on the page\'s instance', function () {
    let newPage;
    beforeEach((done) => {

        newPage = Page.create({
                title: 'My Page',
                content: 'Story of my life!',
                status: 'open',
                tags: ['foo', 'bar']


            }).then((pageCreated) => {
                newPage = pageCreated;

                done()
            })
            .catch(done)
    });



    describe('test properties and methods', function () {
        it('test for title', () => {
            expect(newPage.title).to.equal('My Page');
        });

        it('tests for content', () => {
            expect(newPage.content).to.equal('Story of my life!');
        });

        it('tests for status', () => {
            expect(newPage.status).to.equal('open');
        });

    });


    describe('test virtuals', () => {

        it('test route property', () => {
            newPage.urlTitle = 'My_Page'
            expect(newPage.route).to.equal('/wiki/My_Page');
        })

        it('test renderedContent property', () => {
            newPage.content = `${newPage.content}`;
            expect(newPage.renderedContent).to.equal(`<p>${newPage.content}</p>\n`);
        })
    });
    describe("tests class methods", () => {
        it("finds pages with the right tags", (done) => {
            Page.findByTag('bar')
                .then(function (pages) {
                    expect(pages).to.have.lengthOf(1);
                    done();
                })
                //AGAIN HOW DOES THIS WORK? 
                .catch(done);
        })

        it("when it does not find tags, returns nothing", (done) => {
            Page.findByTag("tacos")
                .then((pages) => {
                    expect(pages).to.have.lengthOf(0)
                    done()

                })
                .catch(done)
        })
    })

    //DESTROY EVERYTHING
    afterEach((done) => {
        Page.destroy({
            where: {
                title: "My Page"
            }
        }).then(() => {
            done();
        })

    });

});
