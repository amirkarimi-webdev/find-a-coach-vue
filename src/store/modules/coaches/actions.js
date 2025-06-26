export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coacheData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    const token = context.rootGetters.token;
    const res = await fetch(
      `https://vuuetes-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` +
        token,
      {
        method: 'PUT',
        body: JSON.stringify(coacheData),
      }
    );

    // const responseData = await res.json()

    if (!res.ok) {
      //error code
    }

    context.commit('registerCoach', {
      ...coacheData,
      id: userId,
    });
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const res = await fetch(
      `https://vuuetes-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await res.json();

    if (!res.ok) {
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimeStamp');
  },
};
