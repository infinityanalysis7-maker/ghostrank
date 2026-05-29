'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Copy } from 'lucide-react'

export default function PostCard({ post }: { post: { id: string; content: string; created_at: string } }) {
  return (
    <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <p className="text-slate-300 mb-4">{post.content}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">
            {new Date(post.created_at).toLocaleDateString()}
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(post.content)}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <Copy className="h-4 w-4" />
            Copy
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
