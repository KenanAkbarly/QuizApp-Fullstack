const { default: axiosInstance } = require(".");

// ADD REPORT 

export const addReport = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/reports/add-report', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// GET ALL REPORTS

export const getAllReports = async () =>{
    try {
        const response = await axiosInstance.post('/api/reports/get-all-reports');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// GET ALL REPORTS BY USER

export const getAllReportsByUser = async () =>{
 try {
    const response = await axiosInstance.post('/api/reports/get-all-reports-by-user')
    return response.data;
 } catch (error) {
    return error.response.data;
 }
}