import { handleAuth } from "@/app/actions/handleAuth";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

const Login = async () => {

  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-10">Login</h1>
      <form
        action={handleAuth}
      >
        <button type="submit" className="border rounded-md px-2 cursor-pointer">Signin with Google</button>
      </form>
    </div>
  );
};

export default Login;
