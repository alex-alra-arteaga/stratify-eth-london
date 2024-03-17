import Footer from "@/components/Footer";
import List from "@/components/List";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/utils/AuthProvider";

export default function Page() {
  return (
    <AuthProvider>
      <NavBar />
      <List />
      <Footer />
    </AuthProvider>
  );
}
