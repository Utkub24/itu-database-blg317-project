export const handleApiError = (error: any): string => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "An error occurred.";
  
      switch (status) {
        case 400:
          return `Bad Request: ${message}`;
        case 401:
          return "Unauthorized: Please check your authentication.";
        case 403:
          return "Forbidden: You do not have permission to access this resource.";
        case 404:
          return `Not Found: ${message}`;
        case 500:
          return "Internal Server Error: Please try again later.";
        default:
          return `Error: ${message}`;
      }
    } else if (error.request) {
      // API'ye ulaşılamadı
      return "Network Error: Unable to reach the server. Please check your internet connection.";
    } else {
      // Diğer hata türleri
      return `Unexpected Error: ${error.message}`;
    }
  };
  