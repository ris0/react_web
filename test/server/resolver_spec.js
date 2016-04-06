import { expect } from 'chai';
import resolver, { resolve, invoke } from '../../server/resolver'

describe('data resolver methods', function() {
    describe('resolve', function() {
        beforeEach(function() {
            function componentOne() {}
            componentOne.fetchData = 'myFn'
            function componentTwo() {}
            componentTwo.fetchData = 'myOtherFn'

            this.componentOne = componentOne
            this.componentTwo = componentTwo
        });

        it('should define the function', function() {
            expect(resolve).to.be.a('function')
        });

        it('should handle normal components', function() {
            const components = [this.componentOne, this.componentTwo]
            expect(resolve(components)).to.eql(['myFn', 'myOtherFn'])
        });

        it('should handle a hashmap of components', function() {
            const components = [
                { main: this.componentOne, other: this.componentTwo }
            ]

            expect(resolve(components)).to.eql(['myFn', 'myOtherFn'])
        });

        it('should handle components without fetchData methods', function() {
            function otherComponent() { }
            expect(resolve([otherComponent])).to.eql([])
        });

        it('should handle a mix of all types', function() {
            function otherComponent() { }

            const components = [
                this.componentOne,
                otherComponent,
                { main: this.componentOne, other: this.componentTwo },
                this.componentTwo
            ]

            expect(resolve(components)).to.eql(['myFn', 'myFn', 'myOtherFn', 'myOtherFn'])
        });
    });

    describe('resolver', function() {
        it('should define the function', function() {
            expect(resolver).to.be.a('function')
        });

        it('should return a list of fetchData results', function() {
            function componentA() { }
            componentA.fetchData = () => 'A'
            function componentB() { }
            componentB.fetchData = () => 'B'
            function componentC() { }
            componentC.fetchData = () => 'C'
            function componentD() { }
            componentD.fetchData = () => 'D'
            function componentE() { }

            expect(resolver([
                componentA,
                componentB,
                {
                    main: componentC,
                    other: componentD
                },
                componentE
            ])).to.eql(['A', 'B', 'C', 'D'])
        });
    });
});

