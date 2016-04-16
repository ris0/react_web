import { expect } from 'chai';
import reducer from '../../client/reducers'

describe('Reducer', function() {
    it('should return the default state for a bogus action', function() {
        expect(reducer({}, { type: 'BOGUS_ACTION' })).to.be.an('object')
    });

    describe('app', function() {
        it('should allow setting the loading status to true', function() {
            expect(reducer({}, { type: 'SET_LOADING', isLoading: true }).app.isLoading).to.equal(true)
        });

        it('should allow setting the loading status to false', function() {
            expect(reducer({}, { type: 'SET_LOADING', isLoading: false }).app.isLoading).to.equal(false)
        });

        it('should allow toggling the dropdown navigation', function() {
            const stateA = reducer({}, { type: 'TOGGLE_DROPDOWN_NAV' })
            expect(stateA.app.showDropdownNav).to.equal(true)
            const stateB = reducer(stateA, { type: 'TOGGLE_DROPDOWN_NAV' })
            expect(stateB.app.showDropdownNav).to.equal(false)
            const stateC = reducer(stateB, { type: 'TOGGLE_DROPDOWN_NAV' })
            expect(stateC.app.showDropdownNav).to.equal(true)
        });
    });

    describe('currentVideoData', function() {
        describe('SET_CURRENT_VIDEO_STATUS', function() {
            it('should allow setting unique_key of the active video', function() {
                const state = reducer({}, { type: 'SET_CURRENT_VIDEO_STATUS', video: { unique_key: 12345 }})
                expect(state.currentVideoData.unique_key).to.equal(12345)
            });

            it('should allow un-setting the active video', function() {
                const state = reducer({}, { type: 'SET_CURRENT_VIDEO_STATUS', video: null })
                expect(state.currentVideoData.unique_key).to.equal(null)
            });
        });
    });

    describe('videos', function() {
        describe('RECEIVE_VIDEO_DATA', function() {
            it('should create a hashmap of videos indexed by unique_key', function() {
                const state = reducer({}, {
                    type: 'RECEIVE_VIDEO_DATA',
                    data: [
                        {
                            unique_key: 1234,
                            name: 'Video Video'
                        },
                        {
                            unique_key: 5678,
                            name: 'Radio Radio'
                        }
                    ]
                })

                expect(state.videos[1234]).to.be.an('object')
                expect(state.videos[5678]).to.be.an('object')
                expect(state.videos[1234].name).to.equal('Video Video')
                expect(state.videos[5678].name).to.equal('Radio Radio')
            });

            it('should support receiving a single video', function() {
                const state = reducer({}, {
                    type: 'RECEIVE_VIDEO_DATA',
                    data: {
                        unique_key: 666,
                        name: 'EVIL VIDEO'
                    }
                })

                expect(state.videos[666]).to.be.an('object')
                expect(state.videos[666].name).to.equal('EVIL VIDEO')
            });

            it('should modify or extend existing entries, but not delete them', function() {
                const state = reducer({
                    videos : {
                        1234: {
                            unique_key: 1234,
                            name: 'Old Video Video'
                        },
                        6666: {
                            unique_key: 6666,
                            name: 'Existing Video Video'
                        }
                    }
                    },
                    {
                        type: 'RECEIVE_VIDEO_DATA',
                        data: [
                            {
                                unique_key: 1234,
                                name: 'Video Video'
                            },
                            {
                                unique_key: 5678,
                                name: 'Radio Radio'
                            }
                        ]
                    })

                expect(Object.keys(state.videos).length).to.equal(3)
                expect(state.videos[1234].name).to.equal('Video Video')
                expect(state.videos[5678].name).to.equal('Radio Radio')
                expect(state.videos[6666].name).to.equal('Existing Video Video')
            });
        });
    });

    describe('categories', function() {
        describe('RECEIVE_CONFIG_DATA', function() {
            it('should create a hash of category ids to categories', function() {
                const state = reducer(
                    {},
                    {
                        type: 'RECEIVE_CONFIG_DATA',
                        data: {
                            categories: [
                                {
                                    id: 1,
                                    name: 'Porkchop Sandwiches'
                                },
                                {
                                    id: 2,
                                    name: 'Vegetarian Sandwiches'
                                }
                            ]
                        }
                    })

                expect(state.categories[1].name).to.equal('Porkchop Sandwiches')
                expect(state.categories[1].id).to.equal(1)
                expect(state.categories[1].videos).to.eql([])
                expect(state.categories[2].name).to.equal('Vegetarian Sandwiches')
                expect(state.categories[2].id).to.equal(2)
                expect(state.categories[2].videos).to.eql([])
            });

            it('should not override existing video properties', function() {
                const state = reducer(
                    {
                        categories: {
                            1: { videos: [1,2,3] },
                            2: { videos: [4,5,6] },
                        }
                    },
                    {
                        type: 'RECEIVE_CONFIG_DATA',
                        data: {
                            categories: [
                                {
                                    id: 1,
                                    name: 'Porkchop Sandwiches'
                                },
                                {
                                    id: 2,
                                    name: 'Vegetarian Sandwiches'
                                }
                            ]
                        }
                    })

                expect(state.categories[1].videos).to.eql([1,2,3])
                expect(state.categories[2].videos).to.eql([4,5,6])
                expect(state.categories[1].name).to.equal('Porkchop Sandwiches')
                expect(state.categories[1].id).to.equal(1)
                expect(state.categories[2].name).to.equal('Vegetarian Sandwiches')
                expect(state.categories[2].id).to.equal(2)
            });
        });

        describe('RECEIVE_VIDEOS_FOR_CATEGORY', function() {
            it('should update the specified category with the specified videos', function() {
                const state = reducer(
                    {
                        categories: {
                            1: { name: 'Bad Movies', id: 1, videos: [] },
                            2: { name: 'Terrible Movies', id: 2, videos: [] }
                        }
                    },
                    {
                        type: 'RECEIVE_VIDEOS_FOR_CATEGORY',
                        data: {
                            categoryId: 2,
                            videoIds: [7,34,8]
                        }
                    })

                expect(state.categories[2].videos).to.eql([7,34,8])
                expect(state.categories[1].videos).to.eql([])
            });

            it('should NOT update other properties', function() {
                const state = reducer(
                    {
                        categories: {
                            1: { name: 'Bad Movies', id: 1, videos: [] },
                            2: { name: 'Terrible Movies', id: 2, videos: [] }
                        }
                    },
                    {
                        type: 'RECEIVE_VIDEOS_FOR_CATEGORY',
                        data: {
                            categoryId: 2,
                            videoIds: [7,34,8]
                        }
                    })

                expect(state.categories[2].id).to.equal(2)
                expect(state.categories[2].name).to.equal('Terrible Movies')
                expect(state.categories[1].name).to.eql('Bad Movies')
                expect(state.categories[1].id).to.eql(1)
            });

            it('should play nicely with categories that do not yet exist in state', function() {
                const state = reducer(
                    {},
                    {
                        type: 'RECEIVE_VIDEOS_FOR_CATEGORY',
                        data: {
                            categoryId: 2,
                            videoIds: [7,34,8]
                        }
                    })

                expect(state.categories[2].videos).to.eql([7,34,8])
            });
        });
    });
});

