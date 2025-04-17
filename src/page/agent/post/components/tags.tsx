"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TagSelectorProps {
  value: string[]; // Changed to string[] to match the Zod schema
  onChange: (value: string[]) => void;
}

export default function TagSelector({ value, onChange }: TagSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const allTags = [
    "hot",
    "new",
    "sale",
    "featured",
    "exclusive",
    "popular",
    "trending",
    "recommended",
    "bestseller",
    "limited",
    "discount",
    "clearance",
    "on-sale",
    "limited-time",
    "exclusive-offer",
    "best-value",
    "top-picks",
    "must-have",
    "limited-edition",
  ];

  const toggleTag = (tagName: string) => {
    if (value.includes(tagName)) {
      onChange(value.filter((t) => t !== tagName));
    } else {
      onChange([...value, tagName]);
    }
  };

  const removeTag = (tagName: string) => {
    onChange(value.filter((t) => t !== tagName));
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-1">Tags</h3>
        <p className="text-sm text-muted-foreground">Những tag cho các bài đăng liên quan</p>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {value.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 hover:bg-gray-200 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="relative">
        <div
          className="border rounded-md p-2 cursor-pointer flex items-center"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="text-sm text-gray-500">Chọn các tag</span>
        </div>

        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 border rounded-md bg-white shadow-md z-10 p-4">
            <h4 className="font-medium mb-2">Chọn các tag liên quan</h4>
            <ul className="space-y-2">
              {allTags.map((tag) => (
                <li key={tag} className="flex items-start">
                  <span className="mr-2">•</span>
                  <button
                    onClick={() => toggleTag(tag)}
                    className={`text-left hover:text-gray-700 ${
                      value.includes(tag) ? "font-semibold text-primary" : ""
                    }`}
                  >
                    {tag}
                  </button>
                </li>
              ))}
            </ul>

            <Button
              className="w-full mt-4"
              onClick={() => setShowDropdown(false)}
            >
              Xác nhận
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}