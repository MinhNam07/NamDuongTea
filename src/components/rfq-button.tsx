"use client";

import { useState } from "react";

import { FileText } from "lucide-react";

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
  showIcon = false,
  className,
}: {
  productSlug?: string;
  productName?: string;
  label?: string;
  showIcon?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="brown" className={className}>
          <span className="inline-flex items-center justify-center gap-2">
            <span>{label}</span>
            {showIcon ? <FileText className="h-[18px] w-[18px]" aria-hidden /> : null}
          </span>
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
