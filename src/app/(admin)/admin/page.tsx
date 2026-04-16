import FadeIn from "@/components/animation/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animation/Stagger";
import Link from "next/link";
import { getEnquiries, getCMSContent } from "@/lib/actions";

export default async function AdminDashboardPage() {
  const enquiries = await getEnquiries();
  const aboutCMS = await getCMSContent("about", "all");

  const totalEnquiries = enquiries?.length || 0;
  
  // Calculate new leads in last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentLeads = enquiries?.filter((e: any) => new Date(e.createdAt) > sevenDaysAgo).length || 0;
  const recentLeadsChange = recentLeads > 0 ? `+${recentLeads}` : "0";

  const projectsDelivered = aboutCMS?.portfolio?.items?.length || 5;

  const stats = [
    { label: "Total Enquiries", value: totalEnquiries.toString(), change: "Lifetime", icon: "mail" },
    { label: "New Leads (7d)", value: recentLeads.toString(), change: recentLeadsChange, icon: "person" },
    { label: "Projects Delivered", value: projectsDelivered.toString(), change: "Active", icon: "architecture" },
    { label: "System Status", value: "Online", change: "Optimal", icon: "dns" },
  ];

  const recentEnquiries = enquiries?.slice(0, 4) || [];

  return (
    <div className="space-y-12">
      <FadeIn>
        <div className="mb-12">
          <h1 className="text-4xl font-headline text-primary mb-2">Systems Overview</h1>
          <p className="text-on-surface-variant font-body">Real-time performance and enquiry metrics for SBK Heights.</p>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <div className="bg-white p-8 border border-outline-variant/10 group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-8">
                  <span className="material-symbols-outlined text-secondary text-3xl">{stat.icon}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${
                    stat.change.startsWith("+") || stat.change === "Optimal" || stat.change === "Active" ? "bg-green-50 text-green-600" : "bg-outline-variant/10 text-on-surface-variant"
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-[0.2em] mb-2">{stat.label}</h3>
              </div>
              <p className="text-3xl font-headline text-primary mt-auto">{stat.value}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
        <FadeIn className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 border border-outline-variant/10 h-full">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-headline text-primary">Recent Enquiries</h2>
              <Link href="/admin/enquiries" className="text-xs font-label font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">
                View All Enquiries
              </Link>
            </div>
            
            {recentEnquiries.length === 0 ? (
               <div className="py-8 text-center border border-dashed border-outline-variant/30 bg-surface/50">
                  <span className="material-symbols-outlined text-on-surface-variant/40 text-4xl mb-2">inbox</span>
                  <p className="text-on-surface-variant text-sm font-label uppercase tracking-widest">No Enquiries Yet</p>
               </div>
            ) : (
                <div className="space-y-6">
                  {recentEnquiries.map((enquiry: any, i: number) => {
                    const initials = enquiry.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
                    const timeAgo = new Date(enquiry.createdAt).toLocaleDateString();
                    return (
                      <Link key={enquiry._id || i} href={"/admin/enquiries"} className="flex items-center justify-between py-4 border-b border-outline-variant/5 last:border-0 group cursor-pointer hover:bg-surface/50 transition-colors">
                        <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 bg-surface flex flex-none items-center justify-center text-primary font-bold">
                            {initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-primary uppercase tracking-widest">
                              {enquiry.name}
                            </p>
                            <p className="text-xs text-on-surface-variant font-light truncate max-w-xs">{enquiry.message || "No message provided"}</p>
                          </div>
                        </div>
                        <div className="text-right flex-none">
                          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{timeAgo}</p>
                          {i === 0 && <span className="text-[10px] text-green-600 uppercase font-bold tracking-tighter">New Lead</span>}
                        </div>
                      </Link>
                    )
                  })}
                </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="space-y-8">
          <div className="bg-primary text-white p-10 space-y-10 relative overflow-hidden h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-8xl">architecture</span>
            </div>
            
            <div>
               <h2 className="text-xl font-headline relative z-10 mb-6">Quick Actions</h2>
               <div className="grid grid-cols-1 gap-4 relative z-10">
                 <Link href="/admin/cms/gallery" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                   <span className="text-xs font-label uppercase tracking-widest">Manage Media Gallery</span>
                   <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                 </Link>
                 <Link href="/admin/cms/home" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                   <span className="text-xs font-label uppercase tracking-widest">Update Banner Content</span>
                   <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                 </Link>
                 <Link href="/admin/cms/about" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                   <span className="text-xs font-label uppercase tracking-widest">Update Portfolio</span>
                   <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                 </Link>
               </div>
            </div>
            
            <div className="pt-10 border-t border-white/5">
              <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-4 flex justify-between">
                <span>Current System Load</span>
                <span className="text-secondary font-bold">Optimal</span>
              </p>
              <div className="h-1 bg-white/10 w-full overflow-hidden">
                <div className="h-full bg-secondary w-[45%] animate-pulse" />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
