import { serverSupabaseClient } from "#supabase/server";
import bcrypt from "bcrypt";
export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const pageQuery = getQuery(event) as {
    email: string;
    password: string;
  };
  const { data, error } = await client
    .from("users")
    .select("id,name,email,password")
    .eq("email", pageQuery.email)
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
  if (!data) {
    throw createError({ statusCode: 400, statusMessage: "该用户不存在" });
  }
  let dataPassword = data.password;
  let flag = await bcrypt.compare(pageQuery.password, dataPassword);
  if (flag) {
    return { data: { name: data.name, email: data.email, id: data.id } };
  } else {
    return { data: {} };
  }
});
