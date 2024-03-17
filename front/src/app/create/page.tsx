import Editor from "@/components/Editor";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/utils/AuthProvider";

export default function Page() {
  return (
    <AuthProvider>
      <NavBar />
      <Editor />
    </AuthProvider>
  );
}
