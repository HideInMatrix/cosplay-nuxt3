import { serverSupabaseClient } from "#supabase/server";
import { Cosplay } from "~/types/posts";
export default defineEventHandler(
  async (event): Promise<{ data: Cosplay[] | null; total: number | null }> => {
    const client = await serverSupabaseClient(event);
    const pageQuery = getQuery(event) as {
      filterId: number;
      count: number;
      tagId: number;
    };

    const { data, error, count } = await client
      .from("posts")
      .select(`id,title,cover,creation_date`)
      .filter("tag_id", "eq", pageQuery.tagId)
      .order("creation_date", { ascending: true })
      .limit(pageQuery.count);

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    } else {
      return { data, total: count };
    }
  }
);
