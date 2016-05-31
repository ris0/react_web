import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Recipe from '../../../../../client/routes/Videos/components/Recipe'

describe('Recipe', function() {
    it('should define the component', function() {
        expect(Recipe).to.be.a('function')
    });

    describe('isRecipe', function() {
        it('should return false by default', function() {
            expect(Recipe.isRecipe()).to.be.false
            expect(Recipe.isRecipe({})).to.be.false
        });

        it('should return false if all conditions are not met', function() {
            expect(Recipe.isRecipe({
                directions: 'my directions',
                supplies: 'my supplies'
            })).to.be.false

            expect(Recipe.isRecipe({
                directions: 'my directions'
            })).to.be.false

            expect(Recipe.isRecipe({
                supplies: 'my supplies'
            })).to.be.false

            expect(Recipe.isRecipe({
                recipe: 'a recipe'
            })).to.be.false
        });

        it('should return true if all conditions are met', function() {
            expect(Recipe.isRecipe({
                recipe: 'a recipe',
                directions: 'my directions',
                supplies: 'my supplies'
            })).to.be.true
        });
    });
});

