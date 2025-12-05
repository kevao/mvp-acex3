"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { api } from "@/services/api";
import { signOut } from "next-auth/react";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Header = ({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const me = await api.getProfile();
        setUserName(me?.name || "");
      } catch {
        setUserName("");
      }
    };
    loadUser();
  }, []);

  const initials = useMemo(() => {
    const parts = userName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "?").join("");
  }, [userName]);

  const onLogout = () => {
    signOut({ redirect: false }).finally(() => {
      api.logout().finally(() => {
        router.replace("/auth/login");
      });
    });
  };
  return (
    <header className="flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
        <h1 className="text-xl font-semibold hidden md:block">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage alt={userName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold">Olá, {userName || "Usuário"}</span>
        </div>
        <Button variant="outline" onClick={onLogout}>Sair</Button>
      </div>
    </header>
  );
};

export default Header;
