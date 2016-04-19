import { expect } from 'chai';
import selectErrorMessage from '../../server/selectErrorMessage'

describe('selectErrorMessage', function() {
    it('should return an object by default', function() {
        expect(selectErrorMessage()).to.be.an('object')
    });

    it('should return a specific main and body by default', function() {
        const errorMessage = selectErrorMessage(10000)
        expect(errorMessage.main).to.be.ok
        expect(errorMessage.body).to.be.ok
    });

    it('should return a specific error code for a 404', function() {
        const errorMessage = selectErrorMessage(404)
        expect(errorMessage.errorCode).to.equal(404)
    });

    it('should return a specific main and body for a 404', function() {
        const errorMessage = selectErrorMessage(404)
        expect(errorMessage.main).to.be.ok
        expect(errorMessage.body).to.be.ok
    });

    it('should return a specific error code for a 500', function() {
        const errorMessage = selectErrorMessage(500)
        expect(errorMessage.errorCode).to.equal(500)
    });

    it('should return a specific main and body for a 500', function() {
        const errorMessage = selectErrorMessage(500)
        expect(errorMessage.main).to.be.ok
        expect(errorMessage.body).to.be.ok
    });
});

