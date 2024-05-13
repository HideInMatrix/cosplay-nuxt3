import { serverSupabaseClient } from "#supabase/server";
import { Cosplay } from "~/types/posts";
export default defineEventHandler(
  async (event): Promise<{ data: Cosplay[] | null; total: number | null }> => {
    const client = await serverSupabaseClient(event);
    const pageQuery = getQuery(event) as {
      page: number;
      count: number;
      title: string;
    };

    // 计算分页的起始点
    const start = (pageQuery.page - 1) * pageQuery.count;
    const end = pageQuery.page * pageQuery.count - 1;

    const { data, error, count } = await client
      .from("posts")
      .select(`id,title,tags(id,name),cover,creation_date`, {
        count: "exact",
      })
      .order("id", { ascending: true })
      .range(start, end);

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    } else {
      return { data, total: count };
    }
  }
);
