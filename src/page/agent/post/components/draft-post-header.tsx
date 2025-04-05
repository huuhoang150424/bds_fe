"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Grid, List, Plus, Search } from "lucide-react"

interface DraftPostsHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  viewMode: "card" | "table"
  setViewMode: (mode: "card" | "table") => void
}

export function DraftPostsHeader({ searchQuery, setSearchQuery, viewMode, setViewMode }: DraftPostsHeaderProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bài đăng nháp</h1>
        <Button className="hidden sm:flex">
          <Plus className="mr-2 h-4 w-4" />
          Tạo bài đăng mới
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
          <Input
            type="search"
            placeholder="Tìm kiếm bài đăng nháp..."
            className="p-[5px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2 border rounded-md p-1">
            <button
              onClick={() => setViewMode("card")}
              className={`p-1.5 rounded-sm ${viewMode === "card" ? "bg-muted" : ""}`}
              aria-label="Chế độ thẻ"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-sm ${viewMode === "table" ? "bg-muted" : ""}`}
              aria-label="Chế độ bảng"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
        <Button className="sm:hidden">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

