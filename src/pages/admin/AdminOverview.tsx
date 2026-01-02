import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Users, Mail, TrendingUp, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminOverview = () => {
  // Fetch waitlist stats
  const { data: waitlistStats } = useQuery({
    queryKey: ['admin-waitlist-stats'],
    queryFn: async () => {
      const { count: totalCount } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { count: todayCount } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const { count: weekCount } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekAgo.toISOString());

      const { count: referralCount } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .not('referred_by', 'is', null);

      return {
        total: totalCount || 0,
        today: todayCount || 0,
        thisWeek: weekCount || 0,
        referrals: referralCount || 0,
      };
    },
  });

  // Fetch email stats
  const { data: emailStats } = useQuery({
    queryKey: ['admin-email-stats'],
    queryFn: async () => {
      const { count: sentCount } = await supabase
        .from('email_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'sent');

      const { count: deliveredCount } = await supabase
        .from('email_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'delivered');

      const { count: openedCount } = await supabase
        .from('email_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'opened');

      const { count: clickedCount } = await supabase
        .from('email_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'clicked');

      return {
        sent: sentCount || 0,
        delivered: deliveredCount || 0,
        opened: openedCount || 0,
        clicked: clickedCount || 0,
      };
    },
  });

  // Fetch recent signups
  const { data: recentSignups } = useQuery({
    queryKey: ['admin-recent-signups'],
    queryFn: async () => {
      const { data } = await supabase
        .from('waitlist')
        .select('id, email, city, role, created_at, referred_by')
        .order('created_at', { ascending: false })
        .limit(5);

      return data || [];
    },
  });

  const stats = [
    {
      title: 'Total Waitlist',
      value: waitlistStats?.total || 0,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Today\'s Signups',
      value: waitlistStats?.today || 0,
      icon: UserPlus,
      color: 'text-emerald',
      bgColor: 'bg-emerald/10',
    },
    {
      title: 'This Week',
      value: waitlistStats?.thisWeek || 0,
      icon: TrendingUp,
      color: 'text-soft-aqua',
      bgColor: 'bg-soft-aqua/10',
    },
    {
      title: 'Referrals',
      value: waitlistStats?.referrals || 0,
      icon: Users,
      color: 'text-golden-amber',
      bgColor: 'bg-golden-amber/10',
    },
  ];

  const emailMetrics = [
    { label: 'Sent', value: emailStats?.sent || 0 },
    { label: 'Delivered', value: emailStats?.delivered || 0 },
    { label: 'Opened', value: emailStats?.opened || 0 },
    { label: 'Clicked', value: emailStats?.clicked || 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-muted-foreground">Monitor your waitlist and email performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-glow transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Email Delivery Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailMetrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className="font-semibold text-foreground">{metric.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Signups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" />
              Recent Signups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSignups?.map((signup) => (
                <div key={signup.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground text-sm truncate max-w-[200px]">
                      {signup.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {signup.city || 'Unknown'} • {signup.role || 'Not specified'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(signup.created_at).toLocaleDateString()}
                    </p>
                    {signup.referred_by && (
                      <span className="text-xs text-emerald">Referred</span>
                    )}
                  </div>
                </div>
              ))}
              {(!recentSignups || recentSignups.length === 0) && (
                <p className="text-muted-foreground text-sm text-center py-4">No signups yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
