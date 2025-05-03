"use client";

import { LoginForm } from "../components/login/loginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {/* app name */}
        <div className="flex justify-center mb-4">
          <h1 className="flex items-center gap-2 font-bold text-3xl">Atlas</h1>
        </div>

        <Tabs defaultValue="POS">
          <TabsList className="rounded w-full self-center h-10">
            <TabsTrigger
              value="POS"
              className="font-semibold data-[state=visible] p-2"
            >
              POS
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="font-semibold">
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="POS">
            <LoginForm POS={true} />
          </TabsContent>

          <TabsContent value="dashboard">
            <LoginForm POS={false} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
