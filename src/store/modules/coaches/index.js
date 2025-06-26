import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [
        {
          id: 'c1',
          firstName: 'amir',
          lastName: 'karimi',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm amir and I've worked as a freelance web developer for years",
          hourlyRate: 30,
        },
        {
          id: 'c2',
          firstName: 'sasan',
          lastName: 'mohamadi',
          areas: ['frontend', 'career'],
          description:
            'I am sasan and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 20,
        },
      ],
    };
  },
  getters,
  actions,
  mutations,
};
