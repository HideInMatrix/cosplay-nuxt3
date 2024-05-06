import { serverSupabaseClient } from "#supabase/server";
interface IPostView {
  post_id: number;
  ip: string;
}

export default defineEventHandler(
  async (event): Promise<{ ip: string | null; viewCount: number }> => {
    const client = await serverSupabaseClient(event);
    const query = getQuery(event) as {
      postId: number;
    };
    if (!query.postId) {
      throw createError({ statusCode: 400, statusMessage: "缺少post ID" });
    }

    // 记录一下ip
    const ip = event.headers.get("x-forwarded-for");
    const { data: dataArray, error } = await client
      .from("posts")
      .select("id, view_count")
      .filter("id", "eq", query.postId);

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    }
    const data = dataArray && dataArray.length > 0 ? dataArray[0] : null;
    if (!data) {
      throw createError({ status: 500, statusMessage: "指定的postId不存在" });
    }
    // if (ip === "127.0.0.1") {
    //   throw createError({ status: 400, statusMessage: "本地ip不录入" });
    // }

    // 检查是否已经有来自同一个IP的记录
    const { data: viewExists, error: viewError } = await client
      .from("post_views")
      .select("id")
      .eq("post_id", query.postId)
      .single();

    if (!viewExists) {
      // 创建一个新的视图记录
      const { error: createViewError } = await client
        .from("post_views")
        .upsert({ post_id: query.postId, ip } as never);

      if (createViewError) {
        throw createError({
          statusCode: 500,
          statusMessage: createViewError.message,
        });
      }

      // 仅当没有存在的浏览记录时，更新posts表的view_count
      const { data: updateData, error: updateError } = await client
        .from("posts")
        .update({ view_count: data.view_count + 1 } as never)
        .eq("id", query.postId)
        .single();

      if (updateError) {
        throw createError({
          statusCode: 500,
          statusMessage: updateError.message,
        });
      }
      // 如果更新成功，则返回新的 view_count
      if (updateData && (updateData as { view_count: number }).view_count > 0) {
        // 取更新后的第一条记录的 view_count
        const updatedViewCount = (updateData as { view_count: number })
          .view_count;
        return { ip, viewCount: updatedViewCount };
      } else {
        throw createError({
          statusCode: 500,
          statusMessage: "无法更新 view_count",
        });
      }
    }

    // 如果已经存在来自该IP的浏览记录，直接返回当前的 view_count
    return { ip, viewCount: data.view_count };

    // const {data,error} = await client.from('')
  }
);
