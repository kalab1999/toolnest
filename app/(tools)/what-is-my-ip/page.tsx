"use client";

import { useState, useEffect } from "react";
import { Globe, Copy, RefreshCw, Check, ShieldCheck, MapPin, Server } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";

export default function WhatIsMyIp() {
  const [ipData, setIpData] = useState<{ ip: string; city?: string; country?: string; isp?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchIp = async () => {
    setLoading(true);
    try {
      // Fetching IP and some basic info
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setIpData({
        ip: data.ip,
        city: data.city,
        country: data.country_name,
        isp: data.org
      });
    } catch (error) {
      console.error("Failed to fetch IP:", error);
      // Fallback for just IP
      try {
        const resIp = await fetch("https://api.ipify.org?format=json");
        const dataIp = await resIp.json();
        setIpData({ ip: dataIp.ip });
      } catch {
        setIpData({ ip: "Could not detect IP" });
      }
    } finally {
      setLoading(true);
      // Simulated delay for premium feel
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    fetchIp();
  }, []);

  const handleCopy = () => {
    if (ipData?.ip) {
      navigator.clipboard.writeText(ipData.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ToolLayout
      title="What Is My IP"
      description="Find your public IP address and connection details instantly."
      icon={Globe}
      instructions={[
        "The tool automatically detects your public IP address when you visit this page.",
        "Click the copy icon to copy your IP address to your clipboard.",
        "Use the refresh button if you want to re-check your connection.",
        "Information like ISP and Location is based on public database records."
      ]}
    >
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-10 text-center relative overflow-hidden shadow-sm">
          {/* Background Decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6">Your Public IP Address</p>

            {loading ? (
              <div className="flex items-center justify-center gap-4 text-neutral-400 p-4">
                <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                <span className="text-2xl font-bold opacity-50">Detecting...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8">
                <div className="flex items-center gap-6">
                  <h2 className="text-4xl md:text-6xl font-mono font-bold text-neutral-900 break-all">
                    {ipData?.ip}
                  </h2>
                  <button
                    onClick={handleCopy}
                    className="p-4 bg-white border border-neutral-200 hover:border-primary/20 rounded-2xl text-neutral-400 hover:text-primary transition-all shadow-md"
                    title="Copy IP"
                  >
                    {copied ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6" />}
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-100 rounded-full text-neutral-500 text-sm shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span>Connection Secure</span>
                  </div>
                  <button
                    onClick={fetchIp}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover rounded-full text-white text-sm font-bold transition-all shadow-lg shadow-primary/30"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Details */}
        {!loading && ipData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Server className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-neutral-400 uppercase mb-1">ISP / Organization</p>
              <p className="font-bold text-neutral-900">{ipData.isp || "Unknown"}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-neutral-400 uppercase mb-1">City / Region</p>
              <p className="font-bold text-neutral-900">{ipData.city || "Common Local"}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-neutral-400 uppercase mb-1">Country</p>
              <p className="font-bold text-neutral-900">{ipData.country || "Detected"}</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
