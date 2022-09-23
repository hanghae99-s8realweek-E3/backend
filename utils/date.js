const localDate = function () {
    // 1. 현재 시간(Locale)
    const now = new Date();
    // console.log("현재시간(Locale) : " + curr + "<br>"); // 현재시간(Locale) : Tue May 31 2022 09:00:30
  
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    
    
  
    return (dateString = year +"-"+ month +"-"+ day);
  };
  
  module.exports = localDate;