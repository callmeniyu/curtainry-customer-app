"use client";

import { useEffect } from "react";
import { Camera, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { useBottomNav } from "@/context/BottomNavContext";
import { useHeader } from "@/context/HeaderContext";

export default function ARPage() {
  const { setActiveTab } = useBottomNav();
  const { setTransparent } = useHeader();

  useEffect(() => {
    setActiveTab("ar");
    setTransparent(false);
  }, [setActiveTab, setTransparent]);
  return (
    <div className="bg-gray-50">
      <main className="pt-16">
        {/* Coming Soon Section */}
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            {/* Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-primary" />
              </div>
              <Sparkles className="w-6 h-6 text-primary mx-auto animate-pulse" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              AR Visualizer
            </h1>

            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              Experience our curtains in your space before you buy! Our AR
              visualizer lets you see how different curtains look in your room
              using augmented reality.
            </p>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Coming Soon
            </div>

            {/* Features Preview */}
            <div className="text-left bg-white rounded-lg p-6 shadow-sm mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Features you'll love:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Visualize curtains in your actual room
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Try different colors and patterns
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  See how curtains fit your window size
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Share visualizations with consultants
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
