import axiosInstance from '../lib/axios'

class QuestionService {
   getQuestions() {
    return axiosInstance.get(`/api/questions`)
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
  }

  getQuestion(id) {
    return axiosInstance.get(`/api/questions/${id}`)
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
  }

  trackAssessment(assessmentId, answers) {
    return axiosInstance.post(`/api/assessments/track-assessment`, { assessmentId, answers })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
  }

  getAssessmentTrack (trackId) {
    return axiosInstance.post(`/api/assessments/getassessment-track`)
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });

  }

}

export default QuestionService;