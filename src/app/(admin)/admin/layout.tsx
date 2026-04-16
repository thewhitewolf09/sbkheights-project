import AdminSidebar from "@/components/layout/AdminSidebar";
import LogoutButton from "@/components/admin/LogoutButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-surface overflow-x-hidden">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>
      <div className="flex-1 lg:ml-60 w-full">
        <header className="h-20 bg-white border-b border-outline-variant/10 flex items-center justify-between px-12 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <h2 className="text-xs font-label font-bold uppercase tracking-[0.3em] text-on-surface-variant">
              System Console
            </h2>
            <span className="text-outline-variant">/</span>
            <span className="text-xs font-label uppercase tracking-widest text-primary">Dashboard</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <div className="w-[1px] h-6 bg-outline-variant/30"></div>
            <LogoutButton />
          </div>
        </header>
        <main className="p-12 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
