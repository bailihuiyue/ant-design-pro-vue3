import { Request } from '@core';

/**
 * @description 根据类型返回BaseDatas;
 */
export async function getCharData(url) {
  // const { data } = await Request.post<BaseData[]>(
  //   'customer-service/baseData/type',
  //   {
  //     dataFormType
  //   }
  // );
  // return data;
  return [220, 3000, 2500, 180, 170, 210, 230]
}
