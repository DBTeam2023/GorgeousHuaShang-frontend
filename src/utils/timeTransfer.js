  /**
   * 将 ISO 8601 格式的字符串UTC时间转为中国时间
   * @param {string} timeString - 类似"2023-07-28T05:28:20.962Z"的字符串
   * @returns {string} 转换后的字符串"2023.07.28 11:28:20""
   */
export function utc2cn(timeString){
    const utcDate = new Date(timeString);
    const chinaDate = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);

    const formattedChinaTime = chinaDate.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return formattedChinaTime;
    return timeString;
}




