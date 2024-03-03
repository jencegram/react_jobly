import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {

  // Token for interacting with the API
  static token;

  /**
   * Sends a request to the API endpoint with optional parameters.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {object} params - Optional parameters for the request.
   * @param {string} method - HTTP method for the request (default is "get").
   * @param {object} data - Optional data payload for the request.
   * @returns {Promise<object>} - The response data from the API.
   */
  static async request(endpoint, params = {}, method = "get", data = {}) {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };

    try {
      return (await axios({ url, method, data: method !== "get" ? data : {}, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response ? err.response.data : err);
      throw err;
    }
  }

  // Individual API routes

  /**
   * Retrieves details of a company by its handle.
   * @param {string} handle - The handle of the company to retrieve.
   * @returns {Promise<object>} - Details of the company.
   */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /**
   * Retrieves a list of companies based on search filters.
   * @param {object} searchFilters - Optional search filters for companies.
   * @returns {Promise<Array>} - List of companies.
   */
  static async getCompanies(searchFilters = {}) {
    const res = await this.request('companies', searchFilters);
    return res.companies;
  }

  /**
   * Retrieves a list of jobs based on search filters.
   * @param {object} searchFilters - Optional search filters for jobs.
   * @returns {Promise<Array>} - List of jobs.
   */
  static async getJobs(searchFilters = {}) {
    let validFilters = {};
    for (let key in searchFilters) {
      // Only add the filter if it has a value
      if (searchFilters[key]) {
        validFilters[key] = searchFilters[key];
      }
    }
    const res = await this.request('jobs', validFilters);
    return res.jobs;
  }

  /**
   * Retrieves a list of jobs for a specific company.
   * @param {string} handle - The handle of the company to retrieve jobs for.
   * @returns {Promise<Array>} - List of jobs for the specified company.
   */
  static async getJobsForCompany(handle) {
    try {
      const res = await this.request(`companies/${handle}/jobs`);
      return res.jobs;
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error);
      let message = error.response ? error.response.data.error.message : "An unexpected error occurred";
      throw Array.isArray(message) ? message : [message];
    }
  }

  /**
   * Logs in a user and returns the authentication token.
   * @param {object} data - User credentials for login.
   * @returns {Promise<string>} - Authentication token.
   */
  static async login(data) {
    const url = `${BASE_URL}/auth/token`;
    const headers = { 'Content-Type': 'application/json' };
    const res = await axios.post(url, data, { headers });
    return res.data.token; 
  }

  /**
   * Signs up a user and returns the authentication token.
   * @param {object} data - User data for registration.
   * @returns {Promise<string>} - Authentication token.
   */
  static async signup(data) {
    const url = `${BASE_URL}/auth/register`;
    const headers = { 'Content-Type': 'application/json' };
    const res = await axios.post(url, data, { headers });
    return res.data.token; 
  }

  /**
   * Retrieves details of the current user.
   * @param {string} username - Username of the current user.
   * @returns {Promise<object>} - Details of the current user.
   */
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /**
   * Updates user details.
   * @param {string} username - Username of the user to update.
   * @param {object} data - Updated user data.
   * @returns {Promise<object>} - Updated user details.
   */
  static async updateUser(username, data) {
    const url = `${BASE_URL}/users/${username}`;
    const headers = {
      Authorization: `Bearer ${JoblyApi.token}`,
      'Content-Type': 'application/json'
    };
    const method = "patch";
    try {
      const res = await axios({ url, method, data, headers });
      return res.data.user; 
    } catch (err) {
      console.error("API Error:", err.response ? err.response.data : err);
      throw Array.isArray(err.response.data.error)
        ? err.response.data.error
        : [err.response.data.error];
    }
  }

  /**
   * Applies to a job.
   * @param {string} username - Username of the user applying to the job.
   * @param {string} jobId - ID of the job to apply for.
   * @returns {Promise<boolean>} - Indicates whether the application was successful.
   */
  static async applyToJob(username, jobId) {
    try {
      const res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
      return res.applied;
    } catch (err) {
      console.error("API Error:", err.response ? err.response.data : err);
      throw err;
    }
  }
}

// Initialize token (temporary for now)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi; 
