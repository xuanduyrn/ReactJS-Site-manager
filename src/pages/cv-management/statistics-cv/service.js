/* eslint-disable no-underscore-dangle */
import request from '@/utils/request';

export async function queryList(params) {
  const requestParams = {
    month: (params && params.month) || undefined,
    year: (params && params.year) || undefined,
  };
  const response = await request('/api/cv-apply/statistics/cv-apply', {
    method: 'GET',
    params: requestParams,
  });
  const result = {
    list: [],
  };
  result.list = ((response && response.results) || []).map((item, index) => {
    if (item._id.year) {
      return {
        id: index,
        time_sheet: `Tháng ${item._id.month} năm ${item._id.year}`,
        total_cv: item.total_cv,
      };
    }
    return {
      id: index,
      time_sheet: `Ngày ${item._id.day} tháng ${item._id.month}`,
      total_cv: item.total_cv,
    };
  });
  return result;
}
