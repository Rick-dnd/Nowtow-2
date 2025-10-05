'use client';

import React, { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type Row,
  type HeaderGroup,
  type Header,
  type Cell,
} from '@tanstack/react-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  MoreHorizontal,
  Edit,
  Pause,
  Play,
  Copy,
  Trash2,
  BarChart3,
  Share2,
  QrCode,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Mock Data Types
interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  bookings: string;
  price: string;
  rating: number;
  reviews: number;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
}

// Mock Data
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Summer Night Party',
    date: '15.Oct.2024',
    time: '20:00',
    bookings: '15/30',
    price: '€12',
    rating: 4.5,
    reviews: 12,
    status: 'active',
  },
  {
    id: '2',
    name: 'Art Exhibition Opening',
    date: '20.Oct.2024',
    time: '18:00',
    bookings: '8/25',
    price: 'Free',
    rating: 4.8,
    reviews: 5,
    status: 'paused',
  },
  {
    id: '3',
    name: 'Yoga in the Park',
    date: '12.Oct.2024',
    time: '09:00',
    bookings: '22/20',
    price: '€8',
    rating: 4.9,
    reviews: 18,
    status: 'completed',
  },
  {
    id: '4',
    name: 'Photography Workshop',
    date: '18.Oct.2024',
    time: '14:00',
    bookings: '12/15',
    price: '€25',
    rating: 4.7,
    reviews: 8,
    status: 'active',
  },
  {
    id: '5',
    name: 'Networking Brunch',
    date: '10.Oct.2024',
    time: '11:00',
    bookings: '5/30',
    price: '€15',
    rating: 4.2,
    reviews: 3,
    status: 'cancelled',
  },
];

const getStatusBadge = (status: Event['status']): React.ReactElement => {
  const variants = {
    active: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
    paused: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
    completed: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    cancelled: 'bg-red-100 text-red-700 hover:bg-red-100',
  };

  const labels = {
    active: 'Active',
    paused: 'Paused',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  return <Badge className={variants[status]}>{labels[status]}</Badge>;
};

export default function EventsPage(): React.ReactElement {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: 'name',
      header: 'Event Name',
      cell: ({ row }: { row: Row<Event> }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }: { row: Row<Event> }) => (
        <div className="text-sm">
          <div>{row.original.date}</div>
          <div className="text-muted-foreground">{row.original.time}</div>
        </div>
      ),
    },
    {
      accessorKey: 'bookings',
      header: 'Bookings',
      cell: ({ row }: { row: Row<Event> }) => (
        <div className="text-sm">{row.getValue('bookings')}</div>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }: { row: Row<Event> }) => (
        <div className="font-medium">{row.getValue('price')}</div>
      ),
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }: { row: Row<Event> }) => (
        <div className="text-sm">
          ⭐ {row.original.rating} ({row.original.reviews})
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: { row: Row<Event> }) => getStatusBadge(row.getValue('status')),
    },
    {
      id: 'actions',
      cell: ({ row }: { row: Row<Event> }): React.ReactElement => {
        const event = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                {event.status === 'paused' ? (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share Link
              </DropdownMenuItem>
              <DropdownMenuItem>
                <QrCode className="mr-2 h-4 w-4" />
                QR Code
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const filteredData = statusFilter === 'all'
    ? mockEvents
    : mockEvents.filter(event => event.status === statusFilter);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground mt-1">Manage your event listings</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-emerald-600">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Event Listings</CardTitle>
          <CardDescription>Filter and manage your events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn('name')?.setFilterValue(event.target.value)
                }
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup: HeaderGroup<Event>) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header: Header<Event, unknown>) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row: Row<Event>) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell: Cell<Event, unknown>) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{' '}
              of {table.getFilteredRowModel().rows.length} events
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
