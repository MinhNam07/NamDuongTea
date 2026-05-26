"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Vui lòng nhập email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/public/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      toast.success("Đăng ký nhận tin thành công!");
      setEmail("");
    } catch {
      toast.error("Không thể đăng ký. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-3", className)}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email đăng ký nhận tin
      </label>
      <Input
        id="newsletter-email"
        type="email"
        required
        placeholder="Email của bạn"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-white/25 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-tea-yellow-green"
      />
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-tea-yellow-green text-tea-deep-brown hover:bg-tea-olive"
      >
        {loading ? "Đang gửi…" : "Đăng ký"}
      </Button>
    </form>
  );
}
