import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Users, Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ITEMS_PER_PAGE = 20;

const AdminWaitlist = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const { data: waitlistData, isLoading } = useQuery({
    queryKey: ['admin-waitlist', search, page],
    queryFn: async () => {
      let query = supabase
        .from('waitlist')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);

      if (search) {
        query = query.or(`email.ilike.%${search}%,city.ilike.%${search}%,referral_code.ilike.%${search}%`);
      }

      const { data, count, error } = await query;

      if (error) throw error;

      return { entries: data || [], totalCount: count || 0 };
    },
  });

  // Fetch referral stats
  const { data: referralStats } = useQuery({
    queryKey: ['admin-referral-stats'],
    queryFn: async () => {
      const { data } = await supabase
        .from('waitlist')
        .select('referred_by')
        .not('referred_by', 'is', null);

      if (!data) return [];

      // Count referrals per code
      const counts: Record<string, number> = {};
      data.forEach((entry) => {
        if (entry.referred_by) {
          counts[entry.referred_by] = (counts[entry.referred_by] || 0) + 1;
        }
      });

      // Get top referrers
      const topReferrers = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      return topReferrers;
    },
  });

  const handleExportCSV = () => {
    if (!waitlistData?.entries) return;

    const headers = ['Email', 'Position', 'City', 'Role', 'Referral Code', 'Referred By', 'Joined'];
    const rows = waitlistData.entries.map((entry) => [
      entry.email,
      entry.position,
      entry.city || '',
      entry.role || '',
      entry.referral_code,
      entry.referred_by || '',
      new Date(entry.created_at).toISOString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const totalPages = Math.ceil((waitlistData?.totalCount || 0) / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Waitlist Management</h2>
          <p className="text-muted-foreground">
            {waitlistData?.totalCount?.toLocaleString() || 0} total signups
          </p>
        </div>
        <Button onClick={handleExportCSV} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Top Referrers */}
      {referralStats && referralStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {referralStats.map(([code, count], index) => (
                <div
                  key={code}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted"
                >
                  <span className="text-sm font-semibold text-muted-foreground">#{index + 1}</span>
                  <span className="font-mono text-sm text-foreground">{code}</span>
                  <span className="text-sm text-primary font-bold">{count} referrals</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by email, city, or referral code..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Referral Code</TableHead>
                      <TableHead>Referred By</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {waitlistData?.entries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.position}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{entry.email}</TableCell>
                        <TableCell>{entry.city || '-'}</TableCell>
                        <TableCell className="capitalize">{entry.role || '-'}</TableCell>
                        <TableCell className="font-mono text-xs">{entry.referral_code}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {entry.referred_by || '-'}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Page {page + 1} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(Math.max(0, page - 1))}
                      disabled={page === 0}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                      disabled={page >= totalPages - 1}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminWaitlist;
