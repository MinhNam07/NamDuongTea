"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuoteRequestForm } from "@/components/quote-request-form";

export function RfqButton({
  productSlug,
  productName,
  label = "Yêu cầu báo giá",
}: {
  productSlug?: string;
  productName?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="brown">
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Yêu cầu báo giá B2B</DialogTitle>
          <DialogDescription>
            Cho chúng tôi biết nhu cầu của bạn — Nam Dương Tea sẽ phản hồi
            trong vòng 24h kèm bảng giá theo MOQ và mẫu thử.
          </DialogDescription>
        </DialogHeader>
        <QuoteRequestForm
          productSlug={productSlug}
          productName={productName}
          onSuccess={() => setTimeout(() => setOpen(false), 2500)}
        />
      </DialogContent>
    </Dialog>
  );
}
