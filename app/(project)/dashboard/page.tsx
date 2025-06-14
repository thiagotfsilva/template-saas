import { handleAuth } from "@/app/actions/handleAuth";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();

  if(!session) {
    redirect("/login")
  }

  return(
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p>{session?.user?.email ? session.user.email : "Usuário não esta logado"}</p>
      {
        session.user?.email && (
          <form
            action={handleAuth}
          >
            <button
              type="submit"
              className="border rounded-md px-2 cursor-pointer"
            >
              Signout with Google
            </button>
          </form>
        )
      }

      <Link href="/payments">Pagamentos</Link>
    </div>
  );
}

export default Dashboard;
