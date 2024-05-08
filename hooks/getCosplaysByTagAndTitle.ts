import type { Cosplay } from "~/types/posts";

export let cosplays = ref<Cosplay[]>([]);
export let total = ref(1);
export const fetchCoseplays = async ({
  shouldResetPage = false,
  page = 1,
  count = 30,
  tagId = "",
  title = "",
}) => {
  // 如果需要重置页码
  if (shouldResetPage) {
    page = 1;
  }

  // 构造请求参数
  const params = {
    title: title,
    page: page,
    count: count,
    tagId: tagId,
  };

  // 发起 API 请求
  const { data, total: resultTotal } = await $fetch(
    `/api/cosplays/listByTagAndTitle`,
    {
      method: "get",
      params: params,
    }
  );

  // 处理响应数据，这里显式检查 undefined 而不是仅根据 truthy 评估
  if (data !== undefined && total !== undefined) {
    cosplays.value = data!.map((item) => {
      item.onload = false;
      return item;
    });
    total.value = resultTotal!;
  } else {
    // 如果需要，可以在这里处理错误或者设置 coserList 和 total 为默认值
    cosplays.value = []; // 可设置为默认值
    total.value = 0; // 可设置为默认值
  }
  return { total };
};
