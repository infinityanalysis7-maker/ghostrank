'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function ReplyCard({ reply }: { reply: { label: string; text: string } }) {
  const [copied, setCopied] = useState(false)
  const [selected, setSelected] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(reply.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleUseReply = () => {
    setSelected(!selected)
  }

  return (
    <Card className={`border-slate-800 bg-slate-950/50 backdrop-blur-sm transition-all ${selected ? 'ring-2 ring-green-500' : ''}`}>
      <CardContent className="p-6">
        <div className="mb-3">
          <span className="text-sm font-semibold text-white">{reply.label}</span>
        </div>
        <p className="text-slate-300 mb-4">{reply.text}</p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="bg-slate-900/50 border-slate-700 text-white hover:bg-slate-800"
          >
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleUseReply}
            className={selected ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-white text-slate-950 hover:bg-slate-200'}
          >
            {selected ? 'Selected' : 'Use This Reply'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
