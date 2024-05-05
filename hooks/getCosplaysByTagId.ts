import type { Cosplay } from "~/types/posts";

export let cosplays = ref<Cosplay[]>([]);
export let total = ref(1);
export const fetchCoseplaysByTagId = async ({
  count = 7,
  tagId = 1,
  filterId = 1,
}) => {
  // 如果需要重置页码

  // 构造请求参数
  const params = {
    tagId,
    filterId,
    count,
  };

  // 发起 API 请求
  const { data } = await $fetch(`/api/cosplays/getListByTagId`, {
    method: "get",
    params: params,
  });

  // 处理响应数据，这里显式检查 undefined 而不是仅根据 truthy 评估
  if (data !== undefined && total !== undefined) {
    cosplays.value = data!.map((item) => {
      item.onload = false;
      return item;
    });
  } else {
    // 如果需要，可以在这里处理错误或者设置 coserList 和 total 为默认值
    cosplays.value = []; // 可设置为默认值
  }
};
