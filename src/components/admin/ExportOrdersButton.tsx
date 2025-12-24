'use client'

import React, { useState } from 'react'

const ExportOrdersButton: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: 'all',
    startDate: '',
    endDate: '',
  })

  const handleExport = async () => {
    setIsExporting(true)

    try {
      const params = new URLSearchParams()
      if (filters.status !== 'all') params.append('status', filters.status)
      if (filters.startDate) params.append('startDate', filters.startDate)
      if (filters.endDate) params.append('endDate', filters.endDate)

      const response = await fetch(`/api/orders/export?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Export failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `orders-export-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export orders. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div
      style={{
        padding: '20px',
        marginBottom: '20px',
        border: '1px solid #e5e5e5',
        borderRadius: '4px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Export Orders</h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            padding: '8px 16px',
            border: '1px solid #d0d0d0',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          <div>
            <label
              htmlFor="status-filter"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '8px',
              }}
            >
              Status
            </label>
            <select
              id="status-filter"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d0d0d0',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              aria-label="Filter by status"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="start-date-filter"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '8px',
              }}
            >
              Start Date
            </label>
            <input
              id="start-date-filter"
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d0d0d0',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              aria-label="Filter by start date"
            />
          </div>

          <div>
            <label
              htmlFor="end-date-filter"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '8px',
              }}
            >
              End Date
            </label>
            <input
              id="end-date-filter"
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d0d0d0',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              aria-label="Filter by end date"
            />
          </div>
        </div>
      )}

      <button
        onClick={handleExport}
        disabled={isExporting}
        style={{
          width: '100%',
          padding: '12px 20px',
          backgroundColor: isExporting ? '#999' : '#FF0000',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 600,
          cursor: isExporting ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {isExporting ? (
          <>
            <span
              style={{
                display: 'inline-block',
                width: '16px',
                height: '16px',
                border: '2px solid #fff',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.6s linear infinite',
              }}
            />
            Exporting...
          </>
        ) : (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export to CSV
          </>
        )}
      </button>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default ExportOrdersButton
