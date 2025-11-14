// src/components/UploadPage.tsx
import React from "react";

export function UploadPage() {
  return (
    <div className="flex-1 w-full h-full relative overflow-hidden">
      <iframe
        src="https://sanjai2004-veritasq.hf.space"
        title="VeritasQ – Hugging Face Space"
        className="absolute inset-0 w-full h-full border-0 rounded-xl shadow-md"
        allow="clipboard-read; clipboard-write; microphone; camera; geolocation; fullscreen; autoplay"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default UploadPage;
