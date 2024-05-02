import { serverSupabaseClient } from "#supabase/server";
import { Tag } from "~/types/tag";

export default defineEventHandler(
  async (event): Promise<{ data: Tag[] | null; total: number | null }> => {
    const client = await serverSupabaseClient(event);

    const pageQuery = getQuery(event) as {
      page: number;
      count: number;
      name: string;
    };
    // 如果query.name存在，则添加模糊搜索条件
    let nameFilter = {};
    if (pageQuery.name) {
      nameFilter = {
        name: { like: `%${pageQuery.name}%` },
      };
    }

    // 计算分页的起始点
    const start = (pageQuery.page - 1) * pageQuery.count;
    const end = pageQuery.page * pageQuery.count - 1;

    const { data, error, count } = await client
      .from("tags")
      .select("id,name,slug,description,post_count", { count: "exact" })
      .match(nameFilter)
      .range(start, end);

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    } else {
      return { data, total: count };
    }
  }
);
