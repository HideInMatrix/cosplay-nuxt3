async function fetchCoseplays<T = any>(
  page = 1,
  count = 20,
  api = "",
  shouldResetPage = false
) {
  let total = 0;
  let cosplays: Array<T> = [];
  // 如果需要重置页码
  if (shouldResetPage) {
    page = 1;
  }

  // 构造请求参数
  const params = {
    title: "",
    page: page,
    count: count,
  };

  // 发起 API 请求
  const { data: resp } = await useFetch(`/api/cosplays/list`, {
    method: "get",
    params: params,
  });

  // 处理响应数据，这里显式检查 undefined 而不是仅根据 truthy 评估
  if (
    resp.value &&
    resp.value.data !== undefined &&
    resp.value.total !== undefined
  ) {
    total = resp.value.total!;
  } else {
    // 如果需要，可以在这里处理错误或者设置 coserList 和 total 为默认值
    cosplays = []; // 可设置为默认值
    total = 0; // 可设置为默认值
  }
}
