import DashboardLayout from "@/lib/components/dashboard/Layout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <DashboardLayout>{children}</DashboardLayout>;
}
