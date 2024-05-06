import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(
  async (event): Promise<{ ip: string | null }> => {
    const client = await serverSupabaseClient(event);
    const query = getQuery(event) as {
      postId: number;
    };
    if (!query.postId) {
      throw createError({ statusCode: 400, statusMessage: "缺少post ID" });
    }

    const ip = event.headers.get("x-forwarded-for");
    return { ip };
    // const {data,error} = await client.from('')
  }
);
