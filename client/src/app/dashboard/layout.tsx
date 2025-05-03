import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboardComponents/sidebar/app-sidebar";
import { SiteHeader } from "@/components/dashboardComponents/sidebar/site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
