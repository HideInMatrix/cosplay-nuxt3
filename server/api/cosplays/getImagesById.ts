import { serverSupabaseClient } from "#supabase/server";
import { Cosplay } from "~/types/posts";
export default defineEventHandler(
  async (event): Promise<{ data: Cosplay | null }> => {
    const client = await serverSupabaseClient(event);
    const pageQuery = getQuery(event) as {
      id: number;
    };

    const { data: dataArray, error } = await client
      .from("posts")
      .select(`id,title,tags(id,name),content,creation_date`, {
        count: "exact",
      })
      .filter("id", "eq", pageQuery.id);

    const data = dataArray && dataArray.length > 0 ? dataArray[0] : null;

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    } else {
      return { data };
    }
  }
);
