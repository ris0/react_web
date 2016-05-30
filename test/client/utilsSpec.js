import { expect } from 'chai';
import { all, clipText, flatten, partitionN } from '../../client/utils'

describe('flatten', function() {
    it('should flatten a nested array of stuff', function() {
        expect(flatten([[0,1,2],[3,4,5],[6,7,8]])).to.eql([0,1,2,3,4,5,6,7,8])
    });

    it('should return an empty array if passed an empty array', function() {
        expect(flatten([])).to.eql([])
    });

    it('should return an empty array by default', function() {
        expect(flatten(undefined)).to.eql([])
    });
});

describe('partitionN', function() {
    it('should partition a list by the specified number of elements', function() {
        expect(partitionN(4, [0,1,2,3,4,5,6,7,8,9,10])).to.eql([[0,1,2,3],[4,5,6,7],[8,9,10]])
    });

    it('return an empty array if passed an empty array', function() {
        expect(partitionN(4, [])).to.eql([])
    });

    it('return an empty array by default', function() {
        expect(partitionN(4, undefined)).to.eql([])
    });
});

describe('clipText', function() {
    it('should clip text to a maximum of the specified length without breaking words', function() {
        expect(clipText('here is a sentence do not break me', 20)).to.equal('here is a sentence...')
    });

    it('should return an empty string for an empty input', function() {
        expect(clipText('')).to.equal('')
    });
})
