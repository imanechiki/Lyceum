'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useField } from '@payloadcms/ui'

type Props = {
  path: string
}

const BulkMediaUploader: React.FC<Props> = ({ path }) => {
  const imagesPath = path.replace(/\.bulkUpload$/, '.images')

  const { value: images, setValue } = useField<any[]>({ path: imagesPath })
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<[number, number] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return
      setUploading(true)
      setError(null)
      const createdIDs: string[] = []

      const items = Array.from(files)
      let done = 0
      for (const file of items) {
        try {
          const form = new FormData()
          form.append('file', file)
          form.append('alt', file.name)

          const res = await fetch('/api/media', {
            method: 'POST',
            body: form,
            credentials: 'include',
          })

          if (!res.ok) {
            const txt = await res.text()
            throw new Error(txt || `Failed uploading ${file.name}`)
          }

          const json = await res.json()
          const id = json?.doc?.id || json?.id
          if (id) createdIDs.push(id)
        } catch (e: any) {
          setError(e?.message || 'Upload failed')
        } finally {
          done += 1
          setProgress([done, items.length])
        }
      }

      if (createdIDs.length) {
        const next = [...(images || []), ...createdIDs]
        setValue(next)
      }

      if (inputRef.current) inputRef.current.value = ''
      setUploading(false)
      setTimeout(() => setProgress(null), 1500)
    },
    [images, setValue],
  )

  return (
    <div style={{ border: '1px dashed #ccc', padding: 12, borderRadius: 8 }}>
      <div style={{ marginBottom: 8, fontWeight: 600 }}>Bulk Upload Images</div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={(e) => handleFiles(e.currentTarget.files)}
        disabled={uploading}
      />
      <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
        Selected files will be uploaded to Media and added to this gallery group automatically.
      </div>
      {progress && (
        <div style={{ marginTop: 8, fontSize: 12 }}>
          Uploading {progress[0]} / {progress[1]}
        </div>
      )}
      {error && <div style={{ marginTop: 8, fontSize: 12, color: '#b00020' }}>Error: {error}</div>}
    </div>
  )
}

export default BulkMediaUploader
