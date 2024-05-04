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

    // 计算分页的起始点
    const start = (pageQuery.page - 1) * pageQuery.count;
    const end = pageQuery.page * pageQuery.count - 1;

    const { data, error, count } = await client
      .from("tags")
      .select("id,name,slug,description,post_count", { count: "exact" })
      .ilike("name", `%${pageQuery.name}%`)
      .range(start, end);
    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    } else {
      return { data, total: count };
    }
  }
);
