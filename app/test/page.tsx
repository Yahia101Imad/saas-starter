import { getSession } from "@/lib/session";

export default async function TestPage() {
  const session = await getSession();

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
