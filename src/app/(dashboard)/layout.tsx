import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      <Sidebar />
      {/* Desktop: margin-left = sidebar width. Mobile: top padding = mobile header height */}
      <main className="lg:ml-[220px] pt-14 lg:pt-0 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
