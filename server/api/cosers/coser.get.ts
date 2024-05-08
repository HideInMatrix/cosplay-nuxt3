import { serverSupabaseClient } from "#supabase/server";
import { Tag } from "~/types/tag";

export default defineEventHandler(
  async (event): Promise<{ data: Tag | null }> => {
    const client = await serverSupabaseClient(event);

    const pageQuery = getQuery(event) as {
      tagId: number;
    };

    const { data, error } = await client
      .from("tags")
      .select("id,name,slug,description,post_count", { count: "exact" })
      .eq("id", pageQuery.tagId)
      .single();
    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    } else {
      return { data };
    }
  }
);
