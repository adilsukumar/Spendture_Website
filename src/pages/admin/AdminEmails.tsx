import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Mail, Search, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Eye, MousePointer } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ITEMS_PER_PAGE = 20;

const eventTypeConfig: Record<string, { icon: typeof Mail; color: string; label: string }> = {
  sent: { icon: Mail, color: 'bg-blue-500/10 text-blue-500', label: 'Sent' },
  delivered: { icon: CheckCircle, color: 'bg-emerald/10 text-emerald', label: 'Delivered' },
  opened: { icon: Eye, color: 'bg-soft-aqua/10 text-soft-aqua', label: 'Opened' },
  clicked: { icon: MousePointer, color: 'bg-golden-amber/10 text-golden-amber', label: 'Clicked' },
  bounced: { icon: AlertCircle, color: 'bg-destructive/10 text-destructive', label: 'Bounced' },
  complained: { icon: AlertCircle, color: 'bg-destructive/10 text-destructive', label: 'Complained' },
};

const AdminEmails = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const { data: emailData, isLoading } = useQuery({
    queryKey: ['admin-emails', search, page],
    queryFn: async () => {
      let query = supabase
        .from('email_events')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);

      if (search) {
        query = query.or(`recipient_email.ilike.%${search}%,event_type.ilike.%${search}%`);
      }

      const { data, count, error } = await query;

      if (error) throw error;

      return { events: data || [], totalCount: count || 0 };
    },
  });

  // Fetch email stats by type
  const { data: emailStats } = useQuery({
    queryKey: ['admin-email-type-stats'],
    queryFn: async () => {
      const types = ['sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained'];
      const stats: Record<string, number> = {};

      for (const type of types) {
        const { count } = await supabase
          .from('email_events')
          .select('*', { count: 'exact', head: true })
          .eq('event_type', type);
        stats[type] = count || 0;
      }

      return stats;
    },
  });

  const totalPages = Math.ceil((emailData?.totalCount || 0) / ITEMS_PER_PAGE);

  // Calculate delivery rate
  const deliveryRate = emailStats && emailStats.sent > 0
    ? ((emailStats.delivered / emailStats.sent) * 100).toFixed(1)
    : '0';

  const openRate = emailStats && emailStats.delivered > 0
    ? ((emailStats.opened / emailStats.delivered) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Email Events</h2>
        <p className="text-muted-foreground">
          Track email delivery and engagement
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(eventTypeConfig).map(([type, config]) => (
          <Card key={type}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-lg ${config.color}`}>
                  <config.icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {(emailStats?.[type] || 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">{config.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Delivery Rate</p>
            <p className="text-3xl font-bold text-foreground">{deliveryRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Open Rate</p>
            <p className="text-3xl font-bold text-foreground">{openRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by email or event type..."
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
                      <TableHead>Event</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Email ID</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emailData?.events.map((event) => {
                      const config = eventTypeConfig[event.event_type] || {
                        icon: Mail,
                        color: 'bg-muted text-muted-foreground',
                        label: event.event_type,
                      };

                      return (
                        <TableRow key={event.id}>
                          <TableCell>
                            <Badge className={`${config.color} border-0`}>
                              {config.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {event.recipient_email}
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground max-w-[150px] truncate">
                            {event.email_id}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(event.created_at).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {(!emailData?.events || emailData.events.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          No email events found
                        </TableCell>
                      </TableRow>
                    )}
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

export default AdminEmails;
