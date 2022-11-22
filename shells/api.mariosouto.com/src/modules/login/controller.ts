import { db } from "@src/infra/db/db";
import { Request, Response } from "@src/infra/withRoute/withRoute";

export const userLoginEmailOnlyStartController = async (_: Request, res: Response) => {

  // https://supabase.com/docs/reference/javascript/select
  const { data, error } = await db()
    .from('users')
    .select();

  console.log(data);

  /*
  [...]

  1. Receive user email
  2. Sent email with a code to login

  */

  res.status(200).json({ name: 'Post' });
};
