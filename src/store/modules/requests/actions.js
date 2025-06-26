export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const res = await fetch(
      `https://vuuetes-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await res.json();

    if (!res.ok) {
      const error = new Error(responseData.message || 'failed to send message');
      throw error;
    }
    console.log(responseData);

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequests', newRequest);
  },

  async fetchMessage(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const res = await fetch(
      `https://vuuetes-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
        token
    );

    const responseData = await res.json();

    if (!res.ok) {
      const error = new Error(
        responseData.message || 'failed to fetch message'
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
